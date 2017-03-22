
        // Announcements
        // -------------

        $(function() {

            var url = 'https://my.champlain.edu/announcements/api/?callback=?';

            var p = $.getJSON(url, null, function( result ) {

                var announcements = result.data || [],
                    $container = $("#cc-announcements");

                announcements = announcements.filter(function(announcement) {
                    return announcement.type == "Shuttle";
                });

                console.log(announcements);

                if ( ! announcements.length ) return;

                var html = '',
                    style = '';
                for ( var i = 0; i < announcements.length; i++ ) {

                    style = announcements[i].style ? announcements[i].style : 'danger';

                    html += '<div class="alert alert-' + style + ' alert-dismissible" role="alert" id="cc-announcements">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<h4>' + announcements[i].title + '</h4>' + announcements[i].summary + '</div>';

                }

                $container.html(html).show();

            });
        });



        // Polyfills
        // ---------

        // isArray Polyfill
        if (!Array.isArray) {
            Array.isArray = function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }

        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function(callback, thisArg) {
                var T, k;
                if (this == null) {
                    throw new TypeError(' this is null or not defined');
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if (typeof callback !== "function") {
                    throw new TypeError(callback + ' is not a function');
                }
                if (arguments.length > 1) {
                    T = thisArg;
                }

                k = 0;

                while (k < len) {
                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }

        // TODO: Eventually add conditionally loaded polyfills for IE7 here ...


		
		
		
      // Application Logic
      // -----------------

      // This application organizes shuttle items and functionality into this global.  As described below, custom_overlays and buses are
      // an Array of objects containing both a model (object with attributes derived from Champlain APIs) and a view
      // (Google Maps Marker).  Stops and bus display configuration can be changed here:
      // https://docs.google.com/spreadsheets/d/1CPgjCQZ-AUcNNvq8wAMlwfm9lKmsQuThwg9oh_EI0n0/edit#gid=0
      // For access to this sheet, contact champlaindevs@gmail.com.
      var CC_SHUTTLE = {
          custom_overlays: [],
          markers: [],
          buses: [],
          marker_scale:1,
          zoom_level:14,
          center: {lat: 44.475200, lng: -73.200947},
          overlays_initialized: false
      }, map

      // Google Maps API makes use globals window.map and window.initMap when dependencies are finished loading.  We define
      // much of our application logic within the initMap function, which is only executed once when Google Maps is finished
      // loading
      var initMap = function() {

          // Custom overlay for Google Maps based on examples here:
          // https://developers.google.com/maps/documentation/javascript/examples/overlay-simple

          function ShuttleOverlay(bounds, image, map) {
              this.bounds_ = bounds;
              this.image_ = image;
              this.map_ = map;
              this.div_ = null;
              this.setMap(map);
          }
          ShuttleOverlay.prototype = new google.maps.OverlayView();
          ShuttleOverlay.prototype.onAdd = function() {
              var div = document.createElement('div');
              div.style.borderStyle = 'none';
              div.style.borderWidth = '0px';
              div.style.position = 'absolute';
              var img = document.createElement('img');
              img.src = this.image_;
              img.style.width = '100%';
              img.style.height = '100%';
              img.style.position = 'absolute';
              div.appendChild(img);
              this.div_ = div;
              var panes = this.getPanes();
              panes.overlayLayer.appendChild(div);
          };
          ShuttleOverlay.prototype.draw = function() {
              var overlayProjection = this.getProjection();
              var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
              var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
              var div = this.div_;
              div.style.left = sw.x + 'px';
              div.style.top = ne.y + 'px';
              div.style.width = (ne.x - sw.x) + 'px';
              div.style.height = (sw.y - ne.y) + 'px';
          };
          ShuttleOverlay.prototype.onRemove = function() {
              this.div_.parentNode.removeChild(this.div_);
              this.div_ = null;
          };
          ShuttleOverlay.prototype.hide = function() {
              if (this.div_) {
                  this.div_.style.visibility = 'hidden';
              }
          };
          ShuttleOverlay.prototype.show = function() {
              if (this.div_) {
                  this.div_.style.visibility = 'visible';
              }
          };


          // Build map into our map_canvas DIV and set the default zoom level and style.  Zoom level changes depending on
          // viewport size.
          var mapSize = getMapSize();

          map = new google.maps.Map(document.getElementById('map_canvas'), {
              zoom: mapSize.zoom,
              center: CC_SHUTTLE.center,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              draggable: false,
              scaleControl: false,
              scrollwheel:false
          });

          CC_SHUTTLE.zoom_level = mapSize.zoom;

          // Adjust overlays whenever browser is resized
          var resizeTimer;
          $(window).bind('resize', function() {
              clearTimeout(resizeTimer);
              resizeTimer = setTimeout(function() {
                  refreshOverlays();
              }, 100);
          });

          // If an error occurs that should prevent the shuttle page from polling the Tracking API, this will be set to tru.
          var error = false;

          // defaultIndex is the CC_Shuttle.buses Array index which contains default display information for buses.  This
          // can be configured in the Spreadsheet by setting the bus ID to "default"
          var defaultIndex = -1,
              buses = CC_SHUTTLE.buses,
              custom_overlays = CC_SHUTTLE.custom_overlays,
              markers = CC_SHUTTLE.markers;

          // Set markers on map, find bus locations, and then start polling for new bus locations every 5 seconds.
          getMarkerInfo().then(getBusLocations).then(function() {
              refreshOverlays();
              if (!error) {
                  var interval = setInterval(function() {
                      getBusLocations();
                  }, 5000);
              }
              return $.when();
          });

          // Get Maps display information from Champlain College Shuttle Maps Markers API:
          // https://docs.google.com/spreadsheets/d/1CPgjCQZ-AUcNNvq8wAMlwfm9lKmsQuThwg9oh_EI0n0/edit#gid=0
          // For access to this sheet, contact champlaindevs@gmail.com.  Stops and busses are added to the CC_SHUTTLE.custom_overlays|buses.
          // Each "custom_overlays" and "bus" marker is composed of a model and a view - the model is information collected from Champlain APIs
          // (CC_SHUTTLE.<custom_overlays|markers|buses>.api_data) and the view is the corresponding Google Maps Marker (CC_SHUTTLE.<custom_overlays|markers|buses>.bottom_right).
          function getMarkerInfo() {

              return $.getJSON("https://forms.champlain.edu/googlespreadsheet/find/type/shuttlemapsapi?callback=?", function(result, status, jqXhr) {

                  // Validate result from Shuttle Maps Markers API Spreadsheet
                  if (typeof result === 'undefined' || typeof result.message === 'undefined' || !Array.isArray(result.message) || !result.message.length) {
                      console.log('Unable to load data from Champlain Shuttle Maps Markers API.');
                      return;
                  }

                  // Only records with map type of "shuttle" should be displayed on shuttle.champlain.edu
                  var results = result.message.filter(function(record) {
                      return record.map_type == 'shuttle'
                  });

                  // Loop through each custom_overlays returned from the Shuttle Maps Markers API Spreadsheet looking for buses and custom_overlays
                  results.forEach(function(record) {
                      if (record.record_type === 'bus') {
                          buses.push({
                              api_data: record,
                              gm_object: null
                          });
                      }
                      else if (record.record_type === 'marker') {
                          var marker = {
                              api_data: record,
                              gm_object: new google.maps.Marker({
                                  position: new google.maps.LatLng(record.lat, record.lon),
                                  map: map,
                                  icon: {
                                      url: record.image_url,
                                      size: new google.maps.Size(record.width, record.height),
                                      origin: new google.maps.Point(0, 0),
                                      anchor: new google.maps.Point(Math.floor(record.width/2), Math.floor(record.height/2))
                                  },
                                  zIndex: 1
                              })
                          };
                          markers.push(marker);

                          // Uncomment to debug markers
                          //console.log(marker);
                      }
                      else if (record.record_type === 'custom_overlays') {

                          custom_overlays.push({
                              api_data: record,
                              gm_object: null
                          });

                      }

                  }); // End results.forEach ...

              }); // End return $.getJSON to CC Shuttle Maps Marker API.

          } // End getMarkerInfo function


          // This function should be used as a callback when querying the Shuttle Tracking API using $.ajax or $.getJSON.  This function will update
          // both the view and model of the buses only when a bus has moved since last time the function was called.
          function getBusLocations() {

              return $.getJSON("http://shuttle.champlain.edu/shuttledata?callback=?", function(result) {

                  // If invalid result is detected from Shuttle Tracker API, log it to the console and do not process it
                  if (typeof result === 'undefined' || !Array.isArray(result) || !result.length) {
                      console.log("Invalid result returned from Shuttle Tracker API:");
                      console.log(result);
                      return;
                  }

                  result.forEach(function(bus) {
                      var busIndex = -1;

                      // If all required attributes are returned from the shuttle tracking API, process the new bus tracking data and update the bus location on the map
                      if (typeof bus.UnitID === 'undefined' || typeof bus.Date_Time_ISO === 'undefined' || typeof bus.Lat === 'undefined' || typeof bus.Lon === 'undefined') {
                          console.log("Bus from Shuttle Tracking API has missing attributes:");
                          console.log(bus);
                          return;
                      }

                      for (var i = 0; i < buses.length; i++) {

                          // Get current bus ID
                          if (buses[i].api_data.id == bus.UnitID) {
                              busIndex = i;
                          }

                          // Get default bus index, which is used when a bus does not have display info configured in Shuttle Maps Markers API
                          if (!~defaultIndex && buses[i].api_data.id == 'default') {
                              defaultIndex = i;
                          }
                      }

                      // If no bus display information was found (i.e. bus ID was not in CC Shuttle Maps Marker API), then use default config
                      // that should be set up in that api (Look for bus with ID column set to "default").
                      if (!~busIndex && ~defaultIndex) {
                          buses.push($.extend({}, buses[defaultIndex]));
                          busIndex = buses.length-1;
                          buses[busIndex].api_data.id = bus.UnitID;
                      }

                      if (!~busIndex) {
                          console.log("Cannot display bus " + bus.UnitID + ": no bus with this ID exists AND there is no default bus configured in Shuttle Maps Markers API");
                          return;
                      }

                      // Determine how many minutes ago the shuttle was updated
                      var bApi = buses[busIndex].api_data,
                          bMarker = buses[busIndex].gm_object,
                          updated = new Date(Date.parse(bus.Date_Time_ISO)),
                          now = new Date();
                      bApi.minutesAgoUpdated = (now.getTime() - updated.getTime())/1000/60;

                      // new, recently moved or stale?
                      var isNewBus = !bMarker,
                          hasMovedSinceLastUpdate = false;
                      if (!isNewBus) {
                          var latChange = Math.abs(bApi.lat - bus.Lat),
                              lonChange = Math.abs(bApi.lon - bus.Lon);
                          if (latChange > .0001 || lonChange > .0001) {
                              hasMovedSinceLastUpdate = true;
                          }
                      }

                      // If bus has been active within the last 30 minutes, then display it on the map.  In order for a bus to show up, it needs
                      // to be broadcasting it's location and not be still for 30 or more minutes.
                      if (bApi.minutesAgoUpdated < 30) {
                          if (!isNewBus && hasMovedSinceLastUpdate) {
                              //if (typeof bus.animation === "undefined" || !bus.animation.animating) {
                              //bMarker.setPosition(new google.maps.LatLng(bApi.lat,bApi.lon));
                              animateBus(buses[busIndex], {
                                  lat: bus.Lat,
                                  lon: bus.Lon
                              });
                              //}
                          }
                          else if (isNewBus) {
                              // update bus's model with new lat, lon
                              bApi.lat = bus.Lat;
                              bApi.lon = bus.Lon;

                              // update view with new GM Marker for bus
                              var marker = new google.maps.Marker({
                                  position: new google.maps.LatLng(parseFloat(bApi.lat), parseFloat(bApi.lon)),
                                  map: map,
                                  icon: {
                                      url: bApi.image_url,
                                      size: new google.maps.Size(parseInt(bApi.width), parseInt(bApi.height)),
                                      origin: new google.maps.Point(0,0),
                                      anchor: new google.maps.Point(Math.floor(bApi.width/2), bApi.height)
                                  },
                                  title: bApi.title,
                                  zIndex: 3
                              });
                              buses[busIndex].gm_object = marker;

                              // Uncomment to debug bus marker creation
                              // console.log("created new bus:");
                              // console.log(buses[busIndex]);
                          }
                      }

                  });

              }); // End return $.getJSON to CC Shuttle Tracking API.

          } // End getBusLocations function.



          // Implement Animate Marker Functionality
          // -------------------------------------
          // Rather than just set the position of a bus when it moves to a new location, these functions
          // smoothly animate it to the new location.

          function animateBus(bus, newLatLon) {
              bus.animation = {
                  animating:true,
                  i:0,
                  deltaLat:(parseFloat(newLatLon.lat) - parseFloat(bus.api_data.lat))/50,
                  deltaLon: (parseFloat(newLatLon.lon) - parseFloat(bus.api_data.lon))/50
              };
              _animateBus(bus);
          }

          function _animateBus(bus) {
              // update model
              bus.api_data.lat = parseFloat(bus.api_data.lat) + bus.animation.deltaLat;
              bus.api_data.lon = parseFloat(bus.api_data.lon) + bus.animation.deltaLon;

              // update view
              var latlng = new google.maps.LatLng(bus.api_data.lat, bus.api_data.lon);
              bus.gm_object.setPosition(latlng);
              google.maps.event.trigger(map, 'resize');
              if (bus.animation.i!=50) {
                  bus.animation.i++;
                  setTimeout(function() {
                      _animateBus(bus);
                  }, 10);
              }
          }

          function showCustomOverlays(zoom_level) {

              if (CC_SHUTTLE.overlays_initialized && CC_SHUTTLE.zoom_level == zoom_level) return;

              // update model's zoom_level
              CC_SHUTTLE.zoom_level = zoom_level;

              // update view
              CC_SHUTTLE.custom_overlays.forEach(function(overlay) {
                  if (parseInt(overlay.api_data.zoom_level) === parseInt(zoom_level)) {
                      if (overlay.gm_object === null) {

                          // Custom overlays are added to the map by defining a rectangular region using lat/lon coordinates of the upper left and bottom
                          // right.  We're storing that info in bounds.
                          var bounds = new google.maps.LatLngBounds(
                              new google.maps.LatLng(overlay.api_data.bounds_southwest_lat, overlay.api_data.bounds_southwest_lon),
                              new google.maps.LatLng(overlay.api_data.bounds_northeast_lat, overlay.api_data.bounds_northeast_lon)
                          );

                          var gm_object = new ShuttleOverlay(bounds, overlay.api_data.image_url, map);
                          overlay.gm_object = gm_object;
                      }
                      else {
                          overlay.gm_object.show();
                      }
                  }
                  else {
                      if (overlay.gm_object !== null) {
                          overlay.gm_object.hide();
                      }
                  }
              });
          }

          function scaleIcons(marker_scale) {

              if (CC_SHUTTLE.overlays_initialized && CC_SHUTTLE.marker_scale == marker_scale) return;

              // update model
              CC_SHUTTLE.marker_scale = marker_scale;

              // update view icon size
              CC_SHUTTLE.buses.forEach(function(bus) {
                  if (!bus.gm_object) return;
                  var newIconWidth = Math.floor(bus.api_data.width * mapSize.marker_scale),
                      iconSizeDelta = bus.api_data.width - newIconWidth,
                      newIconHeight;
                  if (newIconWidth < bus.api_data.width) {
                      newIconHeight = parseFloat(bus.api_data.height) - iconSizeDelta;
                  }
                  else {
                      newIconHeight = parseFloat(bus.api_data.height) + iconSizeDelta;
                  }

                  bus.gm_object.setIcon({
                      url: bus.api_data.image_url,
                      size: new google.maps.Size(parseFloat(bus.api_data.width), parseFloat(bus.api_data.height)),
                      scaledSize: new google.maps.Size(newIconWidth, newIconHeight),
                      origin: new google.maps.Point(0, 0),
                      anchor: new google.maps.Point(Math.floor(newIconWidth/2), newIconHeight)
                  });

              });

          }

          function getMapSize() {
              var zoom = 14,

              // height should be applied to padding-bottom of the map_container div
              // E.g., for a ratio 16:9, use 100%/16*9 = "56.25%"
                  height = '50%',
                  marker_scale = 1,
                  viewWidth = $(window).width() + getScrollBarWidth(),
                  viewHeight = $(window).height();

              if (viewWidth <= 350) {
                  zoom =  13;
                  height = '95%';
                  marker_scale = .5;
              }
              else if (viewWidth <= 400) {
                  zoom =  13;
                  height = '85%';
                  marker_scale = .5;
              }
              else if (viewWidth <= 455) {
                  zoom =  13;
                  height = '85%';
                  marker_scale = .5;
              }
              else if (viewWidth <= 550) {
                  zoom =  13;
                  height = '75%';
                  marker_scale = .5;
              }
              else if (viewWidth <= 768) {
                  zoom =  13;
                  height = '55%';
                  marker_scale = .5;
              }
              else if (viewWidth <= 992) {
                  zoom =  14;
                  height = '75%';
                  marker_scale = 1;
              }
              else if (viewWidth <= 1200) {
                  zoom =  14;
                  height = '65%';
                  marker_scale = 1;
              }

              // This tweak is for the /index/embedshuttle action, which is used on campus signage screens.  It
              // ensures that the dimensions of the map matches the height of the viewport.
              if (/embedshuttle/.test(window.location.href)) {
                  height = '100vh';
                  zoom = viewHeight < 540 || viewWidth < 555 ? 13 : 14;
                  marker_scale = zoom == 13 ? .5 : 1;
              }

              return {
                  zoom: zoom,
                  height: height,
                  marker_scale: marker_scale
              }
          }

          function refreshOverlays() {

              mapSize = getMapSize();

              // Check if icons need to be resized
              if (mapSize.marker_scale !== CC_SHUTTLE.marker_scale) {
                  scaleIcons(mapSize.marker_scale);
              }

              showCustomOverlays(mapSize.zoom);

              //$(".map_container").css('padding-bottom',mapSize.height);

              map.setZoom(Math.floor(mapSize.zoom));

              setTimeout(function() {
                  map.panTo(CC_SHUTTLE.center);
              }, 100);

              google.maps.event.trigger(map, 'resize');

              CC_SHUTTLE.overlays_initialized = true;

          }

          // Utility Functions
          // -----------------
          function getScrollBarWidth() {
              var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
                  widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
              $outer.remove();
              return 100 - widthWithScroll;
          }

      }; // End initMap
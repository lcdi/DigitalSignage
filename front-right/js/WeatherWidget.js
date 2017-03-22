/*
var awxWidgetInfo = awxWidgetInfo || {};      
awxWidgetInfo.awtd1488469442047 = {};     
awxWidgetInfo.awtd1488469442047.userInfo = 
{      
    country: 'US',          
    city: "Burlington",      
    state: 'VT',      
    metro: '',      
    zip: '05401',      
    fcode: 'BTV',      
    partner: 'accuweather',      
    sessionPartner: 'accuweather',      
    referer: 'http://127.0.0.1:54084/index.html',      
    lang: 'en-us',      
    langid: '1',      
    lat: '44.48',      
    lon: '-73.21',      
    dma: '523',      
    ip: '65.183.136.3',      
    ipLocation: 'us/burlington-vt/05401/',      
    sessionViews: 1,      
    geo_dma: '523',      
    geo_city: 'Montpelier',      
    geo_state: 'VT',      
    geo_zip: '05602',      
    geo_country: 'US'      
};
*/

var weather;
function weatherLoad(){
  console.log("update!");
  setInterval(load(), 36000);
  console.log("update!");
}
function load() {
    loadJSON("http://api.openweathermap.org/data/2.5/weather?zip=05401,us&units=imperial&appid=cfe2b66be4fc40b993dc6682315c357d", function(response) {
    var actual_JSON = JSON.parse(response);
    console.log(actual_JSON);
    weather = actual_JSON;
    if(weather){
        var wa = document.getElementById('weather-app');
        var wmat = document.getElementById('weather-max-temp');
        var wmit = document.getElementById('weather-min-temp')
        var wcn = document.getElementById('weather-city-name');
        var wct = document.getElementById('weather-current-temp');
        var wcon = document.getElementById('weather-condition');
        var wi = document.getElementById('weather-icon');
        var icon = new Image();
        icon.src = getSource(weather.weather[0].id);
        wcn.innerHTML = weather.name+", VT";
        wcon.innerHTML = weather.weather[0].description;
        wct.innerHTML = "Current: "+Math.ceil(weather.main.temp)+"&degF";
        wmat.innerHTML = "High: "+Math.ceil(weather.main.temp_max)+"&degF";
        wmit.innerHTML = "Low: "+Math.ceil(weather.main.temp_min)+"&degF";
        wi.innerHTML = '<img src="'+icon.src+'"/>';
        
        // Add the styling for the weather widget here:
        wa.style.display = "flex";
        wcon.style.fontFamily = "'Lora', serif";
        wct.style.fontFamily = "'Lora', serif";
        wmat.style.fontFamily = "'Lora', serif";
        wa.style.fontFamily = "'Lora', serif";
        wmit.style.fontFamily = "'Lora', serif";
        }
      });
}

function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

function getSource(id){
  var dir = "images/weather/";
  var png = ".png";
  if(id >= 200 && id < 300){
    return (dir+"thunderstorms"+png);
  }
  if(id >= 300 && id < 400){
    return (dir+"slightdrizzle"+png);
  }
  if(id >= 500 && id < 600){
    return (dir+"drizzle"+png);
  }
  if(id >= 600 && id < 700){
    return (dir+"snow"+png);
  }
  if(id >= 700 && id < 800){
    return (dir+"haze"+png);
  }
  if(id >= 800 && id < 801){
    return (dir+"sunny"+png);
  }
  if(id >= 801 && id < 803){
    return (dir+"mostlycloudy"+png);
  }
  if(id >= 803 && id < 805){
    return (dir+"cloudy"+png);
  }
  if(id >= 900 && id < 950){
    return (dir+"thunderstorms"+png);
  }
  if(id >= 950 && id < 958){
    return (dir+"sunny"+png);
  }
  if(id >= 958 && id < 963){
    return (dir+"thunderstorms"+png);
  }
}

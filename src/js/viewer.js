/*
*  Current Bugs
*  ->App Resizing Issues on resize of the editor
*  
*  Needs to be Added
*  ->Update apps, which sends the server the new information about the apps
*  ->Modal that allows the changing of min/max of app's height/width
*  ->Allows to view to displays
*  ->Allows to change background and resize background
*  ->Shows off widgets
*/

//RESIZE IS BROKEN
$(document).ready(()=>{
    var $modal = $('#message');
    var $apps = $('.draggable');
    var $editor = $('#display-editor');
    var editor = {
        apps: [],
        ratio: ()=>{return (9/16)},
        width: ()=>{return $editor.width()},
        height: ()=>{
            //console.log(editor.ratio() * editor.width())
            return(editor.ratio() * editor.width())
        },
        resize: (height)=>{
            $editor.height(editor.height());
            for(i = 0; i < editor.apps.length; i++)
            {
                $('#'+editor.apps[i].app_name).css({
                    'left': calcXIn(editor.apps[i].from_left, editor.width()),
                    'width': calcXIn(editor.apps[i].width, editor.width()),
                    'top': calcYIn(editor.apps[i].from_top, editor.height()),
                    'height': calcYIn(editor.apps[i].height, editor.height())
                }).resizable({
                    minWidth: calcXIn(editor.apps[i].min_width, editor.width()),
                    maxWidth: calcXIn(editor.apps[i].max_width,  editor.width()),
                    minHeight: calcYIn(editor.apps[i].min_height, editor.height()),
                    maxHeight: calcYIn(editor.apps[i].max_height, editor.height()),
                    cancel: ".cancel", 
                    aspectRatio: true
                });
            }
            
        },
        startup: ()=>{
            $editor.height(editor.height());
            var AppData = requestAppDetails();
            editor.apps = AppData.app;
            for(i = 0; i < editor.apps.length; i++)
            {
                generateApp(editor.apps[i], editor);
            }
            $('.draggable').draggable({
                containment: "parent",
                stop: function( e, ui ) {
                    for(i = 0; i < editor.apps.length; i++)
                    {
                        if(ui.helper[0].id === editor.apps[i].app_name)
                        {
                            editor.apps[i].from_top = calcYOut(ui.position.top, editor.height());
                            editor.apps[i].from_left = calcXOut(ui.position.left, editor.width());
                        }
                    }
                },
            }).resizable({
                aspectRatio: true,
                cancel: ".cancel",
                stop: (e, ui)=>{
                    for(i = 0; i < editor.apps.length; i++)
                    {
                        if(ui.helper[0].id === editor.apps[i].app_name)
                        {
                            editor.apps[i].height = calcYOut(ui.size.height, editor.height());
                            editor.apps[i].width = calcXOut(ui.size.width, editor.width());
                        }
                    }
                }});
        }
    }
    editor.startup();
    //editor.resize();
    $(window).on('resize', ()=>{
        editor.resize($editor.height())
    });
function requestAppDetails()
{
    var req = $.ajax({
        type: 'POST',
        url: '../php/display_management.php',
        success:(response)=>
        {
            var i;
            r = JSON.parse(response);
        },
        async: false
    });
    return JSON.parse(req.responseText);
}
/*
* This function create an apps as well as adjusts it to the size of the editor.
* The app information that is to be used on a fullscreen 1080p monitor so calculations
* have to be done in for the app to be generated correctly within the editor
* x-axis (left and width) calculation are ((app->(x-axis) * editor->width)*1920)
* y-axis (top and height) calculation are ((app->(y-axis) * editor->height)*1080)
*/
function generateApp(app, editor)
{
    $div = $("<div>", {id: app['app_name'], class:"draggable ui-widget-content"});
    $div.html(app['app_name']);
    $.each(app, (index, value)=>{
        if(index !== 'app_name')
        {
            switch (index)
            {
                case 'from_left':
                    $div.css('left', calcXIn(value, editor.width()));
                    break;
                case 'from_top':
                    $div.css('top', calcYIn(value, editor.height()));
                    break;
                case 'width':
                    $div.css('width', calcXIn(value, editor.width()));
                    break;
                case 'height':
                    $div.css('height', calcYIn(value, editor.height()));
                    break;
            }
        }
    })
    $div.css("position", "relative");
    $editor.append($div);
    $div.css("position", "absolute");
    $( "#"+app['app_name'] ).draggable({containment: "parent"}).resizable({
        minWidth: calcXIn(app['min_width'], editor.width()),
        maxWidth: calcXIn(app['max_width'],  editor.width()),
        minHeight: calcYIn(app['min_height'], editor.height()),
        maxHeight: calcYIn(app['max_height'], editor.height()),
        cancel: ".cancel", 
        aspectRatio: true
    });
    var app_name = app[app_name];
}
/*
* calculates an app's x-axis property to fit within editor or resized for editor
* as the app is been intergrated in the editor. 
*/
function calcXIn(app, editor)
{
    return(Math.floor((app*editor)/1920));
}
/*
* calculates an app's y-axis property to fit within editor or resized for editor
* as the app is been intergrated in the editor. 
*/
function calcYIn(app, editor)
{
    return(Math.floor((app*editor)/1080));
}
/*
* calculates an app's x-axis property to fit within editor or resized for editor
* as the app's inforamtion is being posted to the server. 
*/
function calcXOut(app, editor)
{
    return(Math.floor((app*1920)/editor));
}
/*
* calculates an app's y-axis property to fit within editor or resized for editor
* as the app's inforamtion is being posted to the server. 
*/
function calcYOut(app, editor)
{
    return(Math.floor((app*1080)/editor));
}
});	
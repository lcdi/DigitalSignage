/*
*  Current Bugs
*  ->App Resizing Issues on resize of the editor
*  
*  Needs to be Added
*  ->Update apps, which sends the server the new information about the apps
*  ->Modal that allows the changing of min/max of app's height/width
*  ->Allows to view to displays
*  ->Allows to change background
*  ->Shows off widgets
*/
$(document).ready(()=>{
    var $modal = $('#message');
    $editor = $('#display-editor');
    var editor = {
        apps: [],
        ratio: ()=>{return (9/16)},
        width: ()=>{return $editor.width()},
        height: ()=>{
            console.log(editor.ratio() * editor.width())
            return(editor.ratio() * editor.width())
        },
        /*Must be completed*/
        resize: ()=>{$editor.height(editor.height())},
        startup: ()=>{
            $editor.height(editor.height());
            var AppData = requestAppDetails();
            
                for(i = 0; i < AppData.app.length; i++)
                {
                    editor.apps[editor.apps.length] = generateApp(AppData.app[i], editor);
                }
                console.log(editor.apps);
                $( ".draggable" ).draggable({containment: "parent"}).resizable({cancel: ".cancel", aspectRatio: true});
        }
    }
    editor.startup();
    editor.resize();
    $(window).on('resize', ()=>{editor.resize()});

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
    console.log(req.responseText)
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
                    $div.css('top', calcYin(value, editor.height()));
                    break;
                case 'width':
                    $div.css('width', calcXIn(value, editor.width()));
                    break;
                case 'height':
                    $div.css('height', calcYin(value, editor.height()));
                    break;
            }
        }
    })
    $div.css("position", "relative");
    $editor.append($div);
    $div.css("position", "absolute");
    console.log("orignal: "+(app['min_width']));
    console.log("resized: "+(app['min_width'] * editor.ratio()));

    $( "#"+app['app_name'] ).draggable({containment: "parent"}).resizable({
        minWidth: calcXIn(app['min_width'], editor.width()),
        maxWidth: calcXIn(app['max_width'],  editor.width()),
        minHeight: calcYin(app['min_height'], editor.height()),
        maxHeight: calcYin(app['max_height'], editor.height()),
        cancel: ".cancel", 
        aspectRatio: true
    });
    var app_name = app[app_name];
    var editorApp = {name: app['app_name'], div: $div[0]};
    return(editorApp)
}
function calcXIn(app, editor)
{
    return((app*editor)/1920);
}
function calcYIn(app, editor)
{
    return((app*editor)/1080);
}
function calcXOut(app, editor)
{
    return((app*1920)/editor)
}
function calcYout(app, editor)
{
    return((app*1080)/editor);
}
});	

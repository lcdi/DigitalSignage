$(document).ready(()=>{
    var $modal = $('#message');
    $editor = $('#display-editor');
    var editor = {
        ratio: ()=>{return (9/16)},
        width: $editor.width(),
        height: ()=>{ return((9/16) * editor.width);},
        sizeUp: ()=>{$editor.css('height', editor.height);}
    }
    editor.sizeUp();

    var AppData = requestAppDetails();

    for(i = 0; i < AppData.app.length; i++)
    {
        generateApp(AppData.app[i], editor);
    }
    $( ".draggable" ).draggable({containment: "parent"}).resizable({cancel: ".cancel", aspectRatio: true});

    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 5000);
    });

    function doneResizing(){
        console.log(editor.height());
        $editor.css('height', editor.height());
    }
    
   /* $(window).on('resize', function(e) {
    
        console.log(editor.height());
        $editor.css('height', editor.height());
                
    });*/
    var data = createDisplay();
    console.log(data);
})

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
    },);
    console.log(req.responseText);
    
    return JSON.parse(req.responseText);
}
function createDisplay()
{
    
}
function generateApp(app, editor)
{
    console.log(app);
    $div = $("<div>", {id: app['app_name'], class:"draggable ui-widget-content"});
    $div.html(app['app_name']);
    $.each(app, (index, value)=>{
        if(index !== 'app_name')
        {
            if(index === 'from_left')
            {
                console.log(editor.ratio());
                $div.css('left', (value * editor.ratio()));
                console.log(value * editor.ratio());
            }
            else if(index === 'from_top')
            {
                $div.css('top', (value * editor.ratio()));
                console.log(value * editor.ratio());
            }
            else
            $div.css(index, value);
        }
    })
    $div.css("position", "relative");
    
    $editor.append($div);
    $div.css("position", "absolute");
    $( "#"+app['app_name'] ).draggable({containment: "parent"}).resizable({
        minWidth: (app['min_width'] * editor.ratio()),
        maxWidth: (app['max_width'] * editor.ratio()),
        minHeight: (app['min_height'] * editor.ratio()),
        maxHeight: (app['max_height'] * editor.ratio()),
        cancel: ".cancel", 
        aspectRatio: true
    });
}
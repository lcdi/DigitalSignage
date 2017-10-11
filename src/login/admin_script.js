$(document).ready(
    function(){
    $("#login").click(function(){
        var un = $("#uname").val();
        var pw = $("#psw").val();

        const dataString = "un=" + un + "&pw=" + pw;

        $.ajax({
            type: "POST",
            url: "src/login/admin_script.php",
            data: dataString,
            cache: false
        }).done(function(response){
            //Checks to see if the php script responded with an HTML page
            //If true goes to the returned HTML page
            if(response.indexOf(".html") != -1)
            {
                window.location = response;
            } else
            {
                $("#responseText").text(response);
            }
            
        });
    });

    // Checks if enter is pressed in textfield
    $('#uname').keydown(function(e){
        if(e.keyCode == 13)
        {
            $("#login").click();
        }
    });

    // Checks if enter is pressed in textfield
    $('#psw').keydown(function(e){
        if(e.keyCode == 13)
        {
            $("#login").click();
        }
    });
});
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
            if(response.indexOf(".html") != -1)
            {
                window.location = response;
            } else
            {
                $("#responseText").text(response);
            }
            
        });
    });
});
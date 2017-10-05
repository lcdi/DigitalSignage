$(document).ready(function(){
    $("#createUser").click(function(){
        var un = $("#uname").val();
        var pw = $("#psw").val();

        var dataString = "un="+un+"&pw="+pw;

        $.ajax({
            type: "POST",
            url: "../../src/php/create_user.php",
            data: dataString,
            cache: false
        });

    });
});
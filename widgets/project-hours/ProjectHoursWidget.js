$(document).ready( function ()
{
    var totalHours = $("#totalNum");
    var hours1 = $(".hours #Hours1");
    var hours2 = $(".hours #Hours2");
    var hours3 = $(".hours #Hours3");
    var hours4 = $(".hours #Hours4");
    var hours5 = $(".hours #Hours5");
    var hours6 = $(".hours #Hours6");
    var hours7 = $(".hours #Hours7");
    var hours8 = $(".hours #Hours8");
    var hours9 = $(".hours #Hours9");
    var hours10 = $(".hours #Hours10");

    $(".hours").on('change', function()
    {

        $(this).val(hours1 + hours2 + hours3 + hours4 + hours5 + hours6 + hours7 + hours8 + hours9 + hours10);

    });

});
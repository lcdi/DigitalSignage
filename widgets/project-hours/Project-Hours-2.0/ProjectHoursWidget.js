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
    var totalHours = (hours1 + hours2 + hours3 + hours4 + hours5 + hours6 + hours7 + hours8 + hours9 + hours10);
    
    $(".hours").on('change', function()
    {
        $(this).val(totalHours);
    });
});
*/
/* 

$('table td').keyup(function() {
  clearTimeout($.data(this, 'timer'));
  var wait = setTimeout(saveData, 500); // delay after user types
  $(this).data('timer', wait);
});

*/

var totalHours = document.getElementById("totalNum");
var hours1 = document.getElementById("Hours1");
var hours2 = document.getElementById("Hours2");
var hours3 = document.getElementById("Hours3");
var hours4 = document.getElementById("Hours4");
var hours5 = document.getElementById("Hours5");
var hours6 = document.getElementById("Hours6");
var hours7 = document.getElementById("Hours7");
var hours8 = document.getElementById("Hours8");
var hours9 = document.getElementById("Hours9");
var hours10 = document.getElementById("Hours10");



// Scrolling text widget using JQuery
// Main source: http://jsfiddle.net/4mTMw/8/

/*
Method 1:
-------------------------------------------------------------------------

var scrollText = $("div.scroll");
scrollText.each(function() 
{
	"use strict";
	var text = $(this); 
	var indent = text.width(); 
    text.scrollText = function() 
	{
        indent--;
		text.css('text-indent',indent);  
        if (indent < -1 * text.children("div.text").width()) 
		{
            indent = text.width();
        }
    };
    text.data('interval',setInterval(text.scrollText,1000/60));
});
*/
/* 
Method 2:
-------------------------------------------------------------------------
*/

$(document).ready(function() {
	
	"use strict";
	('#webTicker').webTicker();
});
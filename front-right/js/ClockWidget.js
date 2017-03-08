function startTime() {
    var date = new Date();
    var hours = date.getHours();
    var period = "AM";
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    //convert to regular time (instead of military time)
    if (hours > 12) {
        hours = hours - 12;
        period = "PM";
    }
    else {
        period = "AM";
    } 

    //put zero's in front of minutes and seconds when less than ten
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    //display clock INCLUDING seconds, just for testing
    /*document.getElementById("time").innerHTML = hours + ":" 
        + minutes + ":" + seconds +" " + period; */

    //display clock WITHOUT seconds
    //(do not have both with and without seconds!)
    //(one should be commented out.)
    document.getElementById("time").innerHTML = hours + ":"
        + minutes + " " + period;

    //start clock
    var clock = setTimeout(startTime, 500);
    }

function startDate() {
    
    var date = new Date();
    document.getElementById("date").innerHTML = date.toDateString();
}

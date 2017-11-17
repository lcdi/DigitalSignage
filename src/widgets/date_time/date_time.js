// Arrays for associating day and month number with their respective word
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setTime()
{
    var date = new Date();
    var time;
    // If it's a single digit minute
    if(date.getMinutes() < 10)
    {
        time = ":0" + date.getMinutes();
    }
    else 
    {
        time = ":" + date.getMinutes();
    }
    // If it's the evening
    if(date.getHours() > 12)
    {
        time = (date.getHours() - 12) + time + " PM";
    }
    else
    {
        time = date.getHours() + time + " AM";
    }
    document.getElementById("time").innerHTML = time;
}

function setDay()
{
    var date = new Date();
    var day;
    // Day is optional
    day = daysOfWeek[date.getDay() - 1] + ", " + months[date.getMonth()] + " " + date.getDay()
    // Optional to add suffix to date number
    if(date.getDay() % 10 == 1 && date.getDay() != 11)
    {
        date += "st";
    }
    else if(date.getDay() % 10 == 2 && date.getDay() != 12)
    {
        day += "nd";
    }
    else if(date.getDay() % 10 == 3 && date.getDay() != 13)
    {
        day += "rd";
    }
    else 
    {
        day +="th";
    }
    day += ", " + date.getFullYear();
    document.getElementById("date").innerHTML = day;
}
setTime();
setDay();

// Refreshes every second to make sure it's up to date
window.setInterval(setTime, 1000);
window.setInterval(setDay, 1000);
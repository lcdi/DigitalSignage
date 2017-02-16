/*
function makeTable(){
    
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++)
    {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }
    
    for (var i = 1; i < customers.length; i++)
    {
        row = table.insertRow(-1);
        for(var j = 0; j = columnCount; j++)
        {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
        }
    }
    
    var tableDiv = document.getElementById("tableDiv");
    tableDiv.innerHTML = "";
    tableDiv.appendChild(table);
}
*/



function makeTable(){

    $.ajax({
    [{"projectName":"Application Analysis","Hours":59},
    {"projectName":"Artifact Analysis","Hours":94},
    {"projectName":"Bluetooth Forensics","Hours":115},
    {"projectName":"Data Breach Analysis","Hours":32},
    {"projectName":"IoT Forensics","Hours":143},
    {"projectName":"Malware Analysis","Hours":93},
    {"projectName":"Micro Computers","Hours":44},
    {"projectName":"Mobile App Forensics","Hours":72},
    {"projectName":"Network Defense","Hours":64},
    {"projectName":"Tool Evaluation","Hours":81},
    {"projectName":"Total Hours","Hours":797}]
    data = $.parseJSON(data);
 });
    var body = $("body");
    var table = $("<table></table>");
    for (var i = 0; i < 11; i++)
    {
        var tr = $("<tr></tr>"); 
        var td1 = $("td id='data.projectName[i]></td>");
        var td2 = $("td id='data.Hours[i]></td>");

        for (var j = 0; j < 2; j++)
        {
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
        }
    }
    document.body.appendChild(table);
    
}
// Client ID: 822608562086-i7tvf2lr5nqq9h104fun2q49aj8fm3r6.apps.googleusercontent.com
// Client Secret: JFcvDvAqwHPfiDqw9_EKQh6H
// API Key: AIzaSyCSPeJgu9P85ZJ54Cm7c_omNN_vAV0Eu3I
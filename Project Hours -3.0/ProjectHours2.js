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

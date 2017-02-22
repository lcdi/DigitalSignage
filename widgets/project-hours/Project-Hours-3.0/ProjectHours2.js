$(function loadContent() {
    var data =
    {
    "content": ["Application Analysis", "Artifact Analysis", "Bluetooth Forensics",  "Data Breach Analysis", "IoT Forensics", "Malware Analysis", "Micro Computers", "Mobile App Forensics", "Network Defense", "Tool Evaluation", "Total Hours"],
    "name": ["Application_Analysis", "Artifact_Analysis", "Bluetooth_Forensics",  "Data_Breach_Analysis", "IoT_Forensics", "Malware_Analysis", "Micro_Computers", "Mobile_App_Forensics", "Network_Defense", "Tool_Evaluation", "TotalHours"],
    "hours": [59, 94, 115, 32, 143, 93, 44, 72, 64, 81, 797]
    };

    for (var i = 0; i < 11; i++)
    {
        var tr = $('<tr>');
        var td1 = $('<td id="' + data.name[i] + '">');
        var td2 = $('<td id="' + data.name[i] + '_Hours">');
        tr.append(
        td1.text(data.content[i]),
        td2.text(data.hours[i])).appendTo('thead');
        if (i % 2 == 0)
        {
            tr.addClass("evenStyling");
        }
        else {
            tr.addClass("oddStyling");
        }
    }

    if (tr.length > 11)
    {
        return false;
        console.log("Too many table rows.");
    }

});

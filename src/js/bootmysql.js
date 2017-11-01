$(document).ready(()=>{
    var $modal = $('#message');
    var tableIndex = -1;

    // Table info for bootstrap table generation and SQL query
    var tableArray = [
        {
            "table" : "weather",
            "numCols" : 2, 
            "col0" : { 
                "field" : "zip",
                "title" : "Zip",
                sortable: true
            },
            "col1" : {
                "field" : "country",
                "title" : "Country",
                sortable: true
            }
        },{
            "table" : "project_hours",
            "numCols" : 3,
            "col0" : {
                "field" : "name",
                "title" : "Project Name",
                sortable: true
            },
            "col1" : {
                "field" : "people",
                "title" : "People",
                sortable: true
            },
            "col2" : {
                "field" : "hours",
                "title" : "Hours",
                sortable: true
            }
        },{
            "table" : "student",
            "numCols" : 7,
            "col0" : {
                "field" : "id",
                "title" : "ID",
                sortable: true
            },
            "col1" : {
                "field" : "name",
                "title" : "Name",
                sortable: true
            },
            "col2" : {
                "field" : "major",
                "title" : "Major",
                sortable: true
            },
            "col3" : {
                "field" : "pos",
                "title" : "Position",
                sortable: true
            },
            "col4" : {
                "field" : "resofapp",
                "title" : "Application Reason",
                sortable: true
            },
            "col5" : {
                "field" : "knowledge",
                "title" : "Knowledge Gained",
                sortable: true
            },
            "col6" : {
                "field" : "picture",
                "title" : "Picture",
                sortable: true
            }
        }
    ];

    var operateEvents = {
        'click .remove':(e, value, row, index)=> {
            $.ajax({
                type: 'POST',
                url: '../tables/remove.php',
                data: row,
                success: (response)=>
                {
                    location.reload();
                },
                error: (e)=>
                {
                    $("#message .modal-body").html(e);
                    $modal.on('show.bs.modal',(e)=>{
                    }).modal("show"); 
                }
            });
        },
        'click .edit': (e, value, row, index)=> {
            $("#message .modal-body").html('<form id="edit_form" action="#"><div class="form-group"><label for="zip">Zip Code</label><input type="text" class="form-control" id="zip" name="zip" placeholder="'+row.zip+'"></div><label for="country">Country</label><input type="text" class="form-control" id="country" name="country" placeholder="'+row.country+'"></div><button type="submit" class="btn btn-primary">Submit</button></form>');
            $modal.on('show.bs.modal', ()=>{}).modal("show");
            $("#edit_form").submit((event)=>
            {
                const zip = $('#zip').val();
                const country = $("#country").val();
                //console.log(zip + " " + country);
                var data = {"zip":zip, "country":country, "oZip":row.zip, "oCountry":row.country};
                if(zip === "")
                {
                    data.zip = row.zip;
                }
                if(country === "")
                {
                    data.country = row.country;
                }
                $.ajax({
                    type: 'POST',
                    url: '../tables/edit.php',
                    data: data,
                    success:(response)=>
                    {
                        location.reload();
                        window.onbeforeunload = (e)=> {
                            // Turning off the event
                            e.preventDefault();
                        }
                    },
                    error: (e)=>
                    {
                        $("#message .modal-body").html(e);
                        $modal.on('show.bs.modal',(e)=>{
                        }).modal("show"); 
                    }
                })
            });
        }
    };

    function createTable(tableNumIndex)
    {
        $table = $('.display');
        // Grab the specific table that you are going to look at
        var table = tableArray[tableNumIndex];
    
        // Table data is the columns for bootstrap
        var tableData = [];
        for(var i = 0; i < table["numCols"]; i++)
        {
            //console.log(table["col"+i]);
            // Get the column information and push 
            // the JSON object to the array
            var col = table["col"+i];
            tableData.push(col);
        }

        //console.log(tableData);
    
        // Push the option buttons to the array
        tableData.push({
            title: 'options',
            field: 'Options',
            align: 'center',
            events: operateEvents,
            formatter: (response)=>
            {
                return [
                    '<button class="btn glyphicon glyphicon-trash remove"></button>',
                    '<button class="btn glyphicon glyphicon-pencil edit"></button>'
                ].join('');
            }
        });

        //Use this to determine the table used
        var data = {'table':table["table"]};
        $.ajax(
        {
            type: 'POST',
            url: '../php/tables/loadtable.php',
            data: data,
            success: (response)=>
            { 
                //console.log(response);
                $table.bootstrapTable({
                    contentType:'application/json',
                    data: JSON.parse(response),
                    search: true,
                    pagination: true,
                    buttonsClass: 'primary',
                    showFooter: true,
                    minimumCountColumns: 3,
                    columns: tableData,
                });
            }
        });
    }
    
    // Change this so that it works properly idk how but do it
    $(".clickme").click(function(e){
        // If there is already a bootstrap table
        const tableNum = $(this).attr('id');
        if(tableIndex != tableNum)
        {
            if($(".bootstrap-table").length)
            {
                // Replace it with the original container
                $(".bootstrap-table").replaceWith("<table id='table' class='display' data-show-columns='true' data-height='600'>" +
                "</table>" +
                "</div>");
                $(".clearfix").remove();
            }
            var buttonString = ".clickme#"+tableNum;
            $("#table_head").text($(".clickme#"+tableNum).text());
            tableIndex = tableNum;
            createTable(tableNum);
        }
    });
})
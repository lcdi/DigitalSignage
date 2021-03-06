$(document).ready(()=>{
    var $modal = $('#message');
    var tableName;
    $('.add').hide();

    var operateEvents = {
        'click .remove':(e, value, row, index)=> {
            row['table'] = tableName;
            row['function'] = 'remove';
            // Get the first row value and delete it
            for(var k in row)
            {
                $table.bootstrapTable('removeByUniqueId', row[k]);
                break;
            }
            $.ajax({
                type: 'POST',
                url: '../php/tablefunctions.php',
                data: row,
                error: (e)=>
                {
                    $("#message .modal-body").html(e);
                    $modal.on('show.bs.modal',(e)=>{
                    }).modal("show");
                }
            });
        },
        'click .edit': (e, value, row, index)=> {
            var modelHTML = '<form id="edit_form" action="#">';
            var tableColumns = $table.bootstrapTable("getVisibleColumns");
            // Assoc array of table column names - options
            var columnNames = new Array();
            // Assoc array of column => data from specific row
            var rowVars = new Array();

            // Get the column names and create an html string that has all of these available
            for(var i = 0; i < tableColumns.length - 1; i++)
            {
                var columnName = tableColumns[i]['field'];
                columnNames.push(columnName);
                rowVars[columnName] = row[columnName];

                modelHTML += '<div class="form-group"><label for="' + columnName +'">' + capitalizeFirstLetter(columnName) +
                    '</label><input type="text" class="form-control" id="' + columnName +
                    '" name="' + columnName + '" placeholder="' + row[columnName] + '"></div>';
            }

            // Add submit button to modal and show it
            modelHTML += '<button type="submit" class="btn btn-primary">Submit</button></form>';
            $("#message .modal-body").html(modelHTML);
            $modal.on('show.bs.modal', ()=>{}).modal("show");
            $("#edit_form").submit((event)=>
            {
                var data = {};
                var changeData = false;

                for(var k in rowVars)
                {
                    // Assign original database entries to o_ + field
                    data['o_'+k] = rowVars[k];
                    // Check if a value has been changed and if it has assign it to new otherwise to old
                    if($('#'+k).val() === "")
                    {
                        data[k] = rowVars[k];
                    }
                    else
                    {
                        changeData = true;
                        data[k] = $('#'+k).val();
                        $table.bootstrapTable('updateCell', {'index': index, 'field':k, 'value':$('#'+k).val()});
                    }
                }

                data['table'] = tableName;
                data['function'] = 'edit';
                
                // If any data is being changed change it otherwise don't
                if(!changeData)
                {
                    console.log("No change");
                    event.preventDefault();
                }
                else {
                    event.preventDefault();
                    
                    $.ajax({
                        type: 'POST',
                        url: '../php/tablefunctions.php',
                        data: data,
                        success:(response)=>
                        {
                            //$modal.modal("hide");
                            $("#message .modal-body").html(e);
                            $modal.on('show.bs.modal',(e)=>{
                            }).modal("show");
                        },
                        error: (e)=>
                        {
                            $("#message .modal-body").html(e);
                            $modal.on('show.bs.modal',(e)=>{
                            }).modal("show");
                        }
                    })
                }
            });
        }

    };

    var options = {
        title: 'options',
        field: 'options',
        align: 'center',
        events: operateEvents,
        formatter: (response)=>
        {
            return [
                '<button class="btn glyphicon glyphicon-trash remove"></button> ',
                '<button class="btn glyphicon glyphicon-pencil edit"></button>'
            ].join('');
        }
    };

    $('.tablebar').on('click', (e)=>
    {
        tableName = e.target.id; //get the name of the table
        var data = {'table':tableName}; //sets table name
        if($('#table_head').html() != e.target.innerHTML)
        {
            $('#table_head').text(e.target.innerHTML);
            if($('.bootstrap-table').length)
            {
                $(".bootstrap-table").replaceWith("<table id='table' class='display' data-show-columns='true' data-height='600'>" +
                "</table>" +
                "</div>");
                $(".clearfix").remove();
            }
            $table = $('.display');
            data['function'] = 'load';
            /********************************************
             * In order for the AJAX call properly,     *
             * the data variable must be sent as such...*
             *                                          *
             * data                                     *
             *   ->table                                *
             *   ->function                             *
            *********************************************/
            $.ajax(
                {
                    type: 'POST',
                    url: '../php/tablefunctions.php',
                    data: data,
                    success: (response)=>
                    {
                        console.log(response);
                        /********************************************
                         * the response from the server will be     *
                         * the following package of information     *
                         *                                          *
                         * repsonse                                 *
                         *   ->header                               *
                         *       (for each column)                  *
                         *       ->field                            *
                         *       ->title                            *
                         *       ->sortable                         *
                         *   ->info                                 *
                         *       (for each row)                     *    
                         *       ->row info                         *
                        *********************************************/
                        var r = JSON.parse(response);
                        /*
                         *  If the table is the student table
                         *  Check each rows picture if it's a direct link
                         *  If it's a direct link make it show as an image in HTML
                         */
                        if(tableName == 'student')
                        {
                            for(var i = 0; i < r.info.length; i++)
                            {
                                var subString = r.info[i]['picture'].slice(-4);
                                if(subString == ".jpg" || subString == ".png")
                                {
                                    r.info[i]['picture']='<img src="'+r.info[i]['picture']+'" class="img-responsive" width="100" height="100">';
                                }
                            }
                        }
                        r.header[r.header.length] = options;
                        // Capitalize the first letter of each title of each column
                        for(var i = 0; i < r.header.length; i++)
                        {
                            r.header[i]['title'] = capitalizeFirstLetter(r.header[i]['title']);
                        }
                        $('.add').show();
                        $table.bootstrapTable({
                            contentType:'application/json',
                            data: r.info,
                            search: true,
                            pagination: true,
                            buttonsClass: 'primary',
                            showFooter: true,
                            minimumCountColumns: 3,
                            columns: r.header,
                            uniqueId: r.header[0]['field']
                        });
                    }
                });
        }
    });

    $('.add').on('click', (e) =>
    {
        var modelHTML = '<form id="add_form" action="#">';
        var tableColumns = $table.bootstrapTable("getVisibleColumns");
        // Name of table columns
        var columnNames = new Array();

        // Add the text fields to modalHTML
        for(var i = 0; i < tableColumns.length - 1; i++)
        {
            var columnName = tableColumns[i]['field'];
            columnNames.push(columnName);

            modelHTML += '<div class="form-group"><label for="' + columnName + '">' + capitalizeFirstLetter(columnName) +
                '</label><input type="text" class="form-control" id="' + columnName + 
                '" name="' + columnName + '"></div>';
        }

        // Add button and error text to modal and show it
        modelHTML += '<button type="submit" class="btn btn-primary">Submit</button></form><p id="error_text"></p>';
        $("#message .modal-body").html(modelHTML);
        $modal.on('show.bs.modal', ()=>{}).modal("show");

        $("#add_form").submit((event)=>
        {
            var inputOkay = true;
            var addData = {};

            for(var i = 0; i < columnNames.length; i++)
            {
                if($("#"+columnNames[i]).val() === '')
                {
                    // A field is empty so it can't be submitted
                    inputOkay = false;
                    break;
                }
                else
                {
                    // Add fields that aren't empty to data array
                    addData[columnNames[i]] = $("#"+columnNames[i]).val();
                }
            }
            console.log(addData);
            if(inputOkay)
            {
                $table.bootstrapTable("append", [addData]);
                $('#error_text').text("");
                addData['function'] = 'add';
                addData['table'] = tableName;
                console.log(addData);
                $.ajax({
                    type: 'POST',
                    url: '../php/tablefunctions.php',
                    data: addData,
                    success: (response) =>
                    {
                        $modal.modal("hide");
                    },
                    error: (e) =>
                    {
                        $("#message .modal-body").html(e);
                        $modal.on('show.bs.modal',(e)=>{
                        }).modal("show");
                    }
                });
            }
            else
            {
                // Text to be shown on error
                $('#error_text').text("Please input all fields");
            }

            event.preventDefault();
        });
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
})

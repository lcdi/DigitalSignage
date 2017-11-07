$(document).ready(()=>{
    var $modal = $('#message');
    var tableName;

    var operateEvents = {
        'click .remove':(e, value, row, index)=> {
            $.ajax({
                type: 'POST',
                url: '../php/tables/remove.php',
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
            var modelHTML = '<form id="edit_form" action="#">';
            var tableColumns = $table.bootstrapTable("getVisibleColumns");
            var columnNames = new Array();
            // Probably don't need
            var rowVars = new Array();

            for(var i = 0; i < tableColumns.length - 1; i++)
            {
                var columnName = tableColumns[i]['field'];
                columnNames.push(columnName);
                rowVars[columnName] = row[columnName];

                modelHTML += '<div class="form-group"><label for="' + columnName +'">' + capitalizeFirstLetter(columnName) + 
                    '</label><input type="text" class="form-control" id="' + columnName + 
                    '" name="' + columnName + '" placeholder="' + row[columnName] + '"></div>';
            }

            modelHTML += '<button type="submit" class="btn btn-primary">Submit</button></form>';
            $("#message .modal-body").html(modelHTML);
            $modal.on('show.bs.modal', ()=>{}).modal("show");
            $("#edit_form").submit((event)=>
            {
                var data = {};
                var changeData = false;

                for(var k in rowVars)
                {
                    data['o_'+k] = rowVars[k];
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

                if(!changeData)
                {
                    console.log("No change");
                    event.preventDefault();
                }
                else {
                    event.preventDefault();
                    $.ajax({
                        type: 'POST',
                        url: '../php/tables/edit.php',
                        data: data,
                        success:(response)=>
                        {
                            //location.reload();
                            $modal.modal("hide");
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
        tableName = e.target.id;
        var data = {'table':tableName};
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
            $.ajax(
                {
                    type: 'POST',
                    url: '../php/tables/loadtable.php',
                    data: data,
                    success: (response)=>
                    { 
                        var r = JSON.parse(response);
                        r.header[r.header.length] = options;
                        $table.bootstrapTable({
                            contentType:'application/json',
                            data: r.info,
                            search: true,
                            pagination: true,
                            buttonsClass: 'primary',
                            showFooter: true,
                            minimumCountColumns: 3,
                            columns: r.header
                        });
                    }
                });
        }
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
})
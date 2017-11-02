$(document).ready(()=>{
    var $modal = $('#message');

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
                //MAKE DYNAMIC PLS
                const zip = $('#zip').val();
                const country = $("#country").val();
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
        var data = {'table':e.target.id};
        if($('#table_head').html() != e.target.innerHTML)
        {
            console.log($('#table_head').html());
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
                    url: '../tables/loadtable.php',
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
    })
})
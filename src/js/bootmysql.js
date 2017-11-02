$(document).ready(()=>{
    var $table = $('.display');
    var $modal = $('#message');
    var weather = [{
        field: 'zip',
        title: 'zip',
        sortable: true,
    },{
        field: 'country',
        title: 'country',
        sortable: true,
    },{
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
    }];
    var project_hours = [{
        field: 'name',
        title: 'Project Name',
        sortable: true,
    },{
        field: 'people',
        title: 'People',
        sortable: true,
    },{
        field: 'hours',
        title: 'Hours',
        sortable: true,
    },{
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
    }];
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
                console.log(zip + " " + country);
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
    var data = {'table':'project_hours'};
    $.ajax(
    {
        type: 'POST',
        url: 'loadtable.php',
        data: data,
        success: (response)=>
        { 
            console.log(response);
            $("#message .modal-body").html(response);
            $modal.on('show.bs.modal',(response)=>{
            }).modal("show"); 
            $table.bootstrapTable({
                contentType:'application/json',
                data: JSON.parse(response),
                search: true,
                pagination: true,
                buttonsClass: 'primary',
                showFooter: true,
                minimumCountColumns: 3,
                columns: project_hours,
            });
        }});

})
            
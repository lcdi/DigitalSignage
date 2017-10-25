$(document).ready(()=>{
    var $table = $('.display');
    var $modal = $('#message');
    var operateEvents = {
        'click .remove':function(e, value, row, index) {
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
        'click .edit': function(e, value, row, index) {
            $("#message .modal-body").html('<form id="edit_form" action="#"><div class="form-group"><label for="zip">Zip Code</label><input type="text" class="form-control" id="zip" name="zip" placeholder="'+row.zip+'"></div><label for="country">Country</label><input type="text" class="form-control" id="country" name="country" placeholder="'+row.country+'"></div><button type="submit" class="btn btn-primary">Submit</button></form>');
            $modal.on('show.bs.modal', ()=>{}).modal("show");
            $("#edit_form").submit((event)=>
            {
                const zip = document.getElementById("zip").value;
                const country = document.getElementById("country").value;

                var data = {"zip":zip, "country":country, "oZip":row.zip, "oCountry":row.country};
                if(zip === "")
                {
                    data.zip = row.zip;
                }
                if(country === "")
                {
                    data.country = row.country;
                }
                event.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: '../tables/edit.php',
                    data: data,
                    success:(response)=>
                    {
                        location.reload();
                        window.onbeforeunload = function(e) {
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
    
            $table.bootstrapTable({
                url: 'loadtable.php', 
                search: true,
                pagination: true,
                buttonsClass: 'primary',
                showFooter: true,
                minimumCountColumns: 2,
                columns: [{
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
                    formatter: ()=>
                    {
                        return [
                            '<button class="btn glyphicon glyphicon-trash remove"></button> ',
                            '<button class="btn glyphicon glyphicon-pencil edit"></button>'
                        ].join('');
                    }
                }],
            });

        });
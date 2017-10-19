$(document).ready(()=>{
    var $table = $('.display');
    var $modal = $('#message');
    
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
                    title: 'remove',
                    field: 'remove',
                    formatter: ()=>
                    {
                        return '<button class="btn glyphicon glyphicon-trash remove"></button>'
                    },
                    
            
                },{
                    title: 'edit',
                    field: 'edit',
                    formatter: ()=>
                    {
                        return '<button class="btn glyphicon glyphicon-pencil edit"></button>'
                    },
                }],
                onClickCell:(field, value, row, $element)=>
                {
                    console.log(row.zip);
                    console.log(field);
                    if(field === 'remove')
                    {
                        $('.remove').on('click', ()=>{
                            console.log(row);
                            $.ajax({
                                type: 'POST',
                                url: '../tables/remove.php',
                                data: row,
                                success: (response)=>
                                {
                                    location.reload();
                                    //console.log(response);
                                },
                                error: (e)=>
                                {
                                    $("#message .modal-body").html(e);
                                    $modal.on('show.bs.modal',(e)=>{
                                    }).modal("show"); 
                                }
    
                            });
                        });
                        
                    }
                    if(field === 'edit')
                    {
                        $('.edit').on('click', ()=>{
                            
                            $("#message .modal-body").html('<form id="edit_form" action="#"><div class="form-group"><label for="zip">Zip Code</label><input type="text" class="form-control" id="zip" name="zip" placeholder="'+row.zip+'"></div><label for="country">Country</label><input type="text" class="form-control" id="country" name="country" placeholder="'+row.country+'"></div><button type="submit" class="btn btn-primary">Submit</button></form>');
                           
                            $modal.on('show.bs.modal', ()=>{}).modal("show");
                            $("#edit_form").submit((event)=>
                            {
                                console.log(event);
                                event.preventDefault();
                                $.ajax({
                                    type: 'POST',
                                    url: '../tables/edit.php',
                                    data: row,
                                    success:(response)=>
                                    {
                                        ///location.reload();
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
                            })
                        })
                    }
                }
            });
        
        });
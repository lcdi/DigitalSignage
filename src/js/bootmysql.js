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
                    row.field = field;
                    console.log(row);
                    console.log(field);
                    if(field === 'remove')
                    {
                        $('.remove').on('click', ()=>{
                            console.log(row);
                            $.ajax({
                                type: 'POST',
                                url: 'bootmysql.php',
                                data: row,
                                success: (response)=>
                                {
                                    $("#message .modal-body").html(response);
                                    $modal.on('show.bs.modal',(response)=>{
                                    }).modal("show");
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
                            
                            $("#message .modal-body").html('<form id="edit_form" action="edit.php" method="post"><div class="form-group"><label for="zip">Zip Code</label><input type="text" class="form-control" id="zip" name="zip" placeholder="'+row.zip+'"></div><label for="country">Country</label><input type="text" class="form-control" id="country" name="country" placeholder="'+row.country+'"></div><div><input type="hidden" name="key" value="'+row.zip+'"><input type="hidden" name="field" value="'+field+'"></div><button type="submit" class="btn btn-primary">Submit</button></form>');
                           
                            $modal.on('show.bs.modal', ()=>{}).modal("show");
                            $("#edit_form").on('submit',(event)=>{
                                $("#message .modal-body").html(e);
                                $modal.on('show.bs.modal',(e)=>{
                                }).modal("show");
                            });
                        })
                    }
                }
            });
        
        });
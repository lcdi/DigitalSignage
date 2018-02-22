<?php
//logindex.php
$query = "SELECT * FROM student ORDER BY id DESC";
$result = mysqli_query($connect, $query);
 ?>
<!DOCTYPE html>
<html>
 <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
 </head>
 <body>
  <br /><br />
  <div class="container" style="width:700px;">
   <h3 align="center">Edit Student List Page</h3>
   <br />
   <div class="table-responsive">
    <div align="right">
     <button type="button" name="add" id="add" data-toggle="modal" data-target="#add_data_Modal" class="btn btn-warning">Add</button>
    </div>
    <br />
    <div id="student_table">
     <table class="table table-bordered">
      <tr>
       <th width="70%">Student Name</th>
       <th width="15%">Edit</th>
       <th width="15%">View</th>
      </tr>
      <?php
      while($row = mysqli_fetch_array($result))
      {
      ?>
      <tr>
       <td><?php echo $row["name"]; ?></td>
       <td><input type="button" name="edit" value="Edit" id="<?php echo $row["id"]; ?>" class="btn btn-info btn-xs edit_data" /></td>
       <td><input type="button" name="eiew" value="View" id="<?php echo $row["id"]; ?>" class="btn btn-info btn-xs view_data" /></td>
      </tr>
      <?php
      }
      ?>
     </table>
    </div>
   </div>
  </div>
 </body>
</html>
<div id="dataModal" class="modal fade">
      <div class="modal-dialog">
           <div class="modal-content">
                <div class="modal-header">
                     <button type="button" class="close" data-dismiss="modal">&times;</button>
                     <h4 class="modal-title">Student Details</h4>
                </div>
                <div class="modal-body" id="student_detail">
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
           </div>
      </div>
 </div>
<div id="add_data_Modal" class="modal fade">
 <div class="modal-dialog">
  <div class="modal-content">
   <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal">&times;</button>
    <h4 class="modal-title">Student List Modal</h4>
   </div>
   <div class="modal-body">
    <form method="post" id="insert_form">
      <label>Enter Student ID</label>
      <input type="text" name="student_id" id="student_id" class="form-control" />
      <br />
     <label>Enter Student Name</label>
     <input type="text" name="name" id="name" class="form-control" />
     <br />
     <label>Enter Student Major</label>
     <input type="text" name="major" id="major" class="form-control" />
     <br />
     <label>Enter Position</label>
      <input type="text" name="pos" id="pos" class="form-control" />
     <br />
     <label>Enter Reason for Applying</label>
     <textarea name="resofapp" id="resofapp" class="form-control"></textarea>
     <br />
     <label>Enter Knowledge Gained</label>
     <textarea name="knowledge" id="knowledge" class="form-control"></textarea>
     <br />
     <!-- <input type="hidden" name="student_id" id="student_id" /> -->
     <input type="submit" name="insert" id="insert" value="Insert" class="btn btn-success" />

    </form>
   </div>
   <div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
   </div>
  </div>
 </div>
</div>

<div class="modal fade" id="message" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

<script>
//ALL OF MY PROBLEMS EXIST IN THIS AGGRAVATING CODE
/* According to YT, this code will fix
I solve this problem
check Modal dismiss
and reset form
                $('#ModalName').on('hidden.bs.modal', function(){
                $('#insert_form')[0].reset();
            });﻿
            $('#edit').on('hidden.bs.modal', function()
            {
            $('#insert_form')[0].reset();
            });﻿
            */
$(document).ready(function(){
  $('#add').click(function(){
           $('#insert').val("Insert");
           $('#insert_form')[0].reset();
           //insert form 0 reset just makes everything in the form be blank
      });
      $(document).on('click', '.edit_data', function(){
           var student_id = $(this).attr("id");
           $.ajax({
                url:"fetch.php",
                method:"POST",
                data:{student_id:student_id},
                dataType:"json",
                success:function(data){
                     $('#name').val(data.name);
                     $('#major').val(data.major);
                     $('#pos').val(data.pos);
                     $('#resofapp').val(data.resofapp);
                     $('#knowledge').val(data.knowledge);
                     $('#student_id').val(data.id);
                     $('#insert').val("Update");
                     $('#add_data_Modal').modal('show');
                }
           });
      });

      // IGNORE (Requiring code)
 $('#insert_form').on("submit", function(event){
  event.preventDefault();
  if($('#name').val() == "")
  {
   alert("Name is required");
  }
  else if($('#major').val() == '')
  {
   alert("Major is required");
  }
  else if($('#resofapp').val() == '')
  {
   alert("Reason is required");
  }
// ^IGNORE
//Below code is adding
  else
  {
    console.log($('#insert_form').serialize());
   $.ajax({
    url:"insert.php",
    method:"POST",
    data:$('#insert_form').serialize(),
    beforeSend:function(){
     $('#insert').val("Insert");
    },
    success:function(data){
      console.log(data);
      $("#message .modal-body").html(data);
      $("#message").on('show.bs.modal',(data)=>{}).modal("show");
     $('#insert_form')[0].reset();
     $('#add_data_Modal').modal('hide');
     //$('#student_table').html(data);
    }
   });
  }
 });

//IGNORE (View data code)
 $(document).on('click', '.view_data', function(){
  //$('#dataModal').modal();
  var student_id = $(this).attr("id");
  if(student_id != '')
  {
  $.ajax({
   url:"select.php",
   method:"POST",
   data:{student_id:student_id},
   success:function(data){
    $('#student_detail').html(data);
    $('#dataModal').modal('show');
   }
  });
}
 });
});
 </script>

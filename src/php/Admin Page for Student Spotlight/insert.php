<?php
//insert.php
$connect = mysqli_connect("192.168.10.140", "interns", "lcdirocks", "digital_signage");
if(!empty($_POST))
{
 $output = '';
 $message = '';
    $id = mysqli_real_escape_string($connect, $_POST["student_id"]);
    $name = mysqli_real_escape_string($connect, $_POST["name"]);
    $major = mysqli_real_escape_string($connect, $_POST["major"]);
    $pos = mysqli_real_escape_string($connect, $_POST["pos"]);
    $resofapp = mysqli_real_escape_string($connect, $_POST["resofapp"]);
    $knowledge = mysqli_real_escape_string($connect, $_POST["knowledge"]);
  // student_id is causing problems, line 14 (Unidentified index) ( other id delcaration :  WHERE id='".$_POST["student_id"]."'"; )
  if($_POST["student_id"] != '')
  {
    $query = "
           UPDATE student
           SET name='$name',
           major='$major',
           pos='$pos',
           resofapp = '$resofapp',
           knowledge = '$knowledge'
           WHERE id='".$_POST["student_id"]."'";
           $message = 'Data Updated';
  }
  //Above code is being skipped, causing a duplication, more similar to Add.  This means the database is not being updated, but rather adding an updated version while current version still exists.

  else{
    $query = "
    INSERT INTO student(student_id, name, major, pos, resofapp, knowledge)
     VALUES('$id','$name', '$major', '$pos', '$resofapp', '$knowledge')
    ";
    $message = 'Data Inserted';
  }
    if(mysqli_query($connect, $query))
    {
     $output .= '<label class="text-success"> ' . $message . ' </label>';
     $select_query = "SELECT * FROM student ORDER BY id DESC";
     $result = mysqli_query($connect, $select_query);
     $output .= '
      <table class="table table-bordered">
                    <tr>
                         <th width="70%">Student Name</th>
                         <th width="15%">Edit</th>
                         <th width="15%">View</th>
                    </tr>

     ';
     while($row = mysqli_fetch_array($result))
     {
      $output .= '
       <tr>
                         <td>' . $row["name"] . '</td>
                         <td><input type="button" name="edit" value="Edit" id="' . $row["id"] . '" class="btn btn-info btn-xs edit_data" /></td>
                         <td><input type="button" name="view" value="View" id="' . $row["id"] . '" class="btn btn-info btn-xs view_data" /></td>
                    </tr>
      ';
     }
     $output .= '</table>';
    }
    echo $output;
}
?>

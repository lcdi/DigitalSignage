<?php
 if(isset($_POST["student_id"]))
 {
      $output = '';
      $connect = mysqli_connect("192.168.10.140", "interns", "lcdirocks", "digital_signage");
      $query = "SELECT * FROM student WHERE id = '".$_POST["student_id"]."'";
      $result = mysqli_query($connect, $query);
      $output .= '
      <div class="table-responsive">
           <table class="table table-bordered">';
      while($row = mysqli_fetch_array($result))
      {
           $output .= '
                <tr>
                     <td width="30%"><label>ID</label></td>
                     <td width="70%">'.$row["id"].'</td>
                </tr>
                <tr>
                     <td width="30%"><label>Name</label></td>
                     <td width="70%">'.$row["name"].'</td>
                </tr>
                <tr>
                     <td width="30%"><label>Major</label></td>
                     <td width="70%">'.$row["major"].'</td>
                </tr>
                <tr>
                     <td width="30%"><label>Position</label></td>
                     <td width="70%">'.$row["pos"].'</td>
                </tr>
                <tr>
                     <td width="30%"><label>Reason for Applying</label></td>
                     <td width="70%">'.$row["resofapp"].'</td>
                </tr>
                <tr>
                     <td width="30%"><label>Knowledge Gained</label></td>
                     <td width="70%">'.$row["knowledge"].' </td>
                </tr>
                ';
      }
      $output .= '
          </table>
        </div>
        ';
      echo $output;
 }
 ?>

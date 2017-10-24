<?php
 //fetch.php
 $connect = mysqli_connect("192.168.10.140", "interns", "lcdirocks", "digital_signage");
 if(isset($_POST["student_id"]))
 {
      $query = "SELECT * FROM student WHERE id = '".$_POST["student_id"]."'";
      $result = mysqli_query($connect, $query);
      $row = mysqli_fetch_array($result);
      echo json_encode($row);
 }
 ?>

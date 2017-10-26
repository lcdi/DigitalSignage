<?php
    require_once 'login.php';
    require_once '../php/sanitize.php';
    $conn = new mysqli($hn,$un,$pw,$db);
    $response = "";
    if($conn->connect_error) die($conn->connect_error);
    
    if (isset($_POST['zip']))
    {
        $zip = santitizeMySQL($conn, $_POST['zip']);
        $response += $zip;
        $query = "DELETE FROM weather WHERE zip='$zip'";
        $result = $conn->query($query);
        
    }else
    {
        die("Query Fail\n");
    }
    $conn->close();
    echo("Successful Query!\n");
?>
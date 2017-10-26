<?php
    require_once 'login.php';
    require_once '../php/sanitize.php';
    $conn = new mysqli($hn,$un,$pw,$db);
    $response = "";
    if($conn->connect_error) die($conn->connect_error);
    
    if (isset($_POST['zip']) && isset($_POST['country']))
    {
        $zip = santitizeMySQL($conn, $_POST['zip']);
        $country = santitizeMySQL($conn, $_POST['country']);
        $response += $zip;
        $query = "DELETE FROM weather WHERE zip='$zip AND WHERE country='$country'";
        $result = $conn->query($query);
        
    }else
    {
        die("Query Fail\n" . $_POST['zip']);
    }
    $conn->close();
    echo("Successful Query!\n");
?>
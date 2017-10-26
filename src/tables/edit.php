<?php
    require_once 'login.php';
    require_once '../php/sanitize.php';
    $conn = new mysqli($hn,$un,$pw,$db);
    if($conn->connect_error) die($conn->connect_error);
    
    if (isset($_POST['zip']) && isset($_POST['country']) &&
        isset($_POST['oZip']) && isset($_POST['oCountry']))
    {
        $zip = santitizeMySQL($conn, $_POST['zip']);
        $country = santitizeMySQL($conn, $_POST['country']);
        $oZip = $_POST['oZip'];
        $oCountry = $_POST['oCountry'];
        $query = "UPDATE weather SET zip='$zip', country='$country' WHERE zip LIKE '$oZip' AND country LIKE '$oCountry'";
        $result = $conn->query($query);
        
    }else
    {
        die("Query Fail\n" . $_POST['zip']);
    }
    $conn->close();
    echo("Successful Query!\n");
?>
<?php
require "../login.php";
require "../sanitize.php";

$un = $_POST["un"];
$pw = $_POST["pw"];

if($un=="" || $pw=="")
{
    die("Username and password are required");
}

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error)
{
    die("Failed to connect to database");
}

$stmt = $conn->prepare("SELECT passwordhash FROM users WHERE username LIKE ?");
$stmt->bind_param("s", $un);

$un = santitizeMySQL($conn, $un);
$pw = santitizeMySQL($conn, $pw);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        if(password_verify($pw, $row["passwordhash"]))
        {
            //echo ".html";
            //TO CHANGE TO WHATEVER THE LANDING PAGE WILL BE
        }
        else{
            echo "Login failed";
        }
    }
} else{
    echo "Login failed";
}

?>
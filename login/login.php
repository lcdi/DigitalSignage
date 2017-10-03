<?php

function sanitizeString($string)
{
    $string = htmlspecialchars($string);
    $string = stripslashes($string);
    $string = strip_tags($string);
    return $string;
}

function sanitizeSQL($connection, $string)
{
    $string = $connection->real_escape_string($string);
    $string = sanitizeString($string);
    return $string;
}

$un = $_POST["un"];
$pw = $_POST["pw"];

if($un=="" || $pw=="")
{
    die("Username and password are required");
}

$host = "localhost";
$user = "root";
$pass = "password9378";
$db = "test";

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error)
{
    die("Failed to connect to database");
}

$stmt = $conn->prepare("SELECT passwordhash FROM users WHERE username LIKE ?");
$stmt->bind_param("s", $un);



//$un = sanitizeSQL($conn, $un);
//$pw = sanitizeSQL($conn, $pw);
//echo "test";
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        if(password_verify($pw, $row["passwordhash"]))
        {
            echo "otherpage.html";
            //echo "Login successful";
        }
        else{
            echo "Login failed";
        }
    }
} else{
    echo "No username";
}

?>
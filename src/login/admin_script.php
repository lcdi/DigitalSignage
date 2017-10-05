<?php
require "../php/login.php";
require "../php/sanitize.php";

$un = $_POST["un"];
$pw = $_POST["pw"];

//If either are empty quit program
if($un=="" || $pw=="")
{
    die("Username and password are required");
}

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error)
{
    die("Failed to connect to database");
}

//The SQL will get the passwordhash associated with un from usernames
$stmt = $conn->prepare("SELECT passwordhash FROM users WHERE username LIKE ?");
$stmt->bind_param("s", $un);

$un = santitizeMySQL($conn, $un);
$pw = santitizeMySQL($conn, $pw);
$stmt->execute();
$result = $stmt->get_result();

//Looks at the passwordhashes returned and checks if the given password is the reverse hash
if($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        if(password_verify($pw, $row["passwordhash"]))
        {
            //location of landing page relative to the HTML file
            echo "src/landing/adminlanding.html";
        }
        else{
            echo "Login failed";
        }
    }
} else{
    echo "Login failed";
}

?>
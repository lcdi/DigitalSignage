<?php

require "login.php";
require "sanitize.php";

$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error)
{
    die("connection failed");
}

$user = $_POST["un"];
$pass = $_POST["pw"];

$user = santitizeMySQL($conn, $user);
$pass = santitizeMySQL($conn, $pass);

$pass = password_hash($pass, PASSWORD_DEFAULT);

$stmt = $conn->prepare("SELECT username FROM users WHERE username LIKE ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows < 1)
{
    $sql = "INSERT INTO users VALUES('$user', '$pass')";
    $conn->query($sql);
}
?>
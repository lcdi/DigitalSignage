<?php

require_once("constants.php");
require_once("DSConn.php");

$global = array (
    "sql" => array(
        "host" => DS_SERVER_HOST,
        "username" => DS_SERVER_USER,
        "password" => DS_SERVER_PASS,
        "database" => DS_SERVER_DATABASE
    )
);

function redirect_to($url)
{
    header("Location: $url");
    die();
}


session_start();
?>
<?php

require_once ("../php/global.php");
require_once ("../php/user_management.php");

if(!isset($_SESSION['user']))
{
    redirect_to("../../index.php?to=src/html/adminlanding.php");
}
?>

<!DOCTYPE html>
<html>
    <title>Admin Page</title>
    <head>
        <link rel="stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/general.css">
    </head>

<body>
    <div class="col-sm-2 sidenav hidden-xs">
        <h2><img class="img-thumbnail" src="https://lcdiblog.champlain.edu/wp-content/uploads/sites/11/2013/11/LCDI.png"></h2>
        <ul class="nav nav-pills nav-stacked">
            <li class="active"><a href="#">Dashboard</a></li>
            <li><a href="tables.php">View Tables</a></li>
            <li><a href="user_page.php">Manage Users</a></li>
            <!-- Add to sidebar here -->
        </ul><br>
</div><br>
</body>
</html>
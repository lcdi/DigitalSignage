<?php

require_once ("../php/global.php");

if(!isset($_SESSION['user']))
{
    redirect_to("../../index.php?to=src/landing/adminlanding.php");
}

?>

<!DOCTYPE html>
<html>
    <title>Admin Page</title>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.js"></script>
        <script src="adminlanding.js"></script>
        <link rel="stylesheet" href = "../css/bootstrap.min.css">
        <link rel="stylesheet" href="adminlanding.css">
    </head>


<body>
    <div class="col-md-3 sidenav hidden-xs">
        <ul class="nav nav-pills flex-column">
            <h2>
                <img class="img-thumbnail" src="https://lcdiblog.champlain.edu/wp-content/uploads/sites/11/2013/11/LCDI.png">
            </h2>
            <li class>
                <a class="nav-link active" href="#!">Landing Page</a>    
            </li> 
            <li class>
                <a class="nav-link" href="#!">Display Databases</a>
            </li>
            <li class>
                <a class="nav-link" href="#!">Add to Databases</a>
            </li>
        </ul>
    </div>
        
    <div class="col-md-2 main">
        <form>
            <label for="inputUsername">Username</label>
            <input type="username" placeholder="Enter username" id="uname" class="form-control">
            <label for="inputPassword">Password</label>
            <input type="password" placeholder="Enter password" id="psw" class="form-control">
            <button type="button" class="btn btn-lg btn-primary btn-block" id="createUser">Create User</button>
        </form>
    </div>
    
</body>
   

</html>
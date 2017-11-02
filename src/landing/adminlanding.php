<?php

require_once ("../php/global.php");
require_once ("../php/user_management.php");

if(!isset($_SESSION['user']))
{
    redirect_to("../../index.php?to=src/landing/adminlanding.php");
}

if(isset($_POST['submit']))
{
    $char = $_POST['submit'];

    switch($char)
    {
        // Add user
        case 'a':
            if(!empty($_POST['createUname']))
            {
                $un = $_POST['createUname'];
                if(!empty($_POST['createPsw']))
                {
                    $pw = $_POST['createPsw'];
                    createUser($un, $pw);
                }
                else
                {
                    createUser($un);
                }
            }
            break;
        // Change password
        case 'b':
            if(!(empty($_POST['changeUname']) || empty($_POST['changeCurrentPsw']) 
                || empty($_POST['changeNewPsw1']) || empty($_POST['changeNewPsw2'])))
            {
                $un = $_POST['changeUname'];
                $currentPw = $_POST['changeCurrentPsw'];
                $newPw1 = $_POST['changeNewPsw1'];
                $newPw2 = $_POST['changeNewPsw2'];

                changePassword($un, $currentPw, $newPw1, $newPw2);
            }
            break;
        // Reset password
        case 'c':
            if(!empty($_POST['resetUname']))
            {
                resetPassword($_POST['resetUname']);
            }
            break;
        // Remove user
        case 'd':
            if(!empty($_POST['removeUname']))
            {
                removeUser($_POST['removeUname']);
            }
            break;
        default:
            break;
    }
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
        
    <!-- Adding users-->
    <div class="col-md-2 main">
        <form method="POST">
            <label for="inputUsername">Username</label>
            <input type="username" placeholder="Enter username" name="createUname" class="form-control">
            <label for="inputPassword">Password</label>
            <input type="password" placeholder="Enter password" name="createPsw" class="form-control">
            <button type="submit" class="btn btn-lg btn-primary btn-block" name="submit" value='a'>Create User</button>
        </form>
    </div>

    <!-- Changing passwords -->
    <div class="col-md-2 main">
        <form method="POST">
        <label for="inputUsername">Username</label>
        <input type="username" placeholder="Enter username" name="changeUname" class="form-control">
        <label for="oldPassword">Current password</label>
        <input type="password" placeholder="Enter password" name="changeCurrentPsw" class="form-control">
        <label for="newPassword1">New password</label>
        <input type="password" placeholder="Enter new password" name="changeNewPsw1" class="form-control">
        <label for"newPassword2">New password again</label>
        <input type="password" placeholder="Enter new password again" name="changeNewPsw2" class="form-control">
        <button type="submit" class="btn btn-lg btn-primary btn-block" name="submit" value='b'>Change Password</button>
        </form>
    </div>

    <!-- Resetting Password -->
    <div class="col-md-2 main">
        <form method="POST">
            <label for="inputUsername">Username</label>
            <input type="username" placeholder="Enter username" name="resetUname" class="form-control">
            <button type="submit" class="btn btn-lg btn-primary btn-block" name="submit" value='c'>Reset Password</button>
        </form>
    </div>

    <!-- Remove User -->
    <div class="col-md-2 main">
        <form method="POST">
            <label for="inputUsername">Username</label>
            <input type="username" placeholder="Enter username" name="removeUname" class="form-control">
            <button type="submit" class="btn btn-lg btn-primary btn-block" name="submit" value='d'>Remove User</button>
        </form>
    </div>
    
</body>
</html>
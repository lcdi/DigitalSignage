<?php
require_once("../php/global.php");
require_once("../php/user_management.php");
if(!isset($_SESSION['user']))
{
    redirect_to("../../index.php?to=src/html/user_page.php");
}

if(!isset($response))
{
    $response="";
}

if(isset($_POST['createUser']))
{
    if(!empty($_POST['uname']))
    {
        $un = $_POST['uname'];
        if(!empty($_POST['psw']))
        {
            $pw = $_POST['psw'];
            $user_response = createUser($un, $pw);
        }
        else
        {
            $user_response = createUser($un);
        }

        if(!$user_response['success'])
        {
            $response = $user_response['error'];
        }
    }
    else
    {
        $response = 'Please input a username';
    }
}
else if(isset($_POST['removeUser']))
{
    if(!empty($_POST['uname']))
    {
        $user_response = removeUser($_POST['uname']);
        if(!$user_response['success'])
        {
            $response = $user_response['error'];
        }
    }
    else 
    {
        $response = 'Please input a username';
    }
}
else if(isset($_POST['resetPassword']))
{
    if(!empty($_POST['uname']))
    {
        $user_response = resetPassword($_POST['uname']);

        if(!$user_response['success'])
        {
            $response = $user_response['error'];
        }
    }
    else
    {
        $response = 'Please input a username';
    }

}
else if(isset($_POST['changePassword']))
{
    if(!(empty($_POST['uname']) || empty($_POST['psw']) || empty($_POST['npsw1']) || empty($_POST['npsw2'])))
    {
        $user_response = changePassword($_POST['uname'], $_POST['psw'], $_POST['npsw1'], $_POST['npsw2']);

        if(!$user_response['success'])
        {
            $response = $user_response['error'];
        }
    }
    else
    {
        $response = 'Please input all fields';
    }
}

?>

<!DOCTYPE html>
<html>
    <title>User Management</title>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/general.css">
        <link rel="stylesheet" href="../css/user_page.css">
    </head>

    <body>
        <div class="col-sm-2 sidenav hiddex-xs">
            <h2><img class="img-thumbnail" src="https://lcdiblog.champlain.edu/wp-content/uploads/sites/11/2013/11/LCDI.png"></h2>
            <ul class="nav nav-pills nav-stacked">
                <li><a href="adminlanding.php">Dashboard</a></li>
                <li><a href="tables.php">View Tables</a></li>
                <li class="active"><a href="#">Manage Users</a></li>
                <!-- Add to sidebar here -->
        </div>

        <div class="col-sm-10" id="parent">
            <form id="user_form" method="POST" action="">
                <label for="inputUsername"><b>Username</b></label>
                <input type="username" placeholder="Enter username" name="uname" class="form-control" value="">

                <label for="inputPassword"><b>Password</b></label>
                <input type="password" placeholder="Enter password" name="psw" class="form-control">

                <label for="newPassword1"><b>New Password</b></label>
                <input type="password" placeholder="Enter new password" name="npsw1" class="form-control">

                <label for="newPassword2"><b></b>New Password Again</label>
                <input type="password" placeholder="Enter new password again" name="npsw2" class="form-control">
                
                <div class="button-container">
                    <button type="submit" class="btn btn-primary" name="createUser">Create User</button>
                    <button type="submit" class="btn btn-primary" name="removeUser">Remove User</button>
                    <button type="submit" class="btn btn-primary" name="resetPassword">Reset Password</button>
                    <button type="submit" class="btn btn-primary" name="changePassword">Change Password</button>
                </div>
                <p id="error_text"><?php echo $response?></p>
            </form>
        </div> 
    </body>
</html>
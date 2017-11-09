<?php
require_once("src/php/global.php");
require_once("src/php/user_management.php");

if(!isset($reponse))
{
    $response = '';
}

if(!(empty($_POST['uname']) || empty($_POST['psw'])))
{
    $un = $_POST['uname'];
    $pw = $_POST['psw'];
    
    if(authenticate($un, $pw))
    {
        $_SESSION['user'] = $un;
        if(isset($_GET['to']))
        {
            redirect_to($_GET['to']);
        }
        else{
            redirect_to("src/html/adminlanding.php");
        }
    }
    else
    {
        $response = "Username or password incorrect";
    }
}
?>

<!DOCTYPE html>
<html>
<head> 
    <link rel = "stylesheet" href = "src\css\bootstrap.min.css">
    <link rel = "stylesheet" href = "styles.css">

</head>

<body class="admin">
    <div class="form-signin">
        <form method="POST" action="">

        <h2 class="signin-heading">Please Sign In</h2>
        <label for="inputUsername"><b>Username</b></label>
        <input type="username" placeholder="Enter Username" name="uname" class="form-control" value="<?php echo isset($_POST['uname']) ? $_POST['uname'] : ''?>"autofocus>

        <label for="inputPassword"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" class="form-control">
        <button type="submit" class="btn btn-lg btn-primary btn-block" id="login">Login</button>
        <p id="responseText"><?php echo $response?></p>

        </form>
    </div>
</body>
</html>
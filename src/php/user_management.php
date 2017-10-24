<?php
require_once("global.php");

// Changes password after verification
function changePassword($username, $oldPassword, $newPassword1, $newPassword2)
{
    $sql = new DSConn();
    $result = array("success"=>false);

    // Verify passes are same and account is right
    if($newPassword1 !== $newPassword2 || !(authenticate($username, $oldPassword)))
    {
        $result["error"] = "Passwords don't match";
        if(!(authenticate($username, $oldPassword)))
            $result['error'] = "Authentication error";
        return $result;
    }

    $newPassword1 = password_hash($newPassword1, PASSWORD_DEFAULT);
    $data = array("passwordhash"=>$newPassword1);
    $sql->update("users", $data, "username LIKE '$username'");
    $result['success'] = true;
    return $result;
}

// Reset password of given username to default password
function resetPassword($username)
{
    $sql = new DSConn();
    $result = array('success'=>true);
    $password = DEFAULT_PASSWORD;
    $password = password_hash($password, PASSWORD_DEFAULT);

    if(userExist($username))
    {
         $data = array("passwordhash"=>$password);
         $sql->update("users", $data,"username LIKE '$username'");
         $result['success'] = true;
    }
    else
    {
        $result['error'] = 'User doesn\'t exist';
    }
    return $result;
}

// Creates a user with a given username, no dupes
function createUser($username, $password = false)
{
    $sql = new DSConn();
    $result = array('success'=>false);
    
    if($password === false)
        $password = DEFAULT_PASSWORD;
    
    $password = password_hash($password, PASSWORD_DEFAULT);
    // Array formated column => value
    $data = array("username"=>$username, "passwordhash"=>$password);

    if(!userExist($username))
    {
        $sql->insert("users", $data); 
        $result['success'] = true;
    }
    else
    {
        $result['error'] = "User already exists";
    }
    return $result;
}

// Removes a user of given username
function removeUser($username)
{
    $sql = new DSConn();
    $result = array('success'=> false);

    if(userExist($username))
    {
        $sql->delete("users", array("username"=>$username));
        $result['success'] = true;
    }
    else
    {
        $result['error'] = "User doesn\'t exist";
    }
}

// Return true if account on server
function authenticate($username, $password)
{
    $sql = new DSConn();
    if(userExist($username))
    {
        $result = $sql->get_assoc("users", array("passwordhash"), "username like '$username'");
        return password_verify($password, $result['data'][0]["passwordhash"]);
    }

    return false;
}

// Return true if user in database
function userExist($username)
{
    $sql = new DSConn();
    $result = $sql->get_assoc("users", array("username"), "username LIKE '$username'");
    return count($result['data']) > 0;
}
?>
<?php
// To be merged with edit.php and loadtable.php
    require_once "../DSConn.php";

    $sql = new DSConn();
    $data = array();
    foreach($_POST as $key => $value)
    {
        if($key !== 'table')
        {
            $cleanKey = $sql->make_safe($key)['data'];
            $cleanValue = $sql->make_safe($value)['data'];
            $data[$cleanKey] = $cleanValue;
        }
    }

    if($sql->delete($_POST['table'], $data)['success'])
    {
        echo "Query Successful!";
    }
    else
    {
        echo "Query Fail!";
    }
?>
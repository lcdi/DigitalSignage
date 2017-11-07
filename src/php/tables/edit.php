<?php
// Obsolete putting into rowfunctions.php
    require_once '../DSConn.php';
    
    $sql = new DSConn(); 
    $tableName = '';
    if(isset($_POST['table']))
    {
        $tableName = $_POST['table'];
    }
    
    $current = array();
    $where = array();

    foreach($_POST as $key => $value)
    {
        if(substr($key, 0, 2) === 'o_')
        {
            $where[] = "`".substr($key, 2)."` LIKE '$value'";
        }
        else if($key !== 'table')
        {
            $current[$key] = $value;
        }
    }

    if($sql->update($tableName, $current, join(" AND ", $where))['success'])
    {
        echo "Query Successful";
    }
    else
    {
        echo "Query Failed";
    }
?>
<?php
// To be merged with loadtable.php and remove.php
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
        $cleanKey = $sql->make_safe($key)['data'];
        $cleanValue = $sql->make_safe($value)['data'];

        if(substr($key, 0, 2) === 'o_')
        {
            $where[] = "`".substr($cleanKey, 2)."` LIKE '$cleanValue'";
        }
        else if($key !== 'table')
        {
            $current[$cleanKey] = $cleanValue;
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
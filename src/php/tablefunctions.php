<?php
require_once("global.php");
require_once("DSConn.php");
if(isset($_POST['function']) && isset($_POST['table']))
{
    $tableName = $_POST['table'];
    switch($_POST['function'])
    {
        case 'remove':
            removeRow($tableName);
            break;
        case 'edit':
            editRow($tableName);
            break;
        case 'load':
            loadTable($tableName);
            break;
        case 'add':
            addRow($tableName);
            break;
        default:
            echo "Wrong function name";
            break;
    }
}else{die("FUNCTION NAME AND TABLE NOT SET");}
function removeRow($tableName)
{
    $sql = new DSConn();
    $data = array();
    foreach($_POST as $key => $value)
    {
        if(!($key == 'table' || $key == 'function'))
        {
            $cleanKey = $sql->make_safe($key)['data'];
            $cleanValue = $sql->make_safe($value)['data'];
            $data[$cleanKey] = $cleanValue;
        }
    }

    $sql->delete($tableName, $data)['success'];
}

function editRow($tableName)
{
    $sql = new DSConn(); 

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
        else if(!($key == 'table' || $key == 'function'))
        {
            $current[$cleanKey] = $cleanValue;
        }
    }

    $sql->update($tableName, $current, join(" AND ", $where))['success'];
}

function loadTable($tableName)
{
    $sql = new DSConn();
    $response = array();
    $columnArr = array();
    $tmp = $sql->getFields($tableName)['data'];
    for($i = 0; $i < count($tmp); ++$i)
    {
        $columnInfo = array();
        $columnInfo['field'] = $tmp[$i];
        $columnInfo['title'] = $tmp[$i];
        $columnInfo['sortable'] = 'true';
        $columnArr[] = $columnInfo;
    }
    $response["header"] = $columnArr;
    
    $rowArray = $sql->get_assoc($tableName, array('*'))['data'];
    $info = array();

    for($i = 0; $i < count($rowArray); ++$i)
    {
        $name = array();
        for($j = 0; $j < count($columnArr); ++$j)
        {
            $name[$columnArr[$j]['field']] = $rowArray[$i][$columnArr[$j]['field']];
        }
        $info[] = $name;
    }
    $response["info"] = $info;
    die (json_encode($response));
}

function addRow($tableName)
{
    $sql = new DSConn();
    $data = array();

    foreach($_POST as $key => $value)
    {
        if(!($key == 'table' || $key == 'function'))
        {
            $cleanKey = $sql->make_safe($key)['data'];
            $cleanValue = $sql->make_safe($value)['data'];
            $data[$cleanKey] = $cleanValue;

        }
    }
    $sql->insert($tableName, $data);   
}
?>
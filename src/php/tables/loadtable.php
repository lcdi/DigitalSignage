<?php 
// To be merged with remove.php and edit.php
    require_once '../DSConn.php';
	if(isset($_POST['table']))
	{
		loadTable($_POST['table']);
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
	 	echo  json_encode($response);
	}
?> 
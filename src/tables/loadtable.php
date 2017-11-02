<?php 
    require_once 'login.php';
    $conn = new mysqli($hn,$un,$pw,$db);
	if($conn->connect_error) die($conn->connect_error);
	if($_POST['table']==='weather' || $_POST['table'] ==='project_hours')
	{
		//echo($_POST['table']);
		loadTable($_POST['table'], $conn);
	}
	function loadTable($tableName, $conn)
	{
		$response = array();
		$columnArr = array();
		$result = mysqli_query($conn, "SHOW COLUMNS FROM $tableName");
		if (!$result) {
			echo 'Could not run query: ' . mysqli_error();
			exit;
		}
		if (mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				$columnInfo = array();
				$columnInfo['field'] = $row['Field'];
				$columnInfo['title'] = $row['Field'];
				$columnInfo['sortable'] = "true";
				array_push($columnArr, $columnInfo);	
			}
		}
		$response["header"] = $columnArr;
		
		$sqltran = mysqli_query($conn, "SELECT * FROM $tableName")or die(mysqli_error($conn));
		$info = array();
 		
		$i=1;
		$j=0;
 		while ($rowList = mysqli_fetch_array($sqltran)) {
 								 
						$name = array();
							for($j = 0; $j < count($columnArr); ++$j)
							{
								$name[$columnArr[$j]['field']] = $rowList[$columnArr[$j]['field']];
							}			
							array_push($info, $name);	
			$i++;			
		 }
		$response["info"] = $info;
	 	echo  json_encode($response);
 
	}
    
	 	mysqli_close($conn);
?> 
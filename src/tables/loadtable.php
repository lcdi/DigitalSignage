<?php 
    require_once 'login.php';
    $conn = new mysqli($hn,$un,$pw,$db);
    if($conn->connect_error) die($conn->connect_error);
    $sqltran = mysqli_query($conn, "SELECT * FROM weather")or die(mysqli_error($con));
		$arrVal = array();
 		
		$i=1;
 		while ($rowList = mysqli_fetch_array($sqltran)) {
 								 
						$name = array(
								'zip' => $rowList['zip'],
 	 		 	 				'country'=> $rowList['country'],
 	 		 	 			);		
 
 
							array_push($arrVal, $name);	
			$i++;			
	 	}
	 		 echo  json_encode($arrVal);
 
	 	mysqli_close($conn);
?> 
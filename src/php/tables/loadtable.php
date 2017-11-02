<?php 
    require_once 'login.php';
    $conn = new mysqli($hn,$un,$pw,$db);
    if($conn->connect_error) die($conn->connect_error);
    // There should be a way to make it so it doesn't have to check every table name case
    if($_POST['table']==='weather' || $_POST['table'] ==='project_hours' || $_POST['table']==='student')
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
                //echo $result;
                $name = $row['Field'];
                //echo $name;
                array_push($columnArr, $name);  
                //print_r($row);
            }
            //print_r ($columnArr);
        }
        $response["column"] = $columnArr;
        
        $sqltran = mysqli_query($conn, "SELECT * FROM $tableName")or die(mysqli_error($conn));
        $info = array();
        
        $i=1;
        $j=0;
        while ($rowList = mysqli_fetch_array($sqltran)) {
                                 
                        $name = array();
                            for($j = 0; $j < count($columnArr); ++$j)
                            {
                                $name[$columnArr[$j]] = $rowList[$columnArr[$j]];
                            }           
                            array_push($info, $name);   
            $i++;           
        }
        //$info=array($columnArr[0]=>"test", $columnArr[1]=>"test2", $columnArr[2]=>"test3");
        echo json_encode($info);
 
    }
    
        mysqli_close($conn);
?> 
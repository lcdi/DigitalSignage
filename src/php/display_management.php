<?php
    require_once('DSConn.php');
    $sql = new DSConn();

    $result = $sql->get_assoc('widget_positioning',array('*'));
    if($result['success'])
    {
        for($i = 0; $i < count($result); ++$i)
        {
            $response["app"][$i] = $result['data'][$i];
        }
        echo json_encode($response);
    }
    
?>
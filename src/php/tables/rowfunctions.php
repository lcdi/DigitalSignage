<?php
/* Work in progress have not finished testing
 * Populate table remove and edit will go in here
 * for bootmysql page
 *************************************************/

require_once("../php/global.php");

if(isset($_POST['function']))
{
    switch($_POST['function'])
    {
        case 'remove':
            echo "test";
            removeRow();
            break;
        case 'edit':
            echo "test";
            editRow();
            break;
        default:
            break;
    }
}
function removeRow()
{
    $sql = new DSConn();
    if (isset($_POST['zip']) && isset($_POST['country']))
    {
        $zip = $_POST['zip'];
        $zip = $sql->make_safe($zip)['data'];
        $country = $_POST['country'];
        $country = $sql->make_safe($country)['data'];
        $data = array("zip"=>$zip, "country"=>$country);
        $sql->delete("weather", $data);       
    }
    $sql->close();
}

function editRow()
{
    $sql = new DSConn();
    if (isset($_POST['zip']) && isset($_POST['country']) &&
        isset($_POST['oZip']) && isset($_POST['oCountry']))
    {
        $zip = $sql->make_safe($_POST['zip']);
        $country = $sql->make_safe($_POST['country']);
        $oZip = $sql->make_safe($_POST['oZip']);
        $oCountry = $sql->make_safe($_POST['oCountry']);

        $data = array("zip"=>$zip, "country"=>$country);
        //something something interpreting as array instead of as string something something 

    //$sql->update("weather", $data/*, "zip LIKE '$oZip' AND country LIKE '$oCountry'"*/);
    }

    $sql->close();
}

?>
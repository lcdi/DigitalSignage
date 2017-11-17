<?php
require_once("../../php/DSConn.php");
$sql = new DSConn();

// Get the fields and rows from the database
$fields = $sql->getFields("project_hours")['data'];
$rows = $sql->get_assoc("project_hours", array("*"))['data'];
?>

<html>
    <!-- Styling so ever other row is grey -->
    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>

    <table>
    <?php
        $str = "<tr>";
        foreach($fields as $field)
        {
            // Add the fields to the table
            $str .= "<th>".ucfirst($field)."</th>";
        }
        $str .= "</tr>";

        foreach ($rows as $row)
        {
            // Add the current row
            $str .= "<tr>";
            foreach($row as $key=>$value)
            {
                // Add the current column value in the current row
                $str .= "<th>$value</th>";
            }
            $str .= "</tr>";
        }
        echo $str;
    ?>
</table>
</html>
<?php

require_once("global.php");

class DSConn{

    private $connection = false;

    // Returns true if connects else returns false
    private function connect()
    {
        global $global;
        $result = false;

        if($this->connection)
        {
            $result = true;
        }
        else
        {
            $this->connection = new mysqli(
                $global['sql']['host'],
                $global['sql']['username'],
                $global['sql']['password'],
                $global['sql']['database']
            ); 

            $result = true;
            if($this->connection->connect_error)
            {
                $result = false;
            }
        }

        return $result;
    }

    public function close()
    {
        if($this->connection) {$this->connection->close();}
    }

    /* Deletes data from database 
     * where data_array is an associative array
     * and it's contents are $field => $value to delete */
    public function delete($table, $data_array)
    {
        $result = array("success"=>false);
        $connect_result = $this->connect();
        if($connect_result)
        {
            $safe_table = mysqli_real_escape_string($this->connection, $table);
            $safe_field = "";
            $safe_value = "";
            $safe_data = array();

            foreach($data_array as $field => $value)
            {
                $safe_value = "'".mysqli_real_escape_string($this->connection, $value)."'";
                $safe_field = mysqli_real_escape_string($this->connection, $field);
                $safe_data[] = "$safe_field LIKE $safe_value";
            }

            $query = "DELETE FROM $safe_table WHERE ";
            $query .= join(" AND ", $safe_data);
            $query .= ";";

            $q = mysqli_query($this->connection, $query);
            if($q)
            {
                $result["success"] = true;
            }
        }
        $this->close();
        return $result;
    }

    /* Gets the fields of a table with DESCRIBE
     * Returns the fields in an array associated with 'data'
     */
    public function getFields($table)
    {
        $result = array("success"=>false, "data"=>'');
        $connect_result = $this->connect();
        if($connect_result)
        {
            $safe_table = mysqli_real_escape_string($this->connection, $table);
            $query = "DESCRIBE " . $safe_table;
            $data = array();
            $query_result = mysqli_query($this->connection, $query);
            while($row = mysqli_fetch_assoc($query_result))
            {
                $data[] = $row['Field'];
            }

            if($query_result)
            {
                $result['success'] = true;
                $result['data'] = $data;
            }
        }

        return $result;
    }

    /* Runs query and returns associative array for fields on table 
     * Returns false if the query fails or an array of associative array if it succeeds */
    public function get_assoc($table, $fields, $where = false)
    {
        $result = array("success"=>false, "data"=>'');

        $connect_result = $this->connect();
        if($connect_result)
        {
            $safe_table = mysqli_real_escape_string($this->connection, $table);
            $safe_fields = array();
            if($fields == '*')
            {
                $safe_field_string = '*';
            }
            else
            {
                foreach($fields as $field)
                {
                    $safe_fields[] = mysqli_real_escape_string($this->connection, $field);
                }
                $safe_field_string = join(",", $safe_fields);
            }
        }

        $query = "SELECT $safe_field_string FROM $safe_table";
        if($where !== false)
        {
            $query .= " WHERE $where";
        }
        $query .= ";";

        $query_result = mysqli_query($this->connection, $query);
        if($query_result)
        {
            $result['success'] = true;
            $result['data'] = array();
            while($row = mysqli_fetch_assoc($query_result))
            {
                $result['data'][] = $row;
            }
        }
        $this->close();
        return $result;
    }

    /* Runs query to insert data into table */
    public function insert($table, $data_array)
    {
        $result = array("success"=>false);
        $connect_result = $this->connect();
        if($connect_result)
        {
            $safe_table = mysqli_real_escape_string($this->connection, $table);
            $safe_fields = array();
            $safe_values = array();
            foreach($data_array as $field => $value)
            {
                $safe_fields[] = mysqli_real_escape_string($this->connection, $field);
                if(strtolower($value) == 'null')
                {
                    $safe_values[] = "NULL";
                }
                else
                {
                    $safe_values[] = "'".mysqli_real_escape_string($this->connection, $value)."'";
                }
            }

            $query = "INSERT INTO $safe_table (";
            $query .= join(", ", $safe_fields);
            $query .= ") VALUES (";
            $query .= join(", ", $safe_values);
            $query .= ");";

            $q = mysqli_query($this->connection, $query);
            if($q)
            {
                $result["success"] = true;
            }
        }
        $this->close();
        return $result;
    }

    /* Runs query to update data on table */
    public function update($table, $data_array, $where = false)
    {
        $result = array("success"=>false);
        $connect_result = $this->connect();
        if($connect_result)
        {
            $safe_table = mysqli_real_escape_string($this->connection, $table);
            $safe_data = array();
            $safe_value = "";
            foreach($data_array as $field => $value)
            {
                $safe_value = "'".mysqli_real_escape_string($this->connection, $value)."'";
                $safe_data[] = mysqli_real_escape_string($this->connection, $field) . " = $safe_value"; 
            }

            $query = "UPDATE $safe_table SET ";
            $query .= join(', ', $safe_data);
            if($where !== false)
            {
                $query .= " WHERE $where";
            }
            $query .= ";";

            $q = mysqli_query($this->connection, $query);
            if($q)
            {
                $result["success"] = true;
            }

        }
        $this->close();
        return $result;
    }

    public function make_safe($string)
    {
        $result = array("success"=>false, "data"=>NULL);
        $connect_result = $this->connect();
        if($connect_result)
        {
            $result["success"] = true;
            $result["data"] = mysqli_real_escape_string($this->connection, $string);
        }

        return $result;
    }
}

?>
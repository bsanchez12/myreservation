<?php
error_reporting(E_ERROR | E_PARSE);
require("crudModel.php");
 
class CrudDynamic extends CrudModel
{
/**
 * @desc - constructor de la clase, el mejor momento para definir la base de datos con
 * la que queremos trabajar
 */
 
 //obtiene todos los registros de la tabla con simple_query
 //fields: Son los campos que se quieren devolver en el query
 //table: Es la tabla a la cual se realiza el query
 //where: Es la condicion que se agrega al query
 protected function getSelect($fields = '' , $table = '', $where = 1)
 {
	if($table != '')
	{		
		$query = "SELECT * FROM  $table WHERE $where ";
		
		if($fields !='')
		{
			$query = "SELECT $fields FROM  $table WHERE $where ";
		}
		$this->query = $query;
		$this->simple_query();
		if($this->rows > 0)
		{
			return $this->rows;
		}
	}
	
	return null;
 }
 
 //inserta un nuevo usuario
 //table: Tabla en la cual se quiere agregar un nuevo registro
 //fields: Campos de la tabla en la cual se quiere agregar un registro
 //values: Valores para los campos a insertar
 protected function add($table ='', $fields='', $values='')
 {
 //consulta parametrizada
	$this->query = "INSERT INTO $table ($fields) VALUES($values)";
 //con el segundo parámetro a true hacemos un insert
	$result = $this->simple_query(true);
     
	return $result;
	
 }
 
 //actualiza en este caso un usuario, pero puede ser cualquier otra cosa
 protected function edit($table = '', $updates = '', $where= '1')
 {
	$this->query = "UPDATE $table SET $updates WHERE $where";
	$this->simple_query(true);
	return true;
 }
 
 //elimina un usuario por su id
 protected function supr($table = '', $id = '')
 {
	if($table != '' && $id != '')
	{
        $pk = "id_$table";
        
        if(substr($table, $table.length - 1) == 's'){
            $where = substr($pk, 0, $pk.length - 1);
        }else{
            $where = $pk;
        }
        
		$this->query = "DELETE FROM $table WHERE $where = $id";
		$this->simple_query(true);
		return true;
	}
	
 } 
 
 //mapea la tabla para obtener los campos
 protected function maperTable($tabla)
 {
	$campos = array ();
	
	$this->query ="SHOW COLUMNS FROM " . $tabla ; 	
	$this->simple_query();
	
	if($this->rows > 0)
	{
		$result= $this->rows;
		foreach($result as $campo)
		{
			$campos [] = $campo ['Field'];
		}	
	
		return($campos);
	} 
		
	return null;	
 }
 
 //////****** funciones publicas para acceder desde afuera *******//////
 
 //select registros de la base de datos
 public function select($fields = '', $table = '', $where = '1')
 {
	return $this->getSelect($fields, $table, $where);
 }
    
public function forgot($table, $email)
 {
    $randomletter = substr(str_shuffle("abcdefghijklmnopqrstuvwxyz"), 0, 10);
    $where = "email = '". $email ."'";
     
    $update = "clave = '" . $randomletter ."'";
	$this->edit($table, $update, $where);
    return $randomletter;
 } 
 
 //inserta registros a la base de datos
 public function insert($table = '' , $values = '', $lastId = '0')
 {
	$insertFields = array();
	$insertValues = array();
	
	$fields = $this->maperTable($table);
	
	foreach($fields as $key)
	{
		foreach($values as $key1 => $value)
		{
			if($key == $key1 && $key1 != 'id_'. $table) 
			{
				if($value != '')
				{
					$insertFields[] = $key . " ";
					$insertValues[] = "'" . $value . "'";
				}
				else
				{
					$void = ' ';
					$insertFields[] = $key . " ";
					$insertValues[] = "'" . $void . "'";
				}
			}
		}
	}
	
	$fieldsInsert = implode(",", $insertFields);
	$valuesInsert = implode(",", $insertValues);

	return $this->add($table, $fieldsInsert, $valuesInsert);
	
 }

 //actualiza registros en la base de datos
 public function update($table = '', $values = '', $where = '1')
 {
	$fields = $this->maperTable($table);
	 
	$update = " ";
	
	foreach($fields as $key)
	{
		foreach($values as $key1 => $value)
		{
			if($key == $key1 && $key1 != 'id_'. $table) 
			{
				
				if($value != '')
				{
					$update .=$key . " = '" . $value . "',";
				}
			}
		}
	}
	
	$update = substr($update, 0, -1);
	return $this->edit($table, $update, $where);
 }
 
 //elimina registros en la base de datos
 
 public function delete($table = '', $id = '')
 {
	return $this->supr($table, $id);
 }    
    
public function initSession($values){
    
    session_start();
    
    foreach($values as $key => $value){
        
        if($key != 'comando'){
            $_SESSION[$key] = $value;
        }
    }
    
    return $_SESSION;
} 

public function destroySession(){
    session_start();
    session_destroy(); 

}
    
public function getSession(){
    session_start();
    return $_SESSION;
}
    
}
?>
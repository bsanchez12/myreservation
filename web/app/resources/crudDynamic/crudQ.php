<?php
error_reporting(E_ERROR | E_PARSE);
require_once 'crudDynamic.php';

$request = json_decode(file_get_contents("php://input"));    

if ($request->comando == "select") 
{
	$fields = $request->fields;
	$table = $request->table;
	$where = $request->where;
	
    $crud = new CrudDynamic();
	$rs['results'] = $crud->select($fields, $table, $where);
	$rs['success'] = true;
	echo json_encode($rs);
}

if ($request->comando == "insert") 
{
	$table = $request->table;
	$where = $request->where;
	$values = $request;
	
    $crud = new CrudDynamic();
    $crud->insert($table, $values);
	$rs['results'] = $crud->select("*", $table, $where);
	$rs['success'] = count($rs['results']) > 0;
	echo json_encode($rs);
}

if ($request->comando == "update") 
{
	$table = $request->table;
	$where = $request->where;
	$values = $request;
	
    $crud = new CrudDynamic();
	$rs['results'] = $crud->update($table, $values, $where);
	$rs['success'] = true;
	echo json_encode($rs);
}

if ($request->comando == "updatebatch") 
{
	$table = $request->table;
	$where = $request->where;
	$values = $request;
	
    $crud = new CrudDynamic();
    $crud->update($table, $values, $where);
	$rs['results'] = $crud->select("*", $table, $where);
	$rs['success'] = true;
	echo json_encode($rs);
}

?>
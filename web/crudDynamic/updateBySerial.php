<?php
error_reporting(E_ERROR | E_PARSE);
require_once 'crudDynamic.php';

$request = json_decode(file_get_contents("php://input"));    

	$table = 'codigos';
	$where = 'CodigoSerial =' .$request->serial;
	$values = $request;
	
    $crud = new CrudDynamic();
    $ruser['resultsuser'] = $crud->select('*', 'usuario', 'NombreUsuario = "'. $request->usuario .'" and Contrasena ="' . $request->clave . '"');

    if(count($ruser['resultsuser']) > 0){
         $cr = crypt($request->serial, $ruser['resultsuser'][0]["Hash"]);
        if($request->secret == $cr){

            $request->Estado = 1;
            $request->UsuarioActiva = $ruser['resultsuser'][0]["IdUsuario"];
            $dat = getdate();
            $request->FechaActiva = $dat[mday] . "/" . $dat[mon] . "/" . $dat[year];

            $crud->update($table, $values, $where);
            $rs['results'] = '[{"code": "1", "status": "Aprobado"}]';
            $rs['success'] = true;
            echo json_encode($rs);
        }else{
            $rs['results'] = '[{"code": "98", "status": "Pre-Aprobado, hash no coincide con el registrado para el usuario"}]';
            $rs['success'] = false;
            echo json_encode($rs);
        }
    }
    else{
    	$rs['results'] = '[{"code": "99", "status": "Pre-Aprobado, credenciales invalidas"}]';
		$rs['success'] = false;
		echo json_encode($rs);
    }

?>
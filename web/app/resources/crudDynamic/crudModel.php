<?php
error_reporting(E_ERROR | E_PARSE);

abstract class CrudModel
{

	/**
	* @desc nombre del usuario de la base de datos	
	*/
	private $_dbUser = "db4beyondmaster2";   

	/**
	* @desc password de la base de datos	
	*/
	private $_dbPassword = "ad9098sd23902";   

	/**
	* @desc nombre del host	
	*/
	private $_dbHost = "db4beyond2.cszy09hktxl5.us-west-2.rds.amazonaws.com";    

	/**
	* @desc nombre de la base de datos	
	*/	
    public $_dbName = "ventateorienta";

	/**
	* @desc será accesible y utilizada por las clases que hereden para realizar las consultas	
	*/
	public $query;

	/**
	* @desc array para devolver datos a las consultas
	*/
	protected $rows = array();

	/**
	* @desc conexión a la base de datos	
	*/
	private $_connection;

	/**
	* @desc - estos métodos los definimos abstractos y protegidos, ésto es porqué serán implementados 
	* por las clases que hereden de ella, de esta forma, podrá ser todo dinámico y escalable 
	*/
	abstract protected function add();
	abstract protected function getSelect();	
	abstract protected function edit();
	abstract protected function delete();

	/**
	* @desc - establecemos la conexión con la base de datos
	* @access private
	*/
	private function _connect()
	{
		$this->_connection = new PDO('mysql:host='.$this->_dbHost.'; dbname='.$this->_dbName, $this->_dbUser, $this->_dbPassword);  
        $this->_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->_connection->exec("SET CHARACTER SET utf8");  
	}

	/**
	* @desc - cierra la conexión con la base de datos
	*/
	private function _close_connection()
	{
		$this->_connection = null;
	}	

	/**
	* @desc - útil para hacer una consulta select sencilla y devolver filas,
	* de ámbito protegido, de esta forma sus clases hijas podrán utilizarlo
	*/
	protected function simple_query($insert = false) 
	{
        try{
            
            $this->_connect();
            
            $result = $this->_connection->prepare($this->query);
            
            if(!$result->execute()){
                throw new Exception('{"success": false, "message":"Error execute:  '.mysql_error().$sql.'"}');
            }
		
            if($result)
            {
                if($insert == false)
                {
                    if($result->rowCount() > 1)
				    {
                        $this->rows = $result->fetchAll(PDO::FETCH_ASSOC);
				    }
				    else if($result->rowCount() == 1)
				    {
                        $results = array();
                        array_push($results, $result->fetch(PDO::FETCH_ASSOC));
                        $this->rows = $results;
				    }	   
                }
                $result = true;
            }
            
            $result = false;
            $this->_close_connection();

        }
        catch(Exception $e){
            $uniqId = uniqid();
			$result = false;
            $this->_close_connection();            
            die('error '.$uniqId.' // '.$e->getMessage());
        }
    }
	
	public function __destruct()
	{
		$this->_connection = null;
	}
}
?>
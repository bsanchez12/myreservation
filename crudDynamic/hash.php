<?php
error_reporting(E_ERROR | E_PARSE);
require_once 'crudDynamic.php';

$request = json_decode(file_get_contents("php://input"));    

		echo password_hash("Prueba", PASSWORD_DEFAULT). "\n";

        echo 'SHA-512:' . crypt('1', '$2y$10$apEjuLNyjsJcBXw3VzFqMuQ1v4elfv8hreWERBRQHfknYTG3aoUCi'). "\n";

        echo password_hash("Briam", PASSWORD_DEFAULT). "\n";

        echo 'SHA-512:' . crypt('3', '$2y$10$utPEzQpKbd/TqmkVZ8AjAO/mXbzqGU2NvI7wiNoHSvT550gfRSd3y'). "\n";

        $dat = getdate();

        echo $dat[mday] . "/" . $dat[mon] . "/" . $dat[year];

?>
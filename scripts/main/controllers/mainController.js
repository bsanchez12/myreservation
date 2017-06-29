var method = 'POST';
var url = 'crudDynamic/crudQ.php';
var headers = {'Content-Type': 'application/json; charset=UTF-8'};
var req = {};

app.controller("mainController", ['$http','$scope', '$rootScope', '$filter', '$location',
    function ($http, $scope, $rootScope, $filter, $location) {

       $scope.loginuser = function(){       	
		
         req = {
             method: method,
             url: url,
             headers: headers,
             data: {
                 comando: 'select',
                 table: 'usuario',
                 fields: '*',
                 where: 'NombreUsuario = "'+ $scope.use +'" and Contrasena ="' + $scope.passw + '"'
             }
         };
                
        $http(req).then(function(response){
            if(response.data.success){				
                if(response.data.results.length > 0){			
                  $rootScope.iduser = response.data.results[0]["IdUsuario"];
                  if(response.data.results[0]["Perfil"] == '1'){
                        $location.path("/CodeCreator");
                    }else{
                       $location.path("/UpdateBySerial"); 
                    }
                }
				else{
					alert("Usuario no existe");
				}				
            }else{          
                if(response.data.success == undefined){
					alert("Error en conexión");
                } 
            }
        });
    }
	
 }]);
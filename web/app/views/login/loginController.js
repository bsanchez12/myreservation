var method = 'POST';
var url = '../../../app/resources/crudDynamic/crudQ.php';
var headers = {'Content-Type': 'application/json; charset=UTF-8'};
var req = {};

app.controller("loginController", ['$http','$scope', '$rootScope', '$filter', '$location',
    function ($http, $scope, $rootScope, $filter, $location) {				
	
		$scope.loginuser = function(){   
		
			 req = {
             method: method,
             url: url,
             headers: headers,
             data: {
                 comando: 'select',
                 table: 'user',
                 fields: '*',
                 where: 'Email = "'+ $scope.email +'" and Password ="' + $scope.contra + '"'
             }
			};
			
			debugger;
					
			$http(req).then(function(response){
				if(response.data.success){				
					if(response.data.results.length > 0){			
					  alert("Usuario existe");
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
	
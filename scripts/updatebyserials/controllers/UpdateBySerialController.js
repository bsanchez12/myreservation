var method = 'POST';
var url = 'crudDynamic/crudQ.php';
var headers = {'Content-Type': 'application/json; charset=UTF-8'};
var req = {};

app.controller("UpdateBySerialController", ['$http','$scope', '$rootScope', '$filter', '$location',
    function ($http, $scope, $rootScope, $filter, $location) {

        var init = function(){
            $scope.codeList = [];

            if($rootScope.iduser == null){
                $location.path("/");
            }
        }

      $scope.updatebatch = function(){ 
      
       var seriales = $scope.ser.split(';');
       var con = 0;

        var f = new Date();
        var fechaactual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

       if(seriales.length > 0){
           for (paso = 0; paso < seriales.length; paso++) {
                debugger;
                req = {
                     method: method,
                     url: url,
                     headers: headers,
                     data: {
                         comando: 'updatebatch',
                         table: 'codigos',
                         where: 'CodigoSerial = '+ seriales[paso],
                         Estado: 1,
                         UsuarioActiva: $rootScope.iduser,
                         FechaActiva: fechaactual,
                         Observaciones: $scope.desc
                     }
                 };
                    
                $http(req).then(function(response){
                    if(response.data.success){     
                        if(response.data.results.length > 0){  
                          debugger; 
                          if(response.data.results[0]["CodigoSerial"] != null){        
                              $scope.codeList[con] = {codigoserial: seriales[con], status:"OK"};
                          }
                          else{
                              $scope.codeList[con] = {codigoserial:seriales[con], status:"ERROR: serial no encontrado"};
                          }
                        }
                        else{     
                            $scope.codeList[con] = {codigoserial:seriales[con], status:"ERROR: serial no encontrado"};
                        }               
                    }else{          
                        if(response.data.success == undefined){       
                            $scope.codeList[con] = {codigoserial:seriales[con], status:"ERROR: serial no encontrado"};
                        } 
                    }
                    con = parseInt(con) + 1;
                });
           };     
       }else{
          alert("Por favor digitar los codigos seriales separados por ; para poder realizar la activacion");
       } 	
    }

    init();
	
 }]);
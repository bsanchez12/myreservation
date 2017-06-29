var method = 'POST';
var url = 'crudDynamic/crudQ.php';
var headers = {'Content-Type': 'application/json; charset=UTF-8'};
var req = {};

app.controller("codeCreateController", ['$http','$scope', '$rootScope', '$filter', 'codeCreateService', '$location',
    function ($http, $scope, $rootScope, $filter, codeCreateService, $location) {

        var init = function(){
            $scope.codeList = [];
            $scope.operacionnum = '';
            $scope.descrip = '';
            $scope.fechacodigos = '';
            $scope.usuacodigo = '';
            $scope.issearch = false;
            $scope.isdata = false;

            if($rootScope.iduser == null){
                $location.path("/");
            }
        }

       $scope.createcd = function(){      	
		     
        $scope.isdata = false;   
        $scope.issearch = false;
        $scope.codeList = [];
       	var codSerial = 0;
       	var numoper = 0;
        var i = 0;
        var f = new Date();
        var fechaactual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        var est = 2;
        debugger;
        if($scope.aprob){
            est = 1;
        }

       	codeCreateService.getSerialCode()
        .then(function (data){
            if(data.results.length > 0){
                codSerial = data.results[0]["CodigoSerial"];
            }else{
                codSerial = 0;
            }

            codeCreateService.getOperacion()
            .then(function (data){
                if(data.results.length > 0){
                    numoper = data.results[0]["IdOperacion"];
                }else{
                   numoper = 0; 
                }
                numoper = parseInt(numoper) + 1;

                 codeCreateService.insOperacion(numoper, fechaactual)
                    .then(function (data){
                              for (paso = 0; paso < $scope.can; paso++) {
                                codSerial = parseInt(codSerial) + 1;
                                var codac = Math.floor(Math.random() * (9999999 - 1)) + 1;
                                var activa = btoa(codac)
                                
                                codeCreateService.insCodigo(activa, codSerial, fechaactual, numoper, $scope.desc, $rootScope.iduser, est)
                                    .then(function (data){
                                        debugger;
                                        $scope.codeList[i] = data.results[0];
                                        i = parseInt(i) + 1;
                                        $scope.isdata = true;
                                        $scope.operacionnum = numoper;
                                    })
                          }; 
                    })
            })
        })	
    }

     $scope.searchcode = function(){ 
 
            $scope.issearch = false;
            $scope.isdata = false;   
            $scope.codeList = [];
            if($scope.operbuscar == null && $scope.descbuscar == null && $scope.codigobuscar == null && $scope.seriebuscar == null){
                alert("Por favor digita alguno de los cuatro criterios de busqueda (Operacion, Descripcion, Codigo, Serie)");
            }
            else{

                 var query = '';

                if($scope.operbuscar != null && $scope.operbuscar != ''){
                    query = 'NumeroOperacion = ' + $scope.operbuscar;
                }

                if($scope.descbuscar != null && $scope.descbuscar != ''){
                    if(query != ''){
                        query = query + ' and Observaciones = "' + $scope.descbuscar + '"'
                    }
                    else{
                        query = 'Observaciones = "' + $scope.descbuscar + '"'
                    }
                }

                if($scope.codigobuscar != null && $scope.codigobuscar != ''){
                    if(query != ''){
                        query = query + ' and CodigoActivacion = "' + $scope.codigobuscar + '"'
                    }
                    else{
                        query = 'CodigoActivacion = "' + $scope.codigobuscar + '"'
                    }
                }

                if($scope.seriebuscar != null && $scope.seriebuscar != ''){
                    if(query != ''){
                        query = query + ' and CodigoSerial = ' + $scope.seriebuscar 
                    }
                    else{
                        query = 'CodigoSerial = ' + $scope.seriebuscar
                    }
                }
               
                 req = {
                     method: method,
                     url: url,
                     headers: headers,
                     data: {
                         comando: 'select',
                         table: 'codigos',
                         fields: '*',
                         where: query
                     }
                 };
                
                $http(req).then(function(response){
                    if(response.data.success){              
                        if(response.data.results.length > 0){           
                          $scope.codeList = response.data.results;
                          $scope.issearch = true;
                          $scope.operacionnum = response.data.results[0]["NumeroOperacion"];
                          $scope.descrip = response.data.results[0]["Observaciones"];
                          $scope.fechacodigos = response.data.results[0]["Fecha"];

                             codeCreateService.getUserById(response.data.results[0]["Usuario"])
                                .then(function (data){
                                    $scope.usuacodigo = data.results[0]["NombreUsuario"];
                                })                        
                        }
                        else{
                            alert("No existe ningun registro con esa caracteristica");
                        }               
                    }else{          
                        if(response.data.success == undefined){
                            alert("Error en conexión");
                        } 
                    }
                });
            }
     }

    init();
	
 }]);
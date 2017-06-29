var method = 'POST';
var url = 'crudDynamic/crudQ.php';
var headers = {'Content-Type': 'application/json; charset=UTF-8'};
var req = {};

app.service("codeCreateService", ['$http', function ($http) {

    this.getSerialCode = function(){

                reqcodeserial = {
                 method: method,
                 url: url,
                 headers: headers,
                 data: {
                     comando: 'select',
                     table: 'codigos',
                     fields: '*',
                     where: '1 order by CodigoSerial desc limit 1'
                 }
             };
                
            return $http(reqcodeserial).then(function(response){
                if(response.data.success){              
                    if(response.data.results.length > 0){             
                      return response.data;
                    }
                    else{
                       return response.data;
                    }               
                }else{          
                    if(response.data.success == undefined){
                        return response.data;
                    } 
                }
            });

        }

    this.getOperacion = function(){

        reqoper = {
                     method: method,
                     url: url,
                     headers: headers,
                     data: {
                         comando: 'select',
                         table: 'operacion',
                         fields: '*',
                         where: '1 order by IdOperacion desc limit 1'
                     }
                 };
                    
            return $http(reqoper).then(function(response){
                if(response.data.success){              
                    if(response.data.results.length > 0){         
                     return response.data;
                    }
                    else{
                        return response.data;
                    }               
                }else{          
                    if(response.data.success == undefined){
                        return response.data;
                    } 
                }
            });
    }

    this.insOperacion = function(numoper, fechaactual){

         reqinsop = {
             method: method,
             url: url,
             headers: headers,
             data: {
                 comando: 'insert',
                 table: 'operacion',
                 where: 'IdOperacion = '+ numoper,
                 IdOperacion: numoper,
                 FechaOperacion: fechaactual
             }
         };

         return $http(reqinsop).then(function(response){
            if(response.data.success){              
                if(response.data.results.length > 0){             
                   return response.data;
                }
                else{
                     return response.data;
                }               
            }else{          
                if(response.data.success == undefined){
                     return response.data;
                } 
            }
        });
    }

    this.insCodigo = function(codactiva, codserial, fecactual, numoper, desc, use, stat){


                 reqcodigo = {
                 method: method,
                 url: url,
                 headers: headers,
                 data: {
                     comando: 'insert',
                     table: 'codigos',
                     where: 'CodigoActivacion = "'+ codactiva +'"',
                     CodigoActivacion: codactiva,
                     CodigoSerial: codserial,
                     Estado: stat,
                     Fecha: fecactual,
                     NumeroOperacion: numoper,
                     Observaciones: desc,
                     Usuario: use
                 }
             };

             return $http(reqcodigo).then(function(response){
                if(response.data.success){              
                    if(response.data.results.length > 0){            
                        return response.data;
                    }
                    else{
                          return response.data;
                    }               
                }else{          
                    if(response.data.success == undefined){
                          return response.data;
                    } 
                }
            });

    }

    this.getCodeList = function(numoper){

           req = {
                 method: method,
                 url: url,
                 headers: headers,
                 data: {
                     comando: 'select',
                     table: 'codigos',
                     fields: '*',
                     where: 'NumeroOperacion = ' + numoper
                 }
             };
                
            return $http(req).then(function(response){
                if(response.data.success){              
                    if(response.data.results.length > 0){             
                      return response.data.results;
                    }
                    else{
                       return response.data;
                    }               
                }else{          
                    if(response.data.success == undefined){
                        return response.data;
                    } 
                }
            });
    }

    this.getUserById = function(id){

           req = {
                 method: method,
                 url: url,
                 headers: headers,
                 data: {
                     comando: 'select',
                     table: 'usuario',
                     fields: '*',
                     where: 'IdUsuario = ' + id
                 }
             };
                
            return $http(req).then(function(response){
                if(response.data.success){              
                    if(response.data.results.length > 0){             
                      return response.data;
                    }
                    else{
                       return response.data;
                    }               
                }else{          
                    if(response.data.success == undefined){
                        return response.data;
                    } 
                }
            });

    }

}])
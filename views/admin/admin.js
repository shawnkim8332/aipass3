    angular.module('frontApp')
    .factory('AuthService', function($http, $q) {
        return {
            authLogin:function() {
                var deferred = $q.defer();
                var token = localStorage.getItem("token");
                var url = '/user/auth/'+token;
                var result = 'Fail';
                $http.get(url)
                    .then(function(response) {
                        result = response.data;
                        deferred.resolve(result);
                    });
                return deferred.promise;
            }
        }
    });

    angular.module('frontApp')
        .factory('FileUploadService', function($http, $q, Upload) {
            return {
                upload:function(file) {
                    var path = "images/";
                    var deferred = $q.defer();

                    Upload.upload({
                        url: '/api/file/upload/', //webAPI exposed to upload the file
                        data:{file:file} //pass file as data, should be user ng-model
                    }).then(function (resp) { //upload function returns a promise
                        deferred.resolve(resp.data.filename);
                    });
                    return deferred.promise;
                }
            }
        });


    angular.module('frontApp')
    .controller('ProductListController', ['$scope', '$http', '$window', 'AuthService', '$location', function($scope, $http, $window, AuthService, $location){

        var promise = AuthService.authLogin();
        promise.then(function(isAuth) {
            if(isAuth == 'Success'){
                $http.get('/api/admin/product/list')
                    .then(function(response) {
                        $scope.products = response.data;
                    });
            }else{
                alert("Please login with Admin account again");
                $location.path("/");
            }
        });
        $scope.goProductDetail = function (product){
            $location.path('/admin/product/'+product.product_id);
        }
        $scope.goProductAdd = function (product){
            $location.path('/admin/add/product');
        }
    }]);

angular.module('frontApp')
    .controller('ProductDetailController', ['$scope', '$http', '$location', '$window', '$routeParams', 'AuthService', 'FileUploadService',
        function($scope, $http, $location, $window, $routeParams, AuthService, FileUploadService){

        var promise = AuthService.authLogin();

        promise.then(function(isAuth) {
            if(isAuth == 'Success'){
                var product_id=$routeParams.id;

                $http.get('/api/admin/product/'+product_id)
                    .then(function(response) {
                        this.products = response.data;
                        $scope.inputPrdNm = this.products[0].product_nm;
                        $scope.inputPrdDesc = this.products[0].description;
                        $scope.inputPrice = this.products[0].price;
                        $scope.inputIngredient = this.products[0].ingredient;
                        $scope.imgurl = this.products[0].image_path;
                    });

                $scope.goToProductList = function (){
                    $location.path('/admin/product');
                }

                $scope.updateProduct = function (){
                    var vm = this;

                    if (vm.file) { //check if from is valid
                        var promise = FileUploadService.upload(vm.file); //call upload function
                        promise.then(function(filename) {
                            filename = 'images/' + filename;
                            var data = {
                                product_id : product_id,
                                product_nm: $scope.inputPrdNm,
                                description : $scope.inputPrdDesc,
                                ingredient : $scope.inputIngredient,
                                price : $scope.inputPrice,
                                filename : filename
                            }

                            var url = '/api/admin/product/'+product_id;

                            $http({
                                url: url, // No need of IP address
                                method: 'POST',
                                data: data,
                                headers: {'Content-Type': 'application/json'}
                            }).then(function (response) {
                                alert("Successfully updated");
                                $location.path('/admin/product');
                            }).catch(function (err) {});
                        });
                    }else{
                        var filename = $scope.imgurl;
                        var data = {
                            product_id : product_id,
                            product_nm: $scope.inputPrdNm,
                            description : $scope.inputPrdDesc,
                            ingredient : $scope.inputIngredient,
                            price : $scope.inputPrice,
                            filename : filename
                        }

                        var url = '/api/admin/product/'+product_id;

                        $http({
                            url: url, // No need of IP address
                            method: 'POST',
                            data: data,
                            headers: {'Content-Type': 'application/json'}
                        }).then(function (response) {
                            alert("Successfully updated");
                            $location.path('/admin/product');
                        }).catch(function (err) {});
                    }
                }

                $scope.deleteProduct = function (){

                    if(confirm("Do you want to delete product?")){
                        var data = {
                            product_id : product_id
                        }

                        var url = '/api/admin/product/'+product_id;

                        $http({
                            url: url, // No need of IP address
                            method: 'DELETE',
                            data: data,
                            headers: {'Content-Type': 'application/json'}
                        }).then(function (response) {
                            alert("Successfully deleted");
                            $location.path('/admin/product');
                        }).catch(function (err) {});
                    }
                }


                }else{
                alert("Please login with Admin account again");
                $location.path("/");
            }

        });

    }]);

    angular.module('frontApp')
        .controller('ProductCreationController', ['$scope', '$http', '$location', '$window', '$routeParams', 'AuthService', 'FileUploadService',
            function($scope, $http, $location, $window, $routeParams, AuthService, FileUploadService){

                var promise = AuthService.authLogin();

                promise.then(function(isAuth) {
                    if(isAuth == 'Success'){

                        $scope.goToProductList = function (){
                            $location.path('/admin/product');
                        }

                        $scope.createProduct = function (){
                            var vm = this;

                            if (vm.file) { //check if from is valid
                                var promise = FileUploadService.upload(vm.file); //call upload function

                                promise.then(function(filename) {
                                    filename = 'images/' + filename;
                                    var data = {
                                        product_nm: $scope.inputPrdNm,
                                        description : $scope.inputPrdDesc,
                                        ingredient : $scope.inputIngredient,
                                        price : $scope.inputPrice,
                                        filename : filename
                                    }

                                    var url = '/api/admin/product/add';

                                    $http({
                                        url: url, // No need of IP address
                                        method: 'PUT',
                                        data: data,
                                        headers: {'Content-Type': 'application/json'}
                                    }).then(function (response) {
                                        alert("Successfully updated");
                                        $location.path('/admin/product');
                                    }).catch(function (err) {});
                                });
                            }else{
                            }
                        }

                    }else{
                        alert("Please login with Admin account again");
                        $location.path("/");
                    }

                });

            }]);
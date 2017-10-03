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
    }]);

angular.module('frontApp')
    .controller('ProductDetailController', ['$scope', '$http', '$location', '$window', '$routeParams', 'AuthService', function($scope, $http, $location, $window, $routeParams, AuthService){

        var promise = AuthService.authLogin();
        promise.then(function(isAuth) {
            if(isAuth == 'Success'){
                var product_id=$routeParams.id;

                $http.get('/api/admin/product/'+product_id)
                    .then(function(response) {
                        this.products = response.data;
                        $scope.inputPrdNm = this.products[0].product_nm;
                        $scope.inputPrdDesc = this.products[0].description;
                    });
            }else{
                alert("Please login with Admin account again");
                $location.path("/");
            }
        });

        $scope.goToProductList = function (){
            $location.path('/admin/product');
        }

        $scope.updateProduct = function() {
            var data = {
                product_id : product_id,
                product_nm: $scope.inputPrdNm,
                description : $scope.inputPrdDesc
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
            })
                .catch(function (err) {});
        };
    }]);

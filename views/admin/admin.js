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
    .controller('ProductListController', ['$scope', '$http', '$window', 'AuthService', function($scope, $http, $window, AuthService){

        var promise = AuthService.authLogin();
        promise.then(function(isAuth) {
            if(isAuth == 'Success'){
                $http.get('/api/admin/list')
                    .then(function(response) {
                        $scope.products = response.data;
                    });
            }else{
                alert("Please login with Admin account again");
                $window.location.href = ("/");
            }
        });
        $scope.goProductDetail = function (product){
            console.log(product.product_id);
            $window.location.href = ("/admin/product/"+product.product_id);
            //$window.location.href = ("/admin/product_detail.html?id="+product.product_id);
            // $window.location.href = ("/admin/detail?id="+product.product_id);
        }
    }]);

angular.module('frontApp')
    .controller('ProductDetailController', ['$scope', '$http', '$location', '$window', '$routeParams', function($scope, $http, $location, $window, $routeParams){
        var app = this;
         var product_id="1";
         console.log($routeParams.id);
        //var product_id=($location.search())['id'];
        $http.get('/api/admin/'+product_id)
            .then(function(response) {
                this.products = response.data;
                $scope.inputPrdNm = this.products[0].product_nm;
                $scope.inputPrdDesc = this.products[0].description;
            });

        $scope.goToProductList = function (){
            $window.location.href = ("/admin");
        }

        $scope.updateProduct = function() {
            var data = {
                product_id : product_id,
                product_nm: $scope.inputPrdNm,
                description : $scope.inputPrdDesc
            }
            var url = '/api/product/update/'+product_id;

            $http({
                url: url, // No need of IP address
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
                alert("Successfully updated");
                $window.location.reload();
            })
                .catch(function (err) {});
        };
    }]);

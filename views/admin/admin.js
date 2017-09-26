

//app.run(['$rootScope', '$location', AuthFactory, function($rootScope, $location, AuthFactory) {
//	$rootScope.$on('$routeChangeStart', function(event, current, AuthFactory) {
////		$rootScope.pageTitle = current.$$route.title;
//		if ((AuthFactory.authLogin == false) && current.$$route.withLogin || (AuthFactory.authLogin == true) && current.$$route.withoutLogin) {
//			event.preventDefault();
//			$location.path('/');
//		}
//	});
//}]);

    angular.module('frontApp')
        .controller('ProductListController', ['$scope', '$http', '$window', function($scope, $http, $window){
            console.log("here");
            $http.get('/api/admin/list')
                .then(function(response) {
                    $scope.products = response.data;
                });

            $scope.goProductDetail = function (product){
                //$window.location.href = ("/admin/product_detail.html?id="+product.product_id);
               // $window.location.href = ("/admin/detail?id="+product.product_id);
            }
        }]);

angular.module('frontApp')
    .controller('ProductDetailController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
        var app = this;
        // var product_id="1";
        var product_id=($location.search())['id'];
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


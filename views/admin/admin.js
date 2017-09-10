(function(){
var app = angular.module('adminProduct', ['ngRoute']);
    var products=[
        {
            product_nm:'',
            product_id:'',
            description:''
        }
    ];


    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl : 'product_list.html',
			    controller: 'ProductListController',
            })
            .when("/admin/product/:id", {
                templateUrl : 'product_detail.html',
				controller: 'ProductDetailController',
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        //$locationProvider.html5Mode(true);

    }]);
	
app.factory('AuthFactory', function($http) {
    return {
		authLogin : function() {
			var url = '/user/auth';
			data = localStorage.getItem("token");
			$http({
				url: url, // No need of IP address
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).then(function (response) {
				if(response == 'Success') {
					return true;
				}
				else {return false;}
			})
			 .catch(function (err) { return false; });
		}
	}
});

//app.run(['$rootScope', '$location', AuthFactory, function($rootScope, $location, AuthFactory) {
//	$rootScope.$on('$routeChangeStart', function(event, current, AuthFactory) {
////		$rootScope.pageTitle = current.$$route.title;
//		if ((AuthFactory.authLogin == false) && current.$$route.withLogin || (AuthFactory.authLogin == true) && current.$$route.withoutLogin) {
//			event.preventDefault();
//			$location.path('/');
//		}
//	});
//}]);
	
app.controller('ProductListController', function($scope, $http, $window){
	var app = this;
	$http.get('/api/product/list')
		.then(function(response) {
			$scope.products = response.data;
		});

	$scope.goProductDetail = function (product){
		$window.location.href = ("/admin/product_detail.html?id="+product.product_id);
	}
});

app.controller('ProductDetailController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){

        var app = this;
       // var product_id="1";
        var product_id=($location.search())['id'];
        $http.get('/api/product/'+product_id)
            .then(function(response) {
                this.products = response.data;
                $scope.inputPrdNm = this.products[0].product_nm;
                $scope.inputPrdDesc = this.products[0].description;
            });

        $scope.goToProductList = function (){
            $window.location.href = ("product_list.html");
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


})();
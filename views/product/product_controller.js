//angular.module('frontApp')
//.controller('ProductController',function(){
//	this.products=boxs;
//});

angular.module('frontApp').controller('ProductController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	$http.get('/front/product/list')
		.then(function(response) {
			$scope.products = response.data;
		});
		
	$scope.addToCart = function(productName,productPrice) {
		//var products = [];
		products = JSON.parse(localStorage.getItem("products"));
		console.log("Prducst are:"+ products);
		if(products == null) {
			var products = [];
			products.push({name:productName, price:productPrice});
			localStorage.setItem("products", JSON.stringify(products));
		} else {
			products.push({name:productName, price:productPrice});
			localStorage.setItem("products", JSON.stringify(products));
		}
	};
}]);

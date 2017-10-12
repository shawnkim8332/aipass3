//angular.module('frontApp')
//.controller('ProductController',function(){
//	this.products=boxs;
//});

angular.module('frontApp').controller('ProductController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	$http.get('/front/product/list')
		.then(function(response) {
			$scope.products = response.data;
		});
}]);

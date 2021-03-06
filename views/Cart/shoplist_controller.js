angular.module('frontApp')
    .controller('shoplistcontroller', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope){
	$scope.products = JSON.parse(localStorage.getItem("products"));					
	if($scope.products == undefined || $scope.products.length == 0) {
		alert("Please Add some Products in your cart to buy");
		$window.location.href = ("/product");
	}
	
	//function to buy and send email 
	$scope.buyNow = function () {
		var userEmail =localStorage.getItem("email");
		if(userEmail == null) {
			alert("Please Login To Buy Items");
		} 
		else {
			var url = '/user/confirmEmail';
			var list = JSON.parse(localStorage.getItem("products"));
			var data = {
					email: userEmail,
					products: list
				};
			$http({
				url: url, // No need of IP address
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).then(function (response) {
				if(response.data == "error") {
					alert("Some Error as occoured Please Try Again Later");
				}
				else {
					alert("Thank You For Your Order! Please check your email for conformation");
					localStorage.setItem("products", "[]");
					$window.location.href = ("/");
				}			
			})
			 .catch(function (err) {});
		}
	}
	
	//function of removing row for cart list
	$scope.removeRow = function(name){				
		var index = -1;		
		var comArr = eval( $scope.products );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].name === name ) {
				index = i;
				break;
			}
		}
			if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.products.splice( index, 1 );	
		localStorage.setItem("products", JSON.stringify($scope.products));
	};
}]);
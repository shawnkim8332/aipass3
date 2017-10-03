(function(){
//Define App
var frontApp = angular.module('frontApp', ['ngRoute']);
//Define Config
frontApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl : 'home.html',
			controller: 'indexFrontController'
		})
		.when("/signup", {
			templateUrl : 'signup.html',
			controller: 'signUpController'
		})
		.when("/logout", {
			templateUrl : 'home.html',
			controller: 'logOutController'
		})
        .when("/food", {
            templateUrl : 'food/menu_item.html',
            controller: 'menuItemListController'
        })
<<<<<<< HEAD
		.when("/products", {
            templateUrl : 'products.html',
            controller: 'productFrontListController'
        })
        .when("/admin", {
=======
        .when("/admin/product", {
>>>>>>> 396035f2d2e4bdc3e536976efb475872ade99050
            templateUrl : 'admin/product_list.html',
            controller: 'ProductListController'
        })
        .when("/admin/product/:id", {
            //templateUrl: function(params){ return 'admin/product_detail.html' + params.id; },
            templateUrl : 'admin/product_detail.html',
            controller: 'ProductDetailController'
        })
		.when("/login", {
			templateUrl : 'login.html',
			controller: 'loginController'
		})
        .otherwise({redirectTo:'/'});

	$locationProvider.html5Mode({
		enabled: true
	});

}]);

//Define Contorllers
frontApp.controller('userCtrl', function($scope) {
    $scope.user = localStorage.getItem("name");
});

frontApp.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

frontApp.controller('indexFrontController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){


}]);

frontApp.controller('signUpController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
		//on submit   
	$scope.myTxt = "You have not yet clicked submit";
    $scope.signUp = function () {
		console.log("Submit");
		var data = {
                name : $scope.inputSignUpName,
                lastname: $scope.inputSignUpLastName,
               	email : $scope.inputSignUpEmail,
				password : $scope.inputSignUpPassword
            }
		var url = '/user/register';
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			if(response.data == "dupEmail") {
				$scope.myTxt = "Username with same email address Exists Please signup with different email address!";
			}
			else {
				$scope.myTxt = "Thank You For Registration!";
				$window.location.reload();
			}
			
		})
		 .catch(function (err) {});
    }
}]);

frontApp.controller('loginController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
		//on submit   
	$scope.myRes = "You have not yet clicked submit";
    $scope.logIn = function () {
		console.log("Submit");
		var data = {
               	email : $scope.inputLogInEmail,
				password : $scope.inputLogInPassword
            }
		var url = '/user/login';
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			console.log("res: ",response);
			if(response.data == "notFound") {
				$scope.myRes = "Invaild Username or Password!";
			} 
			else {
				$scope.myRes = "Thank You For Loggin In!";
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("name", response.data.name);
                localStorage.setItem("role", response.data.role);
				alert("Thank You For Logging In");
				$window.location.href = ("/");
			}
			//	$window.location.reload();
		})
		 .catch(function (err) {});
    }

}]);

frontApp.controller('logOutController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	localStorage.setItem("token", '');
	localStorage.setItem("name", '');
    localStorage.setItem("role", '');
	alert("You have Logged Out Successfully");
	$window.location.href = ("/");
}]);

frontApp.controller('productFrontListController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	console.log("p-called");
	 $http.get('/api/front/list')
		.then(function(response) {
			console.log(response);
			$scope.forntproducts = response.data;
		});
}]);

})();
(function(){
//Define App
var frontApp = angular.module('front-end', ['ngRoute']);
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
		.when("/login", {
			templateUrl : 'login.html',
			controller: 'loginController'
		});
	$locationProvider.html5Mode({
		enabled: true
	});

}]);

//Define Contorllers
frontApp.controller('userCtrl', function($scope) {
    $scope.user = localStorage.getItem("name");
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
			$scope.myTxt = "Thank You For Registration!";
			$window.location.reload();
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
			} else {
				$scope.myRes = "Thank You For Loggin In!";
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("name", response.data.name);
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
	alert("You have Logged Out Successfully");
	$window.location.href = ("/");
}]);

})();
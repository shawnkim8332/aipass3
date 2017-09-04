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
		.when("/login", {
			templateUrl : 'login.html',
			controller: 'loginController'
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

}]);

//Define Contorllers
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


}]);

})();
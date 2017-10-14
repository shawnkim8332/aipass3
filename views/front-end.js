(function(){
//Define App
var frontApp = angular.module('frontApp', ['ngRoute','ngResource','ngSanitize']);
//Define Config
frontApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl : 'home/home.html',
			controller: 'indexFrontController'
		})
		.when("/signup", {
			templateUrl : 'user/signup.html',
			controller: 'signUpController'
		})
		.when("/myaccount", {
			templateUrl : 'user/myaccount.html',
			controller: 'myAccountController'
		})
		.when("/logout", {
			templateUrl : 'home/home.html',
			controller: 'logOutController'
		})
		.when("/password-reset", {
			templateUrl : 'user/reset.html',
			controller: 'resetController'
		})
		.when("/email-reset", {
			templateUrl : 'user/resetpass.html',
			controller: 'resetEmailController'
		})
        .when("/food", {
            templateUrl : 'food/menu_item.html',
            controller: 'menuItemListController'
        })
		.when("/product", {
            templateUrl : 'product/productitem.html',
            controller: 'ProductController'
        })
        .when("/admin/product", {
            templateUrl : 'admin/product_list.html',
            controller: 'ProductListController'
        })
	    .when("/cart", {
            templateUrl : 'cart/shoplist.html',
            controller: 'shoplistcontroller'
        })
        .when("/admin/product/:id", {
            //templateUrl: function(params){ return 'admin/product_detail.html' + params.id; },
            templateUrl : 'admin/product_detail.html',
            controller: 'ProductDetailController'
        })
		.when("/login", {
			templateUrl : 'user/login.html',
			controller: 'loginController'
		})
        .otherwise({redirectTo:'/'});

	$locationProvider.html5Mode({
		enabled: true
	});

}]);

//Define Contorllers
frontApp.controller('userCtrl', function($scope,$rootScope) {
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
				alert("Thank You For Registration!");
				$window.location.href("/login");
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
				localStorage.setItem("email", response.data.email);
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

frontApp.controller('resetController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	$scope.resetTxt = "You have not yet clicked submit";
    $scope.resetPass = function () {
		console.log("Submit");
		var data = {
               	email : $scope.inputResetEmail,
            }
		var url = '/user/reset';
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			console.log("res: ",response);
			if(response.data == "notFound") {
				$scope.resetTxt = "No Such Email Found In DB!";
			} 
			else {
				$scope.resetTxt = "Please Check Your Email Address To get your password reset link";
			}
		})
		 .catch(function (err) {});
    }
}]);

frontApp.controller('resetEmailController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	$scope.resetEmailTxt = "You have not yet clicked submit";
    $scope.resetPassEmail = function () {
		var token = $location.search().resVal; 
		console.log("Token: "+token);
		var data = {
				token: token,
               	password : $scope.newPassword,
           }
		var url = '/user/updatepass';
		
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			console.log("res: ",response);
			if(response.data == "error") {
				$scope.resetEmailTxt = "Error Updating the password in DB";
			} 
			else {
				$scope.resetEmailTxt = "Yay!!! Password Updated!";
			}
		})
		 .catch(function (err) {}); 
    }
}]);

frontApp.controller('myAccountController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	//check user token
	var userToken = localStorage.getItem("token");
	if(userToken) {
		var data = {
				token: userToken
			}
		var url = '/front/review/userReviewList';
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			$scope.reviews = response.data;
		})
		 .catch(function (err) {});
	}
	else {
		alert("Please Login To See Your Reviews");
		$window.location.href("/");
	}
	
	//function to update reviews 
	$scope.updateReview = function (pId,updatedReview) {
		var data = {
				review : updatedReview,
				review_id : pId,
				token: userToken
			}
		var url = '/front/review/update';
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			console.log("res: ",response);
			if(response.data == "rUpdated") {
				alert("Review Updated");
				$window.location.reload();
			}
			else {
				alert("Some Error Occured Please try again Later");
			}
		})
		 .catch(function (err) {});
	};
	
	//function to delete reviews
	$scope.deleteReview = function (rId) {
		var data = {
				review_id : rId,
				token: userToken
			}
		var url = '/front/review/delete';
		$http({
			url: url, // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			console.log("res: ",response);
			if(response.data == "rDeleted") {
				alert("Review Deleted");
				$window.location.reload();
			}
			else {
				alert("Some Error Occured Please try again Later");
			}
		})
		 .catch(function (err) {});
	};
	
}]);


/* Directives */
/*
frontApp.module(['frontApp.directives']);
angular.module('frontApp.directives', [])
    .directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
}]); */

})();
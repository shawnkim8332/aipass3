//Product controller module
angular.module('frontApp').controller('ProductController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){
	
	//Fetch product list
	var productsList = "";
	$http.get('/front/product/list')
		.then(function(response) {
			productsList = response.data;
			$scope.products = productsList;
	});
	
	//fetch and print reviews for products
	$scope.reviewList = function(pid) {
		var list = JSON.parse(productsList[pid].reviewlist);
		//console.log(list);
		var reviewHtml = "";
		for (i in list) {
			reviewHtml += '<div class="review"><p class="name">By: '+list[i].user_name+'</p>';
			reviewHtml += '<p class="desc">'+list[i].description+'</p></div>';
		}
		return reviewHtml;
	};
		
	//function to add products to cart
	$scope.addToCart = function(productName,productPrice) {
		products = JSON.parse(localStorage.getItem("products"));
		if(products == null || products == "undefined" || !(products instanceof Array)) {
			var products = [];
			products.push({name:productName, price:productPrice});
			localStorage.setItem("products", JSON.stringify(products));
		} else {
			products.push({name:productName, price:productPrice});
			localStorage.setItem("products", JSON.stringify(products));
		}
		alert("Product Added to cart");
	};
	
	//function to add reviews to products
	$scope.addReview = function (pId, pReview) {
		var userToken = localStorage.getItem("token");
		if(userToken) {
			console.log("Submit review "+pId,pReview);
			var data = {
					review : pReview,
					product_id : pId,
					token: userToken
			}
			var url = '/front/review/add';
			$http({
				url: url, // No need of IP address
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).then(function (response) {
				console.log("res: ",response);
				if(response.data == "rAdded") {
					alert("Review Added");
					$window.location.reload();
				}
				else {
					alert("Some Error Occured Please try again Later");
				}
			})
			 .catch(function (err) {});
		}
		else {
			alert("Please Login To add your Review");
		}
	};
}]);

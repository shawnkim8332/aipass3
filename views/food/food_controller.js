angular.module('frontApp').controller('menuItemListController', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.divList = true;
	$scope.inputQuery = "mushroom pizza";
	$scope.searchMenu = function () {
		$scope.searchQuery = $scope.inputQuery.toString();
		var regex = new RegExp(' ', 'g');
		$scope.searchQuery = $scope.searchQuery.replace(regex, "+");
		$scope.getMenuItem('0');
	}
	
	//make search query
	$scope.getMenuItem = function (offset){
		var query = "?query="+$scope.searchQuery;
		query += "&offset="+offset;
		var params = {
			queryString : query
		}
		var url = '/api/food/menuitem';
		$http({
			url: url, // No need of IP address
			method: 'GET',
			params: params,
			headers: {'Content-Type': 'application/json'}
		}).then(function (response) {
			$scope.items = response.data.menuItems;
			$scope.offset = response.data.offset;
			$scope.lastpage = parseInt(response.data.totalMenuItems/10+1);
			$scope.totalMenuItems = response.data.totalMenuItems;
			$scope.currentpage = parseInt($scope.offset) + 1;
			$scope.divList = false;

		})
		.catch(function (err) {});
	}

	//pagnatation logic
	$scope.goToPage = function (input){
		var newOffset = parseInt($scope.offset) + parseInt(input);
		if(parseInt(newOffset) == -1){
			alert("This is the first page");
		}else if (parseInt(newOffset) == $scope.lastpage){
			alert("This is the last page");
		}else {
			$scope.getMenuItem(newOffset);
		}
	}
}]);
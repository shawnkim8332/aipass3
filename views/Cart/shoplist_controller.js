angular.module('frontApp')
    .controller('shoplistcontroller', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.products = [
                    { 'name':'Pizza Box',
                    	'price': 10,
                    	},
                    	{ 'name':'Pasta Box',
	                    	'price': 12,
	                    	},
	                    	{ 'name':'Fruit Box',
		                    	'price': 14,
		                    	},
                    ];
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
	};
}]);
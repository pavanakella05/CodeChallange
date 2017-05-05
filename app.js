'use strict';

angular.module('myApp', [])
.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.sortColumn = 'id';
	$scope.reverseSort = false;
	$scope.error = '';
	$scope.dataExist = true;

	var successCallback = function (response) {
		$scope.contents = response.data;
	};

	var errorCallback = function (response) {
		$scope.error = response.status + ': ' + 'Data ' + response.statusText;
		$scope.dataExist = false;
	};

	// Function to initiate $http service
	$scope.init = function () {
	var url = 'http://jsonplaceholder.typicode.com/posts';
	$http.get(url)
	.then(successCallback, errorCallback);
	}

	// Function to Sort Data based on Column clicked
	$scope.sortData = function (column) {
		$scope.reverseSort = ($scope.sortColumn === column) ? !$scope.reverseSort : false;
		$scope.sortColumn = column;
	}

	// Function to apply class based on condtion and boolean value
	$scope.getSortClass = function (column) {
		if ($scope.sortColumn === column) {
			return $scope.reverseSort ? 'asc-arrow' : 'desc-arrow';
		}
		return '';
	}

	$scope.init();
}]);

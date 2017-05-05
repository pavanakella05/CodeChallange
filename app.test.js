'use strict';

describe('myApp module test', function() {
	var scope, $controllerConstructor, httpWrapper;
	beforeEach(module('myApp'));
	beforeEach(inject(function ($controller, $rootScope, $injector) {
		scope = $rootScope.$new();
		httpWrapper = $injector.get('$http');
		$controllerConstructor = $controller('mainCtrl', {$scope: scope, httpWrapper: httpWrapper});
	}));

	it('should call init function and fetch data on Success', function() {
		var resData = {
			data: {
				id: '1',
				userId: '1'
			}
		};
		var response = {
			then: function (success, error) {
				if (resData.data) {
					success(resData);
				} else {
					error(resData);
				}
			}
		};
		var httpStub = sinon.stub(httpWrapper, 'get');
		httpStub.withArgs().returns(response);
		scope.init();
		expect(httpStub.withArgs().calledOnce).to.be.ok;
		httpStub.restore();
	});

	it('should call init function and fetch data on Error', function() {
		var resData = {
			status: '404',
			statusText: 'Not Found'
		};
		var response = {
			then: function (success, error) {
				if (resData.data) {
					success(resData);
				} else {
					error(resData);
				}
			}
		};
		var httpStub = sinon.stub(httpWrapper, 'get');
		httpStub.withArgs().returns(response);
		scope.dataExist = true;
		scope.init();
		expect(httpStub.withArgs().calledOnce).to.be.ok;
		expect(scope.dataExist).to.equal(false);
		httpStub.restore();
	});

    it('should handle the function sortData when column matched', function() {
		scope.reverseSort = false;
		scope.sortColumn = 'id';
		scope.sortData('id');
		expect(scope.reverseSort).to.equal(true);
	});

	it('should handle the function sortData when column not matched', function() {
		scope.reverseSort = true;
		scope.sortColumn = 'id';
		scope.sortData('userId');
		expect(scope.reverseSort).to.equal(false);
	});

	it('should handle the function getSortClass when reverseSort true', function() {
		scope.reverseSort = true;
		scope.sortColumn = 'id';
		var result = scope.getSortClass('id');
		expect(result).to.equal('asc-arrow');
	});

	it('should handle the function getSortClass when reverseSort false', function() {
		scope.reverseSort = false;
		scope.sortColumn = 'id';
		var result = scope.getSortClass('id');
		expect(result).to.equal('desc-arrow');
	});

	it('should handle the function getSortClass when column changed', function() {
		scope.reverseSort = true;
		scope.sortColumn = 'id';
		var result = scope.getSortClass('userId');
		expect(result).to.equal('');
	});

});

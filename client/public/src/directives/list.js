angular.module('worthysum')
    .directive('list', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        scope: {
            itemList:'=itemList'
			},
        templateUrl: 'src/directives/templates/list.html',
			controller: function($scope){
				console.log($scope.itemList);
			}
		}
});
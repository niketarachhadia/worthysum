angular.module('worthysum')
    .directive('itemAction', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        templateUrl: 'src/directives/templates/item-actions.html'
		}
});
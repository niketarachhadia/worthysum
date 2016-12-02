angular.module('worthysum').directive('item', function() {
   return {
       restrict: 'E',
	   scope: {
            type:'@type',
			subType:'@subType',
			item:'=item'
		},
        link: function(scope, element, attrs) {
           scope.getContentUrl = function() {
                return 'src/directives/templates/' + scope.type+'-'+scope.subType + '.html';
          }
		
       },
       template: '<div ng-include="getContentUrl()"></div>',
	   controller: function($scope){
				console.log($scope.itemList);
			}
   }
});
var wsApp=angular.module('worthysum', ['ngRoute']);

	wsApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'home'
            })  
			.otherwise({
				templateUrl : 'pages/home.html',
                controller  : 'home'
			});
    });
	
	

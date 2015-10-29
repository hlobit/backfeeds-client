(function(){

	// Declare app level module which depends on filters, and services
	angular.module('backfeeds', ['ngSanitize', 'ngResource', 'ngRoute'])
		.config(function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'templates/pages/feedbacks/new.html',
					controller: 'FeedbackNewController'
				})
				.when('/feedbacks', {
					templateUrl: 'templates/pages/feedbacks/index.html',
					controller: 'FeedbackListController'
				})
				.when('/login', {
					templateUrl: 'templates/pages/login.html'
				})
				.otherwise('/');
		})
		.run(function ($rootScope, $location, Authentication) {
	    $rootScope.$on('$routeChangeStart', function (event) {
	      if ($location.path() != '/login' && !Authentication.isLoggedIn()) {
	        event.preventDefault();
	        $location.path('/login');
	      }
	    });
		});

})();

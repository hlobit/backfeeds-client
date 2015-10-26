(function(){

  angular.module('backfeeds')
    .directive('loginForm', function(){
      return {
        restrict: 'E',
        templateUrl: '/templates/login-form.html',
        controller: function($scope, Authentication){
          $scope.user = {};
          $scope.login = Authentication.login;
        }
      };
    });

})();

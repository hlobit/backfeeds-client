(function(){

  angular.module('backfeeds')
    .directive('user', function(){
      return {
        restrict: 'E',
        templateUrl: '/templates/user.html',
        controller: function($scope){
        }
      };
    });

})();

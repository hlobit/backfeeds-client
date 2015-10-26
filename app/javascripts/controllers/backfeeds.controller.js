(function(){

  angular.module('backfeeds')
    .controller('BackfeedsController', function($scope, $location, $http, Authentication){
      $scope.go = function (path) {
        $location.path(path);
      };

      $scope.logout = Authentication.logout;

      $scope.$watch(Authentication.isLoggedIn, function (isLoggedIn) {
        $scope.isLoggedIn = isLoggedIn;
        if(isLoggedIn){
          var username = Authentication.getUsername();
          var url = "https://backfeeds.herokuapp.com/users/" + username;

          $http({ method: 'GET', url: url })
            .then(function successCallback(response) {
              $scope.user = response.data;
              $scope.user.avatar_url = "http://robohash.org/" + username + ".png?size=300x300";
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
              console.log(response);
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        }
      });
    });

})();

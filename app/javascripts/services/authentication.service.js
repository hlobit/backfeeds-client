(function(){

  angular.module('backfeeds')
    .factory('Authentication', function($window, $http, $location){
      var data = {};

      var authentication = {
        login: function(value){
          if ($window.localStorage) {
            $window.localStorage.setItem('backfeeds-username', value);
          }
          $http.defaults.headers.common.User = value;
          data.username = value;
          if($location.path() === '/login'){
            $location.path('/');
          }
        },
        logout: function(){
          if ($window.localStorage) {
            $window.localStorage.removeItem('backfeeds-username');
          }
          delete $http.defaults.headers.common.User;
          delete data.username;
          $location.path('/login');
        },
        getUsername: function(){
          return data.username;
        },
        isLoggedIn: function(){
          return data.username ? true : false;
        }
      };

      if ($window.localStorage) {
        data.username = $window.localStorage.getItem('backfeeds-username');
        if(data.username){ authentication.login(data.username); }
      }

      return authentication;
    });

})();

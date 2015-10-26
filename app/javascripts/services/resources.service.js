(function(){

  angular.module('backfeeds')
    .factory('Feedback', function($resource){
      return $resource('https://backfeeds.herokuapp.com/feedbacks/:id');
    })
    .factory('Comment', function($resource){
      return function(feedbackId) {
        return $resource('https://backfeeds.herokuapp.com/feedbacks/:feedbackId/comments/:id', { feedbackId: feedbackId });
      }
    })
    .factory('Notation', function($resource){
      return function(feedbackId) {
        return $resource('https://backfeeds.herokuapp.com/feedbacks/:feedbackId/notations/:id', { feedbackId: feedbackId });
      }
    });

})();

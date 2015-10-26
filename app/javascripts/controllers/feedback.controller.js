(function(){

  angular.module('backfeeds')
    .controller('FeedbackNewController', function($scope, Authentication, Feedback){
      $scope.isPreview = true;

      var initFeedback = function(){
        $scope.feedback = new Feedback({
          created_at: new Date(),
          useful: 9,
          user: {
            username: Authentication.getUsername()
          }
        });
      };

      initFeedback();
      $scope.addFeedback = function(){
        Feedback.save($scope.feedback, function() {
          initFeedback();
        });
      };
    })
    .controller('FeedbackListController', function($scope, Feedback, Notation){
      $scope.setNotation = function(feedback, value){
        Notation(feedback.id).save({ value: value }, function(response) {
          feedback.useful = feedback.initialUseful + value;
        });
      };

      var sum = function(items, prop){
        return items.reduce(function(a, b){
          return a + b[prop];
        }, 0);
      };

      $scope.feedbacks = Feedback.query(function(feedbacks) {
        feedbacks.forEach(function(element){
          element.useful = sum(element.notations, 'value');
          element.initialUseful = element.useful;
        });
      });
    });

})();

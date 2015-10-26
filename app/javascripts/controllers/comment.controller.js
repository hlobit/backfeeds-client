(function(){

  angular.module('backfeeds')
    .controller('CommentNewController', function($scope, Authentication, Comment){
      var initComment = function(feedback){
        $scope.comment = new Comment(feedback.id)({
          created_at: new Date(),
          user: {
            username: Authentication.getUsername()
          }
        });
      };

      $scope.addComment = function(feedback){
        Comment(feedback.id).save($scope.comment, function(response) {
          initComment(feedback);
          feedback.comments.push(response);
        });
      };
    })
    .controller('CommentListController', function($scope, Comment){
      // var sum = function(items, prop){
      //   return items.reduce(function(a, b){
      //     return a + b[prop];
      //   }, 0);
      // };
      //
      // $scope.feedbacks = Feedback.query(function(feedbacks) {
      //   feedbacks.forEach(function(element){
      //     element.useful = sum(element.notations, 'value');
      //   });
      // });
    });

})();

!function(){angular.module("backfeeds",["ngSanitize","ngResource","ngRoute"]).config(["$locationProvider","$routeProvider",function(e,t){e.hashPrefix("!"),e.html5Mode(!0),t.when("/",{templateUrl:"templates/pages/feedbacks/new.html",controller:"FeedbackNewController"}).when("/feedbacks",{templateUrl:"templates/pages/feedbacks/index.html",controller:"FeedbackListController"}).when("/login",{templateUrl:"templates/pages/login.html"}).otherwise("/")}]).run(["$rootScope","$location","Authentication",function(e,t,n){e.$on("$routeChangeStart",function(e){"/login"==t.path()||n.isLoggedIn()||(e.preventDefault(),t.path("/login"))})}])}(),function(){angular.module("backfeeds").controller("BackfeedsController",["$scope","$location","$http","Authentication",function(e,t,n,o){e.go=function(e){t.path(e)},e.logout=o.logout,e.$watch(o.isLoggedIn,function(t){if(e.isLoggedIn=t,t){var a=o.getUsername(),r="https://backfeeds.herokuapp.com/users/"+a;n({method:"GET",url:r}).then(function(t){e.user=t.data,e.user.avatar_url="http://robohash.org/"+a+".png?size=300x300"},function(e){console.log(e)})}})}])}(),function(){angular.module("backfeeds").controller("CommentNewController",["$scope","Authentication","Comment",function(e,t,n){var o=function(o){e.comment=new n(o.id)({created_at:new Date,user:{username:t.getUsername()}})};e.addComment=function(t){n(t.id).save(e.comment,function(e){o(t),t.comments.push(e)})}}]).controller("CommentListController",["$scope","Comment",function(e,t){}])}(),function(){angular.module("backfeeds").controller("FeedbackNewController",["$scope","Authentication","Feedback",function(e,t,n){e.isPreview=!0;var o=function(){e.feedback=new n({created_at:new Date,useful:9,user:{username:t.getUsername()}})};o(),e.addFeedback=function(){n.save(e.feedback,function(){o()})}}]).controller("FeedbackListController",["$scope","Feedback","Notation",function(e,t,n){e.setNotation=function(e,t){n(e.id).save({value:t},function(n){e.useful=e.initialUseful+t})};var o=function(e,t){return e.reduce(function(e,n){return e+n[t]},0)};e.feedbacks=t.query(function(e){e.forEach(function(e){e.useful=o(e.notations,"value"),e.initialUseful=e.useful})})}])}(),function(){angular.module("backfeeds").directive("loginForm",function(){return{restrict:"E",templateUrl:"templates/login-form.html",controller:["$scope","Authentication",function(e,t){e.user={},e.login=t.login}]}})}(),function(){angular.module("backfeeds").directive("user",function(){return{restrict:"E",templateUrl:"templates/user.html",controller:["$scope",function(e){}]}})}(),function(){angular.module("backfeeds").factory("Authentication",["$window","$http","$location",function(e,t,n){var o={},a={login:function(a){e.localStorage&&e.localStorage.setItem("backfeeds-username",a),t.defaults.headers.common.User=a,o.username=a,"/login"===n.path()&&n.path("/")},logout:function(){e.localStorage&&e.localStorage.removeItem("backfeeds-username"),delete t.defaults.headers.common.User,delete o.username,n.path("/login")},getUsername:function(){return o.username},isLoggedIn:function(){return o.username?!0:!1}};return e.localStorage&&(o.username=e.localStorage.getItem("backfeeds-username"),o.username&&a.login(o.username)),a}])}(),function(){angular.module("backfeeds").factory("Feedback",["$resource",function(e){return e("https://backfeeds.herokuapp.com/feedbacks/:id")}]).factory("Comment",["$resource",function(e){return function(t){return e("https://backfeeds.herokuapp.com/feedbacks/:feedbackId/comments/:id",{feedbackId:t})}}]).factory("Notation",["$resource",function(e){return function(t){return e("https://backfeeds.herokuapp.com/feedbacks/:feedbackId/notations/:id",{feedbackId:t})}}])}();
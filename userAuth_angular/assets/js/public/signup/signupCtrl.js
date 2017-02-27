angular.module('SignupMod').controller('SignupCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.runSignup = function() {
    console.log('User is sigining up');

    $http.post('/signup', {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password
    }).then(function onSuccess(res) {
      window.location = '/user';
    }).catch(function onError(err) {
      console.error('ERROR:', err);
    });
  };
}]);

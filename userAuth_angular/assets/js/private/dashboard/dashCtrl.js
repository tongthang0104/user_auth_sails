angular.module('dashMod').controller('DashCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.getUser = function() {
    $http.get('/getUser')
      .then(function onSuccess(user) {
        $scope.user = user.data;
        console.log(user.data);
      })
      .catch(function onError(err) {
        console.error('ERROR:', err);
      });
  };
}]);

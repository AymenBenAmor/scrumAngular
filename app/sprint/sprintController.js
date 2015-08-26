'use strict';

angular.module('myApp.sprint', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sprint', {
        templateUrl: 'sprint/sprintList.html',
        controller: 'sprintCtrl'
    }).when('/sprint/:sprintId', {
        templateUrl: 'sprint/sprintEdit.html',
        controller: 'sprintEditCtrl'
    }).otherwise({
        redirectTo: '/sprint'
    });
}])

.controller('sprintCtrl', ['$scope', 'Sprint', function($scope, Sprint) {
    $scope.sprints = Sprint.query();
}])
.controller('sprintEditCtrl', ['$scope', '$routeParams', '$location', 'Sprint',
        function($scope, $routeParams, $location, Sprint) {
    if($routeParams.sprintId !== 'new'){
        $scope.sprint = Sprint.getSprint({sprintId: $routeParams.sprintId});
    }
    $scope.save = function(){
        var sprints = window.localStorage.sprints ? JSON.stringify(window.localStorage.sprints) : {};
        var nextId = window.localStorage.sprints ? Sprint.query().length : 1;
        if(!$scope.sprint.id){
            $scope.sprint.id = nextId;
        }
        sprints[$scope.sprint.id] = $scope.sprint;
        window.localStorage.setItem('sprints', JSON.stringify(sprints));
        $location.path('/sprint');
    };
}]);
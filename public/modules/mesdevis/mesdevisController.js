'use strict';

angular.module('QuotationApp.masters').controller('mesdevisController', ['$scope','$http', function($scope, $http){

    $http.get('crud/mesDevisList/').success(function(data){
        console.log('All quotes List : ');
        console.dir(data);
        $scope.mesDevisList=data;
    });

}]);
'use strict';

angular.module('QuotationApp.system').controller('HeaderController', ['$scope', function($scope) {

    $scope.menu = [
        {
            'title':'Chubb United Technologies',
            'href':'/img/logo_chubb_header.png'
        },
        {
            'title':'sicli United Technologies',
            'href':'/img/logo_sicli_header.png'
        },
        {
            'title':'Marigff United Technologies',
            'href':'/img/logo_marioff_header.png'
        }
    ];

    $scope.isCollapsed = true;
}
]);

'use strict';

angular.element(document).ready(function() {

    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['QuotationApp']);
});

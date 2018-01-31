(function () {
    angular.module('perspective', [
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'ngResource',
        'md.data.table',
        'mdDataTable',
        'mdtTemplates',
        'oc.lazyLoad',
        'ui.bootstrap',
        'toaster',
        'ngIntlTelInput',
        'ngMaterialDatePicker',
        'pascalprecht.translate',
        'ngIdle',
        'ngSanitize'
    ]);
})();

function MainCtrl($scope, $state, $mdSidenav, $mdToast) {
    //will use whne this  controller as main when no other controller is required
}

angular
    .module('perspective')
    .controller('MainCtrl', MainCtrl);

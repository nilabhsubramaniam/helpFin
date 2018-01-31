/** Created by Nilabh on 22-09-2017 */
/**
 * MainCtrl - controller
 */
function MainCtrl($scope, $state, $mdSidenav, $mdToast) {
    //will shift login controller as main when no other controller is required
}

// function  modalWindowCtrl($scope, $mdDialog,dataToPass){
//     console.log('>>>>>>> '+dataToPass);
// }


function translateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.language = langKey;
    };
}


/**
 *
 * Pass all functions into module
 */
angular
    .module('perspective')
    .controller('MainCtrl', MainCtrl);

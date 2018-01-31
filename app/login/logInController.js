/** Created by Nilabh on 19-09-2017 */
function logInCtrl($scope, $rootScope, $state, $stateParams, $timeout, $window, $mdSidenav, toaster, callApiServices, dataTableService) {
    var token = dataTableService.getToken();
    $scope.username = $window.localStorage.getItem('username');
    console.log('Token login', token);
    if(!!token){
      $state.go('dashboards.product', {'id': 0, 'limit': 20, 'offset': 0, 'page': 1, 'ordering': '-name'}); 
    }

    $scope.logInFormData = {};
    $scope.errTxt = "";
    $scope.init = function () {
        this.myDate = new Date();
        this.isOpen = false;
        $scope.logInFormData = {
            username: "",
            password: ""
        };
    };

    $scope.submitLogInInfo = function () {
        $state.go('dashboardsAdmin');
    };
    //Admin controller -Need to be replaced when config done
    $scope.close = function () {
        $mdSidenav('left').close();
    };
    $scope.primaryProductQuestion = function () {
        $state.go('dashboards.productQuestions');
    };
    //Remove later OR reused it
    $scope.additionaLabel = [
        {
            _id: 0,
            newLabel: ''
        }
    ];
    $scope.addLabel = function (label) {
        var tmp = {"_id": 0, "newLabel": ''};
        tmp._id = label._id + 1;
        $scope.additionaLabel.push(tmp);
    };
    $scope.deleteLabel = function (index) {
        $scope.additionaLabel.splice(index, 1);
    };

    $scope.submit = function () {
        console.log("login", $scope.logInFormData);
        callApiServices.login($scope.logInFormData)
            .then(function (response) {
                console.log(response);
                var tokStr = 'Token ' + response.data.token;
                $window.localStorage.setItem('token', tokStr);
                $window.localStorage.setItem('username', $scope.logInFormData.username);
                dataTableService.setToken(tokStr);
                $state.go('dashboards.product', {'id': 0, 'limit' : 20, 'offset': 0, 'page': 1, 'ordering': '-name'});
            }, function (error) {
                console.log(error);

                if (error.status == 400) {
                    $scope.errTxt = "Username & Password did not match";
                    toaster.error('Entered username or password is not correct');
                }

                if (error.status == -1) {
                    toaster.error('Please check internet connection')
                }

                if(error.status == 500){
                    toaster.error('Server Error. Please try again after some time.');
                }

            });

    }

    //Log out

    $rootScope.logout = function (isLogoutClicked) {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('username');
        $window.localStorage.removeItem('is_next_quest_available');
        if(isLogoutClicked){
            toaster.success('You have been logged out successfully');
        }
        $state.go('login');
    }
}

angular.module('perspective').controller('logInCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$window', '$mdSidenav', 'toaster', 'callApiServices', 'dataTableService', logInCtrl]);
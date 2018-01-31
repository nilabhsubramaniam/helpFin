/** Created by Nilabh on 22-09-2017 */
function typeCtrl($scope, $rootScope, $state, $stateParams, $mdDialog, dataTableService, callApiServices, toaster) {
    var token = dataTableService.getToken();
    if (!!!token) {
        toaster.error("Please Login to continue");
        $state.go('login');
    } else {
        $scope.updatedText = "update";
        $scope.pageNo = $stateParams.id;
        dataTableService.setPageNo($scope.pageNo);
        var type_id = dataTableService.getTypeId();
        var category_id = dataTableService.getCategoryId();
        $scope.offset = $stateParams.offset;
        $scope.ordering = $stateParams.ordering;
        if($scope.ordering.indexOf('-') == -1){
            $scope.reverse = false;
        }
        else{
            $scope.reverse = true;
        }
        $scope.currentPage = $stateParams.page;
        $scope.pageNumbers = [10,15,20,25,30];
        var pageNoIndex = $scope.pageNumbers.indexOf(parseInt($stateParams.limit));

        $scope.setLimit = function(){
            $scope.currentPage = 1;
            $scope.changePage();
        };

        $scope.changePage = function(){
            console.log('test',$scope.currentPage);
            $state.go('dashboards.type', {'id': 0, 'limit' : $scope.viewData, 'offset': $scope.viewData * ($scope.currentPage - 1), 'page': $scope.currentPage,'ordering': $scope.ordering});
        };

        if(pageNoIndex == -1){
            $scope.viewData = $scope.pageNumbers[2];
            $scope.setLimit();
        }
        else{
            $scope.viewData = $scope.pageNumbers[pageNoIndex];
        }
        if($scope.offset !=($stateParams.page -1)*$scope.viewData ){
            if($scope.page == 0 || $scope.pageNo == 1){
                $state.go('dashboards.type', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1,'ordering': '-name'});
            }
            else {
                $state.go('dashboards.type', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-description'});
            }

        }

        if ($scope.pageNo == 0) {
            callApiServices.getType(token,$scope.viewData,$scope.offset,$scope.ordering)
                .then(function (response) {
                    console.log("response type", response);
                    $scope.tableData = response.data;
                    $scope.bigTotalItems=$scope.tableData.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();
                }, function(error){
                    console.log('error type', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Type Data ' + error.statusText);
                        $rootScope.logout();
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });
        }
        else if ($scope.pageNo == 1) {
            callApiServices.getCategoryById(token, type_id,$scope.ordering)
                .then(function (response) {
                    console.log("response category", response);
                    $scope.tableData = response.data;
                    $scope.bigTotalItems= response.data.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();
                }, function(error){
                    console.log('error cat', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Category Data ' + error.statusText);
                        $rootScope.logout();
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });
        }
        else {
            callApiServices.getCategoryLevelById(token, type_id, category_id,$scope.ordering)
                .then(function (response) {
                    console.log("response category levels", response);
                    $scope.tableData = response.data;
                    $scope.bigTotalItems= response.data.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();
                }, function(error){
                    console.log('error cat level', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Interval Data ' + error.statusText);
                        $rootScope.logout();
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });
        }
        //$scope.tableData = dataTableService.getData($scope.pageNo);
        $scope.headerTxt = dataTableService.getHeader(false);

        $scope.updatePageData = function (id, pageNo, text,ordering) {
            //dataTableService.setPageNo(pageNo);
            dataTableService.setHeader(id, text, false);
            if(pageNo == 1){
                $state.go('dashboards.type', {'id': pageNo, 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-name'});
            }else{
                $state.go('dashboards.type', {'id': pageNo, 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-description'});

            }
        };
        //pagination
        $scope.bigTotalItems=1000;
        $scope.currentPage = 1;
        // $scope.bigTotalItems = 10;
        $scope.itemsPerPage = $scope.viewData;
        $scope.maxSize = 5; //Number of pager buttons to show
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        //displaying no of  row in a record in current page
        $scope.pageChanged = function() {
            var newPage = $scope.itemsPerPage * $scope.currentPage ;
            console.log("on page ",newPage);
            console.log("big total items" ,$scope.bigTotalItems );

            if(newPage > $scope.bigTotalItems){
                $scope.toLastrow = $scope.bigTotalItems;
                console.log("big total items" ,$scope.bigTotalItems );
                console.log("to last row" ,$scope.toLastrow );
            }else{
                $scope.toLastrow =newPage;
            }
            if($scope.toLastrow === 0){
                $scope.fromFirstRow = 0
            }else{
                $scope.fromFirstRow = newPage + 1 - $scope.itemsPerPage;
            }

        };
        $scope.pageChanged();
        //Order By
        $scope.propertyName = 'name';
        $scope.sortBy = function(propertyName) {
            $scope.reverse = !$scope.reverse;
            $scope.ordering = propertyName;

            if($scope.reverse) {
                $scope.ordering = '-' + $scope.ordering;
            };
            $scope.changePage();
        };
        $scope.delete = function (id) {
            //$scope.tableData.list.splice(index, 1);
            if ($scope.pageNo == 0) {
                callApiServices.deleteType(token, id)
                    .then(function (response) {
                        console.log("delete response type", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Deleted Successfully");
                        $state.reload('dashboards.type');
                    }, function(error){
                        console.log("error callback type delete", error);

                        if(error.status == 404){
                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                            $state.reload('dashboards.type');
                        }
                        if(error.status == 500){
                            toaster.error('Server Error. Please try again after some time.');
                        }

                        if(error.status == 401){
                            toaster.error('User not authenticated');
                            $rootScope.logout();
                        }
                    })
            }
            else if ($scope.pageNo == 1) {
                callApiServices.deleteCategory(token, type_id, id)
                    .then(function (response) {
                        console.log("delete response category", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Deleted Successfully");
                        $state.reload('dashboards.type');
                    }, function(error){
                        console.log("error callback category delete", error);

                        if(error.status == 404){
                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                            $state.reload('dashboards.type');
                        }
                        if(error.status == 500){
                            toaster.error('Server Error. Please try again after some time.');
                        }

                        if(error.status == 401){
                            toaster.error('User not authenticated');
                            $rootScope.logout();
                        }
                    })
            }
            else {
                callApiServices.deleteCategoryLevel(token, type_id, category_id, id)
                    .then(function (response) {
                        console.log("delete response category level", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Deleted Successfully");
                        $state.reload('dashboards.type');
                    }, function(error){
                        console.log("error callback category level delete", error);

                        if(error.status == 404){
                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                            $state.reload('dashboards.type');
                        }
                        if(error.status == 500){
                            toaster.error('Server Error. Please try again after some time.');
                        }

                        if(error.status == 401){
                            toaster.error('User not authenticated');
                            $rootScope.logout();
                        }
                    })
            }
            //dataTableService.updateData($scope.tableData);
        };

        $scope.showConfirm = function(ev, id) {
            // Show confirm dialog before delete operation
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete '+ $scope.addTxt + '?')
                .textContent($scope.addTxt + ' will be deleted after clicking on OK')
                .targetEvent(ev)
                .ok('OK')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                $scope.delete(id);
            }, function() {
            });
        };

        $scope.back = function(id){
            if(id == 2){
                $state.go('dashboards.type', {'id': id , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-description'});
            }
            else{
                $state.go('dashboards.product', {'id': id , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-name'});
            }
        };

        $scope.showAdvanced = function (ev, status, data) {
            $mdDialog.show({
                controller: ['$scope', function($scope){
                    $scope.pageNo = $stateParams.id;
                    var type_id = dataTableService.getTypeId();
                    var category_id = dataTableService.getCategoryId();
                    $scope.addTxt = dataTableService.getAddTxt(false);
                    $scope.placeholder = $scope.addTxt + ' text';

                    if(!status) {
                        $scope.isAddBtn = false;
                        $scope.formData = JSON.parse(JSON.stringify(data));
                        console.log('data', $scope.formData);
                    }
                    else{
                       $scope.isAddBtn = true; 
                       $scope.formData = {};
                       console.log('data', $scope.formData);

                    }
                    
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    $scope.submitData = function(){

                        if($scope.isAddBtn){

                            if ($scope.pageNo == 0) {
                                var addType = {
                                    status: 1,
                                    app_type: 1,
                                    name: $scope.formData.name
                                };
                                callApiServices.addType(token, addType)
                                    .then(function (response) {
                                        console.log("added response", response);
                                        $scope.cancel();
                                        toaster.success("Added Successfully");
                                        $state.reload('dashboards.type');
                                    }, function(error){
                                        console.log('error type add ', error);
                                        $scope.cancel();

                                        if(error.status == 400){
                                            toaster.error('Enter valid input in all fields');
                                        }
                                        if(error.status == 500){
                                            toaster.error('Server Error. Please try again after some time.');
                                        }

                                        if(error.status == 401){
                                            toaster.error('User not authenticated');
                                            $rootScope.logout();
                                        }
                                    });
                            }
                            else if ($scope.pageNo == 1) {
                                var addCategory = {
                                    status: 1,//$scope.formData.status
                                    name: $scope.formData.name,
                                    type: type_id
                                };
                                callApiServices.addCategory(token, type_id, addCategory)
                                    .then(function (response) {
                                        console.log("added response", response);
                                        $scope.cancel();
                                        toaster.success("Added Successfully");
                                        $state.reload('dashboards.type');
                                    }, function(error){
                                        console.log('error category add ', error);
                                        $scope.cancel();

                                        if(error.status == 400){
                                            toaster.error('Enter valid input in all fields');
                                        }
                                        if(error.status == 500){
                                            toaster.error('Server Error. Please try again after some time.');
                                        }

                                        if(error.status == 401){
                                            toaster.error('User not authenticated');
                                            $rootScope.logout();
                                        }
                                    });
                            }
                            else {
                                var addCategoryLevel = {
                                    status: 1,//$scope.formData.status
                                    description: $scope.formData.description,
                                    value: $scope.formData.value,
                                    category: category_id

                                };
                                callApiServices.addCategoryLevel(token, type_id, category_id, addCategoryLevel)
                                    .then(function (response) {
                                        console.log("added response", response);
                                        $scope.showTable = true;
                                        $scope.ifEditButtonClicked = false;
                                        $scope.cancel();
                                        toaster.success("Added Successfully");
                                        $state.reload('dashboards.type');
                                    }, function(error){
                                        console.log('error cat level add ', error);
                                        $scope.cancel();

                                        if(error.status == 400){
                                            toaster.error('Enter valid input in all fields');
                                        }
                                        if(error.status == 500){
                                            toaster.error('Server Error. Please try again after some time.');
                                        }

                                        if(error.status == 401){
                                            toaster.error('User not authenticated');
                                            $rootScope.logout();
                                        }
                                    });
                            }
                        }
                        else{
                            var editData = $scope.formData;

                            if ($scope.pageNo == 0) {
                                callApiServices.updateType(token, editData.id, editData)
                                    .then(function (response) {
                                        console.log("updated response type", response);
                                        $scope.cancel();
                                        toaster.success("Data Updated Successfully");
                                        $state.reload('dashboards.type');
                                    }, function(error){
                                        console.log("error callback type edit update", error);
                                        $scope.cancel();
                                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                                    })
                            }
                            else if ($scope.pageNo == 1) {
                                callApiServices.updateCategory(token, type_id, editData.id, editData)
                                    .then(function (response) {
                                        console.log("updated response category", response);
                                        $scope.cancel();
                                        toaster.success("Data Updated Successfully");
                                        $state.reload('dashboards.type');
                                    }, function(error){
                                        console.log("error callback category update", error);
                                        $scope.cancel();

                                        if(error.status == 404){
                                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                                        }
                                        if(error.status == 500){
                                            toaster.error('Server Error. Please try again after some time.');
                                        }

                                        if(error.status == 401){
                                            toaster.error('User not authenticated');
                                            $rootScope.logout();
                                        }
                                    })
                            }
                            else {
                                callApiServices.updateCategoryLevel(token, type_id, category_id, editData.id, editData)
                                    .then(function (response) {
                                        console.log("updated response category level", response);
                                        $scope.cancel();
                                        toaster.success("Data Updated Successfully");
                                        $state.reload('dashboards.type');
                                    }, function(error){
                                        console.log("error callback category level edit update", error);
                                        $scope.cancel();

                                        if(error.status == 404){
                                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                                        }
                                        if(error.status == 500){
                                            toaster.error('Server Error. Please try again after some time.');
                                        }

                                        if(error.status == 401){
                                            toaster.error('User not authenticated');
                                            $rootScope.logout();
                                        }
                                    })
                            }
                        }
                    }
                }],
                templateUrl: '../../app/type/typeDialogTemplate.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
        };
    }
}

angular.module('perspective').controller('typeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdDialog', 'dataTableService', 'callApiServices', 'toaster', typeCtrl]);

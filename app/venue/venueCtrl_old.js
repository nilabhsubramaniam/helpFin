function venueCtrl($scope, $state, $stateParams, $mdDialog, $mdpDatePicker, $mdpTimePicker, dataTableService, callApiServices, toaster) {
    var token = dataTableService.getToken();
    console.log(token);
    if (!!!token) {
        toaster.error("Please Login to continue");
        //$state.go('login');
        $state.go('dashboards.venue', {'id': 0});

    }
    else {
        $scope.showTable = true;
        $scope.ifAddButtonClicked = false;
        $scope.ifEditButtonClicked = false;
        $scope.updatedText = "update";
        //$scope.pageNo = $stateParams.id;
        //dataTableService.setPageNo($scope.pageNo);
        var prod_id = dataTableService.getProdId();
        var quest_id = dataTableService.getQuestId();
        $scope.selectedType = dataTableService.getVenueType();
        $scope.selectedCategory = dataTableService.getVenueCat();
        $scope.selectedCatLevel = dataTableService.getVenueCatLvl();
        $scope.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        $scope.close = function () {
            $scope.showTable = true;
            if ($scope.ifEditButtonClicked) {
                $scope.ifEditButtonClicked = false;
            }
            else {
                $scope.ifAddButtonClicked = false;
            }
        };

        $scope.setIds = function () {
            dataTableService.setVenueType($scope.selectedType);
            dataTableService.setVenueCat($scope.selectedCategory);
            dataTableService.setVenueCatLvl($scope.selectedCatLevel);
        }

        $scope.add = function () {
            if (!!$scope.selectedCatLevel) {
                $scope.showTable = false;
                $scope.ifAddButtonClicked = true;
                $scope.setIds();
            }
            else {
                toaster.error('Select appropriate Type, category and category level');
            }

        };

        $scope.editType = function (id) {
            $scope.index = id;
            $scope.showTable = false;
            $scope.ifEditButtonClicked = true;
            $scope.editFormData = JSON.parse(JSON.stringify($scope.venues[id]));
            $scope.setIds();
        };

        $scope.editedData = function (index, id) {
            //dataTableService.updateData($scope.tableData);
            var data = $scope.editFormData;
            callApiServices.updateVenue(token, id, data)
                .then(function (response) {
                    console.log("updated response venues", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    toaster.success("Data Updated Successfully");
                    $state.reload();
                }, function (error) {
                    console.log("error callback products edit update", error);

                    if (error.status == 404) {
                        toaster.error('Venue ' + error.data.detail);
                        $state.reload();
                    }
                })
        }

        $scope.addData = function () {
            //Add new Venue
            var addVenue = {
                status: 1,
                name: $scope.addFormData.name,
                address1: $scope.addFormData.address1,
                address2: $scope.addFormData.address2,
                landmark: $scope.addFormData.landmark,
                city: $scope.addFormData.city,
                state: $scope.addFormData.state,
                country: $scope.addFormData.country,
                post_code: $scope.addFormData.post_code,
                primary_contact: $scope.addFormData.primary_contact,
                website: $scope.addFormData.website,
                contact_mail: $scope.addFormData.contact_mail,
                //logo : $scope.addFormData.logo,
                //latitude : $scope.addFormData.latitude,
                //longitude : $scope.addFormData.longitude,
                category_level: $scope.selectedCatLevel
            }

            callApiServices.addVenue(token, addVenue)
                .then(function (response) {
                    console.log("added venue response", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    toaster.success("Added Successfully");
                    $state.reload();
                }, function (error) {
                    console.log('error venue addition', error);

                    if (error.status == 400) {
                        toaster.error('Enter valid input in all fields');
                    }
                })
        };

        //date time picker
        $scope.currentDate = new Date();
        this.showDatePicker = function (ev) {
            $mdpDatePicker($scope.currentDate, {
                targetEvent: ev
            }).then(function (selectedDate) {
                $scope.currentDate = selectedDate;
            });
            ;
        };

        this.filterDate = function (date) {
            return moment(date).date() % 2 == 0;
        };

        this.showTimePicker = function (ev) {
            $mdpTimePicker($scope.currentTime, {
                targetEvent: ev
            }).then(function (selectedDate) {
                $scope.currentTime = selectedDate;
            });
            ;
        }
        $scope.delete = function (id) {
            $scope.setIds();
            callApiServices.deleteVenue(token, id)
                .then(function (response) {
                    console.log("delete response venue", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    toaster.success("Deleted Successfully");
                    $state.reload();
                }, function (error) {
                    console.log('error callback venue delete', error);
                    if (error.status == 404) {
                        toaster.error('Venue ' + error.data.detail);
                        $state.reload();
                    }
                })
        }

        $scope.showConfirm = function (ev, id) {
            // Show confirm dialog before delete operation

            var confirm = $mdDialog.confirm()
                .title('Would you like to delete ' + $scope.addTxt + '?')
                .textContent($scope.addTxt + ' will be deleted after clicking on OK')
                .targetEvent(ev)
                .ok('OK')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                $scope.delete(id);
            }, function () {
            });
        };

        $scope.back = function (id) {
            $state.go('dashboards.venue', {'id': id});
        }

        //Menu dropdown
        /*this.settings = {
          printLayout: true,
          showRuler: true,
          showSpellingSuggestions: true,
          presentationMode: 'edit'
        };
        this.sampleAction = function(name, ev) {
          $mdDialog.show($mdDialog.alert()
            .title(name)
            .textContent('You triggered the "' + name + '" action')
            .ok('Great')
            .targetEvent(ev)
          );
        };*/

        /*$scope.types =
             [
                {
                "id": 5,
                "created": "2017-10-02T08:48:24.148000Z",
                "modified": "2017-10-10T13:01:49.557527Z",
                "status": 1,
                "activate_date": "2017-10-02T08:48:24.147000Z",
                "deactivate_date": null,
                "name": "Drink & after hours"
                },
                {
                "id": 2,
                "created": "2017-10-02T08:48:24.148000Z",
                "modified": "2017-10-09T09:50:39.768395Z",
                "status": 1,
                "activate_date": "2017-10-02T08:48:24.147000Z",
                "deactivate_date": null,
                "name": "Shopping"
                },
                {
                "id": 3,
                "created": "2017-10-02T08:48:24.148000Z",
                "modified": "2017-10-02T08:48:24.148000Z",
                "status": 1,
                "activate_date": "2017-10-02T08:48:24.147000Z",
                "deactivate_date": null,
                "name": "Culture & Arts"
                },
                {
                "id": 4,
                "created": "2017-10-02T08:48:24.148000Z",
                "modified": "2017-10-02T08:48:24.148000Z",
                "status": 1,
                "activate_date": "2017-10-02T08:48:24.147000Z",
                "deactivate_date": null,
                "name": "Wine & Dine"
                },
                {
                "id": 5,
                "created": "2017-10-02T08:48:24.148000Z",
                "modified": "2017-10-02T08:48:24.148000Z",
                "status": 1,
                "activate_date": "2017-10-02T08:48:24.147000Z",
                "deactivate_date": null,
                "name": "test"
                }
            ];

        $scope.categories =
            [
                {
                "id": 11,
                "created": "2017-10-10T12:29:58.666678Z",
                "modified": "2017-10-10T12:29:58.666708Z",
                "status": 1,
                "activate_date": "2017-10-10T12:29:58.666440Z",
                "deactivate_date": null,
                "name": "testing",
                "type": 5
                },
                {
                "id": 10,
                "created": "2017-10-09T11:46:59.687531Z",
                "modified": "2017-10-09T13:10:49.131295Z",
                "status": 1,
                "activate_date": "2017-10-09T11:46:59.687376Z",
                "deactivate_date": null,
                "name": "pumagg",
                "type": 2
                }
            ];

        $scope.cat_levels =
             [
                {
                "id": 14,
                "created": "2017-10-09T13:11:09.687939Z",
                "modified": "2017-10-09T13:11:09.687966Z",
                "status": 1,
                "activate_date": "2017-10-09T13:11:09.687768Z",
                "deactivate_date": null,
                "description": "gdbc",
                "value": 4,
                "category": 10
                }
            ];*/

        //Get type data from api
        callApiServices.getType(token)
            .then(function (response) {
                console.log("response type venue", response);
                $scope.types = response.data.results;
            }, function (error) {
                console.log('error callback venue type:', error)
                if (error.status == -1) {
                    toaster.error('Please check internet connection')
                }
            });

        //get category data
        if (!!$scope.selectedType) {
            callApiServices.getCategoryById(token, $scope.selectedType)
                .then(function (response) {
                    console.log("response category venue", response);
                    $scope.categories = response.data.results;
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                });
        }
        ;

        // get category level data
        if (!!$scope.selectedCategory) {
            callApiServices.getCategoryLevelById(token, $scope.selectedType, $scope.selectedCategory)
                .then(function (response) {
                    console.log("response category levels venue", response);
                    $scope.cat_levels = response.data.results;
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                })
        }
        ;

        //get venues
        if (!!$scope.selectedCatLevel) {
            callApiServices.getVenues(token)
                .then(function (response) {
                    console.log("response venue", response);
                    $scope.venues = response.data.results;
                    $scope.noVenueFlag = true;
                    for (var i = 0; i < $scope.venues.length; i++) {
                        if ($scope.venues[i].category_level == $scope.selectedCatLevel) {
                            $scope.noVenueFlag = false;
                            break
                        }
                    }
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                });
        }
        ;


        $scope.getCategory = function () {
            console.log('Type_id venue', $scope.selectedType);

            if (!!$scope.selectedCategory) {
                $scope.categories = null;
                $scope.cat_levels = null;
                $scope.venues = null;
                $scope.selectedCategory = null;
                $scope.selectedCatLevel = null;
            }
            callApiServices.getCategoryById(token, $scope.selectedType)
                .then(function (response) {
                    console.log("response category venue", response);
                    $scope.categories = response.data.results;
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                });
        };

        $scope.getCatLevels = function () {
            console.log('Category_id venue', $scope.selectedCategory);

            if (!!$scope.selectedCatLevel) {
                $scope.cat_levels = null;
                $scope.venues = null;
                $scope.selectedCatLevel = null;
            }
            callApiServices.getCategoryLevelById(token, $scope.selectedType, $scope.selectedCategory)
                .then(function (response) {
                    console.log("response category levels venue", response);
                    $scope.cat_levels = response.data.results;
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                })
        };

        $scope.getCatLevelId = function () {
            console.log('Category_id venue', $scope.selectedCatLevel);
            callApiServices.getVenues(token)
                .then(function (response) {
                    console.log("response venue", response);
                    $scope.venues = response.data.results;
                    $scope.noVenueFlag = true;
                    for (var i = 0; i < $scope.venues.length; i++) {
                        if ($scope.venues[i].category_level == $scope.selectedCatLevel) {
                            $scope.noVenueFlag = false;
                            break
                        }
                    }
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                });
        }

        $scope.venueData =
            [
                {
                    "id": 1,
                    "place": "Modern Cafe",
                    "street": "Phadke road near phadke watch company",
                    "nr": 1,
                    "zip": "421201",
                    "city": "Dombivli",
                    "website": "www.testdaajhbngbs.com",
                    "phone": "1234567890",
                    "mail": "tset@gmail.com",
                    "filter": "xyzabc",
                    "cat_level": 14
                },
                {
                    "id": 2,
                    "place": "Taj",
                    "street": "Test road near phadke watch company",
                    "nr": 1,
                    "zip": "421201",
                    "city": "Test",
                    "website": "www.test.com",
                    "phone": "1234567890",
                    "mail": "tset@gmail.com",
                    "filter": "xyzabc",
                    "cat_level": 14
                },
                {
                    "id": 3,
                    "place": "Shalu",
                    "street": "Shilphata road near phadke watch company",
                    "nr": 1,
                    "zip": "421201",
                    "city": "Dombivli",
                    "website": "www.test.com",
                    "phone": "1234567890",
                    "mail": "tset@gmailsdasmdjnbdbn.com",
                    "filter": "xyzabc",
                    "cat_level": 14
                },
                {
                    "id": 4,
                    "place": "Modern China",
                    "street": "Station road near phadke watch company",
                    "nr": 1,
                    "zip": "421201",
                    "city": "Dombivli",
                    "website": "www.testgmaildghas.com",
                    "phone": "1234567890",
                    "mail": "tset@gmail.com",
                    "filter": "xyzabc",
                    "cat_level": 23
                },
                {
                    "id": 5,
                    "place": "Modern Kitchen",
                    "street": "Manpada road near phadke watch company",
                    "nr": 1,
                    "zip": "421201",
                    "city": "Dombivli",
                    "website": "www.testperspective.com",
                    "phone": "1234567890",
                    "mail": "tset@gmail.com",
                    "filter": "xyzabc",
                    "cat_level": 21
                },
            ];

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: venueCtrl,
                templateUrl: 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
    ;
}

angular.module('perspective').controller('venueCtrl', ['$scope', '$state', '$stateParams', '$mdDialog', '$mdpDatePicker', '$mdpTimePicker', 'dataTableService', 'callApiServices', 'toaster', venueCtrl]);

angular.module('perspective').directive('checkDirective', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {

            function myValidation(value) {
                var orderData = scope.tableData.results;

                function validate(data) {

                    if (data.q_order == value && data.status == 1) return true;
                    else return false;
                }

                if (orderData.some(validate)) {
                    mCtrl.$setValidity('orderQ', false);
                } else {
                    mCtrl.$setValidity('orderQ', true);
                }
                return value;
            }

            mCtrl.$parsers.push(myValidation);
        }
    };
});

angular.module('perspective').filter('keyboardShortcut', function ($window) {
    return function (str) {
        if (!str) return;
        var keys = str.split('-');
        var isOSX = /Mac OS X/.test($window.navigator.userAgent);
        var seperator = (!isOSX || keys.length > 2) ? '+' : '';
        var abbreviations = {
            M: isOSX ? '?' : 'Ctrl',
            A: isOSX ? 'Option' : 'Alt',
            S: 'Shift'
        };
        return keys.map(function (key, index) {
            var last = index == keys.length - 1;
            return last ? key : abbreviations[key];
        }).join(seperator);
    };
})
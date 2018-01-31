function venueCtrl($scope, $state, $stateParams, $timeout, $mdDialog,dataTableService, callApiServices, toaster,ngIntlTelInput,$location,$anchorScroll) {
    var token = dataTableService.getToken();
    console.log(token);
    if (!!!token) {
        toaster.error("Please Login to continue");
        //$state.go('login');
        $state.go('dashboards.venue', {'id': 0});

    }
    else {
        if(!!$stateParams.id || $stateParams.id == 0){
            $scope.showTable = true;
            $scope.ifAddButtonClicked = false;
            $scope.ifEditButtonClicked = false;
            $scope.ifVenueExtraClicked = false;
            $scope.ifAddVenueButton = false;
            $scope.updatedText = "update";
            $scope.addTxt = dataTableService.getAddTxt(true);
            $scope.viewData = $stateParams.limit;
            $scope.offset = $stateParams.offset;
            $scope.currentPage = $stateParams.page;
            $scope.pageNumbers = [10,15,20,25,30];
            var pageNoIndex = $scope.pageNumbers.indexOf(parseInt($stateParams.limit));
            $scope.ordering = $stateParams.ordering;

            if($scope.ordering.indexOf('-') == -1){
                if($scope.ordering == "name" ){
                    $scope.nameReverse = false;
                }
                else if($scope.ordering == "city"){
                    $scope.cityReverse = false;
                }
                else if($scope.ordering == "status"){
                    $scope.statusReverse = false;
                }
                else if ($scope.ordering == "primary_contact"){
                    $scope.primaryContactReverse = false;
                }

            }
            else{
                if($scope.ordering == "-name"){
                    $scope.nameReverse = true;

                }else if ($scope.ordering == "-city"){
                    $scope.cityReverse = true;
                }else if($scope.ordering == "-status"){
                    $scope.statusReverse = true;
                }else if ($scope.ordering == "-primary_contact"){
                    $scope.primaryContactReverse = false;
                }

            }

            $scope.setLimit = function(){
                $scope.currentPage = 1;
                $scope.changePage();
            };


            $scope.changePage = function(){
                $state.go('dashboards.venue', {'id': 0, 'limit' : $scope.viewData, 'offset': $scope.viewData * ($scope.currentPage - 1), 'page': $scope.currentPage, 'ordering': $scope.ordering});
            };

            if(pageNoIndex == -1){
                $scope.viewData = $scope.pageNumbers[2];
                $scope.setLimit();
            }
            else{
                $scope.viewData = $scope.pageNumbers[pageNoIndex];
            }
            if($scope.offset !=($stateParams.page -1)*$scope.viewData ){
                $state.go('dashboards.venue', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1,'ordering': '-name'})
            }

            //$scope.pageNo = $stateParams.id;
            //dataTableService.setPageNo($scope.pageNo);
            var prod_id = dataTableService.getProdId();
            var quest_id = dataTableService.getQuestId();
            $scope.selectedType = dataTableService.getVenueType();
            $scope.selectedCategory = dataTableService.getVenueCat();
            $scope.selectedCatLevel = dataTableService.getVenueCatLvl();


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
            };

            $scope.add = function () {
                $scope.showTable = false;
                $scope.ifAddButtonClicked = true;
                $scope.setIds();
            };

            $scope.editType = function (id) {
                $scope.index = id;
                $scope.showTable = false;
                $scope.ifEditButtonClicked = true;
                $scope.editFormData = JSON.parse(JSON.stringify($scope.venues[id]));
                console.log('Cat level edit',$scope.venues[id].category_level);
                //$scope.setIds();
                $scope.catLevelArray = $scope.venues[id].category_level;
                for(var i=0; i<$scope.venues[id].category_level.length;i++){
                    if(i>0) $scope.choices.push({});
                    $scope.choices[i].selectedCatLevel = $scope.catLevelArray[i];
                    catPos = $scope.cat_levels.findIndex( (el) => el.id === $scope.choices[i].selectedCatLevel);
                    $scope.choices[i].selectedCategory = $scope.cat_levels[catPos].category;
                    typePos = $scope.categories.findIndex( (el) => el.id === $scope.choices[i].selectedCategory);
                    $scope.choices[i].selectedType = $scope.categories[typePos].type;
                    //console.log('Choices',i,':',$scope.choices[i]);
                }
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
                        $state.reload('dashboards.venue');
                    }, function (error) {
                        console.log("error callback products edit update", error);

                        if (error.status == 404) {
                            toaster.error('Venue ' + error.data.detail);
                            $state.reload('dashboards.venue');
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
            $scope.addVenueData = false;
            $scope.addEditVenue = function(isEdit, venue_id){
                if(isEdit){
                    $state.go('dashboards.venue-edit', {'isEdit' : isEdit, 'venueid': venue_id});
                }
                else{
                    $state.go('dashboards.venue-add', {'isEdit' : isEdit});
                }
            };
            $scope.delete = function (venue_id) {
                $scope.setIds();
                callApiServices.deleteVenue(token, venue_id)
                    .then(function (response) {
                        console.log("delete response venue", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Deleted Successfully");
                        $state.reload('dashboards.venue');
                    }, function (error) {
                        console.log('error callback venue delete', error);
                        if (error.status == 404) {
                            toaster.error('Venue ' + error.data.detail);
                            $state.reload('dashboards.venue');
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

            $scope.showConfirm = function (ev, venue_id) {
                // Show confirm dialog before delete operation
                $scope.addTxt = 'this venue';
                var confirm = $mdDialog.confirm()
                    .title('Would you like to delete ' + $scope.addTxt + '?')
                    .textContent($scope.addTxt + ' will be deleted after clicking on OK')
                    .targetEvent(ev)
                    .ok('OK')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function () {
                    $scope.delete(venue_id);
                }, function () {
                });
            };

            $scope.back = function (id) {
                $state.go('dashboards.venue', {'id': id});
            }


            //get venues
            $scope.descriptions = ['woogee','deli'];
            callApiServices.getVenues(token, $scope.viewData,$scope.offset,$scope.ordering)
                .then(function (response) {
                    console.log("response venue", response);
                    $scope.venues = response.data.results;
                    $scope.openingHours = $scope.venues.openinghour_set;
                    $scope.descriptions= $scope.venues.venuedescription_set;
                    console.log("description set",$scope.venuedescription_set);
                    $scope.bigTotalItems = response.data.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();
                }, function (error) {
                    console.log('error callback venue type:', error);
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });



            //pagination
            $scope.bigTotalItems=1000;
            console.log("currentPage",$scope.currentPage);
            // $scope.bigTotalItems = 10;
            $scope.itemsPerPage = $scope.viewData;
            $scope.maxSize = 5; //Number of pager buttons to show
            /*$scope.setPage = function (pageNo) {
                console.log('set page');
                $scope.currentPage = pageNo;
            };*/
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
            //orderby
            $scope.propertyName = 'name';
            $scope.sortBy = function(propertyName) {

                $scope.ordering = propertyName;

                if(propertyName == "name"){
                    $scope.nameReverse = !$scope.nameReverse;

                    if($scope.nameReverse) {
                        $scope.ordering = '-' + $scope.ordering;
                    };
                }
                else if(propertyName == "city"){
                    $scope.cityReverse = !$scope.cityReverse;

                    if($scope.cityReverse) {
                        $scope.ordering = '-' + $scope.ordering;

                    }
                }
                else if(propertyName == "status"){
                    $scope.statusReverse = !$scope.statusReverse;

                    if($scope.statusReverse) {
                        $scope.ordering = '-' + $scope.ordering;
                    };
                }
                else{
                    if(propertyName == "primary_contact"){
                        $scope.primaryContactReverse = !$scope.primaryContactReverse;
                        if($scope.primaryContactReverse){
                            $scope.ordering = '-' + $scope.ordering;
                        }
                    }

                }

                $scope.changePage();
            };

            $scope.ifAddButtonClicked = true;
            $scope.addVenue = function (status) {
                $scope.formData = {};

                //date time picker
                $scope.time = {
                    twelve: new Date(),
                    twentyfour: new Date()
                };

                $scope.submitVenueData = function(){
                        console.log('it is being called here');
                    if($scope.isAddBtn){

                        //Description json array

                        var venuedescription_set = [{"app_type": 1, "description": formData.venuedescription_set[0].description}, {"app_type": 2, "description": formData.venuedescription_set[1].description}]

                        //Add new Venue
                        var addVenue = {
                            status: 1,
                            name: $scope.formData.name,
                            address1: $scope.formData.address1,
                            address2: $scope.formData.address2,
                            landmark: $scope.formData.landmark,
                            city: $scope.formData.city,
                            state: $scope.formData.state,
                            country: $scope.formData.country,
                            post_code: $scope.formData.post_code,
                            primary_contact: $scope.formData.primary_contact,
                            website: $scope.formData.website,
                            contact_mail: $scope.formData.contact_mail,
                            //logo : $scope.addFormData.logo,
                            //latitude : $scope.addFormData.latitude,
                            //longitude : $scope.addFormData.longitude,
                            category_level: $scope.catLevelArray
                        }

                        callApiServices.addVenue(token, addVenue)
                            .then(function (response) {
                                console.log("added venue response", response);
                                $scope.cancel();
                                toaster.success("Added Successfully");
                                $state.reload('dashboards.venue');
                            }, function (error) {
                                console.log('error venue addition', error);
                                $scope.cancel();

                                if (error.status == 400) {
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
                    else{
                        var id = $scope.formData.openinghour_set[0].venue;
                        var editVenue = {
                            status: 1,
                            name: $scope.formData.name,
                            address1: $scope.formData.address1,
                            address2: $scope.formData.address2,
                            landmark: $scope.formData.landmark,
                            city: $scope.formData.city,
                            state: $scope.formData.state,
                            country: $scope.formData.country,
                            post_code: $scope.formData.post_code,
                            public_access:$scope.formData.public_access,
                            seconday_contact:$scope.formData.seconday_contact,
                            primary_contact: $scope.formData.primary_contact,
                            website: $scope.formData.website,
                            contact_mail: $scope.formData.contact_mail,
                            //logo : $scope.addFormData.logo,
                            //latitude : $scope.addFormData.latitude,
                            //longitude : $scope.addFormData.longitude,
                            category_level: $scope.catLevelArray
                        }

                        callApiServices.updateVenue(token, id, editVenue)
                            .then(function (response) {
                                console.log("updated response venues", response);
                                $scope.cancel();
                                toaster.success("Data Updated Successfully");
                                $state.reload('dashboards.venue');
                            }, function (error) {
                                console.log("error callback products edit update", error);
                                $scope.cancel();

                                if (error.status == 404) {
                                    toaster.error('Venue ' + error.data.detail);
                                    $state.reload('dashboards.venue');
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
                };

                function editStatus(){
                    console.log($scope.types,$scope.categories, $scope.cat_levels,checkFlag, status);
                    if(!status && !!$scope.types && !!$scope.categories && !!$scope.cat_levels && checkFlag){
                        checkFlag = false;
                        for(var i=0; i<$scope.formData.category_level.length;i++){
                            if(i>0) $scope.formData.choices.push({});
                            $scope.formData.choices[i].selectedCatLevel = $scope.catLevelArray[i];
                            catPos = $scope.cat_levels.findIndex( (el) => el.id === $scope.formData.choices[i].selectedCatLevel);
                            $scope.formData.choices[i].selectedCategory = $scope.cat_levels[catPos].category;
                            typePos = $scope.categories.findIndex( (el) => el.id === $scope.formData.choices[i].selectedCategory);
                            $scope.formData.choices[i].selectedType = $scope.categories[typePos].type;
                            //console.log('Choices',i,':',$scope.choices[i]);
                        }
                    }
                }
            };



            //Venue Opening Hours

            $scope.openingHours = function (ev, status, data) {
                $mdDialog.show({
                    controller: ['$scope', '$timeout', function($scope, $timeout){
                        $scope.pageNo = $stateParams.id;
                        $scope.selectedType = dataTableService.getVenueType();

                    }],
                    templateUrl: '../../app/venue/openingHourTemplate.html',
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
            //Venue Extra Info
            $scope.venueExtraInfo = function(data){
                $scope.editFormData = data.venueextra;
                $scope.ifVenueExtraClicked = true;
            };
            $scope.closeVenueExtra = function (){
                $scope.ifVenueExtraClicked = false;
            };

            //updating venue Extra
            $scope.addVenueEditData = function(){
                callApiServices.addVenue(token, $scope.editFormData.venue, $scope.editFormData)
                    .then(function(response){
                        console.log("added venue response", response);
                        toaster.success("Added Successfully");
                        $state.reload('dashboards.venue');
                    }, function(error){
                        console.log('error venue add ', error);
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
            };
        }
        else{

            $scope.isEdit = parseInt($stateParams.isEdit);
            $scope.catLevelArray = [];
            var catPos = null;
            var typePos = null;
            var checkFlag = true;
            $scope.formData = {};
            $scope.formData.choices = [{ selectedType: "", selectedCategory:"", selectedCatLevel:""  }];
            console.log("$stateParams", $stateParams);
            $scope.classification = ['Woogee', 'Deli']


            if($scope.isEdit){
                var url = 'venues/' + $stateParams.venueid + '/';
                callApiServices.get(token, url)
                    .then(function(response){
                        $scope.formData = response.data;
                        $scope.formData.choices = [{ selectedType: "", selectedCategory:"", selectedCatLevel:"" }];
                        console.log('data', $scope.formData);
                        $scope.catLevelArray = $scope.formData.category_level;
                        console.log('Array',$scope.catLevelArr);

                    }, function(error){

                    })
            }

            //Get type data from api
            callApiServices.getType(token)
                .then(function (response) {
                    console.log("response type venue", response);
                    $scope.types = response.data.results;

                    if($scope.isEdit){
                        editStatus();
                    }
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });

            //Get category data from api
            callApiServices.getCategory(token)
                .then(function (response) {
                    console.log("response all category  venue", response);
                    $scope.categories = response.data.results;

                    if($scope.isEdit){
                        editStatus();
                    }
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });

            //Get category-level data from api
            callApiServices.getCategoryLevel(token)
                .then(function (response) {
                    console.log("response all cat level venue", response);
                    $scope.cat_levels = response.data.results;

                    if($scope.isEdit){
                        editStatus();
                    }
                }, function (error) {
                    console.log('error callback venue type:', error)
                    if (error.status == -1) {
                        toaster.error('Please check internet connection')
                    }
                    if(error.status == 500){
                        toaster.error('Server Error. Please try again after some time.');
                    }

                    if(error.status == 401){
                        toaster.error('User not authenticated');
                        $rootScope.logout();
                    }
                });

            $scope.getCatLevelId = function (index) {
                if($scope.catLevelArray.indexOf($scope.formData.choices[index].selectedCatLevel) == -1){
                    console.log('Category_id venue', $scope.formData.choices[index].selectedCatLevel);
                    $scope.catLevelArray[index] = $scope.formData.choices[index].selectedCatLevel;
                    console.log('Category Level Array : ', $scope.catLevelArray);
                }
                else{
                    $scope.formData.choices[index].selectedCatLevel = "";
                    toaster.error('Level already selected. Please select different Category Level');
                }
            };

            $scope.addSelectCat = function(index){

                if(!!$scope.formData.choices[index].selectedCatLevel && !!$scope.formData.choices[index].selectedCategory && !!$scope.formData.choices[index].selectedType){
                    $scope.formData.choices.push({});
                }
                else{
                    toaster.error('Please select appropriate Category Level and then add new');
                }
                console.log('Add Choices', $scope.formData.choices);
            };

            $scope.removeSelectCat = function(index){

                $scope.formData.choices.splice(index, 1);
                $scope.catLevelArray.splice(index, 1);
                console.log('Remove Choices: ', $scope.formData.choices);
                console.log('Remove Choices Arraty: ', $scope.catLevelArray);
            };

            $scope.reset = function (index, type) {
                //type = 1 indicaates type
                //type = 0 indicates category
                $scope.formData.choices[index].selectedCatLevel = null;
                if (type) {
                    $scope.formData.choices[index].selectedCategory = null;
                }
                console.log('Data reset:', $scope.formData.choices);
            };

            function editStatus(){
                console.log($scope.types,$scope.categories, $scope.cat_levels,checkFlag, status);
                if(!status && !!$scope.types && !!$scope.categories && !!$scope.cat_levels && checkFlag){
                    checkFlag = false;
                    for(var i=0; i<$scope.formData.category_level.length;i++){
                        if(i>0) $scope.formData.choices.push({});
                        $scope.formData.choices[i].selectedCatLevel = $scope.catLevelArray[i];
                        catPos = $scope.cat_levels.findIndex( (el) => el.id === $scope.formData.choices[i].selectedCatLevel);
                        $scope.formData.choices[i].selectedCategory = $scope.cat_levels[catPos].category;
                        typePos = $scope.categories.findIndex( (el) => el.id === $scope.formData.choices[i].selectedCategory);
                        $scope.formData.choices[i].selectedType = $scope.categories[typePos].type;
                        //console.log('Choices',i,':',$scope.choices[i]);
                    }
                }
            }

            $scope.opening_hour = [];
            $scope.days_and_date = {"1":"Sun","2":"Mon","3":"Tue","4":"Wed","5":"Thu","6":"Fri","7":"San"};
            angular.forEach($scope.days_and_date, function(value, key){
                var test = {
                    "day": key,
                    "start_time": "00:00:00",
                    "end_time": "11:00:00",
                    "break_start_time": null,
                    "break_end_time": null
                };
                $scope.opening_hour.push(test);
            });

            if($scope.isEdit){
                $scope.scrollTo = function(hash){
                    // var newHash = 'anchor' + x;
                    // if ($location.hash() !== newHash) {
                    //     // set the $location.hash to `newHash` and
                    //     // $anchorScroll will automatically scroll to it
                    //     $location.hash('anchor' + x);
                    // } else {
                    //     // call $anchorScroll() explicitly,
                    //     // since $location.hash hasn't changed
                    //     $anchorScroll();
                    // }
                    location.hash = "#" + hash;
                    $anchorScroll();
                };
                //Store venue id and call api accordingly for getting data and assign it to $scope.formData
                $scope.venueId = $stateParams.venue_id;
                //Geo-location
                function myMap() {
                    var mapProp= {
                        center:new google.maps.LatLng(51.508742,-0.120850),
                        zoom:5,
                    };
                    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
                }
                //Geo-location
                $scope.displayMap =function () {
                    document.getElementById('source_map').style.display="block";
                    initialize();
                };
                var map;
                var marker;
                var latLngC;

                function initialize()
                {
                    latLngC = new google.maps.LatLng(19.0674, 72.8339);
                    var mapOptions = {
                        center: latLngC,
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    map = new google.maps.Map(document.getElementById('source_map'),
                        mapOptions);

                    var marker = new google.maps.Marker({
                        position: latLngC,
                        map: map,
                        draggable: true
                    });

                    google.maps.event.addListener(marker, 'dragend', function (x)
                    {
                        document.getElementById('src_lat').value = x.latLng.lat();
                        document.getElementById('src_long').value = x.latLng.lng();
                        document.getElementById('location_coordinates').innerHTML = x.latLng.lat()+' , '+x.latLng.lng();
                        console.log("latitude",x.latLng.lat());
                        console.log("longitude",x.latLng.lng());
                        var geocoder = new google.maps.Geocoder;
                        var infowindow = new google.maps.InfoWindow;
                        geocodeLatLng(geocoder, map, infowindow,x.latLng.lat(),x.latLng.lng(),'source_point');
                    });

                    //Get coordinates,address Upon clicking a location in map (Source Map)
                    google.maps.event.addListener(map, 'click', function(x)
                    {
                        document.getElementById('src_lat').value = x.latLng.lat();
                        document.getElementById('src_long').value = x.latLng.lng();
                        document.getElementById('location_coordinates').innerHTML = x.latLng.lat()+' , '+x.latLng.lng();
                        console.log("latitude",x.latLng.lat());
                        console.log("longitude",x.latLng.lng());
                        var geocoder = new google.maps.Geocoder;
                        var infowindow = new google.maps.InfoWindow;
                        geocodeLatLng(geocoder, map, infowindow,x.latLng.lat(),x.latLng.lng(),'source_point');
                    });

                    //Add marker upon clicking on map
                    //google.maps.event.addDomListener(map, 'click', addMarker);
                    google.maps.event.addDomListener(map, 'click', function() { addMarker(map); });
                    var places1 = new google.maps.places.Autocomplete(document.getElementById('source_point'));
                    google.maps.event.addListener(places1, 'place_changed', function () {
                        var place1 = places1.getPlace();
                        var src_addr = place1.formatted_address;
                        var src_lat = place1.geometry.location.lat();
                        var src_long = place1.geometry.location.lng();

                        var message1 = "Address: " + src_addr;
                        message1 += "\nLatitude: " + src_lat;
                        message1 += "\nLongitude: " + src_long;

                        document.getElementById('src_lat').value = src_lat;
                        document.getElementById('src_long').value = src_long;
                        document.getElementById('location_coordinates').innerHTML = src_lat+' , '+src_long;
                    });
                    //Add marker upon place change
                    //google.maps.event.addDomListener(places1, 'place_changed', addMarker);
                    google.maps.event.addDomListener(places1, 'place_changed', function() { addMarker(map); });

                }
                window.setTimeout(function(){
                    google.maps.event.addDomListener(window,'resize',initialize);
                },100);

                google.maps.event.addDomListener(window, 'load', initialize);

                //Function to add marker upon clicking on a location in map
                function addMarker(map)
                {
                    var lat = document.getElementById('src_lat').value;
                    var loong = document.getElementById('src_long').value;
                    if(!lat || !loong) return;

                    var coordinate = new google.maps.LatLng(lat, loong);

                    if (marker)
                    {
                        //if marker already was created change positon
                        marker.setPosition(coordinate);
                        map.setCenter(coordinate);
                        map.setZoom(18);

                        google.maps.event.addListener(marker, 'dragend', function (x)
                        {
                            document.getElementById('src_lat').value = x.latLng.lat();
                            document.getElementById('src_long').value = x.latLng.lng();
                            document.getElementById('location_coordinates').innerHTML = x.latLng.lat()+' , '+x.latLng.lng();
                            var geocoder = new google.maps.Geocoder;
                            var infowindow = new google.maps.InfoWindow;
                            geocodeLatLng(geocoder, map, infowindow,x.latLng.lat(),x.latLng.lng(),'source_point');
                        });
                    }
                    else
                    {
                        //create a marker
                        marker = new google.maps.Marker({
                            position: coordinate,
                            map: map,
                            draggable: true
                        });
                        map.setCenter(coordinate);
                        map.setZoom(18);

                        google.maps.event.addListener(marker, 'dragend', function (x)
                        {
                            document.getElementById('src_lat').value = x.latLng.lat();
                            document.getElementById('src_long').value = x.latLng.lng();
                            document.getElementById('location_coordinates').innerHTML = x.latLng.lat()+' , '+x.latLng.lng();
                            var geocoder = new google.maps.Geocoder;
                            var infowindow = new google.maps.InfoWindow;
                            geocodeLatLng(geocoder, map, infowindow,x.latLng.lat(),x.latLng.lng(),'source_point');
                        });
                    }
                }


                //To Calculate address from coordinates
                function geocodeLatLng(geocoder, map, infowindow,latt,longg,addr_div)
                {
                    var latlng = {lat: parseFloat(latt), lng: parseFloat(longg)};
                    geocoder.geocode({'location': latlng}, function(results, status)
                    {
                        if (status === google.maps.GeocoderStatus.OK)
                        {

                            if (results[1])
                            {
                                document.getElementById(addr_div).value= results[1].formatted_address;
                            }
                            else
                            {
                                window.alert('No results found');
                            }
                        }
                        else
                        {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                }
                //Opening hour
                $scope.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                $scope.openingHour = {};

                $scope.updateEditHours = function(index, id){
                    $scope.opening_hour[index].day = $scope.formData.openinghour_set[index].day;
                    if(!!$scope.formData.openinghour_set[index].start_time){
                        $scope.opening_hour[index].start_time = getTimeString($scope.formData.openinghour_set[index].start_time);
                    }
                    else{
                        $scope.opening_hour[index].start_time =  $scope.formData.openinghour_set[index].start_time;
                    }

                    if(!!$scope.formData.openinghour_set[index].break_start_time){
                        $scope.opening_hour[index].break_start_time = getTimeString( $scope.formData.openinghour_set[index].break_start_time);
                    }
                    else{
                        $scope.opening_hour[index].break_start_time =  $scope.formData.openinghour_set[index].break_start_time;
                    }

                    if(!!$scope.formData.openinghour_set[index].break_end_time){
                        $scope.opening_hour[index].break_end_time = getTimeString( $scope.formData.openinghour_set[index].break_end_time);
                    }
                    else{
                        $scope.opening_hour[index].break_end_time =  $scope.formData.openinghour_set[index].break_end_time;
                    }

                    if(!!$scope.formData.openinghour_set[index].end_time){
                        $scope.opening_hour[index].end_time = getTimeString( $scope.formData.openinghour_set[index].end_time);
                    }
                    else {
                        $scope.opening_hour[index].end_time = $scope.formData.openinghour_set[index].end_time;
                    }
                };


                function getTimeString(time){

                    if(typeof time.getHours === 'function'){
                        var timeStr = "";
                        if(time.getHours()/10){
                            timeStr += time.getHours() + ":";
                        }
                        else{
                            timeStr += "0" + time.getHours() + ":";
                        }

                        if(time.getMinutes()/10){
                            timeStr += time.getMinutes() + ":";
                        }
                        else{
                            timeStr += "0" + time.getMinutes() + ":";
                        }

                        if(time.getSeconds()/10){
                            timeStr += time.getSeconds();
                        }
                        else{
                            timeStr += "0" + time.getSeconds();

                        }
                        //var timeStr = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                        return timeStr;
                    }
                    else{
                        return time._i;
                    }

                }

            }
            else{
                $scope.formData = {};
                $scope.formData.openinghour_set = [];
                $scope.formData.venuedescription_set = [{"app_type": 1, "description": ''}, {"app_type": 2, "description": ''}];
                $scope.formData.choices = [{ selectedType: "", selectedCategory:"", selectedCatLevel:""  }];
                $scope.formData.venueextra = {
                    "seconday_contact" : $scope.formData.seconday_contact ,
                    "public_access" : $scope.formData.public_access
                };

                $scope.updateEditHours = function(index, id){
                    $scope.opening_hour[index].day = $scope.formData.openinghour_set[index].day;
                    if(!!$scope.formData.openinghour_set[index].start_time){
                        $scope.opening_hour[index].start_time = getTimeString($scope.formData.openinghour_set[index].start_time);
                    }
                    else{
                        $scope.opening_hour[index].start_time =  $scope.formData.openinghour_set[index].start_time;
                    }

                    if(!!$scope.formData.openinghour_set[index].break_start_time){
                        $scope.opening_hour[index].break_start_time = getTimeString( $scope.formData.openinghour_set[index].break_start_time);
                    }
                    else{
                        $scope.opening_hour[index].break_start_time =  $scope.formData.openinghour_set[index].break_start_time;
                    }

                    if(!!$scope.formData.openinghour_set[index].break_end_time){
                        $scope.opening_hour[index].break_end_time = getTimeString( $scope.formData.openinghour_set[index].break_end_time);
                    }
                    else{
                        $scope.opening_hour[index].break_end_time =  $scope.formData.openinghour_set[index].break_end_time;
                    }

                    if(!!$scope.formData.openinghour_set[index].end_time){
                        $scope.opening_hour[index].end_time = getTimeString( $scope.formData.openinghour_set[index].end_time);
                    }
                    else {
                        $scope.opening_hour[index].end_time = $scope.formData.openinghour_set[index].end_time;
                    }
                };

                function getTimeString(time){

                    if(typeof time.getHours === 'function'){
                        var timeStr = "";
                        if(time.getHours()/10){
                            timeStr += time.getHours() + ":";
                        }
                        else{
                            timeStr += "0" + time.getHours() + ":";
                        }

                        if(time.getMinutes()/10){
                            timeStr += time.getMinutes() + ":";
                        }
                        else{
                            timeStr += "0" + time.getMinutes() + ":";
                        }

                        if(time.getSeconds()/10){
                            timeStr += time.getSeconds();
                        }
                        else{
                            timeStr += "0" + time.getSeconds();

                        }
                        //var timeStr = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                        return timeStr;
                    }
                    else{
                        return time._i;
                    }

                }
                $scope.opening_hour = [];
                angular.forEach($scope.days_and_date, function(value, key){
                    var test = {
                        "id":key,
                        "day": key,
                        "start_time": "00:00:00",
                        "end_time": "11:00:00",
                        "break_start_time": null,
                        "break_end_time": null
                    };
                    $scope.opening_hour.push(test);
                    $scope.formData.openinghour_set.push(test);
                    $scope.updateEditHours(key-1,key);
                    $scope.formData.openinghour_set[key-1] = $scope.opening_hour[key-1];
                });

                $scope.submitVenueData = function(){
                    var addData = {
                        status: 1,
                        name: $scope.formData.name,
                        address1: $scope.formData.address1,
                        address2: $scope.formData.address2,
                        landmark: $scope.formData.landmark,
                        city: $scope.formData.city,
                        state: $scope.formData.state,
                        country: $scope.formData.country,
                        post_code: $scope.formData.post_code,
                        public_access:$scope.formData.public_access,
                        primary_contact: $scope.formData.primary_contact,
                        seconday_contact:$scope.formData.seconday_contact,
                        website: $scope.formData.website,
                        contact_mail: $scope.formData.contact_mail,
                        venuedescription_set : $scope.formData.venuedescription_set,
                        venueextra: $scope.formData.venueextra,
                        openinghour_set:$scope.opening_hour,

                        //logo : $scope.addFormData.logo,
                        //latitude : $scope.addFormData.latitude,
                        //longitude : $scope.addFormData.longitude,
                        category_level: $scope.catLevelArray
                    };

                    console.log('Add data:', addData);
                    //api for add venue
                    callApiServices.addVenue(token, addData)
                        .then(function (response) {
                            console.log("added venue response", response);
                            toaster.success("Added Successfully");
                            $state.reload('dashboards.venue');
                        }, function (error) {
                            console.log('error venue addition', error);
                            if (error.status == 400) {
                                toaster.error('Enter valid input in all fields');
                            }
                            if (error.status == 500) {
                                toaster.error('Server Error. Please try again after some time.');
                            }

                            if (error.status == 401) {
                                toaster.error('User not authenticated');
                                $rootScope.logout();
                            }
                        });
                }
            }
        }
    }
}

angular.module('perspective').controller('venueCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$mdDialog', 'dataTableService', 'callApiServices', 'toaster', 'ngIntlTelInput', '$anchorScroll', venueCtrl]);

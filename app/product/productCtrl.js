function productCtrl($scope, $rootScope, $state, $stateParams, $window, $mdDialog, dataTableService, callApiServices, toaster,$filter) {
    var token = dataTableService.getToken();
    console.log(token);
    if(!!!token) {
        toaster.error("Please Login to continue");
        $state.go('login');
    }
    else{
        $scope.pageNo = $stateParams.id;
        $scope.search = {};
        $scope.ifRuleClicked = false;
        dataTableService.setPageNo($scope.pageNo);
        var prod_id = dataTableService.getProdId();
        var prodRule_id = dataTableService.getProdRuleId();
        var quest_id = dataTableService.getQuestId();
        var rule_level_count = null;
        var searchUrl = null;
        $scope.tooltipTxt = dataTableService.getAddTxt(true);

        if($scope.pageNo != 2){
            $scope.tooltipTxt = dataTableService.getAddTxt(true);
        }
        else{
            $scope.tooltipTxt = 'Choice';
        }

        //Rules Data variables
        $scope.rules = [];
        $scope.selectedType = dataTableService.getRuleType();
        var ruleObj = {
            choices: "",
            status: 0,
            id: 0,
            category_count: 0
        };
        var i,j;
        var choicesArray = [];
        var rule_level_prop = [];
        var rule_level_count;
        var choiceIndex = null;
        var choiceTxt = null;
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
            $state.go('dashboards.product', {'id': $scope.pageNo, 'limit' : $scope.viewData, 'offset': $scope.viewData * ($scope.currentPage - 1), 'page': $scope.currentPage, 'ordering': $scope.ordering});
        };

        if(pageNoIndex == -1){
            $scope.viewData = $scope.pageNumbers[2];
            $scope.setLimit();
        }
        else{
            $scope.viewData = $scope.pageNumbers[pageNoIndex];
        };

        if($scope.offset !=($stateParams.page -1)*$scope.viewData ){
            if($scope.page == 0){
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-name'});
            }
            else if($scope.pageNo == 1){
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-q_text'});
            }
            else if($scope.pageNo == 2){
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-choice_text'});
            }
            else{
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-status'});
            }
        };

        if($scope.pageNo == 0){
            callApiServices.getProducts(token, $scope.viewData,$scope.offset,$scope.ordering)
                .then(function(response){
                    console.log("response products:", response);
                    $scope.tableData = response.data;
                    $scope.bigTotalItems = $scope.tableData.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();

                }, function(error){
                    console.log('error prod', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Product Data ' + error.statusText);
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
        else if($scope.pageNo == 1){
            callApiServices.getQuestionsById(token, prod_id, $scope.viewData,$scope.offset,$scope.ordering)
                .then(function(response){
                    console.log("response questions",response);
                    $scope.isTableLoading = false;
                    $scope.tableData = response.data;
                    $scope.bigTotalItems = $scope.tableData.count;
                    $scope.pageChanged();

                }, function(error){
                    console.log('error quest', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Question Data ' + error.statusText);
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
        else if($scope.pageNo == 3){

            //Get choices data
            callApiServices.getChoicesByStatus(token)
                .then(function(response){
                    console.log('Choices Data Rules:', response.data);
                    $scope.choices = response.data.results;
                    if(!!$scope.choices && !!$scope.productRuleData){
                        console.log('choice if');
                        $scope.isTableLoading = false;
                        generateRules($scope.productRuleData);
                        $scope.pageChanged();
                    };

                }, function(error){
                    console.log('error rule', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Rule Data ' + error.statusText);
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

            callApiServices.getProductRulesById(token, prodRule_id, $scope.viewData,$scope.offset, $scope.ordering)
                .then(function(response){
                    console.log("product Rules",response);
                    $scope.productRuleData = response.data.results;
                    $scope.bigTotalItems = response.data.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();

                    if(!!$scope.choices && !!$scope.productRuleData){
                        console.log('choice if');
                        generateRules($scope.productRuleData);
                    };

                }, function(error){
                    console.log("error data" ,error);
                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }
                    if(error.status == 404){
                        toaster.error('Product rules Data ' + error.statusText);
                        $rootScope.logout();
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
            callApiServices.getChoicesById(token, prod_id, quest_id, $scope.viewData,$scope.offset,$scope.ordering)
                .then(function(response){
                    console.log("response choices",response);
                    $scope.tableData = response.data;
                    $scope.bigTotalItems = $scope.tableData.count;
                    $scope.isTableLoading = false;
                    $scope.pageChanged();

                }, function(error){
                    console.log('error choice', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Choice Data ' + error.statusText);
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

        //pagination
        $scope.bigTotalItems=1000;
        console.log("currentPage",$scope.currentPage);
        $scope.itemsPerPage = $scope.viewData;
        $scope.maxSize = 5; //Number of pager buttons to show

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
            $scope.reverse = !$scope.reverse;
            $scope.ordering = propertyName;

            if($scope.reverse) {
                $scope.ordering = '-' + $scope.ordering;
            };
            $scope.changePage();
        };
        //Apply filters i.e. search functionality
        $scope.filterData = function(){
            console.log('Filter function', $scope.search);
            if($scope.search.name == undefined){
                $scope.search.name = "";
            }

            if($scope.search.status == undefined){
                $scope.search.status = "";
            }

            if($scope.pageNo == 0){

                if($scope.search.app_type == undefined){
                    $scope.search.app_type = "";
                }

                searchUrl = 'products/?name__icontains=' + $scope.search.name + '&status=' + $scope.search.status + '&app_type__in=' + $scope.search.app_type;
                callApiServices.get(token, searchUrl)
                .then(function(response){
                    $scope.tableData = response.data;
                    $scope.bigTotalItems = $scope.tableData.count;
                    $scope.pageChanged();                 
                }, function(error){
                    console.log('error filter', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Choice Data ' + error.statusText);
                        $rootScope.logout();
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
            else if($scope.pageNo == 1){
                searchUrl = 'products/' + prod_id + '/questions/?q_text__icontains=' + $scope.search.name + '&status=' + $scope.search.status;
                callApiServices.get(token, searchUrl)
                .then(function(response){
                    $scope.tableData = response.data;
                    $scope.bigTotalItems = $scope.tableData.count;
                    $scope.pageChanged();
                    
                }, function(error){
                    console.log('error filter', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Choice Data ' + error.statusText);
                        $rootScope.logout();
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
            else if($scope.pageNo == 2){
                searchUrl = 'products/' + prod_id + '/' + quest_id + '/choices/?choice_text__icontains=' + $scope.search.name + '&status=' + $scope.search.status;
                callApiServices.get(token, searchUrl)
                .then(function(response){
                    $scope.tableData = response.data;
                    $scope.bigTotalItems = $scope.tableData.count;
                    $scope.pageChanged();
                    
                }, function(error){
                    console.log('error filter', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Choice Data ' + error.statusText);
                        $rootScope.logout();
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
            else{
                searchUrl = 'products/' + prodRule_id + '/rules/?status='+ $scope.search.status;
                callApiServices.get(token, searchUrl)
                .then(function(response){
                    $scope.productRuleData = response.data;
                    $scope.bigTotalItems = $scope.productRuleData.count;
                    $scope.pageChanged();
                    
                }, function(error){
                    console.log('error filter', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Choice Data ' + error.statusText);
                        $rootScope.logout();
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

        $scope.resetFilter = function(){
            $scope.search.name="";
            $scope.search.status="";
            if($scope.pageNo == 0){
                $scope.search.app_type="";
            };

            if($scope.page == 0){
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-name'});
            }
            else if($scope.pageNo == 1){
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-q_text'});
            }
            else if($scope.pageNo == 2){
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-choice_text'});
            }
            else{
                $state.go('dashboards.product', {'id': $scope.pageNo , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-status'});
            }
        }


        //$scope.tableData = dataTableService.getData($scope.pageNo);
        $scope.headerTxt = dataTableService.getHeader(true);
        $scope.addTxt = dataTableService.getAddTxt(true);
        $scope.placeholder = $scope.addTxt + ' text';

        $scope.updatePageData = function (id, pageNo, text, isNextQuest) {
            //dataTableService.setPageNo(pageNo);
            dataTableService.setHeader(id, text, true);
            if(pageNo == 1){
                if(isNextQuest){
                    $window.localStorage.setItem('is_next_quest_available', 1);
                }
                else{
                    $window.localStorage.setItem('is_next_quest_available', 0);
                }

                $state.go('dashboards.product', {'id': pageNo, 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-q_text'});
            }else{
                $state.go('dashboards.product', {'id': pageNo, 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-choice_text'});

            }
        };
        //Rules redirect page from product to rules
        $scope.productRulesData = function(id,pageNo,text, quest_count){
            console.log('Quest Count', quest_count);
            if(quest_count){
                dataTableService.setHeader(id, text, true);
                $state.go('dashboards.product', {'id': pageNo, 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-status'});
            }
            else{
                toaster.warning('No questions available for this product. Please add questions and choices to proceed.')
            }
        };
        //For stringify the data
        function generateRules(rulesData){
            for(i=0; i<rulesData.length; i++){
                $scope.rules.push(JSON.parse(JSON.stringify(ruleObj)));
                choicesArray = rulesData[i].choice;
                $scope.rules[i].choices = "";
                for(j=0; j < choicesArray.length; j++){
                    $scope.rules[i].choices += getChoiceText(choicesArray[j], choicesArray.length - j);
                    if(j == choicesArray.length - 1 && $scope.rules[i].choices == ""){
                        $scope.rules[i].choices += "No choices matched";
                    }
                };
                $scope.rules[i].category_count = getVenueCount(rulesData[i].category_level);
                $scope.rules[i].status = rulesData[i].status;
                $scope.rules[i].id = rulesData[i].id;
                $scope.rules[i].persona = rulesData[i].persona;
                $scope.rules[i].choicesArr = rulesData[i].choice;
                $scope.rules[i].category_level = rulesData[i].category_level;
                $scope.rules[i].cat_level_id = Object.getOwnPropertyNames (rulesData[i].category_level)[0]
            }
        }

        function getChoiceText(id, index){
            choiceIndex = $scope.choices.findIndex( (el) => el.id === id);
            choiceTxt = "";
            if(choiceIndex != -1){
                choiceTxt = $scope.choices[choiceIndex].choice_text;
                if(index>1){
                    choiceTxt += ", ";
                }
                return choiceTxt;
            }
            else{
                return choiceTxt;
            }
        };

        function getVenueCount(cat_level){
            rule_level_count = cat_level[Object.getOwnPropertyNames (cat_level)[0]];
            rule_level_prop.push(Object.getOwnPropertyNames (cat_level)[0]);
            return rule_level_count;
        };
        $scope.getVenueCount = function(cat_level){
            rule_level_count = cat_level[Object.getOwnPropertyNames (cat_level)[0]];
            return rule_level_count;
        };

        $scope.editedData = function (index, id) {
            //dataTableService.updateData($scope.tableData);
            var data = $scope.editFormData;
            if($scope.pageNo == 0){
                callApiServices.updateProduct(token, id, data)
                    .then(function(response){
                        console.log("updated response products", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Data Updated Successfully");
                        $state.reload();
                    }, function(error){
                        console.log("error callback products edit update", error);

                        if(error.status == 404){
                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                            $state.reload();
                        }
                    })
            }
            else if($scope.pageNo == 1) {
                callApiServices.updateQuestion(token, prod_id, id, data)
                    .then(function(response){
                        console.log("updated response quest", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Data Updated Successfully");
                        $state.reload();
                    }, function(error){
                        console.log("error callback quest edit update", error);

                        if(error.status == 404){
                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                            $state.reload();
                        }
                    })
            }
            else{
                callApiServices.updateChoice(token, prod_id, quest_id, id, data)
                    .then(function(response){
                        console.log("updated response choice", response);
                        $scope.showTable = true;
                        $scope.ifEditButtonClicked = false;
                        toaster.success("Data Updated Successfully");
                        $state.reload();
                    }, function(error){
                        console.log("error callback choice edit update", error);

                        if(error.status == 404){
                            toaster.error($scope.addTxt + ' ' + error.data.detail);
                            $state.reload();
                        }
                    })
            }
        }

    };

    $scope.addData = function () {
        //updated
        if($scope.pageNo == 0){
            var addProd = {
                status: 1,
                app_type: 1,
                name: $scope.addFormData.text
            }
            callApiServices.addProduct(token, addProd)
                .then(function(response){
                    console.log("added response", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    $scope.ifRuleClicked = false;
                    toaster.success("Added Successfully");
                    $state.reload();
                }, function(error){
                    console.log('error prod add ', error);

                    if(error.status == 400){
                        toaster.error('Enter valid input in all fields');
                    }
                });
        }
        else if($scope.pageNo == 1) {
            var addQuest = {
                status: $scope.addFormData.status,
                q_text: $scope.addFormData.text,
                q_order: $scope.addFormData.order,
                product: prod_id
            }
            callApiServices.addQuestion(token, addQuest)
                .then(function(response){
                    console.log("added response", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    $scope.ifRuleClicked = false;
                    toaster.success("Added Successfully");
                    $state.reload();
                }, function(error){
                    console.log('error quest add ', error);

                    if(error.status == 400){
                        toaster.error('Enter valid input in all fields');
                    }
                });
        }
        else{
            var addChoice = {
                status: $scope.addFormData.status,
                choice_text: $scope.addFormData.text,
                question: quest_id
            }
            callApiServices.addChoice(token, addChoice)
                .then(function(response){
                    console.log("added response", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    toaster.success("Added Successfully");
                    $state.reload();
                }, function(error){
                    console.log('error choice add ', error);

                    if(error.status == 400){
                        toaster.error('Enter valid input in all fields');
                    }
                });
        }

    };

    $scope.delete = function (id) {
        //$scope.tableData.list.splice(index, 1);
        if($scope.pageNo == 0){
            callApiServices.deleteProduct(token, id)
                .then(function(response){
                    console.log("delete response products", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    $scope.ifRuleClicked = false;
                    toaster.success("Deleted Successfully");
                    $state.reload('dashboards.product');
                }, function(error){
                    console.log('error callback products delete', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                        $state.reload('dashboards.product');
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
        else if($scope.pageNo == 1) {
            callApiServices.deleteQuestion(token, prod_id, id)
                .then(function(response){
                    console.log("delete response question", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    $scope.ifRuleClicked = false;
                    toaster.success("Deleted Successfully");
                    $state.reload('dashboards.product');
                }, function(error){
                    console.log('error callback quest delete', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                        $state.reload('dashboards.product');
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
        else{
            callApiServices.deleteChoice(token, prod_id, quest_id, id)
                .then(function(response){
                    console.log("delete response choice", response);
                    $scope.showTable = true;
                    $scope.ifEditButtonClicked = false;
                    $scope.ifRuleClicked = false;
                    toaster.success("Deleted Successfully");
                    $state.reload('dashboards.product');
                }, function(error){
                    console.log('error callback choices delete', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                        $state.reload('dashboards.product');
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
    }

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

    $scope.showConfirmRule = function(ev, id) {
        // Show confirm dialog before delete operation
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete rule?')
            .textContent('Rule will be deleted after clicking on OK')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $scope.deleteRule(id);
        }, function() {
        });
    };

    $scope.deleteRule = function (id) {
        callApiServices.deleteRule(token, id)
            .then(function (response) {
                console.log("delete response venue", response);
                toaster.success("Deleted Successfully");
                $state.reload('dashboards.product');
            }, function (error) {
                console.log('error callback venue delete', error);
                if (error.status == 404) {
                    toaster.error('Venue ' + error.data.detail);
                    $state.reload('dashboards.product');
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

    $scope.back = function(id){
        if(id == 1){
            $state.go('dashboards.product', {'id': id , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-q_text'});
        }
        else{
            $state.go('dashboards.product', {'id': id , 'limit': $scope.viewData, 'offset': 0, 'page': 1, 'ordering': '-name'});
        }
    }

    $scope.showAdvanced = function (ev, status, data) {
        $mdDialog.show({
            controller: ['$scope', 'toaster',function($scope,toaster){
                $scope.pageNo = $stateParams.id;
                var prod_id = dataTableService.getProdId();
                var prodRule_id = dataTableService.getProdRuleId();
                var quest_id = dataTableService.getQuestId();
                $scope.addTxt = dataTableService.getAddTxt(true);
                $scope.placeholder = $scope.addTxt + ' text';
                $scope.prodType = [{'name':'Woogee', 'id': 1}, {'name':'Deli', 'id': 2}];

                if($scope.pageNo == 1){
                    $scope.nextQuest = parseInt($window.localStorage.getItem('is_next_quest_available'));
                }

                if($scope.pageNo == 2){

                    $scope.quest_id = dataTableService.getQuestId();
                    //Get Questions 
                    callApiServices.getQuestionsById(token, prod_id)
                    .then(function(response){
                        $scope.questions = response.data.results;

                        if($scope.questions.length == 0){
                            $scope.cancel();
                            toaster.error('No Questions Available. Please add questions and proceed');
                        }

                    }, function(error){
                        console.log('error quest', error);

                        if(error.status == -1){
                            toaster.error('Please check internet connection')
                        }

                        if(error.status == 404){
                            toaster.error('Question Data ' + error.statusText);
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

                    callApiServices.getChoicesByStatus(token)
                        .then(function(response){
                            console.log("response choices",response);
                            $scope.choices = response.data.results;
                        }, function(error){
                            console.log('error choice', error);

                            if(error.status == -1){
                                toaster.error('Please check internet connection')
                            }

                            if(error.status == 404){
                                toaster.error('Choice Data ' + error.statusText);
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

                if(!status) {
                    $scope.isAddBtn = false;
                    $scope.formData = JSON.parse(JSON.stringify(data));
                    if($scope.pageNo ==  2){
                       $scope.formData.choicesArray = [{choiceId: ""}];
                       for(var i=0;i< $scope.formData.relation.length;i++){
                           if(i>0) $scope.formData.choicesArray.push({});
                          $scope.formData.choicesArray[i].choiceId  = $scope.formData.relation[i]; 
                       } 
                    }  
                    console.log('data', $scope.formData);
                }
                else{
                   $scope.isAddBtn = true; 
                   $scope.formData = {};
                   if($scope.pageNo ==  2){
                        $scope.formData.choicesArray = [{choiceId: ""}];
                        $scope.formData.relation = [];
                        $scope.formData.next_question = null;
                   };

                   if($scope.pageNo == 0){
                        $scope.formData.app_type = 1;
                   }
                   console.log('data', $scope.formData);
                };

                $scope.addChoice = function(index){
                    if(!!$scope.formData.choicesArray[index].choiceId){
                       $scope.formData.choicesArray.push({});  
                     }
                     else{
                         toaster.error('Please select appropriate Choices and then add new');
                     }
                };

                $scope.removeChoice = function(index){
                    $scope.formData.choicesArray.splice(index,1);
                    $scope.formData.relation.splice(index,1);
                };

                $scope.resetChoice = function(){
                    $scope.formData.choicesArray = [{choiceId: ""}];
                    $scope.formData.relation = [];
                };

                $scope.getChoiceId = function(index){
                    if($scope.formData.relation.indexOf($scope.formData.choicesArray[index].choiceId) == -1){
                       $scope.formData.relation[index] = $scope.formData.choicesArray[index].choiceId;
                    }
                    else{
                       $scope.formData.choicesArray[index].choiceId = "";
                       toaster.error('Choice already selected. Please select different Choice');
                    }
                }

                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.submitData = function(){

                    if($scope.isAddBtn){

                        if(!!!$scope.formData.status){
                            $scope.formData.status = 0;
                        }

                        if ($scope.pageNo == 0) {
                            var addProd = {
                                status: $scope.formData.status,
                                app_type: $scope.formData.app_type,
                                name: $scope.formData.name
                            };
                            callApiServices.addProduct(token, addProd)
                                .then(function (response) {
                                    console.log("added response", response);
                                    $scope.cancel();
                                    toaster.success("Added Successfully");
                                    $state.reload('dashboards.product');
                                }, function(error){
                                    console.log('error product add ', error);

                                    if(error.status != 400) {
                                        $scope.cancel();
                                    }

                                    if(error.status == -1){
                                        toaster.error('Please check internet connection')
                                    }

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

                            if(!!!$scope.formData.q_order){
                                $scope.formData.q_order = 0;
                            }

                            var addQuest = {
                                status: $scope.formData.status,
                                q_text: $scope.formData.q_text,
                                q_order: $scope.formData.q_order,
                                product: prod_id
                            }

                            if($scope.formData.q_order == 1){
                                if($window.localStorage.getItem('is_next_quest_available') == 0){
                                    $window.localStorage.setItem('is_next_quest_available', 1);
                                    callApiServices.addQuestion(token, addQuest)
                                        .then(function (response) {
                                            console.log("added response", response);
                                            $scope.cancel();
                                            toaster.success("Added Successfully");
                                            $state.reload('dashboards.product');
                                        }, function(error){
                                            console.log('error question add ', error);

                                            if(error.status != 400) {
                                                $scope.cancel();
                                            }

                                            if(error.status == -1){
                                                toaster.error('Please check internet connection')
                                            }

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
                                else{
                                    $scope.nextQuest = 1;
                                }
                            }
                            else{
                                callApiServices.addQuestion(token, addQuest)
                                .then(function (response) {
                                    console.log("added response", response);
                                    $scope.cancel();
                                    toaster.success("Added Successfully");
                                    $state.reload('dashboards.product');
                                }, function(error){
                                    console.log('error question add ', error);

                                    if(error.status != 400) {
                                        $scope.cancel();
                                    }

                                    if(error.status == -1){
                                        toaster.error('Please check internet connection')
                                    }

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
                        else {
                            var addChoice = {
                                status: $scope.formData.status,
                                choice_text: $scope.formData.choice_text,
                                next_question: $scope.formData.next_question,
                                relation: $scope.formData.relation,
                                question: quest_id
                            }
                            console.log('Choices:', addChoice);
                            callApiServices.addChoice(token, addChoice)
                                .then(function(response){
                                    console.log("added response", response);
                                    $scope.cancel();
                                    toaster.success("Added Successfully");
                                    $state.reload('dashboards.product');
                                }, function(error){
                                    console.log('error choice add ', error);

                                    if(error.status != 400) {
                                        $scope.cancel();
                                    }

                                    if(error.status == -1){
                                        toaster.error('Please check internet connection')
                                    }

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
                            callApiServices.updateProduct(token, editData.id, editData)
                                .then(function (response) {
                                    console.log("updated response type", response);
                                    $scope.cancel();
                                    toaster.success("Data Updated Successfully");
                                    $state.reload('dashboards.product');
                                }, function(error){
                                    console.log("error callback type edit update", error);

                                    if(error.status != 400) {
                                        $scope.cancel();
                                    }

                                    if(error.status == -1){
                                        toaster.error('Please check internet connection')
                                    }

                                    if(error.status == 400){
                                        toaster.error('Enter valid input in all fields');
                                    }

                                    if(error.status == 404){
                                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                                        $state.reload('dashboards.product');
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
                            callApiServices.updateQuestion(token, prod_id, editData.id, editData)
                                .then(function (response) {
                                    console.log("updated response category", response);
                                    $scope.cancel();
                                    toaster.success("Data Updated Successfully");
                                    $state.reload('dashboards.product');
                                }, function(error){
                                    console.log("error callback category update", error);

                                    if(error.status != 400) {
                                        $scope.cancel();
                                    }

                                    if(error.status == -1){
                                        toaster.error('Please check internet connection')
                                    }

                                    if(error.status == 400){
                                        toaster.error('Enter valid input in all fields');
                                    }

                                    if(error.status == 404){
                                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                                        $state.reload('dashboards.product');
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
                            callApiServices.updateChoice(token, prod_id, quest_id, editData.id, editData)
                                .then(function (response) {
                                    console.log("updated response category level", response);
                                    $scope.cancel();
                                    toaster.success("Data Updated Successfully");
                                    $state.reload('dashboards.product');
                                }, function(error){
                                    console.log("error callback category level edit update", error);

                                    if(error.status != 400) {
                                        $scope.cancel();
                                    }

                                    if(error.status == -1){
                                        toaster.error('Please check internet connection')
                                    }

                                    if(error.status == 400){
                                        toaster.error('Enter valid input in all fields');
                                    }

                                    if(error.status == 404){
                                        toaster.error($scope.addTxt + ' ' + error.data.detail);
                                        $state.reload('dashboards.product');
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
            templateUrl: '../../app/product/prodDialogTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

    $scope.showAdvancedRules = function (ev, status, data) {
        $mdDialog.show({
            controller: ['$scope', function($scope){
                $scope.pageNo = $stateParams.id;
                var prod_id = dataTableService.getProdId();
                var prodRule_id = dataTableService.getProdRuleId();
                $scope.addTxt = dataTableService.getAddTxt(true);
                $scope.formData = {};
                $scope.formData.choicesArray = [{ selectedQuest: "", selectedChoice:"" }];
                $scope.formData.category_levels = [{ type_id: "", category_id: "", cat_level_id: "", venue_count:"" }];
                $scope.choiceLevelArray = [];
                $scope.catLevelArray = [];
                var questPos = null;
                var catPos = null;
                var typePos = null;
                $scope.headerTxt = dataTableService.getHeader(true);
                var choicePos = null;
                $scope.choicesRelationData = [];
                $scope.noFirstQuestAvailable = false;

                //For testing
                /*$scope.testData = {
                    "19": 19,
                    "14" : 10,
                    "22" : 6
                };*/

                //Get Questions 
                callApiServices.getQuestionsById(token, prodRule_id)
                .then(function(response){
                    $scope.questions = response.data.results;
                    console.log('Ruless Quest:', $scope.questions);

                    if($scope.questions.length == 0){
                        $scope.cancel();
                        toaster.error('No Questions Available. Please add questions and proceed');
                    }

                    if(!!$scope.questions && !!$scope.choices && !!$scope.cat_levels && !!$scope.categories && !!$scope.types){
                        editStatus(status);
                    };

                }, function(error){
                    console.log('error quest', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Question Data ' + error.statusText);
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

                //Get All Choices
                callApiServices.getChoicesByStatus(token)
                .then(function(response){
                    console.log('Choices Data Rules:', response.data);
                    $scope.choices = response.data.results;

                    if(!!$scope.questions && !!$scope.choices && !!$scope.cat_levels && !!$scope.categories && !!$scope.types){
                        editStatus(status);
                    };

                }, function(error){
                    console.log('error rule', error);

                    if(error.status == -1){
                        toaster.error('Please check internet connection')
                    }

                    if(error.status == 404){
                        toaster.error('Choices Data ' + error.statusText);
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

                //Get type data from api
                callApiServices.getType(token)
                    .then(function (response) {
                        console.log("response type venue", response);
                        $scope.types = response.data.results;

                        if(!!$scope.questions && !!$scope.choices && !!$scope.cat_levels && !!$scope.categories && !!$scope.types){
                            editStatus(status);
                        };

                    }, function (error) {
                        console.log('error callback venue type:', error);

                        if (error.status == -1) {
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

                //Get category data from api
                callApiServices.getCategory(token)
                    .then(function (response) {
                        console.log("response all category  venue", response);
                        $scope.categories = response.data.results;

                        if(!!$scope.questions && !!$scope.choices && !!$scope.cat_levels && !!$scope.categories && !!$scope.types){
                            editStatus(status);
                        };

                    }, function (error) {
                        console.log('error callback venue type:', error)
                        if (error.status == -1) {
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

                //Get category-level data from api
                callApiServices.getCategoryLevel(token)
                    .then(function (response) {
                        console.log("response all cat level venue", response);
                        $scope.cat_levels = response.data.results;


                        if(!!$scope.questions && !!$scope.choices && !!$scope.cat_levels && !!$scope.categories && !!$scope.types){
                            editStatus(status);
                        };

                    }, function (error) {
                        console.log('error callback venue type:', error)

                        if (error.status == -1) {
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

                if(!status) {
                    $scope.isAddBtn = false;
                    $scope.formData = JSON.parse(JSON.stringify(data));
                    $scope.formData.choicesArray = [{ selectedQuest: "", selectedChoice:"" }];
                    $scope.formData.category_levels = [{ type_id: "", category_id: "", cat_level_id: "", venue_count:"" }];
                    console.log('data', $scope.formData);
                }
                else{
                   $scope.isAddBtn = true; 
                   //$scope.formData = {};
                   console.log('data', $scope.formData);

                };

                $scope.reset = function (index, type, status) {
                    //type = 1 indicates resetting choices
                    //type = 0 indicates resetting type, category, cat level
                    if(type){
                        if(!!index){
                            $scope.formData.choicesArray[index].selectedChoice = null;
                            console.log('Data reset:', $scope.formData.choicesArray);
                        }
                    }
                    else{
                        //status = 1 indicates resetting category and category level
                        //status = 0 indicates resetting category level
                        $scope.formData.category_levels[index].cat_level_id = null;
                        if(status == 1){
                            var isCatAvailable = $scope.categories.findIndex( (e1) => e1.type == $scope.formData.category_levels[index].type_id);
                            if(isCatAvailable == -1){
                                toaster.error('No Categories Available for selected Type');
                                $scope.formData.category_levels[index].type_id = null;
                            }
                        }
                        else{
                            var isCatLevelAvailable = $scope.cat_levels.findIndex( (e1) => e1.category == $scope.formData.category_levels[index].category_id);
                            if(isCatLevelAvailable == -1){
                                toaster.error('No Intervals Available for selected Category');
                                $scope.formData.category_levels[index].category_id = null;
                            }
                        }

                        
                        if (status) {
                            $scope.formData.category_levels[index].category_id = null;
                        }
                    }
                    
                };

                $scope.getChoiceCatId = function (index, type) {
                    //type = 1 indicates addition of choices
                    //type = 0 indicates addition of cat level

                    if(type){

                        for(var i= $scope.formData.choicesArray.length - 1; i>index; i--){
                            $scope.formData.choicesArray.splice(i, 1);
                            $scope.choiceLevelArray.splice(i, 1);
                        }

                       if($scope.choiceLevelArray.indexOf($scope.formData.choicesArray[index].selectedChoice) == -1){
                           $scope.choiceLevelArray[index] = $scope.formData.choicesArray[index].selectedChoice;
                       }
                       else{
                           $scope.formData.choicesArray[index].selectedChoice = "";
                           toaster.error('Choice already selected. Please select different Choice');
                       } 
                    }
                    else{
                        if($scope.catLevelArray.indexOf($scope.formData.category_levels[index].cat_level_id) == -1){
                            $scope.catLevelArray[index] = $scope.formData.category_levels[index].cat_level_id;
                        }
                        else{
                            $scope.formData.category_levels[index].cat_level_id = "";
                            toaster.error('Category Level already selected. Please select different Category Level');
                        }
                    }
                    
                };

                $scope.addSelectChoice = function(index, type){
                    //type = 1 indicates addition of choices
                    //type = 0 indicates addition of cat level
                    if(type){
                        if(!!$scope.formData.choicesArray[index].selectedChoice && !!$scope.formData.choicesArray[index].selectedQuest){
                           
                          var nextQuestPos = $scope.choices.findIndex( (el) => el.id === $scope.formData.choicesArray[index].selectedChoice);
                          if(!!$scope.choices[nextQuestPos].next_question){
                            $scope.formData.choicesArray.push({});
                            $scope.formData.choicesArray[index + 1].selectedQuest = $scope.choices[nextQuestPos].next_question;
                            for(var i=0; i< $scope.choices[nextQuestPos].relation.length; i++){
                                var choicePos = $scope.choices.findIndex( (el) => el.id === $scope.choices[nextQuestPos].relation[i]);
                                if(choicePos != -1){
                                    $scope.choicesRelationData.push($scope.choices[choicePos]);
                                }
                            }
                          }
                          else{
                            toaster.error('No next question available');
                          }

                        }
                        else{
                            toaster.error('Please select appropriate Choices and then add new');
                        }
                        console.log('Add Choices', $scope.formData.choicesArray);
                    }
                    else{
                        if(!!$scope.formData.category_levels[index].type_id && !!$scope.formData.category_levels[index].category_id && !!$scope.formData.category_levels[index].cat_level_id && !!$scope.formData.category_levels[index].venue_count){
                          $scope.formData.category_levels.push({});  
                        }
                        else{
                            toaster.error('Please select appropriate Type, Category, Category level, venue count and then add new');
                        }
                        console.log('Add Levels', $scope.formData.category_levels);
                    }
                };

                $scope.removeSelectChoice = function(index, type){

                    if(type){
                        $scope.formData.choicesArray.splice(index, 1);
                        $scope.choiceLevelArray.splice(index, 1);
                    }
                    else{
                        $scope.formData.category_levels.splice(index, 1);
                        $scope.catLevelArray.splice(index,1);
                    }
        
                    
                };

                function editStatus(status){
                    if(!status){
                        $scope.choiceLevelArray = data.choicesArr;
                        var cat_id = Object.getOwnPropertyNames (data.category_level);
                        console.log("Data cat id:", cat_id);

                        // For choices array
                        for(var i=0; i<$scope.formData.choicesArr.length;i++){
                            if(i>0) $scope.formData.choicesArray.push({});
                            $scope.formData.choicesArray[i].selectedChoice = $scope.choiceLevelArray[i];
                            questPos = $scope.choices.findIndex( (el) => el.id === $scope.formData.choicesArray[i].selectedChoice);
                            $scope.choicesRelationData.push($scope.choices[questPos]);
                            $scope.formData.choicesArray[i].selectedQuest = $scope.choices[questPos].question;
                        }

                        //For category level and venue count
                        for(var j=0; j<cat_id.length; j++){
                            if(j>0) $scope.formData.category_levels.push({});
                            $scope.formData.category_levels[j].cat_level_id = parseInt(cat_id[j]);
                            $scope.catLevelArray.push(parseInt(cat_id[j]));
                            catPos = $scope.cat_levels.findIndex( (el) => el.id === $scope.formData.category_levels[j].cat_level_id);
                            $scope.formData.category_levels[j].category_id = $scope.cat_levels[catPos].category;
                            typePos = $scope.categories.findIndex( (el) => el.id === $scope.formData.category_levels[j].category_id);
                            $scope.formData.category_levels[j].type_id = $scope.categories[typePos].type;
                            $scope.formData.category_levels[j].venue_count = parseInt(data.category_level[cat_id[j]]);
                            console.log("Edit Status data:", $scope.formData);
                        }
                    }
                    else{
                        questPos = $scope.questions.findIndex( (el) => el.q_order == 1);

                        if(questPos == -1){
                            $scope.noFirstQuestAvailable = true;
                        }

                        $scope.formData.choicesArray[0].selectedQuest = $scope.questions[questPos].id;
                        for (i=0; i<$scope.choices.length; i++){
                            if($scope.choices[i].question == $scope.formData.choicesArray[0].selectedQuest){
                                $scope.choicesRelationData.push($scope.choices[i]);
                            }
                        }

                    }    
                }
                
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.submitData = function(){

                    if($scope.isAddBtn){

                        if(!!!$scope.formData.status){
                            $scope.formData.status = 0;
                        }

                        var addRule = {
                            status: $scope.formData.status,
                            choice: $scope.choiceLevelArray,
                            persona: $scope.formData.persona,
                            category_level: {}
                        }
                        for(i=0; i<$scope.formData.category_levels.length; i++){
                           addRule.category_level[$scope.formData.category_levels[i].cat_level_id] = $scope.formData.category_levels[i].venue_count; 
                        }
                        console.log("Added rule:", addRule);
                        callApiServices.addRule(token, addRule)
                            .then(function(response){
                                console.log("rule added response", response);
                                $scope.cancel();
                                toaster.success("Added Successfully");
                                $state.reload('dashboards.product');
                            }, function(error){
                                console.log('error rule add ', error);

                                if(error.status != 400) {
                                    $scope.cancel();
                                }

                                if (error.status == -1) {
                                    toaster.error('Please check internet connection');
                                }

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
                    else{
                        var editRule = {
                            status: $scope.formData.status,
                            choice: $scope.choiceLevelArray,
                            persona: $scope.formData.persona,
                            category_level: {}
                        }
                        for(i=0; i<$scope.formData.category_levels.length; i++){
                           editRule.category_level[$scope.formData.category_levels[i].cat_level_id] = $scope.formData.category_levels[i].venue_count; 
                        }

                        console.log("Edited dat:", editRule);

                        callApiServices.updateRule(token, $scope.formData.id, editRule)
                            .then(function (response) {
                                console.log("updated response category level", response);
                                $scope.cancel();
                                toaster.success("Data Updated Successfully");
                                console.log("State Rule:", $state);
                                $state.reload('dashboards.product');
                            }, function(error){
                                console.log("error callback category level edit update", error);
                                
                                if(error.status != 400) {
                                    $scope.cancel();
                                }

                                if (error.status == -1) {
                                    toaster.error('Please check internet connection')
                                }

                                if(error.status == 400){
                                    toaster.error('Enter valid input in all fields');
                                }

                                if(error.status == 404){
                                    toaster.error('Rule Data not found');
                                    $state.reload('dashboards.product');
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
            }],
            templateUrl: '../../app/product/prodRulesDialogTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };
}

angular.module('perspective').controller('productCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$mdDialog', 'dataTableService', 'callApiServices','toaster', '$filter', productCtrl]);

angular.module('perspective').directive('checkDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {

            function myValidation(value) {
                var orderData = scope.tableData.results;

                function validate(data){

                    if(data.q_order == value && data.status == 1) return true;
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

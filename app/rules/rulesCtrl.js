function rulesCtrl($scope, $rootScope, $state, $stateParams,$mdDialog, dataTableService, callApiServices, toaster){
	var token = dataTableService.getToken();

	if (!!!token) {
	    toaster.error("Please Login to continue");
        $state.go('dashboards.rules', {'id': 0});
	}
	else{
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

		//Get choices data
		callApiServices.getChoicesByStatus(token)
		.then(function(response){
			console.log('Choices Data Rules:', response.data);
			$scope.choices = response.data.results;
			if(!!$scope.choices && !!$scope.rulesData && !!$scope.cat_levels){
				console.log('choice if');
				generateRules($scope.rulesData);
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
		});

		//Get category-level data from api
		callApiServices.getCategoryLevel(token)
		    .then(function (response) {
		        console.log("response all cat level venue", response);
		        $scope.cat_levels = response.data.results;
		        if(!!$scope.choices && !!$scope.rulesData && !!$scope.cat_levels){
		        	console.log('catlevel if');
		        	generateRules($scope.rulesData);
		        };

		    }, function (error) {
		        console.log('error callback venue type:', error)
		        if (error.status == -1) {
		            toaster.error('Please check internet connection')
		        };

		        if(error.status == 404){
		            toaster.error('Category level Data ' + error.statusText);
		            $rootScope.logout();
		        }
		});

		//Get rules Data
		callApiServices.getRules(token)
		.then(function(response){
			console.log('Rules Data', response.data);
			$scope.rulesData  = response.data.results;
			if(!!$scope.choices && !!$scope.rulesData && !!$scope.cat_levels){
				console.log('rules if');
				generateRules($scope.rulesData);
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
		});

		

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
		//Edit modal window
        $scope.showAdvanced = function (ev, status, data) {
            $mdDialog.show({
                controller: ['$scope', '$timeout', function($scope, $timeout){
                    $scope.pageNo = $stateParams.id;
                    $scope.formData = {};
                    var catPos = null;
                    var typePos = null;
                    var checkFlag = true;

                    if(!status) {
                        $scope.isAddBtn = false;
                        $scope.formData = JSON.parse(JSON.stringify(data));
                        console.log('data', $scope.formData);
                    }
                    else{
                        $scope.isAddBtn = true;
                        //$scope.formData = {};
                        console.log('data', $scope.formData);
                    }
                    //Get type data from api
                    callApiServices.getType(token)
                        .then(function (response) {
                            console.log("response type venue", response);
                            $scope.types = response.data.results;

                            if(!status){
                                editStatus();
                            }
                        }, function (error) {
                            console.log('error callback venue type:', error)
                            if (error.status == -1) {
                                toaster.error('Please check internet connection')
                            }
                        });
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.submitData = function(){

                        if($scope.isAddBtn){

                            //Add new Venue
                            var addRule = {
                                status: parseInt($scope.formData.status),
                                choice : parseInt([$scope.formData.choices]),
                                category_level : {
                                    19 :parseInt($scope.formData.category_count)
								}

                            };
                            callApiServices.addRule(token, addRule)
                                .then(function (response) {
                                    console.log("added result response", response);
                                    $scope.cancel();
                                    toaster.success("Added Successfully");
                                    $state.reload();
                                }, function (error) {
                                    console.log('error result addition', error);
                                    $scope.cancel();

                                    if (error.status == 400) {
                                        toaster.error('Enter valid input in all fields');
                                    }
                                });
                        }
                        else{
                            var editRule = {
                                choices: $scope.choice,
								status: 1,
                                category_count:$scope.category_count

                            };
                            callApiServices.updateRule(token, rule_id, editRule)
                                .then(function (response) {
                                    console.log("updated response rules", response);
                                    $scope.cancel();
                                    toaster.success("Data Updated Successfully");
                                    $state.reload();
                                }, function (error) {
                                    console.log("error callback products edit update", error);
                                    $scope.cancel();

                                    if (error.status == 404) {
                                        toaster.error('Venue ' + error.data.detail);
                                        $state.reload();
                                    }
                                })
                        }
                    };

                    function editStatus(){
                        console.log($scope.types,$scope.categories, $scope.cat_levels,checkFlag, status);
                        if(!status && !!$scope.types && !!$scope.categories && !!$scope.cat_levels && checkFlag){
                            checkFlag = false;
                            for(var i=0; i<$scope.formData.category_count.length;i++){
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
                }],
                templateUrl: '../../app/rules/ruleDialogTemplate.html',
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

		$scope.showConfirm = function(ev, id) {
		    // Show confirm dialog before delete operation
		    var confirm = $mdDialog.confirm()
		        .title('Would you like to delete rule?')
		        .textContent('Rule will be deleted after clicking on OK')
		        .targetEvent(ev)
		        .ok('OK')
		        .cancel('Cancel');

		    $mdDialog.show(confirm).then(function() {
		        $scope.delete(id);
		    }, function() {
		    });
		};

		$scope.delete = function (id) {
		    callApiServices.deleteRule(token, id)
		        .then(function (response) {
		            console.log("delete response venue", response);
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


		// $scope.addRule = function(){
		// 	var data = {
		// 		status: $scope.status,
		// 		choice : $scope.choices,
		// 		category_level : $scope.category_count
		// 	};
        //
		// 	callApiServices.addRule(token, data)
		// 	.then(function(response){
		// 		console.log("Response rule", response);
		// 		toaster.success('Added successfully');
		// 		$state.reload();
		// 	}, function(error){
		// 		console.log('Rule', error);
		// 		toaster.error('Error occured');
		// 	})
		// };
	}
};

angular.module('perspective').controller('rulesCtrl', ['$scope', '$rootScope', '$state', '$stateParams','$mdDialog','dataTableService', 'callApiServices', 'toaster', rulesCtrl]);

/* 
var $scope = {
    me: "hallo"
};
var obj = {};
var test1 = "19";
var test = "21";
var test2 = 10;
obj[test1] = test2;
obj.test = test2;
$scope['me'] = "Welt!";
var test8 = {
	status: 1,
			choice : [23,22],
			category_level : {
				"20" : 12
			}
}

$("#x ").text($scope.me);
$("#y ").text(obj);
console.log('obj name :', obj);
console.log('Property:', Object.getOwnPropertyNames (test8.category_level))
console.log('Property:', test8.category_level["20"])

console.log('Property:', test8.category_level[Object.getOwnPropertyNames (test8.category_level)[0]])
*/
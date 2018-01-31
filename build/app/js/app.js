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

;/* Constant Domain Url while running on local system */
(function(angular){

	"use strict";

	/** Test Constant */
	angular.module('perspective').constant('DOMAIN_URL', 'http://ec2-13-126-101-120.ap-south-1.compute.amazonaws.com/back/');

})(window.angular);
;function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider, $httpProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    //$urlRouterProvider.otherwise("/dashboards/admin-dashboard");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });
    function ngIntlTelInputProvider() {
        ngIntlTelInputProvider.set({initialCountry: 'us'});
    }

    //Header for http requests
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "app/login/login.html",
            controller: 'logInCtrl',
            data: {pageTitle: 'Login', specialClass: 'gray-bg'}
        })
        .state('dashboards', {
            abstract: true,
            url: "/dashboards",
            templateUrl: "app/navbar/content.html"
        })
        .state('dashboards.product', {
            url: "/product/:id?limit= &offset= &page= &ordering",
            templateUrl: "app/product/product.html",
            controller: "productCtrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['node_modules/angularjs-toaster/toaster.min.js', 'node_modules/angularjs-toaster/toaster.min.css']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.type', {
            url: "/type/:id?limit= &offset= &page= &ordering",
            templateUrl: "app/type/type.html",
            controller: 'typeCtrl',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['node_modules/angularjs-toaster/toaster.min.js', 'node_modules/angularjs-toaster/toaster.min.css']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.venue', {
            url: "/venue/:id?limit= &offset= &page=",
            templateUrl: "app/venue/venue.html",
            controller: "venueCtrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['node_modules/angularjs-toaster/toaster.min.js', 'node_modules/angularjs-toaster/toaster.min.css']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.venue-add', {
            url: "/venue/:isEdit/", //isEdit = 0 indicates add venue
            templateUrl: "app/venue/venueForm.html",
            controller: "venueCtrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['node_modules/angularjs-toaster/toaster.min.js', 'node_modules/angularjs-toaster/toaster.min.css']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.venue-edit', {
            url: "/venue/:venueid/:isEdit", //isEdit = 1 indicates edit venue
            templateUrl: "app/venue/venueForm.html",
            controller: "venueCtrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['node_modules/angularjs-toaster/toaster.min.js', 'node_modules/angularjs-toaster/toaster.min.css']
                        }
                    ]);
                }
            }
        })
        .state('dashboards.rules', {
            url: "/rules/",
            templateUrl: "app/rules/rules.html",
            controller: "rulesCtrl",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['node_modules/angularjs-toaster/toaster.min.js', 'node_modules/angularjs-toaster/toaster.min.css']
                        }
                    ]);
                }
            }
        })
        .state('forms', {
            abstract: true,
            url: "/forms",
            templateUrl: "app/navbar/content.html"
        })
}

angular
    .module('perspective')
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });

;
$(document).ready(function () {
    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }

    }


    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });


    setTimeout(function(){
        fix_height();
    })
});

// Minimalize menu when screen is less than 768px
$(function() {
    $(window).bind("load resize", function() {
        if ($(document).width() < 320) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    })
})

;angular.module('perspective').service('callApiServices', function ($http) {
    //this.domain = "http://ai.perspective.com.co/back/";
    this.domain = "http://ec2-13-126-101-120.ap-south-1.compute.amazonaws.com/back/";

    //LogIn
    this.login = function (credentials) {
        return $http({
            method: "POST",
            url: this.domain + 'api-token-auth/',
            data: credentials,
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    //Product
    this.getProducts = function (token, limit,offset,ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        });
    };

    this.getQuestionsById = function (token, prod_id, limit, offset, ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/' + prod_id + '/questions/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };

    this.getChoicesById = function (token, prod_id, quest_id, limit, offset,ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/choices/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };
    this.getProductRulesById = function (token, prodRule_id, limit, offset, ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'products/' + prodRule_id  + '/rules/?limit=' + limit +'&offset=' + offset + '&ordering=' + ordering,
            headers: {
                'Authorization': token
            }
        })
    };


    //Get list of all choices
    this.getChoicesByStatus = function(token){
        return $http({
            method: "GET",
            url: this.domain + 'choices/?status=1',
            headers: {
                'Authorization': token
            }
        })
    };

    this.updateProduct = function (token, prod_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'products/' + prod_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.updateQuestion = function (token, prod_id, quest_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.updateChoice = function (token, prod_id, quest_id, choice_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/' + choice_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    this.deleteProduct = function (token, prod_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'products/' + prod_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.deleteQuestion = function (token, prod_id, quest_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.deleteChoice = function (token, prod_id, quest_id, choice_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'products/' + prod_id + '/' + quest_id + '/' + choice_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };


    this.addProduct = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'products/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addQuestion = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'questions/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addChoice = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'choices/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    // Type
    //Retrieving Type
    this.getType = function (token,limit,offset,ordering) {
        return $http({
            method: "GET",
            url: this.domain + 'types/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };
    //Retrieving Category
    this.getCategoryById = function (token, type_id) {
        return $http({
            method: "GET",
            url: this.domain + 'types/' + type_id + '/categorys/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.getCategory = function(token){
        return $http({
            method: "GET",
            url: this.domain + 'categorys/?limit=50&offset=0',
            headers: {
                'Authorization': token
            }
        })
    };
    //Retrieving Category level
    this.getCategoryLevelById = function (token, type_id, category_id ){
        return $http({
            method: "GET",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/levels/',
            headers: {
                'Authorization': token
            }
        })
    };

    this.getCategoryLevel = function(token){
       return $http({
           method: "GET",
           url: this.domain + 'category-levels/?limit=500&offset=0',
           headers: {
               'Authorization': token
           }
       })
    }
    //Updating Type
    this.updateType = function (token, type_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'types/' + type_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    //Updating Category
    this.updateCategory = function (token, type_id, category_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    //Updating Category Level
    this.updateCategoryLevel = function (token, type_id, category_id, categoryLevel_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/' + categoryLevel_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };
    //Delete Type
    this.deleteType = function (token, type_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'types/' + type_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    //delete category
    this.deleteCategory = function (token, type_id, category_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    //Delete category Level
    this.deleteCategoryLevel = function (token, type_id, category_id, categoryLevel_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/' + categoryLevel_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    //Add type
    this.addType = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'types/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addCategory = function (token, type_id, data) {
        return $http({
            method: "POST",
            url: this.domain + 'types/' + type_id + '/categorys/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    this.addCategoryLevel = function (token, type_id, category_id, data) {
        return $http({
            method: "POST",
            url: this.domain + 'types/' + type_id + '/' + category_id + '/levels/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Venues
    this.getVenues = function(token,limit,offset,ordering){
        return $http({
            method: "GET",
            url: this.domain + 'venues/?limit=' + limit +'&offset=' + offset + '&ordering=' +ordering,
            headers: {
                'Authorization': token
            }
        })
    };

    //Add Venue
    this.addVenue = function (token, data) {
        return $http({
            method: "POST",
            url: this.domain + 'venues/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Update Venue
    this.updateVenue = function (token, venue_id, data) {
        return $http({
            method: "PUT",
            url: this.domain + 'venues/' + venue_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Delete Venue
    this.deleteVenue = function (token, venue_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'venues/' + venue_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };
    this.updateOpeningHours = function (token, opening_hour_id, data){
        return $http({
            method:"PUT",
            url :this.domain + 'opening-hours/' +  opening_hour_id + '/',
            data: data,
            headers :{
                'Authorization':token
            }
        })
    };
    //Update venue Extra
    this.updateVenueExtra = function (token, venue_id, data ){
        return $http({
            method:"PUT",
            url :this.domain + 'venues/' +  venue_id + '/extra/',
            data: data,
            headers :{
                'Authorization':token
            }
        })
    };
    //venue opening hours
    this.getOpeningHours = function (token){
      return $http({
          method :"GET",
          url :this.domain + 'opening-hours/',
          headers : {
              'Authorization':token
          }
      })
    };
    //venue_Extra
    this.getVenueExtra = function (token){
        return $http({
            method :"GET",
            url : this.domain + 'venue-extras/',
            headers : {
                'Authorization': token
            }
        })
    };
    //Get list of rules
    this.getRules = function(token){
        return $http({
            method: "GET",
            url: this.domain + 'rules/',
            headers: {
                'Authorization': token
            }
        })
    };

    //Add Rules
    this.addRule = function(token, data){
        return $http({
            method: "POST",
            url: this.domain + 'rules/',
            data: data,
            headers: {
                'Authorization': token
            }
        })
    };

    //Update Rule
    this.updateRule = function(token, rule_id, data){
        return $http({
            method: "PUT",
            url: this.domain + 'rules/' + rule_id + '/',
            data: data,
            headers: {
                'Authorization': token
            }
        });
    };

    //Delete Rule
    this.deleteRule = function (token, rule_id) {
        return $http({
            method: "DELETE",
            url: this.domain + 'rules/' + rule_id + '/',
            headers: {
                'Authorization': token
            }
        })
    };

    //Common function for get request with token
    this.get = function(token, url){
        console.log('Url:', url)
        return $http({
            method: "GET",
            url: this.domain + url,
            headers: {
                'Authorization': token
            }
        });
    };

});

;angular.module('perspective').service('dataTableService', function ($window, callApiServices) {
    var pageNo = 0;
    var headerTxt = 'Products';
    var headerType = 'Type of Venues';
    var prodHeaderRule ='Rule';
    var prodTxt = null;
    var questTxt = null;
    var prodId = null;
    var prodRuleId = null;
    var questId = null;
    var typeTxt = null;
    var categoryTxt = null;
    var typeId = null;
    var categoryId = null;
    var venueType = null;
    var venueCat = null;
    var venueCatLvl = null;
    var ruleType= null;
    //var token = $window.localStorage.getItem('token');
    var token= null;
    var products = {
        list: [
            {
                _id: 0,
                "text": "Type 1",
                "product": 1
            },
            {
                _id: 1,
                "text": "Type 2",
                "product": 2
            }
        ],
        isProd: true,
        isQuest: false,
        isChoice: false
    };

    var questions = {
        list: [
            {
                _id: 0,
                "text": "checked ",
                "active": "yes",
                "order": 5,
                "quest": 1
            },
            {
                _id: 1,
                "text": "Not checked ",
                "active": "no",
                "order": 7,
                "quest": 2
            }
        ],
        isProd: false,
        isQuest: true,
        isChoice: false
    };

    var choices = {
        list: [
            {
                _id: 0,
                "text": "choice1",
                "active": "yes",
                "questNo": 1
            },
            {
                _id: 1,
                "text": "choice2",
                "active": "no",
                "questNo": 1
            }
        ],
        isProd: false,
        isQuest: false,
        isChoice: true
    };

    /*callApiServices.getProducts(token)
    .then(function(response){
        console.log("products", response);
    }, function(error){
        console.log("error products", error);
    })*/

    this.getPageNo = function () {
        return pageNo;
    };

    this.setPageNo = function (num) {
        pageNo = num;
    };

    this.getHeader = function (isProd) {
        var id = this.getPageNo();
        if (id == 0) {
            if(isProd){
                return headerTxt;
            }else{
                return headerType;
            }
        }
        else if (id == 1) {
            if(isProd){
                return prodTxt;
            }else{
                return typeTxt;
            }
        }
        else if (id == 3){
            if(isProd){
                return prodHeaderRule;
            }
        }
        else{
            if(isProd){
                return questTxt;
            }else{
                return categoryTxt;
            }
        }
    };

    this.setHeader = function (id, text, isProd) {
        //headerTxt = text;
        var pageId = this.getPageNo();

        if (pageId == 0) {
            if (isProd) {
                prodTxt = text;
                prodId = id;
                prodHeaderRule = text;
                prodRuleId = id;
            }
            else {
                typeTxt = text;
                typeId = id;
            }

        }
        else if (pageId == 1) {
            if (isProd) {
                questTxt = text;
                questId = id;
            }
            else {
                categoryTxt = text;
                categoryId = id;
            }
        }
    };

    this.getAddTxt = function (isProd) {
        var id = this.getPageNo();
        if (id == 0){
            if(isProd){
                return 'Product';
            }else{
                return 'Type';
            }
        }
        else if (id == 1) {
            if(isProd){
                return 'Question';
            }else{
                return 'Category';
            }
        }
        else if(id == 2) {
            if(isProd){
                return 'Current Question Choice';
            }else{
                return 'Interval';
            }
        }
        else{
            if(isProd){
                return 'Rule';
            }
        }
    };

    this.getData = function (pageNum,isProd) {
        if (pageNum == 0) return products;
        else if (pageNum == 1) return questions;
        else if (pageNum == 3) return rules;
        else return choices;
    };

    this.setData = function (data) {
        var id = this.getPageNo();
        if (id == 0) products.list.push(data);
        else if (id == 1) questions.list.push(data);
        else choices.list.push(data);
    };

    this.updateData = function (data) {
        var id = this.getPageNo();
        if (id == 0) products = data;
        else if (id == 1) questions = data;
        else choices = data;
    };

    this.getToken = function () {
        var token = $window.localStorage.getItem('token');
        return token;
    };

    this.setToken = function(value){
        token = value;
    };

    this.getProdId = function () {
        return prodId;
    };
    this.getProdRuleId = function(){
        return prodRuleId;
    };

    this.getQuestId = function () {
        return questId;
    };

    this.getTypeId = function () {
        return typeId;
    };
    this.getCategoryId = function () {
        return categoryId;
    };

    //Venues
    this.getVenueType = function(){
        return venueType;
    };

    this.getVenueCat = function(){
        return venueCat;
    };

    this.getVenueCatLvl = function(){
        return venueCatLvl;
    };

    this.setVenueType = function(id){
        venueType = id;
    };

    this.setVenueCat = function(id){
        venueCat = id;
    };

    this.setVenueCatLvl = function(id){
        venueCatLvl = id;
    };
    //Rules
    this.getRuleType = function(){
        return ruleType;
    };
    this.setRuleType = function(id){
        ruleType = id;
    };
});

;
/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();

            });
        }
    };
};




/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};


function closeOffCanvas() {
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            }
        }
    };
}


/**
 *
 * Pass all functions into module
 */
angular
    .module('perspective')
    .directive('sideNavigation', sideNavigation)
    .directive('minimalizaSidebar', minimalizaSidebar)

;angular.module('perspective').directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);
;/** Created by Nilabh on 19-09-2017 */
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
;function productCtrl($scope, $rootScope, $state, $stateParams, $window, $mdDialog, dataTableService, callApiServices, toaster,$filter) {
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

;/** Created by Nilabh on 22-09-2017 */
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

;function venueCtrl($scope, $state, $stateParams, $timeout, $mdDialog,dataTableService, callApiServices, toaster,ngIntlTelInput,$location,$anchorScroll) {
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

;function rulesCtrl($scope, $rootScope, $state, $stateParams,$mdDialog, dataTableService, callApiServices, toaster){
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
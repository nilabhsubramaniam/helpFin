function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider, $httpProvider) {

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

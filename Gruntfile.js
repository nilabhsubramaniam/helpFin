// Initialize Grunt configuration
var modRewrite = require('connect-modrewrite');
module.exports = function(grunt){
    // Initialize default task
    grunt.initConfig({
        /**
        * Watch function lookout the file which modify when server is running
        * Based on configuration respected task will be run
        */
        watch: {
            jsFiles: {
                files: ['app/*.js', 'app/**/*.js', 'app/**/**/*.js'],
                tasks: ['concat:jsFiles', 'concat:jsLib']
            },
            cssFiles: {
                files: ['css/*.css', 'css/**/*.css'],
                tasks: ['concat:cssFiles', 'concat:cssLib']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                tasks: [
                    'concat:jsFiles', 'concat:jsLib', 'concat:cssFiles',
                    'concat:cssLib'
                ]
            }
        },
        /**
        * Concat application related file based on file type and location
        * Based on configuration source file concat to destination files
        * Note :- Make sure source file will arrange in order.
        */
        concat: {
            jsFiles: {
                options: {
                    separator: '\n;'
                },
                src: [
				//inlcude js File here
					'app/app.js',
                    'app/app.constant.staging.js',
					'app/config.js',
					'app/sidebar.js',
                    'app/services/callApiServices.js',
					'app/services/dataTableService.js',
					'app/directives/directives.js',
                    'app/directives/loading-directive.js',
                    'app/login/logInController.js',
                    'app/product/productCtrl.js',
                    'app/type/typeCtrl.js',
                    'app/venue/venueCtrl.js',
                    'app/rules/rulesCtrl.js'


                ],
                dest: 'build/app/js/app.js'
            },
            cssFiles: {
                options: {
                    separator: '\n'
                },
                src: [

					'assets/css/login.css',
                    'assets/css/style.css',
					'assets/css/custom.css'

                ],
                dest: 'build/app/css/app.css'
            },
            jsLib: {
                options: {
                    separator: '\n;'
                },
                src: [
					'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/ng-idle/angular-idle.min.js',
					'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/metismenu/dist/metisMenu.min.js',
					'node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/angular-material/angular-material.min.js',
					'node_modules/angular-materialize/src/angular-materialize.min.js',
					'node_modules/angular-sanitize/angular-sanitize.min.js',
					'node_modules/angular-aria/angular-aria.min.js',
					'node_modules/angular-resource/angular-resource.min.js',
					'node_modules/angular-messages/angular-messages.min.js',
                    'node_modules/angular-material-data-table/dist/md-data-table.min.js',
                    'node_modules/md-data-table/dist/md-data-table.js',
                    'node_modules/md-data-table/dist/md-data-table-templates.js',
					'node_modules/oclazyload/dist/ocLazyLoad.min.js',
					'node_modules/angular-translate/dist/angular-translate.min.js',
					'node_modules/angular-ui-router/release/angular-ui-router.min.js',
					'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
					'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
					'node_modules/angular-material-icons/angular-material-icons.min.js',
                    'node_modules/angularjs-toaster/toaster.min.js',
                    'node_modules/moment/moment.js',
                    'node_modules/ng-intl-tel-input/dist/ng-intl-tel-input.js',
                    'node_modules/ng-material-datetimepicker/dist/angular-material-datetimepicker.min.js'
                ],
                dest: 'build/lib/app.lib.js'
            },
            cssLib: {
                options: {
                    separator: '\n'
                },
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
					'node_modules/angular-material/angular-material.css',
					'node_modules/angular-material-data-table/dist/md-data-table.css',
                    'node_modules/md-data-table/dist/md-data-table-style.css',
					'node_modules/angular-material-icons/angular-material-icons.css',
					'node_modules/font-awesome/css/font-awesome.css',
					'node_modules/animate.css/animate.min.css',
					'node_modules/angularjs-toaster/toaster.min.css',
                    'node_modules/metismenu/dist/metisMenu.css',
                    'node_modules/ng-material-datetimepicker/dist/material-datetimepicker.min.css',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',

                ],
                dest: 'build/lib/app.lib.css'
            },
			fontsLib: {
                options: {
                    separator: '\n'
                },
                src: [
                    'node_modules/font-awesome/fonts'
                ],
                dest: 'build/lib/fonts'
            }
        },
        browserSync: {
            test: {
                bsFiles: {
                    src: [
                        '*.html',
                        'css/*.css',
                        'css/**/*.css',
                        'js/**/*.js',
                        'app/*.js',
                        'app/**/*.html',
                        'app/**/*.js',
                        'app/**/**/*.js',
                        'app/**/**/*.html',
                        'app/**/**/**/*.html',
                        'Gruntfile.js'
                    ]
                },
                options: {
                    watchTask: true,
                    debounceDelay: 1000,
                    debugInfo : true,
                    server: {
                        baseDir: './',
                        middleware: [
                            modRewrite([
                              '!\\.|\\.html$\\w+$ /index.html [L]'
                            ])
                        ],
                        index: "index.html"
                    }
                }
            }
        }
    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task(s)
    grunt.registerTask('default', ['concat', 'browserSync', 'watch']);
    grunt.registerTask('build', ['concat']);
};

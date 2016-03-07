// Karma configuration
// Generated on Sun Mar 06 2016 13:03:19 GMT-0800 (PST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'styles/styles.css',
            'node_modules/angular/angular.js',
            "bower_components/firebase/firebase.js",
            'node_modules/angularfire/dist/angularfire.js',
            'node_modules/angularjs-geolocation/dist/angularjs-geolocation.min.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'app.js',
            'controllers/HomeController.js',
            'controllers/MessageController.js',
            'services/ReverseGeocodeService.js',
            'services/AuthService.js',
            'services/UserService.js',
            'services/MessageService.js',
            'services/MapService.js',
            'services/FirebaseService.js',
            'node_modules/angular-mocks/angular-mocks.js',
            '/tests/*.js',
            '/tests/*.test.js',
            'tests/*.test.js',
            '/app.js',
            '~/Desktop/WM/WMAS/tests/*.js',
            '/tests/*.js',
            './tests/*'
        ],

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}

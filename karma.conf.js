module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
		'bower_components/angular/angular.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'app.js',
		'**/*.test.js',
        'node_modules/sinon/pkg/sinon-1.17.*.js'
		],

        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true
    });
};
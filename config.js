var path = require('path');

exports.config = {
	modules: {
		definition: false,
		wrapper: false
	},

	paths: {
		"public": 'public',
		"watched": ['app', 'vendor']
	},

	files: {
		javascripts: {
			joinTo: {
				'javascripts/app.js': /^app/,
				'javascripts/vendor.js': [
					'bower_components/modernizr/modernizr.js',
					'bower_components/jquery/dist/jquery.js',
					'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
					'bower_components/angular/angular.js',
					'bower_components/angular-route/angular-route.js',
					'bower_components/angular-resource/angular-resource.js',
					'bower_components/angular-sanitize/angular-sanitize.js',
					'bower_components/angular-mocks/angular-mocks.js',
					/^vendor/
				],
				'test/scenarios.js': /^test(\/|\\)e2e/
			},
			order: {
				before: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/angular/angular.js',
					'bower_components/bootstrap/dist/js/bootstrap.js'
				]
			}
		},
		stylesheets: {
			defaultExtension: 'scss',
			joinTo: {
				'stylesheets/app.css': [
					'bower_components/font-awesome/scss/font-awesome.scss',
					/^app\/stylesheets\/app/
				]
			}
		}
	},

	plugins: {
		ng_annotate: {
			pattern: /^app/
		},
		sass: {
			options: {
        includePaths: [
					'bower_components/bootstrap-sass-official/assets/stylesheets'
				]
			}
		},
		autoprefixer: {
			browsers: [
				"last 2 version",
				"> 1%", // browsers with > 1% usage
				"ie >= 9"
			],
			cascade: false
		}
	},

	server: {
		port: 3333,
		base: '/backfeeds-client/'
	},

	conventions: {
		assets: /app(\\|\/)assets(\\|\/)/
	},

	sourceMaps: true
};

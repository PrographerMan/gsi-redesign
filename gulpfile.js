var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass'),
	rigger 		 = require('gulp-rigger'),
	concat 		 = require('gulp-concat'),
	browserSync  = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	imgmin 		 = require('gulp-imagemin'),
	uglify 		 = require('gulp-uglify'),
	cleancss 	 = require('gulp-clean-css'),
	jsminify	 = require('gulp-minify'),
	babel		 = require('gulp-babel'),
	eslint		 = require('gulp-eslint'),
	sourcemaps	 = require('gulp-sourcemaps');



gulp.task('html:build', function() {
	return gulp.src('app/**/*.html')
		   /*  Some plugins here  */
		   .pipe(rigger())
		   .pipe(gulp.dest('dist'))
		   .pipe(browserSync.reload({
				stream: true
		   }))
});


gulp.task('css:build', function() {
	return gulp.src('app/template/css/*.+(scss|css)')
		   .pipe( concat('bundle.min.css') )
		   .pipe( sourcemaps.init() )
		   .pipe( sass() )
		   .pipe( autoprefixer(
				{
					browsers: 'cover 99.5%'
				}
		   ) )
		   .pipe( cleancss() )
		   .pipe( sourcemaps.write() )
		   .pipe( gulp.dest('dist/template/css') ) 
		   .pipe( browserSync.reload({
				stream: true
		   }))
});


gulp.task('js:build', function() {
	return gulp.src('app/template/js/*.js')
		   .pipe( concat('bundle.min.js') )
		   .pipe( eslint() )
		   .pipe( sourcemaps.init() )
		   .pipe( babel({
				presets: ['@babel/env']
			}))
		   .pipe( jsminify(
				{
					ext: {
						min: '.js'
					},
					noSource: true
				}
		   ) )
		   .pipe( sourcemaps.write() )
		   .pipe( gulp.dest('dist/template/js') )
		   .pipe(browserSync.reload({
				stream: true
		   }))
});


gulp.task('img:build', function() {
	return gulp.src('app/template/img/**/*')
		   .pipe( imgmin(
				{
					interlaced: true,
					progressive: true,
					optimizationLevel: 5
				}
		   ) )
		   .pipe(gulp.dest('dist/template/img')) 
});


gulp.task('fonts:build', function() {
	return gulp.src('app/template/fonts/**/*')
		   .pipe(gulp.dest('dist/template/fonts')) 
});


gulp.task('copy', function () {
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('app/template/js'));
	
	gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('app/template/css'));
});


gulp.task('watch', ['browserSync', 'copy', 'html:build', 'css:build', 'js:build'], function() {
	gulp.watch('app/**/*.html', ['html:build']); 
	gulp.watch('app/template/css/*.scss', ['css:build']); 
	gulp.watch('app/template/js/*.js', ['js:build']); 
})



gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})
})
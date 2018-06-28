var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watch = require("gulp-watch");


gulp.task("build", function() {
    browserify({
            entries: ["src/js/app.js"],
            // transform: [babelify]
        })
        .transform(babelify.configure({
            presets: ['es2015']
        }))
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("dist/js/"));

    gulp.src(['dist/js/app.js'])
        // .pipe(uglify())
        .pipe(uglify({
            // mangle: true, //类型：Boolean 默认：true 是否修改变量名
            mangle: { except: ['require', 'exports', 'module', '$', '_'] } //排除混淆关键字
        }))
        .pipe(concat('app.min.js')) //合并后的文件名
        .pipe(gulp.dest('dist/js/'));

});
gulp.task("watch", function() {
    gulp.watch('src/js/*.js', ['build']);
})
gulp.task('default', ['watch', 'build']);
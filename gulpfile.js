var gulp = require('gulp'),
	  path = require('path'),
	  less = require('gulp-less'),
    gulpConcat=require('gulp-concat'),
    uglify=require("gulp-uglify"),
    rename = require('gulp-rename');

//项目目录
var beginUrl="./",
	  lessUrl=beginUrl+'src/less/*',
	  cssUrl=beginUrl+'src/css/',
    jsUrl=beginUrl+'src/js',
    distCssUrl=beginUrl+'dist/css/',
    distJsUrl=beginUrl+'dist/js/';
//编译less
gulp.task('less', function () {
  return gulp.src(lessUrl)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(cssUrl));
});

//合并压缩js
gulp.task('conCatJs',function(){
  return gulp.src([jsUrl+'/main/*.js',jsUrl+"/package/*.js"])
         .pipe(gulpConcat('NewUI.js'))
         // .pipe(gulp.dest(distJsUrl))
         //  .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
         //  .pipe(uglify())    //压缩
         .pipe(gulp.dest(distJsUrl))
})

// 监控
gulp.task('watch',function(){
  gulp.watch(lessUrl,['less']);
  gulp.watch(jsUrl+"/main/*.js",['conCatJs']);
  gulp.watch(jsUrl+"/package/*.js",['conCatJs']);
})


//默认任务
gulp.task('default',["less","conCatJs","watch"], function() {
  // 将你的默认的任务代码放在这
  console.log("this is ok");
});
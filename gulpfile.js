var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less');
var beginUrl="./",
	lessUrl=beginUrl+'src/less/*',
	cssUrl=beginUrl+'src/css/';

//编译less
gulp.task('less', function () {
  return gulp.src(lessUrl)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(cssUrl));
});

// 监控
gulp.task('watch',function(){
  gulp.watch(lessUrl,['less']);
})

//默认任务
gulp.task('default',["less","watch"], function() {
  // 将你的默认的任务代码放在这
  console.log("this is ok");
});
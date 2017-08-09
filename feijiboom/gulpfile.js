

//先引入gulp模块
//var gulp=require("gulp");
//gulp.src("exercise/js/move.js")
//
//  .pipe(gulp.dest("dest/js"))

/*
//任务
var gulp=require("gulp");

//定义了任务one
gulp.task("one",function(){
	console.log("one")
})

//定义了任务two
gulp.task("two",function(){
	console.log("two")
})

//定义了任务three
gulp.task("three",["one","two"],function(){
	console.log("three")
})

//默认任务
gulp.task("default",["one","two","three"],function(){
	console.log("defalut")
})

*/

var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}
//gulp-htmlmin
//gulp 插件的使用
var  gulp=require("gulp");
var htmlmin=require("gulp-htmlmin")

//任务htmlTask
gulp.task("htmlTask",function(){
	gulp.src("dafeiji.html")
		.pipe(htmlmin(obj))
		.pipe(gulp.dest("dest/html"))
})
gulp.task("default",["htmlTask"])


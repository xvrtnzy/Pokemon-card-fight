import gulp from 'gulp';
import sass from 'gulp-sass';// import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';// import autoprefixer from 'gulp-autoprefixer';
import image from 'gulp-image';
import connect from 'gulp-connect';// import autoprefixer from 'gulp-autoprefixer';
import browserify from 'browserify';// import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';// import autoprefixer from 'gulp-autoprefixer';
// 轉成 gulp 讀取的 vinyl（黑膠）流
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
//import livereload from 'gulp-livereload';

const dir = {
	src:'src',
	dest:'dist'
};

const stylesPaths = {
	src: `${dir.src}/styles/*.scss`,
	dest: `${dir.dest}/css`
};

const scriptsPaths = {
	src:`${dir.src}/scripts/*.js`,
	dest:`${dir.dest}/js`
};

const imagesPaths = {
	src:`${dir.src}/images/*`,
	dest:`${dir.dest}/img`
};

gulp.task('styles', () => {
	gulp.src(stylesPaths.src)
	.pipe(sass())  // 編譯 Scss
	.pipe(gulp.dest(stylesPaths.dest))
	.pipe(connect.reload());
});

gulp.task('scripts', () => {
	return browserify({
		entries:['./src/scripts/main.js']
	})
	.transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer()) // 從 streaming 轉回 buffered vinyl 檔案
    .pipe(sourcemaps.init({loadMaps: true})) // 由於我們壓縮了檔案，要用 sourcemaps 來對應原始文件方便除錯
        .pipe(uglify()) // 壓縮檔案
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(scriptsPaths.dest))
	.pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(imagesPaths.src)
    .pipe(image())
    .pipe(gulp.dest(imagesPaths.dest));
});

gulp.task('server', () => {
	connect.server({
		root: ['./'],
		livereload: true,
		port: 7777,
	});
});

gulp.task('watch', function() {
  gulp.watch(stylesPaths.src, ['styles']);
  gulp.watch(scriptsPaths.src, ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'images', 'server', 'watch']);
gulp.task('build', ['scripts', 'styles', 'images', 'server']);
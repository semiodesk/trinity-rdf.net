var gulp = require("gulp");
var copy = require("gulp-copy");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify-es").default;
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");

gulp.task("compact-useref", function() {
  return gulp
    .src("*.html", { allowEmpty: true })
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest(".."));
});

gulp.task("copy-fonts", function() {
  gulp
    .src("node_modules/roboto-fontface/fonts/roboto/*.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest("../assets/webfonts/"));
  gulp
    .src("node_modules/roboto-fontface/fonts/roboto-slab/*.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest("../assets/webfonts/"));
  return gulp
    .src("node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest("../assets/webfonts/"));
});

gulp.task("compact-images", function() {
  return (
    gulp
      .src("assets/img/**/*.+(png|jpg|jpeg|gif|svg)")
      // Caching images that ran through imagemin
      .pipe(
        cache(
          imagemin({
            interlaced: true
          })
        )
      )
      .pipe(gulp.dest("../assets/img"))
  );
});

gulp.task("copy-favicons", function() {
  return gulp.src("*.ico").pipe(gulp.dest(".."));
});

gulp.task("deploy", gulp.series("compact-useref", "copy-fonts", "compact-images", "copy-favicons"));

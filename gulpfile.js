"use strict"; //eslint-disable-line
require("babel-core/register");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const del = require("del");
const mocha = require("gulp-mocha");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const jsdoc = require("gulp-jsdoc3");


gulp.task("clean", () => {
  return del(["build/**/*"]);
});

gulp.task("doc", (cb) => {
  var config = require("./jsdoc.json");
  gulp.src(["./src/**/*.js"], {read: false})
    .pipe(jsdoc(config, cb));
});

gulp.task("compile", ["lint"], () => {
  return gulp.src(["src/**/*"])
    .pipe(sourcemaps.init({identityMap: true}))
    .pipe(babel({}))
    .pipe(sourcemaps.write(".", {includeContent: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("lint", ["clean"], () => {
  return gulp.src(["src/**/*"])
    .pipe(eslint({
      fix: true,
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("watch", () => {
  gulp.watch(["src/**/*.*"], ["compile", "doc"]);
});

gulp.task("default", ["compile"]);

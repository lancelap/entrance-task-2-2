const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const pug = require('gulp-pug');
const del = require('del');
const path = require('path');
const ghPages = require('gulp-gh-pages');
const webpack = require('webpack');
const gulplog = require('gulplog');

sass.compiler = require('node-sass');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const bases = {
  src: 'src/',
  build: 'build/'
};

gulp.task('copy', () => {
  return gulp
    .src([bases.src + 'img/**'], {
      base: bases.src
    })
    .pipe(gulp.dest(bases.build));
});

gulp.task('copy-js', () => {
  return gulp
    .src([bases.src + 'js/**.js'], {
      base: bases.src
    })
    .pipe(gulp.dest(bases.build));
});


gulp.task('views', function() {
  return gulp
    .src(bases.src + 'views/*.pug')
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err.message);
          this.emit('end');
        }
      })
    )
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(bases.build));
});

gulp.task('style', function() {
  return gulp
    .src(bases.src + 'styles/main.scss')
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err.message);
          this.emit('end');
        }
      })
    )
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: [
            'last 1 version',
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Edge versions',
            'last 2 Opera version'
          ]
        }),
        mqpacker({
          sort: true
        })
      ])
    )
    .pipe(gulp.dest(bases.build + 'css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(bases.build + 'css'));
});

gulp.task('images', function() {
  return gulp
    .src(bases.build + 'img/**/*.{png,jpg,gif}')
    .pipe(gulp.dest(bases.build + 'img'))
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true })
      ])
    );
});

gulp.task('symbols', function() {
  return gulp.src(bases.src + 'img/icons/**/*.svg')
    .pipe(svgmin(function (file) {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }, {
          removeDoctype: true
        }, {
          removeComments: true
        }]
      };
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest(bases.build + 'img'));
});

gulp.task('webpack', function(callback) {

  let options = {
    entry: './src/js/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, bases.build + 'js')
    },
    watch:   isDevelopment,
    mode: isDevelopment ? 'development' : 'production'
  };

  webpack(options, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
  
    const info = stats.toJson();
  
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
  
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  
    if (!options.watch && err) {
      callback(err);
    } else {
      callback();
    }
  });
});

gulp.task('clean', () => {
  return del(bases.build);
});

gulp.task('watch', function() {
  gulp.watch(bases.src + 'styles/**/*.scss', gulp.series('style'));
  gulp.watch(bases.src + 'views/**/*.pug', gulp.series('views'));
});

gulp.task('build', gulp.series('clean', 'copy', 'copy-js', gulp.parallel('style', 'views', 'webpack')));

gulp.task('prod', gulp.series('clean', 'copy', 'copy-js', 'images', gulp.parallel('style', 'views', 'webpack')));

gulp.task('serve', function() {
  browserSync.init({
    server: { baseDir: 'build' },
    notify: false,
    open: false,
    port: 8888
  });
  
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));

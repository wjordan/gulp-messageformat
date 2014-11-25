gulp-messageformat
==================

Gulp plugin for Messageformat

## Install

npm install gulp-messageformat --save-dev

## Usage

Returns compiled and concated file.

```javascript
var gulp = require('gulp');
var messageFormat = require('gulp-messageformat');

gulp.task('compile', function() {
  gulp.src('src/**/*.json')
    .pipe(messageFormat({locale:'en'}))
    .pipe(gulp.dest('dist/');
});
```
##Options

##### locale

Type: `string`
Values: see [messageformatjs `locale` option](https://github.com/SlexAxton/messageformat.js)

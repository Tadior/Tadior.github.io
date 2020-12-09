//const { src, dest, watch, parallel, series} = require('gulp'),
//      //gulp         = require('gulp'),
//      scss         = require('gulp-sass'),
//      concat       = require('gulp-concat'),
//      browserSync  = require('browser-sync').create(),
//      uglify       = require('gulp-uglify-es').default,
//      autoprefixer = require('gulp-autoprefixer'),
//      imagemin     = require('gulp-imagemin'),
//      del          = require('del'),
//      ttf2woff     = require('gulp-ttf2woff'),
//      ttf2woff2    = require('gulp-ttf2woff2'),
//      fs           = require('fs'),
//      webp         = require('gulp-webp'),
//      webphtml     = require('gulp-webp-html');

//function browsersync() {
//   browserSync.init({
//      server: {
//         baseDir: 'app/'
//      }
//   });
//}

//function html(){
//   src('app/*.html')
//   .pipe(webphtml())
//   .pipe(dest('dist/*.html'));
//}

//function fonts() { // преобразует шрифты в woff и woff2
//   src(['app/fonts/*.ttf'])
//   .pipe(ttf2woff())
//   .pipe(dest('dist/fonts/'));
//   return src(['app/fonts/*.ttf'])
//   .pipe(ttf2woff2())
//   .pipe(dest('dist/fonts/'));
//}

//function fontsStyle() { // Автоматически подключает шрифты
//   let fileContent = fs.readFileSync('app/scss/fonts.scss');

//   if (fileContent == '') {
//      fs.writeFile('app/scss/fonts.scss', '', cb);
//      return fs.readdir('dist/fonts/', function (err, items) {
//         if (items) {
//            let cFontname;
//            for (var i = 0; i < items.length; i++) {
//               let fontname = items[i].split('.');
//               fontname = fontname[0];
//               if (cFontname != fontname) {
//               fs.appendFile('app/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
//               }
//               cFontname = fontname;
//            }
//         }
//      });
//   }
//};


//function cb() {

//}

//function clear() {
//   return del('dist');
//}

//function images() {
//   return src('app/img/**/*')
//   .pipe (
//      webp ({
//         quality: 70
//      })
//   )
//   .pipe(dest('dist/img'))
//   .pipe(src('app/img'))
//   .pipe(imagemin(
//      [
//      imagemin.gifsicle({interlaced: true}),
//      imagemin.mozjpeg({quality: 75, progressive: true}),
//      imagemin.optipng({optimizationLevel: 5}),
//      imagemin.svgo({
//         plugins: [
//            {removeViewBox: true},
//            {cleanupIDs: false}
//         ]
//      })
//      ]
//   ))
//   .pipe(dest('dist/img'));
//}

//function scripts() {
//   return src([
//      //'', // path to JS plagin 'node_modules/jquery/dist/jquery.js'
//      'app/js/script.js'
//   ])
//   .pipe(concat('script.min.js'))
//   .pipe(uglify())
//   .pipe(dest('app/js'))
//   .pipe(browserSync.stream());
//}

//function styles() {
//   return src('app/scss/style.scss') // Finding path
//      .pipe(scss({outputStyle: 'compressed'}))
//      .pipe(concat('style.min.css'))
//      .pipe(autoprefixer({
//         overrideBrowserslist: ['last 10 version'],
//         grid: true
//      }))
//      .pipe(dest('app/css'))
//      .pipe(browserSync.stream());
//}

//function build() {
//   return src([
//      'app/css/style.min.css',
//      'app/fonts/**/*',
//      'app/js/script.min.js',
//      'app/*.html'
//   ], {base: 'app'})
//   .pipe(dest('dist'));
//}

//function watching() {
//   watch(['app/img/**/*.{jpg,png,svg,gif,ico,webp}'])
//   watch(['app/scss/**/*.scss'], styles);
//   watch(['app/js/**/*.js', '!app/js/script.min.js'], scripts);
//   watch(['app/*.html']).on('change', browserSync.reload);
//}
//const buildProject = series(clear, parallel(scripts, styles, html, images, fontsStyle));
//const watchProject = parallel(buildProject, watching, browserSync);

//exports.html = html;
//exports.styles = styles;
//exports.watching = watching;
//exports.browsersync = browsersync;
//exports.scripts = scripts;
//exports.clear = clear;
//exports.images = images;
//exports.fonts = fonts;
//exports.fontsStyle = fontsStyle;
//exports.buildProject = buildProject;
//exports.watchProject = watchProject;
//exports.default = watchProject;
////exports.cb = cb;
////series выполнение по порядку
////parallel выполнение параллельно
////exports.build = series(clear, images ,build); // Конечная сборка
////exports.default = parallel(html, images ,styles, scripts,fontsStyle, browsersync, watching);

const projectFolder = require('path').basename(__dirname), //Папка с проектом 
      sourceFolder = '#src', // Папка с исходниками
      path = { // Ассоциативный массив с путями к файлам
         build: { // Ассоциативный массив с путями к готовым файлам
            html: projectFolder + '/',
            css: projectFolder + '/css/',
            js: projectFolder + '/js/',
            img: projectFolder + '/img/',
            fonts: projectFolder + '/fonts/',
         },
         src: { // Ассоциативный массив с путями к исходным файлам
            html: [sourceFolder + '/*.html', '!'+ sourceFolder + '/_*.html'],
            css: sourceFolder + '/scss/style.scss',
            js: sourceFolder + '/js/script.js',
            img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
            fonts: sourceFolder + '/fonts/*.ttf',
         },
         watch: { // Ассоциативный массив с путями к исходным файлам (следит за изменениями)
            html: sourceFolder + '/**/*.html',
            css: sourceFolder + '/scss/**/*.scss',
            js: sourceFolder + '/js/**/*.js',
            img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
         },
         clean: './' + projectFolder + '/' // Очищает папку с готовым проектом
      };

// Переменные с плагинами----------------------------------------

const { src, dest, watch, parallel, series, task} = require('gulp'),
      scss         = require('gulp-sass'),
      concat       = require('gulp-concat'),
      browsersync  = require('browser-sync').create(),
      uglify       = require('gulp-uglify-es').default,
      autoprefixer = require('gulp-autoprefixer'),
      imagemin     = require('gulp-imagemin'),
      del          = require('del'),
      ttf2woff     = require('gulp-ttf2woff'),
      ttf2woff2    = require('gulp-ttf2woff2'),
      fs           = require('fs'),
      webp         = require('gulp-webp'),
      webphtml     = require('gulp-webp-html'),
      fonter       = require('gulp-fonter');

function browserSync() { 
   browsersync.init({
         server: {
            baseDir: './' + projectFolder + '/' // Путь 
         },
         port: 3000,
         notify: false
   });
}

function html() { // Работа с Html
   return src(path.src.html) // Возвращает путь к html 
      .pipe(webphtml()) // Преобразует img в webp
      .pipe(dest(path.build.html)) // Выгружает файлы в готовый проект
      .pipe(browsersync.stream()); // Перезагружает браузер
}

function css() { // Работа с Css
   return src(path.src.css) // Возвращает путь к css
      .pipe(
         scss({
            outputStyle: 'compressed' // Формировать сжатый css файл
         })
      )
      .pipe( // Подключает autoprefixer
            autoprefixer({
               overrideBrowserslist: ['last 10 version'],
               grid: true
            })
      )
      .pipe(concat('style.min.css'))
      .pipe(dest(path.build.css))//Выгружает файлы в готовый проект
      .pipe(browsersync.stream()); // Перезагружает браузер
}

function js() { // Работа с js
   return src(path.src.js) // Путь к исходникам js
       .pipe(
           uglify() // Сжатие файла
       )
       .pipe(concat('script.min.js')) // Конкатенация  min.js
       .pipe(dest(path.build.js)) //Выгружает файлы в готовый проект
       .pipe(browsersync.stream()); // Перезагружает браузер
}

function images() { // Работа с Картинками
   return src(path.src.img) // Путь к исходникам картинок
       .pipe( //Преобразование в webp
           webp({
               quality: 70
           })
       )
       .pipe(dest(path.build.img)) //Выгружает файлы в готовый проект
       .pipe(src(path.src.img)) // Получает фалы из src 
       .pipe(
         imagemin({ // Минифицирует картинки
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
         })
       )
       .pipe(dest(path.build.img)) //Выгружает файлы в готовый проект
       .pipe(browsersync.stream()); // Перезагружает браузер
}

function fonts() { // преобразует шрифты в woff и woff2
   src(path.src.fonts)
   .pipe(ttf2woff())
   .pipe(dest(path.build.fonts));
   return src(path.src.fonts)
   .pipe(ttf2woff2())
   .pipe(dest(path.build.fonts));
}

function fontsStyle() { // Автоматически подключает шрифты
   let fileContent = fs.readFileSync(sourceFolder + '/scss/fonts.scss'); // Получает данные из исходника

   if (fileContent == '') { // Если исходник пуст
      fs.writeFile(sourceFolder +'/scss/fonts.scss', '', cb); // Создает файл в исходниках
      return fs.readdir(path.build.fonts, function (err, items) { // Возвращает дирректорию исходника
         if (items) { // Если есть аргумент 
            let cFontname; // Создает переменную
            for (var i = 0; i < items.length; i++) { // Перебирает массив
               let fontname = items[i].split('.'); //удаляет символы начиная с точки
               fontname = fontname[0]; // 
               if (cFontname != fontname) { // проверяет на равенство 
               fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb); // Автоматически добавляет в файл с миксином значения
               }
               cFontname = fontname; // присваивает значение 
            }
         }
      });
   }
}


function cb() {

}

function watchFiles() { // Следит за изменением файлов
   watch([path.watch.html], html);
   watch([path.watch.css], css);
   watch([path.watch.js], js);
   watch([path.watch.img], images);
}

function clean() { // Удаляет папку 
   return del(path.clean);
}
// Таск для преобразования шрифта otf в ttf
task('otf2ttf', function() { // задача преобразования otf в ttf
   return src([sourceFolder + '/fonts/*.otf']) // Запрашиваетпуть к исходникам
      .pipe(fonter({ // Переводит в ttf
         formats:['ttf']
      }))
      .pipe(dest(sourceFolder + '/fonts/')); // Выгружает в папку с исходниками ttf файл
});


const build = series(clean, parallel(js,css, html, images, fonts), fontsStyle);
const watchFile = parallel(build,watchFiles,browserSync); // Запускает процессы  

// Экспорт функций
exports.browserSync = browsersync;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.watch = watch;
exports.clean = clean;
exports.default = watchFile;

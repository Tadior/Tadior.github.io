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
      fileinclude  = require('gulp-file-include'),
      fonter       = require('gulp-fonter');
      //swiper       = require('swiper/swiper-bundle.min.js');
      //swiper       = require('swiper');

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
      .pipe(fileinclude())
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

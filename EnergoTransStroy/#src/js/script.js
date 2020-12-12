//Скрипт для Бургер меню ==========================

const burger = document.querySelector('.menu__burger');
const menuNav = document.querySelector('.menu__nav');

function show() {
   if(burger.classList.contains('show')) {
      burger.classList.remove('show');
      menuNav.classList.remove('show');
   } else {
      burger.classList.add('show');
      menuNav.classList.add('show');
   }
}

burger.addEventListener('click', show);

// Анимация catalog__descr

const catalogDescr = document.querySelectorAll('.catalog__descr');
const catalogItems = document.querySelectorAll('.catalog__item');

//catalogItems.forEach(item => {
//   item.addEventListener('mouseover', () => {
//      //catalogDescr.forEach(descr => {
//      //   catalogAnimate(descr);
//      //});
//      const descr = item.querySelector('.catalog__descr');
//      catalogAnimate(descr);
//   });
//});

//function catalogAnimate(item) {
//   const element = item;
//   const start = Date.now(); // Запомнить время начала 
//   const timer = setInterval(function() {
//      // сколько времени прошло с начала анимации?
//      let timePassed = Date.now() - start;

//      if (timePassed >= 2000) {
//         clearInterval(timer); // закончить анимацию через 2 секунды
//         return;
//      }

//      // отрисовать анимацию на момент timePassed, прошедший с начала анимации
//      draw(timePassed,element);
//   }, 20);
//}
//// в то время как timePassed идёт от 0 до 2000
//// left изменяет значение от 0px до 400px
//function draw(timePassed, element) {
//   element.style.top = timePassed / 20 + '%';
//}
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

lightGallery(document.getElementById('lightgallery'));

const mySlider = new Swiper('.slider__wrapper', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   pagination: {
      el: '.swiper-pagination',
      clickable:true,
   },
   slidesPerView: 1,
   slidesPerGroup: 1,
   loop: true,
   spaceBetween: 2,
});

//Меню------------------------

const links = document.querySelectorAll('.menu__link');
const before = document.querySelector('.menu__list').querySelectorAll('li');
console.log(before);

window.addEventListener('scroll', () => {
   if(window.pageYOffset >= 200) {
      links.forEach(link => {
         link.classList.add('menu__color');
      });
      before.forEach(item => {
         item.classList.add('bb');
      });
   } else {
      links.forEach(link => {
         link.classList.remove('menu__color');
      });before.forEach(item => {
         item.classList.remove('bb');
      });
   }
});


const anchors = document.querySelectorAll('a[href*="#"]'); //Находим все элементы с якорями
for (let anchor of anchors) { //Перебор всех элементов
  anchor.addEventListener('click', function(e) { // Событие клик, запуск функции
    e.preventDefault(); //Отмена стандартного поведения браузера
    
    const blockID = anchor.getAttribute('href').substr(1);// Сортирует элементы с якорями

    console.log(blockID);
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}
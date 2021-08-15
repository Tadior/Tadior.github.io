//Скрипт для Бургер меню ==========================
AOS.init({
   // Global settings:
   disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
   startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
   initClassName: 'aos-init', // class applied after initialization
   animatedClassName: 'aos-animate', // class applied on animation
   useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
   disableMutationObserver: false, // disables automatic mutations' detections (advanced)
   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
   throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
   
 
   // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
   offset: 150, // offset (in px) from the original trigger point
   delay: 100, // values from 0 to 3000, with step 50ms
   duration: 400, // values from 0 to 3000, with step 50ms
   easing: 'ease', // default easing for AOS animations
   once: false, // whether animation should happen only once - while scrolling down
   mirror: false, // whether elements should animate out while scrolling past them
   anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
 
});
const burger = document.querySelector('.burger');
const menuNav = document.querySelector('.header__nav');

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


const swiper = new Swiper('.main__slider', {
   loop: true,

   navigation: {
      nextEl: '.main__button-next',
      prevEl: '.main__button-prev',
   }
});

$('.swiper__second-wrapper').slick({
   slidesToShow: 3,
   nextArrow: $('.main__item-arrow--next'),
   prevArrow: $('.main__item-arrow--prev'),
   responsive: [
      {
         breakpoint: 900,
         settings: {
            slidesToShow: 2
         }
      },
      {
         breakpoint: 650,
         settings: {
            slidesToShow: 1
         }
      }
   ]
});

const languages = document.querySelectorAll('.header__language ');
languages.forEach(element => {
   element.addEventListener('click', () => {
      if (element.classList.contains('language-active')) {
         return false;
      } else {
         document.querySelector('.language-active').classList.remove('language-active');
         element.classList.add('language-active');
      }
   })
});

//const galleryButton = document.querySelector('#gallery-btn');
//const galleryItems = document.querySelectorAll('.gallery__picture');
//let check = false;

//window.onresize = function() {
//   if (document.body.clientWidth < 450) {
//      if(check == true) {
//         return false;
//      }
//      for (let i = 0; i <= galleryItems.length; i++) {
//         if(i > 1) {
//            galleryItems[i].classList.add('gallery-hide');
//         }
//      }
//      let NewButton = document.createElement('div');
//      //NewButton.classList.add('btn');
//      //document.querySelector('.gallery').append(NewButton);
//      console.log(document.querySelector('.gallery'))
//      galleryButton.style.display = 'none';
//      check = true;
//   }
//   if (document.body.clientWidth > 450) {
//      galleryButton.style.display = 'block';
//      const galleryHide = document.querySelectorAll('.gallery-hide');
//         galleryHide.forEach(elem => {
//            elem.classList.remove('gallery-hide');
//         });
//   }
//}
//console.log(document.body.clientWidth);

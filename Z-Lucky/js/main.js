window.onload  = function () {
    let  preloader  = document.getElementById('preloader');
    preloader.style.display  =  'none';
};

$(function(){
    $('.menu_burger').click(function(event) {
        $('.menu').toggleClass('activen'),
        $('.menu-wrapper').toggleClass('activen'),
        $('.dots-style').toggleClass('dots-style-none');
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        dotsClass: 'dots-style'
    });
  
    new WOW().init();

});
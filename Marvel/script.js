$('.menu-btn').on('click', function(e){
    e.preventDefault;
    $(this).toggleClass('menu-btn_active');
    $('.header-items').toggleClass('header-items_active');
});

let text = document.querySelectorAll('.about-item'),
    box = document.querySelector('.about-items');
    
for (let i = 0; i < text.length; i++){
    let div1 = document.createElement('div');
    div1.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elitelquam.Fusce quis nulla tincidunt interdum magna vitae.';
    div1.classList.add ('about-item_paragraph');
    text[i].addEventListener('click', function(e){
        let target = e.target;
        if(target && target.contains(div1)){ // через target.contains(div1) проверяем наличие нашего созданного элемента
            for (let j = i; j < text.length; j++) {
                text[j].classList.remove ('about-item_all');
                console.log(i); // Для наглядности
            break;
            };
            text[i].removeChild(div1);      // если есть (  target.contains(div1) == true  ), то удаляем
            console.log(target.contains(div1)); // для наглядности вывел в консоль результат
        } else {
            for (let j = i; j < text.length; j++) {
                text[j].classList.add ('about-item_all');
                console.log(j); // Для наглядности
            break;
            };
            text[i].appendChild(div1);          //если нету (  target.contains(div1) == false  ), то добавляем
            console.log(target.contains(div1));// для наглядности вывел в консоль результат
        }
    });
}

let expert = document.querySelectorAll('.expert-item'), //Находим все общие элементы
    //expertAll = document.querySelector('.expert-items'); //Находим общий элемент
    expertNew = document.querySelectorAll('.expert-item_active'); //Находим общий элемент

    for(let i = 0; i < expert.length; i++){  //   делаем переборку псевдомассива expert
        expert[i].addEventListener('click', () => { //добавляем событие клик
            for (let j = i; j < expertNew.length; j++) { //делаем переборку псевдомассива expertNew
                expertNew[j].classList.add('active'); // элементу соответствующему добавляем класс в котором display: block
                expert[i].style.display = 'none'; // прячем наш стартовый блок
                expertNew[i].style.cursor = 'pointer'; //Меняем курсор
                break; //Прерываем
            }
        });
    }
//  а теперь все в обратном порядке)))   при клике на блок (который появился), он сам пропадает, а появляется старый
    for(let i = 0; i < expertNew.length; i++){  //   делаем переборку псевдомассива expert
        expertNew[i].addEventListener('click', () => { //добавляем событие клик
            for (let j = i; i < expert.length; i++){ //делаем переборку псевдомассива expertNew
                expert[j].style.display = 'block'; // показываем наш старый блок
                expertNew[i].classList.remove('active'); // прячем новый)))
                //expertNew[i].style.cursor = 'pointer';
                break; //Прерываем
            }
        });
    }

let work = document.querySelectorAll('.work-photo'), //Создаем переменные
    workActive = document.querySelectorAll('.work-photo_text'); //Создаем переменные

    for(let i = 0; i < work.length; i++){  //Условие если i < чем длина work то i++
        work[i].addEventListener('mouseover', () => { //Присваиваем событие наведения мыши
            console.log('mouseover')
            for (let j = i; j < workActive.length; j++) { //Условие если j < workActive то j++
                workActive[j].style.opacity = '1'; //Изменяем свойство css
                workActive[j].style.transform = 'scale(1)'; //Изменяем свойство css
                break;
            }
        });
    }

    for(let i = 0; i < workActive.length; i++){  //Условие если i < чем длина work то i++
        workActive[i].addEventListener('mouseout', () => { //Присваиваем событие наведения мыши
            console.log('mouseNot')
            for (let j = i; j < work.length; i++) { //Условие если j < work то j++
                workActive[j].style.opacity = '0'; //Изменяем свойство css
                workActive[j].style.transform = 'scale(0)'; //Изменяем свойство css
                break;
            }
        });
    }

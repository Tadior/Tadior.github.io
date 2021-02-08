const counterDate = document.querySelector('.counter__date'),
      counterTime = document.querySelector('.counter__time'),
      counterHours= document.querySelector('.counter__hours'),
      counterConfirm = document.querySelector('.counter__confirm'),
      counterResult = document.querySelector('.counter__result');

function calculateTime() {
   const dateTime = counterTime.value.split(':'),
         dateTimestampStart = (dateTime[0] * 60 * 60 * 1000) + (dateTime[1] * 60 * 1000), // время в мс
         dateTimestampFinish = counterHours.value * 60 * 60 * 1000, // время отсчета
         dateStart = Date.parse(counterDate.value) + dateTimestampStart; // время старта в мс

   let i = dateStart + dateTimestampFinish;
   let t = new Date(i);
   console.log(t)
   counterResult.innerHTML = `Время истечет ${t.getUTCDate()} числа ${t.getUTCMonth() + 1} месяца ${t.getUTCFullYear()} года в ${t.getUTCHours()}:${t.getUTCMinutes()}`;
}
//function getTimestamp() {

//}

counterConfirm.addEventListener('click', calculateTime);
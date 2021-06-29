function solution (today, limit) {
    today = today.split('-');
    today = new Date(parseInt(today[0]), parseInt(today[1]), parseInt(today[2]));

    trs = document.querySelectorAll('table tbody tr');

    var mistakes = 0;


    for(let tr of trs) {
        var td = tr.querySelectorAll('td');
        var diff = 0;  

        var takeDate = td[1].innerText;
        var returnDate = td[2].innerText;

        takeDate = takeDate.split('-');
        takeDate = new Date (parseInt(takeDate[0]),parseInt(takeDate[1]),parseInt(takeDate[2]));

      if(returnDate.trim()){
          returnDate = returnDate.split('-');
          returnDate = new Date (parseInt(returnDate[0]),parseInt(returnDate[1]),parseInt(returnDate[2]));

          diff = returnDate.getTime() - takeDate.getTime();

      }else {
          diff = today.getTime() - takeDate.getTime();

      }

      var diffDays = diff / (1000 * 3600 * 24);

      if(diffDays > limit) {
          if(tr.style.backgroundColor !== 'red'){
              mistakes++
          }else{
              if(tr.style.backgroundColor === 'red'){
               mistakes++
              }
          }
      }
}

return mistakes
}
var result = solution('2016-11-30', 14);
console.log(result)

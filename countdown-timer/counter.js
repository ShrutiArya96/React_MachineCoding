(function() {
    let currentTime = {
        hr: 0,
        min: 0,
        sec:0
    } 
    let timer = null;
    el('#start-counter').addEventListener('click', () => {startTimer()});
    el('#reset-counter').addEventListener('click', () => {resetTimer()});
    el('#counter-hour').addEventListener('keyup', (e) => {setTime(e, 'hr')});
    el('#counter-minutes').addEventListener('keyup', (e) => {setTime(e, 'min')});
    el('#counter-seconds').addEventListener('keyup', (e) => {setTime(e, 'sec')});

    function setTime(e, parameter) {
        if(e.target.value > 0 && e.target.value <= 60 && !timer) {
            currentTime[parameter] = e.target.value;
        }
    }
    function updateTime() {
        if(currentTime.sec > 0) {
            currentTime.sec = currentTime.sec - 1;
        } else {
            if(currentTime.min > 0) {
                currentTime.sec = 59;
                currentTime.min = currentTime.min - 1;
            } else if(currentTime.hr > 0) {
                currentTime.min = 59;
                currentTime.sec = 59;
                currentTime.hr = currentTime.hr - 1;
            } else {
                resetTimer();
            }   
        }
        setView();
    }

    function startTimer() {
        if(!timer) {
            timer = setInterval(updateTime, 1000);
        }   
    }

    function setView() {
        el('#counter-seconds').value = currentTime.sec;
        el('#counter-minutes').value = currentTime.min;
        el('#counter-hour').value = currentTime.hr;
    }

    function resetTimer() {
        currentTime = {
            hr: 0,
            min: 0,
            sec:0
        } 
       clearInterval(timer);
       timer=null;
        setView();
    }

    function el(selecter) {
        return document.querySelector(selecter);
    }
})()
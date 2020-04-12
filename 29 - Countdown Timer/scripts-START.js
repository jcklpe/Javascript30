let countdown;
const timerDisplay = document.querySelector(`.display__time-left`);
const endTime = document.querySelector(`.display__end-time`);
const buttons = document.querySelector(`[data-time]`);




function timer(seconds){
    //clear any existing timers
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    // set interval
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        //Check if we should stop it
        if (secondsLeft < 0){
            clearInterval(secondsLeft);
            return;
        }

        // Display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    console.log(minutes, remainderSeconds);
    // changes window title to reflect timer time
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes =  end.getMinutes();
    const seconds = end.getSeconds();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
}

buttons.forEach(button => buttons.addEventListner(`click`, startTimer));
document.customForm.addEventListner(`submit`, function(event){
event.preventDefault();
const mins = this.minutes.value;
timer(mins * 60);
this.reset();
});

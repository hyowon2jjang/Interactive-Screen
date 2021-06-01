const clockContainer = document.querySelector(".js-clock");
clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    const days = date.getUTCDate();
    const months = date.getUTCMonth();
    const years = date.getUTCFullYear();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}\n ${days} ${months + 1}, ${years}`;
}


function init() {
    getTime();
    setInterval(getTime, 500);
}

init();
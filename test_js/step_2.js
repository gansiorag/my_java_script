'use strict';

const box = document.querySelector(".box"),

btn = document.querySelector('button');

// const width = box.clientWidth;
// const heigh = box.clientHeight;
// const width = box.offsetWidth;
// const heigh = box.offsetHeight;
const width = box.scrollWidth;
const heigh = box.scrollHeight;

console.log("My messadges =====>>>>>   ", width, heigh);

btn.addEventListener('click', () => {
    box.style.height = heigh + 'px';
    console.log("My messadges 2  =====>>>>>   ", width, heigh);
})
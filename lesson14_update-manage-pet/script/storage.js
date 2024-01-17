'use strict';

const activeSidebar = document.getElementById("sidebar");
const KEYBREED = "breedList";
const KEY = "petList";

function saveToStorage(key, value) {
    //Method JSON.stringify : chuyển JSON từ array về string 
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    //JSON.parse : chuyển string thành array 
    return JSON.parse(localStorage.getItem(key));
}
activeSidebar.addEventListener('click', function () {
    this.classList.toggle("active");
});

// activeSidebar.addEventListener('click', (event) => {
//     event.target.classList.toggle("active");
// });
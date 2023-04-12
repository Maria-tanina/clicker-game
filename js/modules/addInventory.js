import { inventoryList } from "./inventoryList.js";

const items = document.querySelector('.items');
const inventory = document.querySelector('.inventory ');
function getRandomValue(min, max) {
    let rand;
    rand = Math.random() * (max - min + 1) + min;
    return Math.floor(rand);
};


/* создание предмета */
export function createItem(level, time) {
    items.innerHTML = "";
    let random = getRandomValue(3000, 6000);
    let item = document.createElement("img");
    item.classList.add('inventory__item');
    item.setAttribute("src", inventoryList[level-1].image);
    items.appendChild(item);
   
    item.style.top = "-90px";
    item.style.left = getRandomValue(214, window.innerWidth - 115) + "px";
     setTimeout(() => fallItem(item,time, level), random)
}



function fallItem(item, time, level) {
    let intID = setInterval(() => {
        item.style.top = item.offsetTop + 15 + 'px';

        if (item.offsetTop > window.outerHeight) {      // если не впоймал
            item.remove();
            clearInterval(intID);
        }
    }, time);
    item.addEventListener('click', () => {
        item.remove();
        clearInterval(intID);
        catchItem(level)
    })
}


function catchItem(level) {
    const {image, name, description, hp} = inventoryList[level-1];
    const item = `
        <div class="inventory__card">
            <img class="inventory__image" src=${image} alt="inventory">
            <div class="inventory__info">
                <h5 class="inventory__title">${name}</h5>
                <p class="inventory__description">${description}</p>
                <button class="inventory__btn" data-hp="${hp}">Use</button>
            </div>
        </div>
    `
    inventory.insertAdjacentHTML('beforeend', item);
 

}


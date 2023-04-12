import { openModal, closeModal } from "./modal.js";
import { achieves } from "./achieves.js";


export function addAchieve(selector) {
    const parentElement =  document.querySelector('.achivements');
    const  modalAchievement = document.querySelector('.modal__achievement');
    const {title, description} = achieves.filter(item => item.selector === selector)[0];
    const date = new Date();
    let achieve =  `
        <div class="achivements__item">
            <img class="achivements__image" src="images/icons/box.png" alt="box">
            <div class="achivements__info">
                <h5 class="achivements__title">${title}</h5>
                <p class="achivements__description">${description}</p>
                <time class="achivements__time">Unlocked on: ${date}</time>
            </div>
        </div>
    `
    parentElement.insertAdjacentHTML('beforeend', achieve);
    openModal(modalAchievement);
    
    //Close modal after 10 seconds
   let timer = setInterval(() => {
        closeModal(modalAchievement);
        clearInterval(timer);
    }, 10000)
 }
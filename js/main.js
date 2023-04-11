import {heroes} from "./modules/heroes.js";
import { renderHero } from "./modules/renderHero.js";
import { renderHeroes } from "./modules/renderHeroes.js";
import { closeModal, openModal } from "./modules/modal.js";

document.addEventListener('DOMContentLoaded', () => {
     // Get elements from DOM
    const   modal = document.querySelector('.modal'),  //register form modal
            modalform = document.querySelector('.modal__form'),
            nickname = document.querySelector('.nickname'),
            name = document.querySelector('.name'),
            email = document.querySelector('.email'),
            username = document.querySelector('.username'),
            soundBtn = document.querySelector('.sound img'),
            player = document.querySelector('audio'),
            congratModal = document.querySelector('.modal__congratulation'),  //congratulation modal
            nextBtn = document.querySelector('.next__btn'), //next level button
            game = document.querySelector('.game'),
            counter = document.querySelector('.score'),  
            heroesList = document.querySelector('.game__list'),
            finishModal = document.querySelector('.modal__endgame'),  //endgame modal
            restartBtn = document.querySelector('.restart__btn'),
            heroWrapper = document.querySelector('.hero');

    let levelCounter = 1,
        currentHero = heroes[0],
        total = 0, //total count of clicks
        score = 0, //count of clicks for current level
        heroHp = 10,
        sound = 'off';

    //Event delegation
    document.addEventListener('click', (e) => {
        //Click on hero
            if(e.target.classList.contains('hero__image')) {
                addScore();
                switchLevel();
            }
            if(e.target.classList.contains('sound__img')) {
                toggleSound();
            }
        })









    renderHero(currentHero, heroWrapper, levelCounter);

    let damage = document.querySelector('.damage'),
        finishGif = document.querySelector('.finish__gif');
 

//Function of turning on/off the music
function toggleSound() {
 if (sound == 'on') {
     soundBtn.src = 'images/icons/mute_sound.png';
     sound = 'off';
     player.pause();
 } else {
     soundBtn.src = 'images/icons/sound_on.png';
     sound = 'on';
     player.play();
 }
}


//Start the game
const startGame = (e) => {
    e.preventDefault();
    game.style.display = '';
    closeModal(modal);
    localStorage.setItem('nickname', nickname.value);
    localStorage.setItem('name', name.value);
    localStorage.setItem('email', email.value);
    username.textContent = localStorage.getItem('nickname');
}


setStartContent();

function setStartContent() {
renderHeroes(heroes, heroesList);
 modalform.addEventListener('submit', startGame);
 if(localStorage.getItem('email')) {
     game.style.display = '';
     //Save username if user reloads the page
     username.textContent = localStorage.getItem('nickname');
     modalform.removeEventListener('submit', startGame);
 } else {
     openModal(modal);
 }

}



//Switching levels
function switchLevel() {
 switch(total) { 
     case 10: 
     heroIsDefeated();
         break;
     case 25: 
     heroIsDefeated();
         break;
     case 45: 
     heroIsDefeated();
         break;
     case 70: 
     heroIsDefeated();
         break;
     case 100:
         endGame();
         break;
 }

}

//Add points on each click
function addScore() {
    console.log('add');
 total += 1;
 score+=1;
 document.querySelector('.current__score').textContent = score;
 damage.style.width = damage.offsetWidth + (420/heroHp) + 'px';
 counter.textContent = total;
 if(heroHp - score < 4) {
     finishGif.style.opacity = 1;
 }
}

function heroIsDefeated() {
 openModal(congratModal);
 finishGif.style.opacity = 0;
}


//Change level content
function upgradeLevel() {
 levelCounter+=1;
 score = 0;
 heroHp+=5;
 currentHero = heroes[levelCounter-1];
 renderHero(currentHero, heroWrapper, levelCounter);
 damage = document.querySelector('.damage');

 const level = document.querySelectorAll('.level')
 level.forEach(item => item.classList.remove('level--active'));
 level[levelCounter-1].classList.remove('locked');
 level[levelCounter-1].classList.add('level--active');
 game.style.backgroundImage = currentHero.theme;

 closeModal(congratModal);
}

//Trigger for next level
nextBtn.addEventListener('click', upgradeLevel);


function endGame() {
 finishGif.style.opacity = 0;
 document.querySelector('.finalscore').textContent = total;
 openModal(finishModal);
 restartBtn.addEventListener('click', restart);
}

function restart() {
 location.reload();
} 
})
    
   


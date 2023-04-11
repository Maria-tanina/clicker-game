import {heroes} from "./modules/heroes.js";
import { renderHero } from "./modules/renderHero.js";
import { renderHeroes } from "./modules/renderHeroes.js";
import { closeModal, openModal } from "./modules/modal.js";
import { changeActiveLevel } from "./modules/changeActiveLevel.js";

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
            game = document.querySelector('.game'),
            counter = document.querySelector('.score'),  
            heroesList = document.querySelector('.game__list'),
            finishModal = document.querySelector('.modal__endgame'),  //endgame modal
            heroWrapper = document.querySelector('.hero');

    let levelCounter = 1,
        currentHero = heroes[0], 
        total = 0, //total count of clicks
        score = 0, //count of clicks for current level
        sound = 'off';

    //Event delegation
    document.addEventListener('click', (e) => {
        //Click on hero
        if(e.target.classList.contains('hero__image')) {
            addScore();
            switchLevel();
        }
        //Turn on/off the music
        if(e.target.classList.contains('sound__img')) {
            toggleSound();
        }
        //Trigger for next level
        if(e.target.classList.contains('next__btn')) {
            upgradeLevel();
        }
        //Trigger for restart game
        if(e.target.classList.contains('restart__btn')) {
            restart();
        }
    })

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
        renderHero(currentHero, heroWrapper, levelCounter);
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
    let damage = document.querySelector('.damage'),
    finishGif = document.querySelector('.finish__gif');
    const level = document.querySelectorAll('.level');

    function addScore() {
        total += 1;
        score+=1;
        document.querySelector('.current__score').textContent = score;
        damage.style.width = damage.offsetWidth + (405/currentHero.hp) + 'px';
        counter.textContent = total;
        if(currentHero.hp - score < 4) {
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
        currentHero = heroes[levelCounter-1];
        renderHero(currentHero, heroWrapper, levelCounter);
        game.style.backgroundImage = `url(${currentHero.theme})`;

        damage = document.querySelector('.damage');
        finishGif = document.querySelector('.finish__gif');

        changeActiveLevel(level, levelCounter-1);
        closeModal(congratModal);
    }

    function endGame() {
        finishGif.style.opacity = 0;
        document.querySelector('.finalscore').textContent = total;
        openModal(finishModal);
    }

    function restart() {
        location.reload();
    } 
})
    
   


import {heroes} from "./modules/heroes.js";
import { renderHero } from "./modules/renderHero.js";
import { renderHeroes } from "./modules/renderHeroes.js";
import { closeModal, openModal } from "./modules/modal.js";
import { changeActiveLevel } from "./modules/changeActiveLevel.js";
import { hideTabContent, showTabContent } from "./modules/tabs.js";
import { addAchieve } from "./modules/addAchieves.js";
import { createItem } from "./modules/addInventory.js";

document.addEventListener('DOMContentLoaded', () => {
     // Get elements from DOM
    const   modal = document.querySelector('.modal'), //register form modal
            modalform = document.querySelector('.modal__form'),
            nickname = document.querySelector('.nickname'),
            name = document.querySelector('.name'),
            email = document.querySelector('.email'),
            username = document.querySelector('.username'), //username that is displayed during the game
            soundBtn = document.querySelector('.sound img'),
            player = document.querySelector('audio'),
            congratModal = document.querySelector('.modal__congratulation'),  //congratulation modal
            game = document.querySelector('.game'), //Game wrapper
            counter = document.querySelector('.score'),  
            heroesList = document.querySelector('.heroes__list'),
            finishModal = document.querySelector('.modal__endgame'),  //endgame modal
            heroWrapper = document.querySelector('.hero'),
            modalAchievement = document.querySelector('.modal__achievement');
            
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        levelCounter = 1,
        currentHero = heroes[0], 
        total = 0, //total count of clicks
        score = 0, //count of clicks for current level
        sound = 'off';

    //Event delegation
    document.addEventListener('click', (e) => {
        const target = e.target;
        //Click on hero
        if(target.classList.contains('hero__image')) {
            addScore();
            switchLevel();
        }
        //Turn on/off the music
        if(target.classList.contains('sound__img')) {
            toggleSound();
        }
        //Trigger for next level
        if(target.classList.contains('next__btn')) {
            upgradeLevel();
        }
        if(target.classList.contains('close')) {
            closeModal(modalAchievement);
        }
        if(target.classList.contains('inventory__btn')) {
            const dataset = +target.dataset.hp;
            if(currentHero.hp - score < dataset) {
                total += currentHero.hp - score
                score = currentHero.hp;
            } else {
                total += dataset;
                score+= dataset;
            }
            document.querySelector('.current__score').textContent = score;
            counter.textContent = total;
            damage.style.width = damage.offsetWidth + (405*dataset/currentHero.hp) + 'px';
            if(currentHero.hp - score < 4) {
                finishGif.style.opacity = 1;
            }
            target.closest('.inventory__card').remove();
            switchLevel()
        }
        //Trigger for tabs
        if(target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent(tabs, tabsContent);
                    showTabContent(i, tabs, tabsContent);
                }
            });
        }
        //Trigger for restart game
        if(target.classList.contains('restart__btn')) {
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


    //Start the game after form submission
    const startGame = (e) => {
        e.preventDefault();
        game.style.display = '';
        closeModal(modal);
        localStorage.setItem('nickname', nickname.value);
        localStorage.setItem('name', name.value);
        localStorage.setItem('email', email.value);
        username.textContent = localStorage.getItem('nickname');
    }

    //Setup start content depending on whether the user is registered or not
    setStartContent();
    function setStartContent() {
        renderHero(currentHero, heroWrapper, levelCounter);
        renderHeroes(heroes, heroesList);
        hideTabContent(tabs, tabsContent);
        showTabContent(0, tabs, tabsContent);
        modalform.addEventListener('submit', startGame);
        if(localStorage.getItem('email')) {
            game.style.display = '';
            //Save username if user reloads the page
            username.textContent = localStorage.getItem('nickname');
            createItem(levelCounter, 100);
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
            addAchieve('firstlevel');
                break;
            case 25: 
            heroIsDefeated();
                break;
            case 45: 
            heroIsDefeated();
                break;
            case 50:
                addAchieve('first50');
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
        createItem(levelCounter, 100);
    }


    //User has won
    function endGame() {
        finishGif.style.opacity = 0;
        document.querySelector('.finalscore').textContent = total;
        openModal(finishModal);
    }

    function restart() {
        location.reload();
    } 
})
    
   


window.addEventListener('DOMContentLoaded', () => {

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
            damage = document.querySelector('.damage'),
            heroImage = document.querySelector('.hero__image'),
            heroFace = document.querySelector('.hero__face'),
            finishModal = document.querySelector('.modal__endgame'),  //endgame modal
            restartBtn = document.querySelector('.restart__btn'),
            level = document.querySelectorAll('.level'),
            finishGif = document.querySelector('.finish__gif');

    let levelCounter = 1;
    let currentHero = 'hulk';
    let total = 0; //total count of clicks
    let score = 0; //count of clicks for current level
    let heroHp = 10; 

    //Function of turning on/off the music
    let sound = 'off';
    soundBtn.addEventListener('click', toggleSound);
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

    //Work with modals
    function closeModal(modal) {
        modal.classList.remove('show');
        modal.classList.add('hide');
    }
    function openModal(modal) {
        modal.classList.add('show');
        modal.classList.remove('hide');
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
    // modalform.addEventListener('submit', startGame);
    // //Open register form only if user hasn't registered yet.
    // if(localStorage.getItem('email')) {
    //     game.style.display = '';
    //     modalform.removeEventListener('submit', startGame);
    // } else {
    //     openModal(modal);
    // }
    // //Save username if user reloads the page
    // username.textContent = localStorage.getItem('nickname');


    setStartContent();

    function setStartContent() {
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
    heroImage.addEventListener('click', () => {
        addScore();
        switchLevel();
    })

    function switchLevel() {
        switch(total) { 
            case 10: 
            currentHero = 'captain';
            heroIsDefeated();
                break;
            case 25: 
            currentHero = 'ironman';
            heroIsDefeated();
                break;
            case 45: 
            currentHero = 'spiderman';
            heroIsDefeated();
                break;
            case 70: 
            currentHero = 'venom';
            heroIsDefeated();
                break;
            case 100:
                endGame();
                break;
        }

    }

    //Add points on each click
    function addScore() {
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
        damage.style.width = 0;
        document.querySelector('.current__score').textContent = score;
        document.querySelector('.total__score').textContent = heroHp;
        level.forEach(item => item.classList.remove('level--active'));
        level[levelCounter-1].classList.remove('locked');
        level[levelCounter-1].classList.add('level--active');
        document.querySelector('.current__level').textContent = `Level ${levelCounter}`;
        document.querySelector('.current__hero').textContent = currentHero.toUpperCase();
        game.style.backgroundImage = `url(images/areas/${currentHero}.jpg)`;
        heroFace.setAttribute('src', `images/heroes/${currentHero}-face.png`);
        heroImage.setAttribute('src', `images/heroes/${currentHero}.png`);
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
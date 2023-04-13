import { addAchieve } from "./addAchieve.js";
import { openModal } from "./modal.js";

 //Switching levels
export  function switchLevel(total) {
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
                    endGame(total);
                    break;
            }
       }

function heroIsDefeated() {
    openModal(document.querySelector('.modal__congratulation'));
    document.querySelector('.finish__gif').style.opacity = 0;
}
    
function endGame(total) {
    document.querySelector('.finish__gif').style.opacity = 0;
    document.querySelector('.finalscore').textContent = total;
    openModal(document.querySelector('.modal__endgame'));
}
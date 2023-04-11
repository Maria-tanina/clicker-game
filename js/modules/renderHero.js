export function renderHero(hero, parentElement, level) {
   const {name, image, face, hp} = hero;
   const item =
        `
                <div class="hero__health">
                    <div class="hero__avatar">
                        <img class="hero__face" src=${face} alt="hero face">
                    </div>
                    <div class="hero__box">
                        <div class="hero__lifeline"><span class="damage"></span></div>
                        <div class="hero__info">
                            <div class="level__title current__hero">${name}</div>
                            <span class="space">-</span>
                            <div class="current__level">Level ${level}</div>
                            <span class="current__score">0</span>
                            <span>/</span>
                            <span class="total__score">${hp}</span>
                        </div>
                    </div>
                </div>
                <img class="finish__gif" src="images/finishHim.gif" alt="finish him">
                <img class="hero__image" src=${image} alt=${name}>
        `
    parentElement.innerHTML = item;
    
}
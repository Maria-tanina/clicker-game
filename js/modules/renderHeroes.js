//Render heroes list(levels)
export function renderHeroes(heroes, parentElement) {
        const items =  heroes.map(({name, face, hp}, i) => {
        let className = i ? 'locked' : 'level--active';
        return (
            `
            <li class="game__item level ${className}">
                <img class="level__image" src=${face} alt="hulk">
                <div class="level__details">
                    <div class="level__title">${name}</div>
                    <div class="level__info">
                        <div class="level__num">Level ${i + 1}</div>
                        <div class="level__hp">${hp} HP</div>
                    </div>
                    <div class="level__health"></div>
                </div>
            </li>
            `
        )
        })
        parentElement.innerHTML = items.join('');
    }
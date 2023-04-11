export  function changeActiveLevel(level, i) {
    level.forEach(item => item.classList.remove('level--active'));
    level[i].classList.remove('locked');
    level[i].classList.add('level--active');
}
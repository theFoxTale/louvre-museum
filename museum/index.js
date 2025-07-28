const playProgress = document.querySelector('.play-progress');

playProgress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, var(--slider-grey) ${value}%, var(--slider-grey) 100%)`
})

const volumeProgress = document.querySelector('.volume-progress');

volumeProgress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, var(--slider-grey) ${value}%, var(--slider-grey) 100%)`
})

let adaptiveMenuShown = false;
function toggleAdaptiveMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('menu-open');

    const welcomeText = document.querySelector('.welcome-text');
    welcomeText.classList.toggle('hidden-by-menu');

    const navigation = document.querySelector('.header-navigation-list');
    navigation.classList.toggle('header-navigation-list-on-left');
}

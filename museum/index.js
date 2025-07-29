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

    const welcomeImage = document.querySelector('.welcome-image-container');
    welcomeImage.classList.toggle('hidden-by-menu-optional');

    const welcomeSlider = document.querySelector('.welcome-slider');
    welcomeSlider.classList.toggle('hidden-by-menu-optional');

    const background = document.querySelector('.relative-section');
    background.classList.toggle('height-for-menu');

    const navigation = document.querySelector('.header-navigation-list');
    navigation.classList.toggle('header-navigation-list-on-left');

    const navigationImages = document.querySelector('.navigation-images');
    navigationImages.classList.toggle('header-navigation-list-on-left');

    const navigationSocial = document.querySelector('.social-navigation');
    navigationSocial.classList.toggle('header-navigation-list-on-left');
}

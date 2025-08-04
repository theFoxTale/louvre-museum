document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        if (!isAdaptiveMenuOpen) return;

        const menuIcon = document.querySelector('.menu-icon');
        const menu = document.querySelector('.header-navigation');

        const clickedInsideMenu = menu?.contains(event.target) ?? false;
        const clickedOnIcon = menuIcon?.contains(event.target) ?? false;

        if (!clickedInsideMenu && !clickedOnIcon) {
            toggleAdaptiveMenu();
        }
    });

    const popUp = document.querySelector('.pop-up');
    popUp.addEventListener('click', (event) => {
        if (event.target.classList.contains('pop-up')) {
            popUp.classList.toggle('invisible-element');
        }
    });
});

function closePopUp() {
    const popUp = document.querySelector('.pop-up');
    popUp.classList.toggle('invisible-element');
}

function clickSlider(slider) {
    const value = slider.value;
    slider.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, var(--slider-grey) ${value}%, var(--slider-grey) 100%)`;
}

let isAdaptiveMenuOpen = false;
function toggleAdaptiveMenu() {
    isAdaptiveMenuOpen = !isAdaptiveMenuOpen;

    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('is-open');

    const welcomeSection = document.querySelector('.welcome-section');
    welcomeSection.classList.toggle('hidden-by-menu');

    const navigation = document.querySelector('.header-navigation');
    navigation.classList.toggle('header-navigation-active');
}

function clickBuyTicket() {
    const popUp = document.querySelector('.pop-up');
    popUp.classList.toggle('invisible-element');
}
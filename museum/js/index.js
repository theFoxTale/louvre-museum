let isAdaptiveMenuOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.header-navigation');

    menuIcon.addEventListener('click', toggleAdaptiveMenu);

    document.addEventListener('click', (event) => {
        if (!isAdaptiveMenuOpen) return;

        const clickedInsideMenu = menu?.contains(event.target) ?? false;
        const clickedOnIcon = menuIcon?.contains(event.target) ?? false;

        if (!clickedInsideMenu && !clickedOnIcon) {
            toggleAdaptiveMenu();
        }
    });

    const popUp = document.querySelector('.pop-up');
    popUp.addEventListener('click', (event) => {
        if (event.target.classList.contains('pop-up')) {
            togglePopUp(popUp);
        }
    });
});

function togglePopUp(element = undefined) {
    const popUp = element ?? document.querySelector('.pop-up');
    popUp.classList.toggle('active');
    document.body.classList.toggle('popup-is-open');
}

function toggleAdaptiveMenu() {
    isAdaptiveMenuOpen = !isAdaptiveMenuOpen;

    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('is-open');

    const welcomeSection = document.querySelector('.welcome-section');
    welcomeSection.classList.toggle('hidden-by-menu');

    const navigation = document.querySelector('.header-navigation');
    navigation.classList.toggle('header-navigation-active');
}
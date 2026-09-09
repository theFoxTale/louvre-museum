let slidesContainer, slidesList, squaresList, welcomeSlideNumberText;

let currentWelcomeSlide = 0;
const dragThreshold = 20;
let positionStart = 0;

/*
* Shift slide by controls functions
*/
function setActiveSlide() {
    for (let slide of slidesList) {
        slide.classList.remove('selected-slide');
    }
    slidesList[currentWelcomeSlide].classList.add('selected-slide');
}

function setActiveSquare() {
    for (let square of squaresList) {
        square.classList.remove('selected');
    }
    squaresList[currentWelcomeSlide].classList.add('selected');
}

function setSlideNumber() {
    welcomeSlideNumberText.textContent = "0" + (currentWelcomeSlide + 1);
}

function showSelectedSlide() {
    setActiveSquare();
    setActiveSlide();
    setSlideNumber();
}

function selectPrevSlide() {
    getWelcomeSlideIndex(--currentWelcomeSlide);
    showSelectedSlide();
}

function selectNextSlide() {
    getWelcomeSlideIndex(++currentWelcomeSlide);
    showSelectedSlide();
}

let getWelcomeSlideIndex = (newIndex) => currentWelcomeSlide = (newIndex + slidesList.length) % slidesList.length;

/*
* Drag and drop slides functions
*/
function dragStart(event) {
   positionStart = event.clientX;
}

function dragEnd(event) {
    if (positionStart) {
        const positionEnd = event.clientX;
        const moveSize = positionEnd - positionStart;
        positionStart = 0;

        if (moveSize > dragThreshold) {
            selectPrevSlide();
        } else if (moveSize < -dragThreshold) {
            selectNextSlide();
        }
    }
}

/*
* DOM functions
*/
function getWelcomeElements() {
    slidesContainer = document.querySelector('.welcome-image-container');
    slidesList = document.querySelectorAll('.slider-image');
    squaresList = document.querySelectorAll('.welcome-button');
    welcomeSlideNumberText = document.querySelector('.selected-slide-number');
}

function setWelcomeListeners() {
    slidesContainer.addEventListener('mousedown', event => dragStart(event));
    slidesContainer.addEventListener('mouseup', event => dragEnd(event));
    slidesContainer.addEventListener('mouseleave', event => dragEnd(event));

    slidesContainer.addEventListener('touchstart', event => dragStart(event.touches[0]));
    slidesContainer.addEventListener('touchend', event => dragEnd(event.touches[0]));
    slidesContainer.addEventListener('touchmove', event => event.preventDefault());

    squaresList.forEach((squareItem, squareIndex) => {
        squareItem.addEventListener('click', () => {
            currentWelcomeSlide = squareIndex;
            showSelectedSlide();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getWelcomeElements();
    setWelcomeListeners();
});

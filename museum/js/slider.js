let currentSlide = 0;
const slidesList = document.querySelectorAll('.slider-image');
const squaresList = document.querySelectorAll('.welcome-button');
const slideNumber = document.querySelector('.selected-slide-number');

const dragThreshold = 20;
let positionStart = 0;
const slidesContainer = document.querySelector('.welcome-image-container');

function setActiveSlide(slideIndex) {
    for (let slide of slidesList) {
        slide.classList.remove('selected-slide');
    }
    slidesList[slideIndex].classList.add('selected-slide');
}

function setActiveSquare(slideIndex) {
    for (let square of squaresList) {
        square.classList.remove('selected');
    }
    squaresList[slideIndex].classList.add('selected');
}

function setSlideNumber(slideIndex) {
    slideNumber.textContent = "0" + (slideIndex + 1);
}

function showSelectedSlide() {
    setActiveSquare(currentSlide);
    setActiveSlide(currentSlide);
    setSlideNumber(currentSlide);
}

function selectPrevSlide() {
    if (currentSlide === 0) {
        currentSlide = slidesList.length - 1;
    } else {
        currentSlide--;
    }
    showSelectedSlide();
}

function selectNextSlide() {
    if (currentSlide === (slidesList.length - 1)) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    showSelectedSlide();
}

squaresList.forEach((squareItem, squareIndex) => {
    squareItem.addEventListener('click', () => {
        currentSlide = squareIndex;
        showSelectedSlide();
    });
});


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

slidesContainer.addEventListener('mousedown', event => dragStart(event));
slidesContainer.addEventListener('mouseup', event => dragEnd(event));
slidesContainer.addEventListener('mouseleave', event => dragEnd(event));

slidesContainer.addEventListener('touchstart', event => dragStart(event.touches[0]));
slidesContainer.addEventListener('touchend', event => dragEnd(event.touches[0]));
slidesContainer.addEventListener('touchmove', event => event.preventDefault());

let sliderIsMoving = false;
let sliderPositionX = 0;
let sliderShift = 0;

let maxShiftToLeft = 0;
let maxShiftToRight = 0;
let needUpdateBoundaries = false;

let exploreSlider, exploreImageContainer, exploreTopImage;

function getExploreSectionElements() {
    exploreSlider = document.querySelector('.picture-slider');
    exploreImageContainer = document.querySelector('.explore-picture-container');
    exploreTopImage = document.querySelector('.picture-before');
}

function addExploreListeners() {
    exploreImageContainer.addEventListener("mousedown", event => event.preventDefault());
    exploreTopImage.addEventListener("mousedown", event => event.preventDefault());

    exploreSlider.addEventListener("mousedown", event => {
        event.preventDefault();
        exploreSliderClickStart(event);
    });
    exploreSlider.addEventListener('touchstart', event => {
        exploreSliderClickStart(event.touches[0]);
    });

    document.addEventListener("mousemove", event => {
        event.preventDefault();
        exploreSliderMove(event);
    });
    document.addEventListener('touchmove', event => {
        exploreSliderMove(event.touches[0]);
    }, { passive: false });

    document.addEventListener("mouseleave", exploreSliderClickEnd);
    document.addEventListener("mouseup", exploreSliderClickEnd);
    document.addEventListener('touchend', exploreSliderClickEnd);

    window.addEventListener('resize', () => needUpdateBoundaries = true);
}

function exploreSliderClickStart(event) {
    sliderIsMoving = true;
    sliderPositionX = event.clientX;
    if (needUpdateBoundaries) updateShiftBoundaries();
}

function exploreSliderClickEnd() {
    sliderIsMoving = false;
}

function isSliderMoveValid(xDifference) {
    const fullSliderShift = sliderShift + xDifference;
    const isLeftMoveCorrect = fullSliderShift >= maxShiftToLeft;
    const isRightMoveCorrect = fullSliderShift <= maxShiftToRight;
    return isLeftMoveCorrect && isRightMoveCorrect;
}

function shiftExploreSlider(xDifference) {
    sliderShift += xDifference;
    sliderPositionX += xDifference;
    exploreSlider.style.transform = `translateX(${sliderShift}px)`;
}

function updateExploreImageWidth(xDifference) {
    let newWidth = exploreTopImage.clientWidth + xDifference;
    if (newWidth <= 0) newWidth = 0;
    if (newWidth >= exploreImageContainer.clientWidth) newWidth = exploreImageContainer.clientWidth;
    exploreTopImage.style.width = newWidth + 'px';
}

function exploreSliderMove(event) {
    if (!sliderIsMoving) return;

    const xDifference = event.clientX - sliderPositionX;
    if (isSliderMoveValid(xDifference)) {
        shiftExploreSlider(xDifference);
        updateExploreImageWidth(xDifference);
    }
}

function updateShiftBoundaries() {
    const containerRect = exploreImageContainer.getBoundingClientRect();
    const sliderRect = exploreSlider.getBoundingClientRect();

    const sliderHalfWidth = 0.5*sliderRect.width;
    const sliderLeft = sliderRect.left + sliderShift;
    const sliderRight = sliderRect.right + sliderShift;
    maxShiftToLeft = containerRect.left - sliderLeft - sliderHalfWidth;
    maxShiftToRight = containerRect.right - sliderRight + sliderHalfWidth;
}

document.addEventListener('DOMContentLoaded', () => {
    getExploreSectionElements();
    addExploreListeners();
    updateShiftBoundaries();
});
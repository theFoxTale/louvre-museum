const videoElementID = "youtube-video-";
let videoElementsList = [];

let videoContainer, dotsList;

let isVideoSwipeEnabled = true;
let currentVideoStep = 0;

let videoWidth = 0;
let needUpdateWidth = true;

function getVideoCarouselElements() {
    videoContainer = document.querySelector('.mini-video-carousel');
    dotsList = document.querySelectorAll('.video-dot');
}

function prepareVideoList() {
    const dotsIndexList = Array.from({ length: dotsList.length }, ( _, i) => i);
    videoElementsList = [
        dotsIndexList[dotsIndexList.length - 1],
        ...dotsIndexList,
        dotsIndexList[0]
    ];
}

function prepareVideoElements() {
    const videoElement = document.querySelector('.mini-video');

    videoElementsList.map((linkIndex, index) => {
        if (index > 0) {
            let newNode = videoElement.cloneNode(true);
            newNode.id = videoElementID + index;
            newNode.classList.add('player-video-' + linkIndex);
            videoContainer.appendChild(newNode);
        }
    });

    videoElement.classList.add('player-video-' + videoElementsList[0]);

    document.querySelectorAll('.mini-video').forEach((item, index) => {
        item.addEventListener('click', () => miniPlayerClick(item.id, index));
    });
}

function prepareItemsCollection() {
    prepareVideoList();
    prepareVideoElements();
}

function getVideoWidth() {
    const videoElements = document.querySelectorAll('.mini-video');
    videoWidth = videoElements[2].offsetLeft - videoElements[1].offsetLeft;
    needUpdateWidth = false;
}

let getDotIndexFromStepIndex = () => (currentVideoStep < 0) ? (dotsList.length + currentVideoStep) : currentVideoStep;

let getNewVideoLeftOffset = () => -1 * (currentVideoStep + 1) * videoWidth + 'px';

function moveCarouselVideo() {
    if (needUpdateWidth) getVideoWidth();
    videoContainer.style.left = getNewVideoLeftOffset();

    const dotIndex = getDotIndexFromStepIndex();
    setActiveVideoDot(dotIndex);

    showNewMainVideo();
}

function flipCarouselOnEdges() {
    if (currentVideoStep === -2) {
        videoContainer.classList.remove("carousel-with-animation");
        currentVideoStep = dotsList.length - 2;
        videoContainer.style.left = getNewVideoLeftOffset(currentVideoStep);
        setTimeout(() => videoContainer.classList.add("carousel-with-animation"), 1);
    }
    else if (currentVideoStep === dotsList.length - 1) {
        videoContainer.classList.remove("carousel-with-animation");
        currentVideoStep = -1;
        videoContainer.style.left = getNewVideoLeftOffset(currentVideoStep);
        setTimeout(() => videoContainer.classList.add("carousel-with-animation"), 1);
    }
}

function moveVideoToLeft() {
    hideOldMainVideo();
    currentVideoStep--;
    moveCarouselVideo();
}

function moveVideoToRight() {
    hideOldMainVideo();
    currentVideoStep++;
    moveCarouselVideo();
}

function setActiveVideoDot(dotIndex) {
    for (let dot of dotsList) {
        dot.classList.remove('video-active');
    }
    dotsList[dotIndex].classList.add('video-active');
}

function hideOldMainVideo() {
    stopPlayAnyVideo();
    document.getElementById('youtube-main-player').classList.remove('player-video-' + getDotIndexFromStepIndex());
}

function showNewMainVideo() {
    document.getElementById('youtube-main-player').classList.add('player-video-' + getDotIndexFromStepIndex());
}

document.addEventListener('DOMContentLoaded', () => {
    getVideoCarouselElements();
    prepareItemsCollection();

    document.querySelector('.video-arrow.to-left').addEventListener('click', () => {
        if (isVideoSwipeEnabled) {
            moveVideoToLeft();
        }
    });

    document.querySelector('.video-arrow.to-right').addEventListener('click', () => {
        if (isVideoSwipeEnabled) {
            moveVideoToRight();
        }
    });

    videoContainer.addEventListener('transitionstart', () => isVideoSwipeEnabled = false);


    videoContainer.addEventListener('transitionend', () => {
        flipCarouselOnEdges();
        isVideoSwipeEnabled = true;
    });

    dotsList.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (isVideoSwipeEnabled) {
                hideOldMainVideo();
                currentVideoStep = index;
                moveCarouselVideo();
            }
        });
    });

    moveCarouselVideo();
});
const videoElementID = "youtube-video-";
let videoElementsList = [];

let videoContainer, dotsList;

let isVideoSwipeEnabled = true;
let currentVideoStep = 0;

let videoWidth = 0;
let needUpdateWidth = true;

function getVideoCarouselElements() {
    videoContainer = document.querySelector('.mini-video-carousel');
}

function prepareVideoList() {
    const videoLinksList = [
        'zp1BXPX8jcU',
        'Vi5D6FKhRmo',
        'NOhDysLnTvY',
        'aWmJ5DgyWPI',
        '2OR0OCr6uRE'
    ];

    if (videoLinksList.length > 0) {
        videoElementsList = [
            videoLinksList[videoLinksList.length - 1],
            ...videoLinksList,
            videoLinksList[0]
        ];
    }
}

function prepareVideoElements() {
    const videoElement = document.querySelector('.mini-video');
    videoElementsList.map((link, index) => {
        let newNode = videoElement;
        if (index > 0) {
            newNode = videoElement.cloneNode();
            newNode.id = videoElementID + index;
        }
        newNode.src = 'https://www.youtube-nocookie.com/embed/' + link + '?origin=' + window.location.origin;
        videoContainer.appendChild(newNode);
    });
}

function prepareItemsCollection() {
    prepareVideoList();
    prepareVideoElements();
}

function appendYouTubeLinksToElements() {
    window.onYouTubeIframeAPIReady = function() {
        videoElementsList.map((_, index) => createPlayer(index));
    };
}

function createPlayer(id) {
    return new YT.Player(videoElementID + id, {
        videoId: videoElementsList[id],
        events: {
            'onStateChange': onPlayerStateChange
        },
    });
}

function onPlayerStateChange(event) {}

function getVideoWidth() {
    const videoElements = document.querySelectorAll('.mini-video');
    videoWidth = videoElements[2].offsetLeft - videoElements[1].offsetLeft;
    needUpdateWidth = false;
}

let getDotIndexFromStepIndex = () => (currentVideoStep < 0) ? (dotsList.length - 1) : currentVideoStep;

let getNewVideoLeftOffset = () => -1 * (currentVideoStep + 1) * videoWidth + 'px';

function moveCarouselVideo() {
    if (needUpdateWidth) getVideoWidth();
    videoContainer.style.left = getNewVideoLeftOffset();

    const dotIndex = getDotIndexFromStepIndex();
    setActiveVideoDot(dotIndex);
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
    currentVideoStep--;
    moveCarouselVideo();
}

function moveVideoToRight() {
    currentVideoStep++;
    moveCarouselVideo();
}

function setActiveVideoDot(dotIndex) {
    for (let dot of dotsList) {
        dot.classList.remove('video-active');
    }
    dotsList[dotIndex].classList.add('video-active');
}

document.addEventListener('DOMContentLoaded', () => {
    getVideoCarouselElements();
    prepareItemsCollection();
    appendYouTubeLinksToElements();

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

    dotsList = document.querySelectorAll('.video-dot');
    dotsList.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (isVideoSwipeEnabled) {
                currentVideoStep = index;
                moveCarouselVideo();
            }
        });
    });

    moveCarouselVideo();
});
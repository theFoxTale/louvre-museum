let miniYouTubePlayer;
let mainYouTubePlayer;
let updateInterval;

let volumeSlider;
let volumeSliderPrevValue = "30";

const videoLinksList = [
    'zp1BXPX8jcU',
    'Vi5D6FKhRmo',
    'NOhDysLnTvY',
    'aWmJ5DgyWPI',
    '2OR0OCr6uRE'
];

/*
* Add YouTube API script
*/
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/*
* YouTube players functions
*/
function miniPlayerClick(playerID, playerIndex) {
    if (miniYouTubePlayer) {
        miniYouTubePlayer.stopVideo();
        miniYouTubePlayer.destroy();
        miniYouTubePlayer = null;
    }

    miniYouTubePlayer = new YT.Player(playerID, {
        videoId: videoLinksList[ videoElementsList[playerIndex] ],
        playerVars: {
            'playsinline': 1,   //встроенное воспроизведение для мобильных браузеров и для WebViews
            'enablejsapi': 1,   //управление проигрывателем через вызовы API IFrame Player
            'rel': 0,           //похожие видео будут взяты с того же канала
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {

    event.target.playVideo();
}

function stopPlayAnyVideo() {
    if (miniYouTubePlayer) miniYouTubePlayer.stopVideo();
    if (mainYouTubePlayer) {
        mainYouTubePlayer.stopVideo();
        mainYouTubePlayer.destroy();
        mainYouTubePlayer = null;

        playButtonWork();
        resetPlaySliders();
    }
}

function attachMainVideo() {
    resetPlaySliders();

    const currentLink = videoLinksList[ videoElementsList[currentVideoStep] ];
    mainYouTubePlayer = new YT.Player('youtube-main-player', {
        videoId: currentLink,
        playerVars: {
            'playsinline': 1,
            'controls': 0,          //элементы управления проигрывателем не отображаются в проигрывателе
            'enablejsapi': 1,
            'rel': 0,
            'iv_load_policy': 3,    //отключение видео-аннотаций по умолчанию
            'loop': 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    // Видео запущено
    if (event.data === YT.PlayerState.PLAYING) {
        startSliderUpdateTimer();
    }

    // Видео остановлено внутри iframe YouTube
    if (event.data === YT.PlayerState.PAUSED) {
        stopSliderUpdateTimer();
        playButtonWork();
    }

    // Видео закончилось
    if (event.data === YT.PlayerState.ENDED) {
        stopSliderUpdateTimer();
        playButtonWork();
        resetPlaySliders();
    }
}

function switchVideoPlayerIcon(iconName) {
    document.querySelectorAll('.' + iconName + ' > svg').forEach(icon => icon.classList.toggle('hidden-element'));
}

function playButtonWork() {
    switchVideoPlayerIcon('play-button');
    document.querySelector('.big-play-button').classList.toggle('hidden-element');
}

function clickPlayButton() {
    playButtonWork();

    if (!mainYouTubePlayer) {
        attachMainVideo();
    }
    else {
        (mainYouTubePlayer.getPlayerState() === YT.PlayerState.PLAYING) ? mainYouTubePlayer.pauseVideo() : mainYouTubePlayer.playVideo();
    }
}

function setVolumeValue(newValue) {
    volumeSlider.value = newValue;
    volumeSlider.dispatchEvent(new Event("input"));
}

function clickVolumeButton() {
    let newValue = (volumeSlider.value === "0") ? volumeSliderPrevValue : "0";
    if (volumeSlider.value !== "0") volumeSliderPrevValue = volumeSlider.value;
    setVolumeValue(newValue);
}

function clickExpandButton() {
    switchVideoPlayerIcon('expand-button');
    toggleFullScreen();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.querySelector('.video-and-controls-container').requestFullscreen();
    } else {
        document.exitFullscreen?.();
    }
}

function setSliderPosition(slider) {
    slider.style.setProperty('--slider-value', slider.value + '%');
}

function resetPlaySliders() {
    document.querySelectorAll('.slider-for-play').forEach(slider => {
        slider.value = "0";
        setSliderPosition(slider);
    });
}

function startSliderUpdateTimer() {
    stopSliderUpdateTimer();

    updateInterval = setInterval(() => {
        if (mainYouTubePlayer) {
            const progressPercent = (mainYouTubePlayer.getCurrentTime() / mainYouTubePlayer.getDuration()) * 100;
            document.querySelectorAll('.slider-for-play').forEach(slider => {
                slider.value = progressPercent;
                setSliderPosition(slider); // Ваша функция визуального обновления
            });
        }
    }, 1000);
}

function stopSliderUpdateTimer() {
    clearInterval(updateInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    volumeSlider = document.querySelector('.slider-for-volume');

    document.querySelectorAll('.play-button, .big-play-button').forEach(item => item.addEventListener('click', clickPlayButton));
    document.querySelector('.volume-button').addEventListener('click', clickVolumeButton);
    document.querySelector('.expand-button').addEventListener('click', clickExpandButton);

    document.querySelectorAll('.slider-for-play').forEach(slider => {
        slider.addEventListener('input', function() {
            setSliderPosition(this);
            if (mainYouTubePlayer) {
                const newVideoLength =  mainYouTubePlayer.getDuration() * this.value / 100;
                mainYouTubePlayer.seekTo(newVideoLength);
            }
        });
    });

    document.querySelector('.slider-for-volume').addEventListener('input', function() {
        const icons = document.querySelectorAll('.volume-button > svg');
        icons.forEach(icon => icon.classList.remove('hidden-element'));

        const notActiveIconIndex = (this.value === "0") ? 0 : 1;
        icons[notActiveIconIndex].classList.add('hidden-element');

        setSliderPosition(this);
        if (mainYouTubePlayer) {
            mainYouTubePlayer.setVolume(this.value);
        }
    });

    resetPlaySliders();
    setVolumeValue(volumeSliderPrevValue);
});


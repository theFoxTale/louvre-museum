let miniYouTubePlayer;
let activeMiniPlayerID;
let mainYouTubePlayer;

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
function onYouTubeIframeAPIReady() {
    // mainYouTubePlayer = YT.Player('youtube-main-player', {
    //     videoId: videoElementsList[1],
    //     playerVars: {
    //         'playsinline': 1,
    //         'controls': 0,          //элементы управления проигрывателем не отображаются в проигрывателе
    //         'enablejsapi': 1,
    //         'rel': 0,
    //         'iv_load_policy': 3,    //отключение видео-аннотаций по умолчанию
    //     },
    //     events: {
    //         'onReady': onMainPlayerReady,
    //         'onStateChange': onPlayerStateChange
    //     }
    // });
}

function miniPlayerClick(playerID, playerIndex) {
    if (miniYouTubePlayer) {
        miniYouTubePlayer.stopVideo();
        miniYouTubePlayer.destroy();
        miniYouTubePlayer = null;
    }

    activeMiniPlayerID = playerIndex;

    miniYouTubePlayer = new YT.Player(playerID, {
        videoId: videoLinksList[ videoElementsList[playerIndex] ],
        playerVars: {
            'playsinline': 1,   //встроенное воспроизведение для мобильных браузеров и для WebViews
            'enablejsapi': 1,   //управление проигрывателем через вызовы API IFrame Player
            'rel': 0,           //похожие видео будут взяты с того же канала
        },
        events: {
            'onReady': onMiniPlayerReady,
        }
    });
}

function onMiniPlayerReady(event) {
    event.target.playVideo();
}

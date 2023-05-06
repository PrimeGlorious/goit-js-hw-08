import Vimeo from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const localStorageTimeKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(currentTime) {
  const currentSeconds = currentTime.seconds;
  localStorage.setItem(localStorageTimeKey, JSON.stringify(currentSeconds));
};

player.setCurrentTime(JSON.parse(localStorage.getItem(localStorageTimeKey))).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
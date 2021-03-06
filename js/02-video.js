const Vimeo = require("@vimeo/player");
var _throttle = require("lodash.throttle");

const iframe = document.querySelector("iframe");
let currentTime;

const player = new Vimeo.default(iframe);

const timeUpdate = function () {
	player
		.getCurrentTime()
		.then(function (seconds) {
			currentTime = seconds;
			console.log(seconds);
		})
		.catch(function (error) {});
	if (!isNaN(currentTime)) {
		localStorage.setItem("videoplayer-current-time", String(currentTime));
	}
};

player.on("timeupdate", _throttle(timeUpdate, 1000));

player.getVideoTitle().then(function (title) {
	console.log("title:", title);
});

player
	.unload()
	.then(function () {
		currentTime = Number(localStorage.getItem("videoplayer-current-time"));
		if (currentTime) {
			player.setCurrentTime(currentTime);
		}
	})
	.catch(function (error) {
		// an error occurred
	});

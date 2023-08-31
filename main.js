let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let speaker = document.getElementById("speaker");
let volumeCtrl = document.getElementById("volume");
ctrlIcon.classList.remove("fa-play");
ctrlIcon.classList.add("fa-pause");
volumeCtrl.volume = 0.9;
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};
function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  }
}
if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
};

speaker.addEventListener("click", function () {
  volumeCtrl.classList.toggle("hidden");
});

document.addEventListener("click", function (event) {
  if (!volumeCtrl.contains(event.target) && event.target !== speaker) {
    volumeCtrl.classList.add("hidden");
  }
});

volumeCtrl.addEventListener("click", function (event) {
  event.stopPropagation();
  song.volume = event.target.value / 100;
});
window.addEventListener("keydown", function (event) {
  // console.log(event.keyCode);
  switch (event.keyCode) {
    case 37:
      if (!isNaN(song.duration)) {
        song.currentTime -= 10;
        if (song.currentTime < 0) {
          song.currentTime = 0;
        }
        progress.value = song.currentTime;
      }
      break;

    case 39:
      if (!isNaN(song.duration)) {
        song.currentTime += 10;
        if (song.currentTime > song.duration) {
          song.currentTime = song.duration;
        }
        progress.value = song.currentTime;
      }
      break;
    case 38:
      if (song.volume > 0.95) {
        song.volume = 1;
        volumeCtrl.value = 100;
      } else {
        song.volume += 0.1;
        volumeCtrl.value = song.volume * 100;
      }
      break;
    case 40:
      if (song.volume < 0.5) {
        song.volume = 0;
        volumeCtrl.value = 0;
      } else {
        song.volume -= 0.1;
        volumeCtrl.value = song.volume * 100;
      }
      break;
    case 32:
      if (song.pause()) {
        console.log("pause");
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
      } else {
        song.play();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
      }
      break;
  }
});

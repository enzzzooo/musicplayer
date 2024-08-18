const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const volume = document.querySelector(".volume");
const volumeContainer = document.querySelector(".volume-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// song titles
const songs = [
  "21C Delta",
  "One Up",
  "Pure Cocaine",
  "Industry Baby",
  "Sum 2 Prove",
  "Crazy",
  "Bad Man",
  "Skrillex Dj Mix",
];

// Keep track of songs
let songIndex = 0;

// Initally load song info into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
// fix my volume button it does not work at all it seems. I want on click the top part to be 1 and the bottom 0 so no volume. please code this in js and use the html elemtns volume-container and volume which is inside volume-container
// volume is the same as progress but it doesn't update on its own
function setVolume(e) {
  const height = this.clientHeight;
  const clickY = e.offsetY;
  const newVolume = (clickY / height) * 1;
  // updates noise
  audio.volume = newVolume;
  console.log(audio.volume);
  // updates ui
  const volumePercent = newVolume * 100;
  volume.style.height = `${volumePercent}%`;
  volume.style.bottom = 0; // Ensure the volume bar grows from the bottom
}
// Event listeners

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// Add event listener for spacebar to toggle play/pause
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // Prevent the default action (scrolling)
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
});

// Change song events

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

volumeContainer.addEventListener("click", setVolume);

audio.addEventListener("ended", nextSong);

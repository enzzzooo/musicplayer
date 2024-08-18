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
];

// Keep track of songs
let songIndex = 0;

// Initially load song info into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  audio.volume = 1;

  // Set the volume bar to 100% initially
  volume.style.height = "100%";
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

function setVolume(e) {
  const height = volumeContainer.clientHeight;
  const clickY = e.offsetY;
  const newVolume = 1 - clickY / height;

  // Update audio volume
  audio.volume = newVolume;

  // Update volume display
  const volumePercent = newVolume * 100;
  volume.style.height = `${volumePercent}%`;
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
  } else if (e.code === "ArrowUp") {
    e.preventDefault(); // don't scroll
    audio.volume = Math.min(audio.volume + 0.1, 1); // Ensure volume doesn't exceed 1
    updateVolumeUI(audio.volume);
  } else if (e.code === "ArrowDown") {
    e.preventDefault(); // don't scroll
    audio.volume = Math.max(audio.volume - 0.1, 0); // Ensure volume doesn't go below 0
    updateVolumeUI(audio.volume);
  }
});
// Change song events
function updateVolumeUI(volume) {
  const volumePercent = volume * 100;
  volume.style.height = `${volumePercent}%`;
  volume.style.bottom = 0;
}
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

volumeContainer.addEventListener("click", setVolume);

audio.addEventListener("ended", nextSong);

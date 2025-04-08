var lastPlayedSound = '';
var lastPlayedMusic = '';

var muteSound = false;
var muteMusic = false;

var muteAllSoundToggle = false;

function playMusic(musicId) {
  if(lastPlayedMusic != '') {
      document.getElementById('audio-' + lastPlayedMusic).currentTime = 0;
      document.getElementById('audio-' + lastPlayedMusic).pause();
      document.getElementById('audio-' + lastPlayedMusic).src = document.getElementById('audio-' + lastPlayedMusic).src;
  }

  if( document.getElementById('audio-' + musicId) != null ) {
    if(!muteMusic) {
      document.getElementById('audio-' + musicId).play();
    }
    lastPlayedMusic = musicId;
  }
}

function stopMusic(){
  if(lastPlayedMusic != '') {
    document.getElementById("audio-" + lastPlayedMusic).currentTime = 0;
    document.getElementById("audio-" + lastPlayedMusic).pause();
    document.getElementById("audio-" + lastPlayedMusic).src = document.getElementById("audio-" + lastPlayedMusic).src;
  }
}

function turnOnMusic() {
  muteMusic = false;

  if(lastPlayedMusic != '') {
    playMusic(lastPlayedMusic);
  }
}

function turnOffMusic() {
  stopMusic();
  muteMusic = true;
}


function playSound(soundId) {
  if(lastPlayedSound != '') {
    $('#audio-' + lastPlayedSound)[0].currentTime = 0;
    $('#audio-' + lastPlayedSound)[0].pause();
    $('#audio-' + lastPlayedSound)[0].src = $('#audio-' + lastPlayedSound)[0].src;
  }

  if( $('#audio-' + soundId).length > 0 ) {
    if(!muteMusic) {
      $('#audio-' + soundId)[0].play();
    }
    lastPlayedSound = soundId;
  }
}

function stopSound() {
  if(lastPlayedSound != '') {
    $("#audio-" + lastPlayedSound)[0].currentTime = 0;
    $("#audio-" + lastPlayedSound)[0].pause();
    $("#audio-" + lastPlayedSound)[0].src = $("#audio-" + lastPlayedSound)[0].src;
  }
}

function turnOnSound() {
  muteSound = false;
}

function turnOffSound() {
  stopSound();
  muteSound = true;
}

function toggleAllSound() {
  if(muteAllSoundToggle) {
    turnOnMusic();
    turnOnSound();
    muteAllSoundToggle = false;
    document.getElementById('menu-button-sound').classList.remove('menu-button-sound-off');
  } else {
    turnOffMusic();
    turnOffSound();
    muteAllSoundToggle = true;
    document.getElementById('menu-button-sound').classList.add('menu-button-sound-off');
  }
}

document.getElementById('menu-button-sound').addEventListener("click", (event) => {
  toggleAllSound();
});

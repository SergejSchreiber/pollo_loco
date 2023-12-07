let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Collection of all sounds in the game
 */
walking_sound = new Audio('audio/running.mp3');
walking_sound_volume = this.walking_sound.volume = 0.9;

jump_sound = new Audio('audio/jump.mp3');
jump_sound_volume = this.jump_sound.volume = 1;

throw_sound = new Audio('audio/throw.mp3');
throw_sound_volume = this.throw_sound.volume = 0.5;

hurt_sound = new Audio('audio/hurt.mp3');
hurt_sound_volume = this.hurt_sound.volume = 0.2;

chicken_dead = new Audio('audio/chicken-dead.mp3');
chicken_dead_volume = this.chicken_dead.volume = 0.3;

music = new Audio('audio/music.mp3');
music_volume = music.volume = 0.1;

music_boss = new Audio('audio/music-boss.mp3');
music_boss_volume = music_boss.volume = 0.1;

music_win = new Audio('audio/music-win.mp3');
music_win_volume = music_win.volume = 0.1;

music_lose = new Audio('audio/music-lose.mp3');
music_lose_volume = music_lose.volume = 0.4;

boss_hit = new Audio('audio/boss-hit.mp3');
boss_hit_volume = boss_hit.volume = 0.2;

coin_sound = new Audio('audio/coin.mp3');
bottle_sound = new Audio('audio/bottle.mp3');
bottle_broke = new Audio('audio/bottle-broke.mp3');

/**
 * Mutes or unmutes all sounds and change the mute button img accordingly.
 */
function muteAllSounds() {
    let soundEffects = [walking_sound, jump_sound, throw_sound, hurt_sound, chicken_dead, music, music_boss, music_win, music_lose, boss_hit, coin_sound, bottle_sound, bottle_broke];
    soundEffects.forEach((sound) => {
      sound.muted = !sound.muted;
    });
    let muteButton = document.getElementById("muteButton");
    if (music.muted) {
      muteButton.src = "img/music-off.png";
    } else {
      muteButton.src = "img/music-on.png";
    }
  }

/**
 * Start game and hiding start screen and playing the background music.
 */
gameStarted = false;

function init() {
    gameStarted = true;
    document.getElementById("start-screen").classList.add("d-none");
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    music.loop = true;
    music.play();
    moveMobile();
    mobileHud();
}

/**
 * Listens for keyboard keydown events to set corresponding keyboard states for player actions.
 * 
 * @param {Event} e - The keyboard event object.
 */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

/**
 * Listens for keyboard keyup events to set corresponding keyboard states for player actions.
 * 
 * @param {Event} e - The keyboard event object.
 */
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});

/**
 * Toggles the HUD class based on screen width and orientation.
 */
function mobileHud() {
    if (window.innerWidth < 1000 && window.innerHeight <= 800) {
      document.getElementById("hud").classList.remove("d-none");
    } else {
      document.getElementById("hud").classList.add("d-none");
    }
    window.addEventListener("resize", mobileHud);
}

/**
 * Listens for mobile Keyboard events to set corresponding keyboard states for player actions to move left or right.
 */
function moveMobile() {
    function handleMouseDownLeft() {
        keyboard.LEFT = true;
      }
      function handleMouseUpLeft() {
        keyboard.LEFT = false;
      }
      function handleMouseDownRight() {
        keyboard.RIGHT = true;
      }
      function handleMouseUpRight() {
        keyboard.RIGHT = false;
      }
      function handleMouseDownJump() {
        keyboard.UP = true;
      }
      function handleMouseUpJump() {
        keyboard.UP = false;
      }
      function handleMouseDownThrow() {
        keyboard.SPACE = true;
      }
      function handleMouseUpThrow() {
        keyboard.SPACE = false;
      }
      document.getElementById('btnLeft').addEventListener('touchstart', handleMouseDownLeft);
      document.getElementById('btnLeft').addEventListener('touchend', handleMouseUpLeft);
      document.getElementById('btnRight').addEventListener('touchstart', handleMouseDownRight);
      document.getElementById('btnRight').addEventListener('touchend', handleMouseUpRight);
      document.getElementById('btnJump').addEventListener('touchstart', handleMouseDownJump);
      document.getElementById('btnJump').addEventListener('touchend', handleMouseUpJump);
      document.getElementById('btnThrow').addEventListener('touchstart', handleMouseDownThrow);
      document.getElementById('btnThrow').addEventListener('touchend', handleMouseUpThrow);
}

/**
 * Redirects the user to the home page.
 */
function homeScreen() {
    window.location.href = "index.html";
  }
  

/**
 * Stopping all running intervals.
 */
function stopIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Shows game-over screen, stops intervals and game music.
 */
function deadScreen() {
    document.getElementById("gameover-screen").classList.remove("d-none");
    stopIntervals();
    music.pause();
  }

/**
 * Shows winnig screen, stops intervals.
 */
function youWinScreen() {
    document.getElementById("win-screen").classList.remove("d-none");
    stopIntervals();
  }
  
/**
 * Toggles fullscreen view
 */
function fullScreen() {
    if (document.getElementById('start-screen').classList.contains('fullscreen')) {
        document.getElementById('start-screen').classList.remove('fullscreen');
        document.getElementById('win-screen').classList.remove('fullscreen');
        document.getElementById('gameover-screen').classList.remove('fullscreen');
        document.getElementById('canvas').classList.remove('fullscreen');
        document.getElementById('controls').classList.remove('d-none');
        document.exitFullscreen();
    } else {
        document.getElementById('start-screen').classList.add('fullscreen');
        document.getElementById('win-screen').classList.add('fullscreen');
        document.getElementById('gameover-screen').classList.add('fullscreen');
        document.getElementById('canvas').classList.add('fullscreen');
        document.getElementById('body').requestFullscreen();
        document.getElementById('controls').classList.add('d-none');
    }
}

/**
 * Checking if screen needs to be rotate and stop the game accordingly
 */
function checkScreenOrientation() {
  if (window.innerWidth < window.innerHeight) {
    document.getElementById('rotate-mobile').classList.remove('d-none');
    if (gameStarted) {
    gamePause();
    }
  } else {
    document.getElementById('rotate-mobile').classList.add('d-none');
    if (gamePaused) {
      gameResume();
    }
  }
}
window.addEventListener('load', checkScreenOrientation);
window.addEventListener('resize', checkScreenOrientation);

let gamePaused = false;

/**
 * Pausing the game
 */
function gamePause() {
  stopIntervals();
  music.pause();
  gamePaused = true;
}

/**
 * Resuming the game
 */
function gameResume() {
  world.draw();
  world.setWorld();
  world.run();
  world.character.animate();
  world.character.applyGravity();
  level1.clouds.forEach(cloud => cloud.animate());
  level1.enemies.forEach(enemy => enemy.animate());
  music.play();
}
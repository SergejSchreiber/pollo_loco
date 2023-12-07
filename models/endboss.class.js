class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 50;
    energy = 1000;
    offset = {
        top: 10,
        left: 50,
        right: 50,
        bottom: 10
    };
  
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
  
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
  
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3500;
        this.speed = 15 + Math.random() * 20;
        this.animate();
    }

    /**
     * Playing animations according on different actions.
     */
    animate() {
        setInterval( () => {
            this.bossMoving();
            this.bossAnimation();
        }, 250);
    }

    /**
     * Manages the Endboss animation movement to the left including walk and alert states
     */
    bossMoving() {
      if ((world && world.character.x >= 2800) || this.firstContact) {
        this.firstContact = true;
        music.pause();
        music_boss.loop = true;
        music_boss.play();
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALK);
      } else if (world && this.x < world.character.x + 300) {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }

    /**
     * Managing the Endboss animation, including hurt, and attack states.
     */
    bossAnimation() {
      if (this.isDead()) {
        this.music_win();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        boss_hit.play();
      } else if (world && this.x < world.character.x + 200) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }

    /**
     * Playing the win state after killing the Endboss.
     */
    music_win() {
      music_win.play();
      music_boss.pause();
      this.speed = 0;
      youWinScreen();
      this.playAnimation(this.IMAGES_DEAD);
    }
}
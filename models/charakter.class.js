class Character extends MovableObject {
    
    height = 240;
    y = 80;
    speed = 3;
    idleTimeout = 0;
    world;
    offset = {
        top: 100,
        left: 20,
        right: 20,
        bottom: 20
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * Sets the intervall for playing animations
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 100);
    }
    
    /**
     * Handles the movement to Right, to Left and Jump. Set the camera position according to charakter
     */
    moveCharacter() {
        walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x)
                this.moveRight();
            if(this.world.keyboard.LEFT && this.x > -500)
                this.moveLeft();
            if(this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
    }

    /**
     * Moves the character to rights
     */
    moveRight() {
        if (!this.isAboveGround()) {
            walking_sound.play();
        }
        super.moveRight();
        this.otherDirection = false;
    }

    /**
     * Moves the character to left
     */
    moveLeft() {
        if (!this.isAboveGround()) {
            walking_sound.play();
        }
        super.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Playing the Animation depending on the action
     */
    playCharacter() {
        if(this.isDead()) {
            this.playDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            hurt_sound.play();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleTimeout = 0;
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleTimeout = 0;
        } else {
            this.playAnimationIdle();
            
        }
    }

    /**
     * Playing the Animation for character standing without movement and sleeping when standing long time
     */
    playAnimationIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleTimeout += 1;
        if (this.idleTimeout >= 50) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
        }
    }

    /**
     * Playing the Animation for character when dead
     */
    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        music_lose.play();
        setTimeout (() => {
            deadScreen();
        }, 200)
    }

    /**
     * Adding coin to Coins when collected them
     */
    collectionCoin() {
        this.coin += 10;
    }

    /**
     * Adding bottles to Bottles when collected them
     */
    collectionBottle() {
        this.bottle += 10;
    }
}
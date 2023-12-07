class ThrowableObject extends MovableObject {
    bottlebroke = false;
    otherDirection;

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
  
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /**
     * Initiates the throwing action of the bottle depending on the directtion
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval( () => {
            if (this.otherDirection) {
                this.x -= 8;
            } else {
                this.x += 8;
            }
        }, 40);
        setInterval( () => {
            this.bottleAnimation();
        }, 75);
    }

    /**
     * Animation for the throwable object, rotation or splash based on its state.
     * Resets certain values if the object is broken and delete bottle
     */
  
    bottleAnimation() {
      if (!this.bottlebroke) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.currentImage = 0;
        this.speedY = 0;
        this.acceleration = 0;
        setTimeout(() => {
            this.y = 500;
        }, 100);
      }
    }
}
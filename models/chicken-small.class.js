class ChickenSmall extends MovableObject {
    y = 380;
    height = 40;
    width = 40;
    killed = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.9;
        this.animate();
    }
    
    /**
     * Playing the Animation moving left when not killed
     */
    animate() {
        setInterval( () => {
            if (this.killed == false) {
            this.moveLeft();
            };
        }, 1000 / 60);

        setInterval( () => {
            if (this.killed == false) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.playedSound) {
                    chicken_dead.play();
                    this.playedSound = true;
                }
            }
        }, 500);
    }
}
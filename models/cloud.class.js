class Cloud extends MovableObject {
    y= 50;
    height = 250;
    width = 500;
    
    IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES);
        this.speed = 0.15 + Math.random() * 0.4;

        this.x = -500 + Math.random() * 4000;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
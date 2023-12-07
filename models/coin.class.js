class Coin extends MovableObject {
  y = 200;
  height = 80;
  width = 80;
  
  IMAGES = [
    'img/8_coin/coin_1.png', 
    'img/8_coin/coin_2.png'
  ];
  
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES);
    this.x = 500 + Math.random() * 2500;
    this.y = 80 + Math.random() * 250;
    this.animate();
  }
    
  /**
  * Playing the animation for the coins.
  */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 250);
  }
}
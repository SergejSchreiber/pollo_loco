class Bottle extends MovableObject {
  y = 355;
  height = 70;
  width = 70;

  IMAGES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES);
    const randomImage = Math.floor(Math.random() * this.IMAGES.length);
    this.loadImage(this.IMAGES[randomImage]);
    this.x = 500 + Math.random() * 2500;
  }
}

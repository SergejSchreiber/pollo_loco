class StatusBarEndboss extends DrawableObject {
    IMAGES = [
      'img/7_statusbars/2_statusbar_endboss/orange.png',
      'img/7_statusbars/2_statusbar_endboss/blue.png',
      'img/7_statusbars/2_statusbar_endboss/green.png'
    ];
  
    percentage = 100;
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 450;
      this.y = 0;
      this.height = 60;
      this.width = 200;
      this.setPercentageEndboss(100);
    }

    /**
     * Sets the health percentage for Endboss and adjusts the image based on the percentage.
     *
     * @param {number} percentage - The health percentage (0-100).
     */
    setPercentageEndboss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Resolves the index of the image based on the current health percentage.
     * Adjusts the image based on the percentage value.
     *
     * @returns {number} - The index of the image to use.
     */
    resolveImageIndex() {
        if(this.percentage > 66) {
            return 2;
        } else if (this.percentage > 33) {
            return 1;
        } else {
            return 0;
        }
    }
  }
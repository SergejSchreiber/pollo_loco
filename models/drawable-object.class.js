class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    percentage;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    
    /**
     * Loads an image from the given path and assigns it to this object.
     *
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws the object on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which the object is drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * Loads and caches images in the imageCache.
     * @param {array} arr An array of image file paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * Sets the health percentage and adjusts the image based on the percentage.
     *
     * @param {number} percentage - The health percentage (0-100).
     */
    setPercentage(percentage) {
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
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    accelaration = 2;
    energy = 100;
    lastHit = 0;
    coins = 0;
    bottles = 0;
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    /**
     * Applying gravity to movable objects to fall down with graduality in decreasing its Y position.
     */
    applyGravity() {
        setInterval( () => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.accelaration;
            }
        }, 1000 / 25)
    }

    /**
     * Checking if the object is in the air, so above the ground or on the ground.
     * @returns {boolean} If object is above the ground - True, if on the ground - False.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 180;
        }
    }

    /**
     * Checks if the character is colliding with another object.
     * @param {Object} mo - The object which can collide with character.
     * @returns {boolean} If colliding - True, if not - False.
     */
    isColliding (mo) {
        return  this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
                this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
                this.y + this.height - this.offset.bottom >= mo.y &&
                this.y + this.offset.top <= mo.y + mo.height;
    }

    /**
     * Reduce the character's energy when colliding with an object, energy cannot get below 0.
     */
    hit() {
        this.energy -= 10;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        };
    }

    /**
     * Checks if the character is in a hurt state.
     * @returns {boolean} True if in a hurt state (for up to 1 second), false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 100;
        return timepassed < 1;
    }

    /**
     * Checks if the character is dead.
     * @returns {boolean} True if the character's energy is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation by updating the current image using an array of images.
     * @param {string[]} images - An array of image paths representing animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right
     */
    moveRight() {
        this.x += this.speed;
    };

    /**
     * Moves the object to the left
     */
    moveLeft() {
            this.x -= this.speed;
    };

    /**
     * Let the object jump and play the jump sound
     */
    jump() {
        this.speedY = 30;
        jump_sound.play();
    };
}

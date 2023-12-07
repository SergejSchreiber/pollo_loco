class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Connects game entities to the current game world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Setting the interval for different functions
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkCollisionBottleEnemy();
        }, 25);
        setInterval(() => {
            this.deleteKilledEnemy();
        }, 1050);
    }

    /**
    * Checks if the character collides with enemy from the top or from side.
    */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround(enemy) && !(enemy instanceof Endboss)) {
                    enemy.killed = true;
                    this.character.jump();
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    this.characterBounceBack();
                }
            }
        });
    }

    /**
    * Checks if enemy is killed and then remove it from the enemies array
    */
    deleteKilledEnemy() {
        this.level.enemies.forEach((enemy, i) => {
            if (enemy.killed) {
                setTimeout (() => {
                    this.level.enemies.splice(i, 1);
                }, 200);
            }
        });
    }

    /**
     * Character is bouncing back when hit by enemy
     */
    characterBounceBack() {
        const intervalId = setInterval(() => {
            this.character.x--;
        }, 1)
        setTimeout(() => {
            clearInterval(intervalId);
        }, 200);
    }

    /**
     * Checks whether the bottle collides with the enemies
     */
    checkCollisionBottleEnemy() {
      this.level.enemies.forEach((enemy, i) => {
        this.throwableObjects.forEach((bottle) => {
          if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
            enemy.killed = true;
            bottle.bottlebroke = true;
            bottle_broke.play();
            this.level.enemies.splice(i, 1);
            } else {
                if (bottle.isColliding(enemy)) {
                    bottle.bottlebroke = true;
                    bottle_broke.play();
                    this.statusBarEndboss.setPercentage(enemy.statusBarEndboss);
                    enemy.hit();
                }
          }
        });
      });
    }

    
    /**
     * Checks if character has bottels in the variable bottles and throws them
     */
    checkThrowObjects() {
        if(this.keyboard.SPACE && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 70, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            throw_sound.play();
            this.character.bottles -= 5;
            this.statusBarBottle.setPercentage(this.character.bottles);
            this. keyboard.SPACE = false;
        }
    }

    /**
     * Checks whether character collect bottle, changes statusbar and removes bottle
     */
    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle, i) => {
          if (this.character.isColliding(bottle)) {
            this.character.bottles += 20;
            this.statusBarBottle.setPercentage(this.character.bottles);
            bottle_sound.play();
            this.level.bottles.splice(i, 1);
          }
        });
    }

    /**
     * Checks whether character collect coins, changes statusbar and removes coin
     */
    checkCollisionsCoin() {
        this.level.coins.forEach((coin, i) => {
          if (this.character.isColliding(coin)) {
            this.character.coins += 10;
            this.statusBarCoin.setPercentage(this.character.coins);
            coin_sound.play();
            this.level.coins.splice(i, 1);
          }
        });
    }

    /**
     * Updating the animations on the Canvas element by drawing objects
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (this.character.x > 2800 || this.endboss) {
            this.addToMap(this.statusBarEndboss);
            this.endboss = true;
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the rendering map.
     * 
     * @param {Array} objects - Array of objects to be added.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the map.
     * 
     * @param {object} mo - movable object (chicken, character etc.)
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally in the canvas context to accommodate `mo` with a different direction.
     *
     * @param {Object} mo - movable object (chicken, character etc.)
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping it back to normal.
     *
     * @param {Object} mo - movable object (chicken, character etc.)
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
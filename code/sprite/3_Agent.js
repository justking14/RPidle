class Agent {
     constructor(name, x, y, width, height, classification) {
          this.status = new StatusBuilder(name, classification).build()
          this.sprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName(this.status.imgName).build()

          this.unlocked = true 
          this.hasAttacked = false
          this.index = 0

          this.particles = new spriteParticleManager(x, y)
          this.biggerSprite = null;

          this.midLerp = false
     }
     setPosition(x, y) { this.sprite.setPosition(x, y) }
     setPositionV(V){this.sprite.setPositionV(V)}
     setSize(width, height) { this.sprite.setSize(width, height) }

     getPosition() { return this.sprite.getPosition() }
     getSize() {    return this.sprite.getSize()}
     
     resetReset() {
          this.sprite.resetReset()
          this.midLerp = false
     }
     
     amIDead() {
          if (this.status.currentHealth <= 0) {
               if (this.status.dead === false) {
                    //this.particles = new spriteParticleManager(this.getPosition().x + 75 / 2, this.getPosition().y + 75 / 2)
                    this.particles = new spriteParticleManager(this.getPosition().x, this.getPosition().y)

                    this.particles.hidden = false
               //}

                    this.sprite.img.src = "images/grave.png"
                    this.biggerSprite.img.src = "images/grave2.png"

               }
               this.status.dead = true
               this.status.currentHealth = 0
               return true
          }else if (this.status.dead === true) {
               this.status.dead = false
               this.sprite.img.src = "images/" + this.status.imgName + ".png"
               //this.sprite.biggerSprite.src = "images/" + this.status.imgName + ".png"

          }
          return false
     }
     draw(ctx, size) {
          if (size === undefined || this.status.dead === true) {
               this.sprite.draw(ctx);
          } else {
               this.biggerSprite.body.setPositionV(this.getPosition())
               this.biggerSprite.draw(ctx)
          }
     }
     drawParticles(ctx) { this.particles.draw(ctx); }
     update() { this.particles.update(); }
     

     beDamaged(attacker, weakness) {
          console.log("bbb ", weakness)
          var attack = attacker.status.attack + getRandomInt(-2, 2)
          if (weakness === true) {
               attack = attack * 2.5
          }
          if (this.amIDead() === false){
               this.status.currentHealth -= attack
               this.status.currentHealth = Math.floor(this.status.currentHealth)

               if (this.amIDead() === false) {
                    return attacker.status.name + " attacked " + this.status.name + " for " + attack + " points of damage"
               } else {
                    return attacker.status.name + " killed " + this.status.name
               }
          } else {
               return this.status.name + " is already dead"
          }
     }

     levelUp(experience) {
          this.status.currentExp += experience * 5
          var leveledUp = "false" 
          while (this.status.currentExp >= this.status.maxExp) {
               this.status.currentExp = 0;//-= this.status.maxExp
               this.status.maxExp += this.status.level*5
               this.status.level += 1
               leveledUp = this.status.name  
          }
          if (leveledUp  === "Hero") {
               var timeLeft2 = 0
               ///1 exp every 3.5 seconds
               //
               if (window.game.state.menuDict["automation"]["mercenaries"]["count"] !== 0) {
                    timeLeft2 = Math.floor((this.status.maxExp/3.5)/window.game.state.menuDict["automation"]["mercenaries"]["count"])
               }
               window.game.state.timeLeft = new Time(Math.floor(Date.now() / 1000),timeLeft2  )
          }
          this.status.levelUp()

          return leveledUp
     }

     returnStatus() { return this.status.returnStatus(); }
     returnMiniStatus() { return this.status.returnMiniStatus()}

     amIAvailable() {
          if (this.unlocked === false || this.status.dead === true) { return false }
          return true 
     }
}


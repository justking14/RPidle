class AgentManager {
     constructor(x, y, width, height) {
          this.body = new BodyBuilder().setXY(x, y).setSize(width, height).build()

          this.pathIndex = 0
          this.attackIndex = 0
          this.agents = []
          this.copyAgents = []
          this.attacker = null;
          //this.midLerp = false
     }

     setPosition(x, y) { this.body.setPosition(x, y) }
     setPositionV(V){this.body.setPositionV(V)}
     getPosition() {     return this.body.pos }
     resetReset() {
          this.body.resetReset()
          //this.midLerp = false
     }

     returnStatus() {
          var returnStatusArray = []
          for (let agent of this.agents) { returnStatusArray.push(agent.status.returnStatus()); }
          return returnStatusArray
     }
     /*
     returnMiniStatus() {
          var returnStatusArray = []
          for (let agent of this.agents) { returnStatusArray.push(agent.status.returnMiniStatus()); }
          returnStatusArray.push(["Gold: " + window.game.state.gold + " Time Til Level-Up: " + window.game.state.timeLeft.returnString()])
          return returnStatusArray
     }
     */

     update() {
          for (var agent in this.agents) {
               if (this.agents[agent].unlocked !== undefined) {
                    this.agents[agent].unlocked = true
                    this.agents[agent].update()
               }
          }
     }
     draw(ctx, size) {
          for (let agent of this.agents) {
               if (agent.unlocked === true) {
                    if (size === undefined) {
                         agent.draw(ctx);
                    } else {
                         agent.biggerSprite.setPositionV(agent.getPosition())
                         agent.biggerSprite.draw(ctx)
                    }
               }
          }
     }
     drawReticule(ctx) {
          
     }
     drawStats(ctx) {
     }

     heal(value) {
          ///revive the dead
          for (var agent in this.agents) {
               if (this.agents[agent].unlocked === true) {
                    var currentAgent = this.agents[agent]
                    currentAgent.status.currentHealth += value 
                    currentAgent.amIDead()
                    currentAgent.status.currentHealth = Math.min(currentAgent.status.currentHealth, currentAgent.status.maxHealth)
               }
          }

          ///check if everyone is back to full health
          for (var agent in this.agents) {
               if (this.agents[agent].unlocked === true) {
                    var currentAgent = this.agents[agent]
                    if (currentAgent.status.currentHealth !== currentAgent.status.maxHealth) {
                         return false 
                    } 
               }
          }
          return true
     }

     getTarget() {
          for (let i = this.agents.length - 1; i >= 0; i--){
               if (this.agents[i].amIAvailable() === true) { return this.agents[i];}
          }
     }
         
     setAttacker() {
          for (let i = 0; i < this.agents.length; i++){
               if (this.agents[i].amIAvailable() === true && this.agents[i].hasAttacked === false) {
                    this.attacker = this.agents[i]
                    return true 
               }
          }
          return false
     }
     resetAttackers() {
          for (let i = 0; i < this.agents.length; i++){
               this.agents[i].hasAttacked = false
          }
          return false
     }

     drawParticles(ctx) {
          for (let i = 0; i < this.agents.length; i++){
               this.agents[i].drawParticles(ctx) 
          }
     }

     levelUp(experience) {
          for (var agent in this.agents) {
               //only get experience if not dead
               if (this.agents[agent].amIAvailable() === true) {
                    this.agents[agent].levelUp(experience)
               }
          }
     }
     placeChildren(size) {
          if (size === undefined) {
               this.agents[0].setPosition(this.body.pos.x + 5, this.body.pos.y)
               this.agents[1].setPosition(this.body.pos.x + 35, this.body.pos.y)
               this.agents[2].setPosition(this.body.pos.x + 20, this.body.pos.y + 30)
          } else {
               this.agents[0].setPosition(this.body.pos.x + 5, this.body.pos.y)
               this.agents[1].setPosition(this.body.pos.x + 90, this.body.pos.y)
               this.agents[2].setPosition(this.body.pos.x + 40, this.body.pos.y + 80)
          }
          this.agents[0].resetReset()
          this.agents[1].resetReset()
          this.agents[2].resetReset()
     }
 
     areWeDead() {
          for (let agent of this.agents) {
               if (agent.amIDead() === false) {
                    return false 
               }
          }
          console.log("WE ALL DEAD", this.agents[0].status.name)
          return true 
     }

     battleCalculations(other, isWeakness) {
          this.attacker.setPositionV(this.attacker.sprite.body.resetPosition)
          var returnV = other.beDamaged(this.attacker, isWeakness || false)
          
          if (other.amIDead()) {
               for (var i = 0; i < this.agents.length; i++){
                    this.agents[i].levelUp(other.status.attack)
               }
          }
          return returnV
     }
}



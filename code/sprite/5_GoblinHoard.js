
class goblinManager extends AgentManager {
     constructor(x, y, width, height, name, level, location) {
          super(x, y, width, height)
          this.name = name
          this.isFighting = false
          this.wasDefeated = false
          this.amMercenary = false

          this.agents = [
               new Agent(this.name,  x + 100, y, width, height, "enemy", 0),
               new Agent(this.name, x - 100, y, width, height, "enemy", 1),
               new Agent(this.name, x, y - 100, width, height, "enemy", 2),
          ]
          for (var i = 0; i < this.agents.length; i++){
               for (var j = 0; j < Math.floor(level / 2); j++){
                    this.agents[i].levelUp(150)
               }
               this.agents[i].biggerSprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(this.agents[i].sprite.body.pos.x, this.agents[i].sprite.body.pos.y).setSize(width, height).build()).setName("Enemy2").build()
          }

          this.tile = location;
          if (this.tile !== undefined) {
               this.setStartPosition()
          }
          this.inCombat = false 
          this.progressBeingTracked = false 
          this.progress = 0

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

          if (this.inCombat === false && this.progressBeingTracked === true ) {
               ctx.fillStyle = "white"
               ctx.fillRect(this.body.pos.x, this.body.pos.y, 60, 10)

                    ctx.fillStyle = "blue"
                    ctx.fillRect(this.body.pos.x, this.body.pos.y, 60 * this.progress, 10)
               
          }
     }
     setStartPosition() {
          console.log(this.tile)
          this.setPositionV(this.tile.returnPosition())
          this.placeChildren()
     }
     setBigSprite() {
          for (var i = 0; i < this.agents.length; i++){
               this.agents[i].biggerSprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(this.agents[i].sprite.body.pos.x, this.agents[i].sprite.body.pos.y).setSize(this.agents[i].sprite.body.size.x, this.agents[i].sprite.body.size.y).build()).setName("EnemyBig").build()
          }
     }

     placeChildren(size) {
          if (size === undefined) {
               this.agents[0].setPosition(this.body.pos.x + 5, this.body.pos.y + 30)
               this.agents[1].setPosition(this.body.pos.x + 35, this.body.pos.y + 30)
               this.agents[2].setPosition(this.body.pos.x + 20, this.body.pos.y )
          } else {
               this.agents[0].setPosition(this.body.pos.x + 5, this.body.pos.y + 80)
               this.agents[1].setPosition(this.body.pos.x + 90, this.body.pos.y + 80)
               this.agents[2].setPosition(this.body.pos.x + 40, this.body.pos.y )
          }
          this.agents[0].resetReset()
          this.agents[1].resetReset()
          this.agents[2].resetReset()
     }

     reset() {
          this.heal(99999)
     }
     enterCombat() {
          this.inCombat = true 
          this.resetReset()
          this.placeChildren("big")
          this.setBigSprite()

     }
}
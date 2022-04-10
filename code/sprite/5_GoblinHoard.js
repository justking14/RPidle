
class goblinManager extends AgentManager {
     constructor(x, y, width, height, name, level) {
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
          this.resetReset()
          this.placeChildren("big")
          this.setBigSprite()
     }
}
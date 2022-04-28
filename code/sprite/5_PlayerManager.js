class playerManager extends AgentManager {
     constructor(x, y, width, height, amMercenary) {
          super(x, y, width, height)
          this.name = "players"
          this.pathIndex = 0
          this.whereAmI = "undecided"
          this.targetName = "fightingGoblins"
                    
          this.agents = [
               new Agent("Hero", x + 100, y, width, height, "player", 0),
               new Agent("Healer", x - 100, y, width, height, "player", 1),
               new Agent("Defender", x, y - 100, width, height, "player", 2),
          ]
          this.copyAgents = [
               new Agent("Hero", x + 100, y, width, height, "player", 0),
               new Agent("Healer", x - 100, y, width, height, "player", 1),
               new Agent("Defender", x, y - 100, width, height, "player", 2),
          ]
      
          this.path = null;
          this.start =  null 
;
          this.target = null;
          this.selectedVector = new Vector(10,7)

          //this.reticule = new Vector(0,0)
          
          this.setBigSprite()

          this.magicAttack = new MagicSpell()
                    
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.levelledUp = false 
     }

     getTarget() {
          if (this.agents[2].amIAvailable() === true) {
               return this.agents[2]
          }else if (this.agents[1].amIAvailable() === true) {
               return this.agents[1]
          } else {
               return this.agents[0]
          }
     }

     setBigSprite() {
          for (var i = 0; i < this.agents.length; i++){
               this.agents[i].biggerSprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(this.agents[i].sprite.body.pos.x, this.agents[i].sprite.body.pos.y).setSize(this.agents[i].sprite.body.size.x, this.agents[i].sprite.body.size.y).build()).setName(this.agents[i].status.name + "Big").build()
               if (this.agents[i].status.dead === true) {
                    
                    this.agents[i].sprite.img.src = "images/grave.png"
                    this.agents[i].biggerSprite.img.src = "images/grave2.png"
               }
          }
     }
     drawParticles(ctx) {
          this.magicAttack.draw(ctx)
          for (let i = 0; i < this.agents.length; i++){
               this.agents[i].drawParticles(ctx) 
          }
     }

     drawReticule(ctx) {
          
     }
     drawStats(ctx) {
          var fnt = 16
          ctx.font = fnt + 'px Adventure';

          var maxTextWidth = 0, longestWord = ""
          for (var i = 0; i < this.copyAgents.length; i++) {
               var word = "HP: " + this.agents[i].status.currentHealth + "/" + this.agents[i].status.maxHealth
               var textWidth = ctx.measureText(word).width
               if (textWidth > maxTextWidth) {
                    maxTextWidth = textWidth
                    longestWord = word 
               }
          }

          while (maxTextWidth > 150) {
               fnt-=1
               ctx.font = fnt + 'px Adventure';
               maxTextWidth = ctx.measureText(longestWord).width
               if (fnt < 5) { break;}
          }

          var y = 200
          for (var i = 0; i < this.copyAgents.length; i++){
               var y2 = 0
               if (this.copyAgents[i].unlocked === true) {
                    var body = new Body(0, y - 10, 170, 90)
                    body.draw(ctx)
                    ctx.fillStyle = "white"
                    
                    this.copyAgents[i].setPosition(10, y)
                    this.copyAgents[i].draw(ctx)
                    ctx.fillText("LV: " + this.agents[i].status.level, 10, y + 30)
                    ctx.fillText("HP: " + this.agents[i].status.currentHealth + "/" + this.agents[i].status.maxHealth, 10, y + 55)
               }
               y += (window.game.constants.height - 200) / 3
          }
     }
     moveToNextIndex(map) {
          var path = this.path
          this.setPosition(path[this.pathIndex].pos.x, path[this.pathIndex].pos.y)
          
          for (var i = 0; i < map.nodes.length; i++) {
               for (var j = 0; j < map.nodes[i].length; j++) {
                    if (map.nodes[i][j].pos.x === path[this.pathIndex].pos.x && map.nodes[i][j].pos.y === path[this.pathIndex].pos.y  ) {
                         this.start = map.nodes[i][j].clone()
                    }
               }
          }

          this.pathIndex += 1
          this.placeChildren()
          if (this.pathIndex < path.length) {
               return true
          } else {
               if (path[this.pathIndex - 1].pos.equals(window.game.state.agents.goblins[0].tile.returnPosition())) {
                    this.whereAmI = "fightingGoblins"
               } else if (path[this.pathIndex - 1].pos.equals(map.store.returnPosition())) {
                    this.whereAmI = "buying"
               } else if (path[this.pathIndex - 1].pos.equals(map.inn.returnPosition())) {
                    this.whereAmI = "healing"
               }

               this.pathIndex = 0
               console.log(this.whereAmI)
               return false
          }
     }
          
     enterCombat() {
          this.resetReset()
          this.placeChildren("big")
          this.setBigSprite()
     }
}

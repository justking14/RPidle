
class mercenaryManager extends AgentManager {
     constructor(x, y, width, height) {
          super(x, y, width, height)
          this.name = "players"
          this.pathIndex = 0

          this.whereAmI = "undecided"
          this.targetName = "fightingGoblins"
                      
          this.agents = [
               new Agent("Hero", x + 100, y, width, height, "player", 0),
               new Agent("Hero", x - 100, y, width, height, "player", 1),
               new Agent("Hero", x, y - 100, width, height, "player", 2),
          ]
          
          this.path = null;
          this.start = null;
          this.target = null;
          this.selectedVector = new Vector(10, 7)
                    
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
     }

     dealWithEvent(scope, event) {
          if (event.name === "moveReticule") {
               var pos = event.target
               var index = event.index
               if (scope.menuDict["automation"]["mercenaries"]["count"] >= event.index) {

                    if (this.selectedVector.x < pos.x / 60) {
                         this.selectedVector.x += 1
                    } else if (this.selectedVector.x > pos.x / 60) {
                         this.selectedVector.x -= 1

                    } else if (this.selectedVector.y < pos.y / 60) {
                         this.selectedVector.y += 1
                    } else if (this.selectedVector.y > pos.y / 60) {
                         this.selectedVector.y -= 1
                    } else {
                         this.path = scope.entities.map.pathFind(this.start, this.target, "mercenary")
                         this.eventKeeper.addEvent({ name: "moveMercenary", timeToTrigger: 0.025 + 0.005 * index, target: this.targetName, index: index })
                         return
                    }
                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.05 + 0.005 * index, target: event.target, index: index })
               }
          } else if (event.name === "moveMercenary") {
               //console.log("moveMercenary", scope.agents.mercenaries[0].whereAmI, event.index)
                              
               if (scope.menuDict["automation"]["mercenaries"]["count"] >= event.index) {

                    var index = event.index
                    if (this.moveToNextIndex(scope.entities.map) === true) {
                         this.eventKeeper.repeatEvent(event)
                    } else {
                         //if (scope.agents.mercenaries[index].whereAmI === "fightingGoblins") {
                         //if (scope.agents.goblins[index].isFighting === false) {
                         scope.agents.goblins[index].isFighting = true;
                         this.eventKeeper.addEvent({ name: "MercenariesFight", timeToTrigger: 3.5, type: "combat", index: event.index })
                         //}
                         //}
                         this.whereAmI = "undecided"
                    }
               }

          } else if (event.name === "MercenariesFight") {
               if (scope.menuDict["automation"]["mercenaries"]["count"] >= event.index) {
                    window.game.state.gold += 1
                    var index = event.index;
                    console.log("INDEX ", index)
                    for (let i = 0; i < scope.agents.players.agents.length; i++) {
                         scope.agents.players.agents[i].levelUp(1)
                    }
               

               
                    //for (var i = 0; i < scope.entities.map.battlefields.length; i++) {
                    // console.log(scope.entities.map.battlefields[i])
                    scope.entities.map.battlefields[index] = scope.entities.map.getRandomTarget()
                    scope.agents.goblins[index].setPositionV(scope.entities.map.battlefields[index].returnPosition());
                    scope.agents.goblins[index].placeChildren()
                    scope.agents.goblins[index].isFighting = false
                    //}

                    this.whereAmI = "moving"
                    this.pathIndex = 0

                    this.targetName = "fightingGoblins"
               
                    this.target = scope.entities.map.battlefields[index].clone()

                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.015, target: scope.entities.map.battlefields[index].returnPosition(), index: index })
               }               
          }
     }


     drawReticule(ctx) {
          
     }
     drawStats(ctx) {
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
          //this.start = path[this.pathIndex]

          this.pathIndex += 1
          this.placeChildren()
          if (this.pathIndex < path.length) {
               return true
          } else {
               //comparing map node to vector 
               if (path[this.pathIndex - 1].pos.equals(map.battlefields[0].returnPosition())) {
                    this.whereAmI = "fightingGoblins"
               } 
               this.pathIndex = 0
               //console.log(this.whereAmI)
               return false
          }
     }
}

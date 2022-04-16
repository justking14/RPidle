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

     startPathFinding(target, index) {
          
          this.whereAmI = "moving"
          this.pathIndex = 0

          this.targetName = "fightingGoblins"
          this.target = target

          this.reticuleDistance = 3.5/(Math.abs(this.selectedVector.x - (target.x / 60)) + Math.abs(this.selectedVector.y - (target.y / 60))) 
          console.log("merc start ", this.reticuleDistance, this.selectedVector,target, target.x/60, target.y/60)

          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: this.reticuleDistance, target: target, index: index })
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
                         this.path = scope.map.pathFind(this.start, this.target, "mercenary")


                         //this.eventKeeper.addEvent({ name: "moveMercenary", timeToTrigger: 0.025 + 0.005 * index, target: this.targetName, index: index })
                         var dist = 3.0 / this.path.length //((Math.abs((this.start.x/60) - (pos.x/60))) + Math.abs((this.start.y/60) - (pos.y/60)))
                         console.log("Blue dog ", dist, this.start, pos)
                         ///20 units over 5 seconds 
                         ///each second 4
                         this.eventKeeper.addEvent({ name: "moveMercenary", timeToTrigger: dist, target: this.targetName, index: index, nextTime: dist })

                         return
                    }
                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: this.reticuleDistance, target: event.target, index: index })
               }
          } else if (event.name === "moveMercenary") {
               if (scope.menuDict["automation"]["mercenaries"]["count"] >= event.index) {

                    var index = event.index
                    if (this.moveToNextIndex(scope.map) === true) {
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
                    ///console.log("INDEX ", index)
                    for (let i = 0; i < scope.agents.players.agents.length; i++) {
                         scope.agents.players.agents[i].levelUp(1)
                    }

                    scope.map.battlefields[index] = scope.map.getRandomTarget()
                    scope.agents.goblins[index].setPositionV(scope.map.battlefields[index].returnPosition());
                    scope.agents.goblins[index].placeChildren()
                    scope.agents.goblins[index].isFighting = false

                    this.startPathFinding(scope.map.battlefields[index].clone(), index)
               }               
          }
     }
     drawReticule(ctx) {}
     drawStats(ctx) {}
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
               if (path[this.pathIndex - 1].pos.equals(map.battlefields[0].returnPosition())) {
                    this.whereAmI = "fightingGoblins"
               } 
               this.pathIndex = 0
               return false
          }
     }
}

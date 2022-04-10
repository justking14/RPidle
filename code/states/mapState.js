class mapState extends State{
     constructor() {
          super("map")
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "statusUpdate", timeToTrigger: 5.0, repeat: true })
          this.counter = 1
          this.timeOfDay = 0
     }
     draw(ctx) {          

          //day/night cycle draws tiles
               this.counter += 0.0075
               if (this.counter >= 11.0) {
                    this.counter = 0
               }

               var scope = window.game.state 
               if (scope.hasOwnProperty('entities')) {
                    var entities = scope.entities;
                    for (var entity in entities) {
                         entities[entity].draw(ctx, this.counter, scope.agents.mercenaries);
                         ctx.globalAlpha = 1.0;
                    }
               }
               ctx.globalAlpha = 1.0;

          if (scope.hasOwnProperty('agents')) {
               var entities = scope.agents;
               for (var entity in entities.goblins) {
                    entities.goblins[entity].draw(ctx);
               }
               entities.players.draw(ctx);
               entities.players.drawStats(ctx)
               

               if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
                    for (var i = 0; i < scope.menuDict["automation"]["mercenaries"]["count"]; i++) {
                         entities.mercenaries[i].draw(ctx)

                         ctx.strokeStyle = 'red';
                         ctx.lineWidth = 5;

                         // draw a red line
                         ctx.beginPath();
                         ctx.moveTo(entities.mercenaries[i].body.pos.x + 30, entities.mercenaries[i].body.pos.y + 30);
                         ctx.lineTo(entities.mercenaries[i].target.pos.x + 30, entities.mercenaries[i].target.pos.y + 30);
                         ctx.stroke();
                    }
               }
          }
          this.logUI.draw(ctx, ["Gold: " + window.game.state.gold, " Time Til Level-Up: " + window.game.state.timeLeft.returnString()])
     }
     miniDraw(ctx) {
          ctx.scale(0.2,0.2)

                         this.counter += 0.0075
               if (this.counter >= 11.0) {
                    this.counter = 0
               }

               var scope = window.game.state 
               if (scope.hasOwnProperty('entities')) {
                    var entities = scope.entities;
                    for (var entity in entities) {
                         entities[entity].draw(ctx, this.counter, scope.agents.mercenaries);
                         ctx.globalAlpha = 1.0;
                    }
               }
               ctx.globalAlpha = 1.0;

          if (scope.hasOwnProperty('agents')) {
               var entities = scope.agents;
               for (var entity in entities.goblins) {
                    entities.goblins[entity].draw(ctx);
               }
               entities.players.draw(ctx);
               entities.players.drawStats(ctx)
               

               if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
                    for (var entity in entities.mercenaries) {
                         entities.mercenaries[entity].draw(ctx)
                    }
               }
          }


          ctx.setTransform(1, 0, 0, 1, 0, 0);

     }


     update(scope) {
          var events = this.eventKeeper.update()
          for (var event in events) { this.dealWithEvent(scope, events[event]) }

          if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {

               for (var entity in scope.agents.mercenaries) {
                    var events = scope.agents.mercenaries[entity].eventKeeper.update()
                    for (var event in events) { scope.agents.mercenaries[entity].dealWithEvent(scope, events[event]) }
               }
          }
     }

     menuChange(type, oldValue) {
          var scope = window.game.state

          console.log(window.game.state.menuDict["automation"]["mercenaries"] )
          if (type === "mercenaries") {
               if (window.game.state.menuDict["automation"]["mercenaries"]["count"] === 0) {
                    
               } else {
                    //var i = oldvalue

                    for (var i = oldValue; i < window.game.state.menuDict["automation"]["mercenaries"]["count"]; i++) {
                         //scope.agents.mercenaries[i] = new playerManager(0,0,75,75, true) 
                         scope.agents.mercenaries[i].start = scope.entities.map.inn.clone()
                         scope.agents.mercenaries[i].setPosition(scope.agents.mercenaries[i].start.pos.x, scope.agents.mercenaries[i].start.pos.y)
                         scope.agents.mercenaries[i].placeChildren()

                         scope.agents.mercenaries[i].whereAmI = "moving"
                         scope.agents.mercenaries[i].pathIndex = 0

                         scope.agents.mercenaries[i].targetName = "fightingGoblins"
                         scope.agents.mercenaries[i].target = scope.entities.map.battlefields[i].clone()
                         scope.agents.mercenaries[i].selectedVector = new Vector(0,0)

                         scope.agents.goblins[i].isFighting = false

                         scope.agents.mercenaries[i].eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)

                         
                         //scope.entities.map.targets[i] = scope.entities.map.battlefields[i].clone()
                         scope.agents.mercenaries[i].eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.015 + 0.005 * i, target: scope.entities.map.battlefields[i].returnPosition(), index: i })
                    }
               }
          } else if (type === "travel") {
               
               if (scope.menuDict["automation"]["travel"]["active"] === true) {
                    this.findTarget(scope)
               }
          }
     }
     onEnter(scope) {
          console.log("Entered map")

          scope = window.game.state 
                    
          this.logUI = new UIBuilder(this.log).setXY(25, -6).setSize(window.game.constants.width - 100, 100).build()
          //this.firstUI = new UIBuilder([String(scope.agents.players.agents[0].status.name) + ": " + String(scope.agents.players.agents[0].status.currentHealth) + "/" + String(scope.agents.players.agents[0].status.maxHealth), String(scope.agents.players.agents[1].status.name) + ": " + String(scope.agents.players.agents[1].status.currentHealth) + "/" + String(scope.agents.players.agents[1].status.maxHealth), String(scope.agents.players.agents[2].status.name) + ": " + String(scope.agents.players.agents[2].status.currentHealth) + "/" + String(scope.agents.players.agents[2].status.maxHealth)]).setXY(670, 300).setFont(15).setSize("text", "text").build()

          //this.menuChange("mercenaries", 0)
          for (var i = 0; i < window.game.state.menuDict["automation"]["mercenaries"]["count"]; i++) {
          }
          for (var i = 0; i < window.game.state.menuDict["automation"]["mercenaries"]["maxCount"]; i++) {
                              scope.agents.mercenaries[i] = new mercenaryManager(0, 0, 75, 75)

               scope.agents.goblins[i] = new goblinManager(500, 400, 75, 75, "Goblin", 1)

               scope.entities.map.battlefields[i] = scope.entities.map.getRandomTarget()
          
          }

          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)

          //scope.agents.players.start = scope.entities.map.inn.clone()
          scope.agents.players.setPosition(scope.agents.players.start.pos.x, scope.agents.players.start.pos.y)
          scope.agents.players.placeChildren()


          for (var i = 0; i < scope.agents.mercenaries.length; i++) {
               scope.agents.mercenaries[i].start = scope.entities.map.inn.clone()
               scope.agents.mercenaries[i].setPosition(scope.agents.mercenaries[i].start.pos.x, scope.agents.mercenaries[i].start.pos.y)
               scope.agents.mercenaries[i].placeChildren()
          }

          for (var i = 0; i < scope.entities.map.battlefields.length; i++) {
               scope.entities.map.battlefields[i] = scope.entities.map.getRandomTarget()
               scope.agents.goblins[i].setPositionV(scope.entities.map.battlefields[i].returnPosition());
               scope.agents.goblins[i].placeChildren()
               scope.agents.goblins[i].isFighting = false
          }

          this.findTarget(scope)
     }

     findTarget(scope) {
          if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
               console.log("MERCENARIES UNLOCKED")

               for (var i = 0; i < scope.agents.mercenaries.length; i++) {
                    scope.agents.mercenaries[i].whereAmI = "moving"
                    scope.agents.mercenaries[i].pathIndex = 0

                    scope.agents.mercenaries[i].targetName = "fightingGoblins"
                    scope.agents.mercenaries[i].target = scope.entities.map.battlefields[i].clone()

                    
                    //scope.entities.map.targets[i] = scope.entities.map.battlefields[i].clone()
                     scope.agents.mercenaries[i].eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.015 + 0.005 * i, parent: "mercenary", target: scope.entities.map.battlefields[i].returnPosition(), index: i })

               }
        
         
          } else if (scope.menuDict["automation"]["fully"]["active"] === true || scope.menuDict["automation"]["travel"]["active"] === true) {

               scope.agents.players.whereAmI = "moving"
               scope.agents.players.pathIndex = 0

               if (scope.agents.players.agents[0].status.currentHealth <= 0) {
                    scope.agents.players.targetName = "Healing"
                    scope.entities.map.target = scope.entities.map.inn.clone()
                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.05, parent: "player", target: scope.entities.map.inn.returnPosition() })
               } else {
                    scope.agents.players.targetName = "fightingGoblins"
                    scope.entities.map.target = scope.entities.map.battlefields[0].clone()
                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.05, parent: "player", target: scope.entities.map.battlefields[0].returnPosition() })
               }
          }  
     }

     dealWithEvent(scope, event) {
          //console.log(event.name, event.parent, event)
          if (event.name === "moveReticule") {
               var pos = event.target
               var index = event.index
               if (event.parent === "player") {
                    if (scope.entities.map.selectedX < pos.x / 60) {
                         scope.entities.map.selectedX += 1
                    } else if (scope.entities.map.selectedX > pos.x / 60) {
                         scope.entities.map.selectedX -= 1
                    } else if (scope.entities.map.selectedY < pos.y / 60) {
                         scope.entities.map.selectedY += 1
                    } else if (scope.entities.map.selectedY > pos.y / 60) {
                         scope.entities.map.selectedY -= 1
                    } else {
                         scope.agents.players.path = scope.entities.map.pathFind(scope.agents.players.start, scope.entities.map.target, "player")
                         this.eventKeeper.addEvent({ name: "movePlayer", timeToTrigger: 0.025, target: scope.agents.players.targetName })
                         return
                    }
                                   
                    this.eventKeeper.addEvent({ name: "moveReticule", parent:"player", timeToTrigger: 0.05, target: event.target })

               }
          }else if (event.name === "movePlayer") {
               if (scope.agents.players.moveToNextIndex(scope.entities.map) === true) {
                    
                    this.eventKeeper.repeatEvent(event)
               } else {
                    console.log(scope.agents.players.whereAmI)
                    if (scope.agents.players.whereAmI === "fightingGoblins") {
                         if (scope.agents.goblins[0].isFighting === false) {
                              scope.agents.goblins[0].isFighting = true;
                              this.eventKeeper.addEvent({ name: "Transition", timeToTrigger: 2.0, type: "combat" })
                         }
                    } else if (scope.agents.players.whereAmI === "buying") {
                         this.eventKeeper.addEvent({ name: "Transition", timeToTrigger: 2.0, type: "store" })

                    } else if (scope.agents.players.whereAmI === "healing") {
                         this.eventKeeper.addEvent({ name: "healing", timeToTrigger: 2.0 })
                    } else {
                         scope.agents.players.whereAmI = "undecided"
                    }

               }



          } else if (event.name === "Transition") {
               scope.worldStateManager.transition(scope, event.type)  

          } else if (event.name === "healing") {
               if (scope.agents.players.heal(20) === true) {
                    this.findTarget(scope)
               } else {
                    console.log(scope.agents.players.whereAmI )
                    if (scope.agents.players.whereAmI === "healing") {
                         this.eventKeeper.addEvent({ name: "healing", timeToTrigger: 1.0 })
                    }
               }


          }
     }
     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
               
          } else {
               //console.log(scope.entities.map.target)
               
               if (event.Enter === true && scope.agents.players.whereAmI !== "moving" &&  scope.entities.map.target.sprite.name === "path") {
                    scope.agents.players.whereAmI = "moving"
                    scope.agents.players.pathIndex = 0

                         scope.agents.players.path = scope.entities.map.pathFind(scope.agents.players.start, scope.entities.map.target, "player")

                    this.eventKeeper.addEvent({ name: "movePlayer", timeToTrigger: 0.05, target: scope.agents.players.targetName})
               } else if (event.ArrowRight === true) {
                    delete event.ArrowRight
                    scope.entities.map.selectedX+=1
               } else if (event.ArrowLeft === true) {
                    delete event.ArrowLeft
                    scope.entities.map.selectedX-=1
               } else if (event.ArrowUp === true) {
                    delete event.ArrowUp
                    scope.entities.map.selectedY-=1
               } else if (event.ArrowDown === true) {
                    delete event.ArrowDown
                    scope.entities.map.selectedY+=1
               }
          }
     }
}
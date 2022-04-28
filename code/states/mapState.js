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
               window.game.state.day+=1
          }

          var tmpCounter = this.counter
          var scope = window.game.state 
          if (scope.endgame === true) {
               tmpCounter = 10
          }
          scope.map.draw(ctx, tmpCounter, scope.agents.mercenaries);
          ctx.globalAlpha = 1.0

          if (scope.hasOwnProperty('agents')) {
               var agents = scope.agents;
                         
               for (var i = 0; i < window.game.state.menuDict["automation"]["mercenaries"]["count"] + 1; i++) {
                    agents.goblins[i].draw(ctx);
               }
               agents.players.draw(ctx);
               agents.players.drawStats(ctx)
               

               if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
                    for (var i = 0; i < scope.menuDict["automation"]["mercenaries"]["count"]; i++) {
                         agents.mercenaries[i].draw(ctx)

                         ctx.strokeStyle = 'red';
                         ctx.lineWidth = 5;

                         // draw a red line
                         ctx.beginPath();
                         ctx.moveTo(agents.mercenaries[i].body.pos.x + 30, agents.mercenaries[i].body.pos.y + 30);
                         ctx.lineTo(agents.mercenaries[i].target.pos.x + 30, agents.mercenaries[i].target.pos.y + 30);
                         ctx.stroke();
                    }
               }
          }
                         
          if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
               this.logUI.draw(ctx, ["Gold: " + window.game.state.gold + " Day: " + window.game.state.day, " Time Til Level-Up: " + window.game.state.timeLeft.returnString()])
          } else {
               this.logUI.draw(ctx, ["Gold: " + window.game.state.gold + " Day: " + window.game.state.day ] )
          }
          //window.game.state.timeLeft.draw(ctx, " Time Til Level-Up: ")
          //this.tBox1.draw(ctx)
     }
     miniDraw(ctx) {
          ctx.scale(0.15,0.15)

           var tmpCounter = this.counter
          var scope = window.game.state 
          if (scope.endgame === true) {
               tmpCounter = 10
          }
          var scope = window.game.state 
          scope.map.draw(ctx, tmpCounter, scope.agents.mercenaries);
          ctx.globalAlpha = 1.0

          if (scope.hasOwnProperty('agents')) {
               var agents = scope.agents;
               for (var entity in agents.goblins) {
                    agents.goblins[entity].draw(ctx);
               }
               agents.players.draw(ctx);
               //agents.players.drawStats(ctx)
               
               if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
                    for (var entity in agents.mercenaries) {
                         agents.mercenaries[entity].draw(ctx)
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
                    
               if (window.game.state.gold > 14) {
                    scope.textBoxManager.start("mercenaryDoingWellText")
               }
               console.log(scope.menuDict["automation"]["mercenaries"]["count"], scope.menuDict["automation"]["mercenaries"]["cap"])
               if (scope.menuDict["automation"]["mercenaries"]["count"] === scope.menuDict["automation"]["mercenaries"]["cap"] && window.game.state.menu.hidden === true) {
                    scope.textBoxManager.start("finalText")
                    scope.endgame = true 
               }
          }
     }

     menuChange(type, oldValue) {
          var scope = window.game.state
          if (type === "mercenaries") {
               if (window.game.state.menuDict["automation"]["mercenaries"]["count"] === 0) {
                    
               } else {
                    //var i = oldvalue

                    for (var i = oldValue; i < window.game.state.menuDict["automation"]["mercenaries"]["count"]; i++) {
                         scope.agents.mercenaries[i] = new mercenaryManager(0, 0, 75, 75)
                         scope.agents.mercenaries[i].start = scope.map.inn.clone()
                         scope.agents.mercenaries[i].setPosition(scope.agents.mercenaries[i].start.pos.x, scope.agents.mercenaries[i].start.pos.y)
                         scope.agents.mercenaries[i].placeChildren()

                         scope.agents.mercenaries[i].whereAmI = "moving"
                         scope.agents.mercenaries[i].pathIndex = 0

                         scope.agents.mercenaries[i].targetName = "fightingGoblins"
                         scope.agents.mercenaries[i].target = scope.agents.goblins[i].tile.clone()
                         scope.agents.mercenaries[i].selectedVector = new Vector(0,0)

                         scope.agents.goblins[i].isFighting = false

                         console.log(scope.agents.mercenaries[i])
                         scope.agents.mercenaries[i].startPathFinding(scope.agents.goblins[i + 1].tile.returnPosition(), i )
                    }
               }
          } else if (type === "travel" || type === "fully") {
               console.log(scope.menuDict["automation"]["travel"])
               if (scope.menuDict["automation"]["travel"]["active"] === true || scope.menuDict["automation"]["fully"]["active"] === true ) {
                    this.findTarget(scope)
               }
          }
     }
     onEnter(scope) {
          console.log("Entered map")

          scope = window.game.state 
          scope.menu.hidden = true 
                    
          this.logUI = new UIBuilder(this.log).setXY(25, -6).setSize(window.game.constants.width - 100, 100).build()
          //this.tBox1 = new TextBoxBuilder().setBody(new BodyBuilder().setXY(25, 500).setSize(window.game.constants.width - 100, 100).build()).setText(["i am the very modle of a modern major general, i've information animeal vegetable and mineral.  i know the kings of england and i quote the fights historical from marathon to waterloo in orders categorical .","sentence 2 of 2 3 4 5 6 7 8 9", "sentence 3 of 3 4 5 6 7 8 9 "]).build()
          //this.firstUI = new UIBuilder([String(scope.agents.players.agents[0].status.name) + ": " + String(scope.agents.players.agents[0].status.currentHealth) + "/" + String(scope.agents.players.agents[0].status.maxHealth), String(scope.agents.players.agents[1].status.name) + ": " + String(scope.agents.players.agents[1].status.currentHealth) + "/" + String(scope.agents.players.agents[1].status.maxHealth), String(scope.agents.players.agents[2].status.name) + ": " + String(scope.agents.players.agents[2].status.currentHealth) + "/" + String(scope.agents.players.agents[2].status.maxHealth)]).setXY(670, 300).setFont(15).setSize("text", "text").build()

          //this.menuChange("mercenaries", 0)
          for (var i = 0; i < window.game.state.menuDict["automation"]["mercenaries"]["count"]; i++) {
               scope.agents.mercenaries[i] = new mercenaryManager(0, 0, 75, 75)
          }
          for (var i = 0; i < window.game.state.menuDict["automation"]["mercenaries"]["maxCount"] + 1; i++) {
               scope.agents.goblins[i] = new goblinManager(500, 400, 75, 75, "Goblin", 1, scope.map.getRandomTarget())
          }

          if (window.game.state.gold >= 3) {
               scope.textBoxManager.start("goToShopText")
          }



          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)

          scope.agents.players.setPosition(scope.agents.players.start.pos.x, scope.agents.players.start.pos.y)
          scope.agents.players.placeChildren()


          for (var i = 0; i < scope.agents.mercenaries.length; i++) {
               scope.agents.mercenaries[i].start = scope.map.inn.clone()
               scope.agents.mercenaries[i].setPosition(scope.agents.mercenaries[i].start.pos.x, scope.agents.mercenaries[i].start.pos.y)
               scope.agents.mercenaries[i].placeChildren()
          }

          this.findTarget(scope)
     }

     findTarget(scope) {
          if (scope.menuDict["automation"]["mercenaries"]["count"] !== 0) {
               console.log("MERCENARIES UNLOCKED")

               for (var i = 0; i < scope.agents.mercenaries.length; i++) {
                    scope.agents.mercenaries[i].startPathFinding(scope.agents.goblins[i + 1].tile.returnPosition(), i )

               }
        
         
          } else if (scope.menuDict["automation"]["fully"]["active"] === true || scope.menuDict["automation"]["travel"]["active"] === true) {

               scope.agents.players.whereAmI = "moving"
               scope.agents.players.pathIndex = 0

               var anybodyDead = false 
               for (var i = 0; i < scope.agents.players.agents.length; i++){
                    if (scope.agents.players.agents[i].status.currentHealth <= 0) {
                         anybodyDead = true 
                    }    
               }

               if (anybodyDead === true ) {
                    scope.agents.players.targetName = "Healing"
                    scope.map.target = scope.map.inn.clone()
                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.05, parent: "player", target: scope.map.inn.returnPosition() })
               } else {
                    scope.agents.players.targetName = "fightingGoblins"
                    scope.map.target = scope.agents.goblins[0].tile.clone()
                    this.eventKeeper.addEvent({ name: "moveReticule", timeToTrigger: 0.05, parent: "player", target: scope.agents.goblins[0].tile.returnPosition() })
               }
          }  
     }

     dealWithEvent(scope, event) {
          //console.log(event.name, event.parent, event)
          if (event.name === "moveReticule") {
               var pos = event.target
               var index = event.index
               if (event.parent === "player") {
                    if (scope.map.selectedX < pos.x / 60) {
                         scope.map.selectedX += 1
                    } else if (scope.map.selectedX > pos.x / 60) {
                         scope.map.selectedX -= 1
                    } else if (scope.map.selectedY < pos.y / 60) {
                         scope.map.selectedY += 1
                    } else if (scope.map.selectedY > pos.y / 60) {
                         scope.map.selectedY -= 1
                    } else {
                         scope.agents.players.path = scope.map.pathFind(scope.agents.players.start, scope.map.target, "player")
                         this.eventKeeper.addEvent({ name: "movePlayer", timeToTrigger: 0.025, target: scope.agents.players.targetName })
                         return
                    }
                                   
                    this.eventKeeper.addEvent({ name: "moveReticule", parent:"player", timeToTrigger: 0.05, target: event.target })

               }
          }else if (event.name === "movePlayer") {
               if (scope.agents.players.moveToNextIndex(scope.map) === true) {
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
               if (scope.agents.players.heal(50) === true) {
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
               
               if (event.Enter === true && scope.agents.players.whereAmI !== "moving" &&  scope.map.target.sprite.name === "path") {
                    scope.agents.players.whereAmI = "moving"
                    scope.agents.players.pathIndex = 0

                         scope.agents.players.path = scope.map.pathFind(scope.agents.players.start, scope.map.target, "player")

                    this.eventKeeper.addEvent({ name: "movePlayer", timeToTrigger: 0.05, target: scope.agents.players.targetName})
               } else if (event.ArrowRight === true) {
                    delete event.ArrowRight
                    if (scope.map.selectedX < 21) {
                         scope.map.selectedX += 1
                    }
               } else if (event.ArrowLeft === true) {
                    delete event.ArrowLeft
                    if (scope.map.selectedX > 0) {
                         scope.map.selectedX -= 1
                    }
               } else if (event.ArrowUp === true) {
                    delete event.ArrowUp
                    if (scope.map.selectedY > 0) {
                         scope.map.selectedY -= 1
                    }
               } else if (event.ArrowDown === true) {
                    delete event.ArrowDown
                                        
                    if (scope.map.selectedY < 11) {
                         scope.map.selectedY += 1
                    }

               }
          }
     }
}
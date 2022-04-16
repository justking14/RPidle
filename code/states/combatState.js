
class battleState extends State{
     constructor() {
          super("battle")
          this.innerStates = ["playerChoose", "playerPicked", "playerAttack", "playerDamage", "enemyChoose", "enemyAttack", "enemyDamage"]
          this.innerState = this.innerStates[0]
          
          this.attackUI = new UIBuilder([["Attack"], ["Magic"], ["Escape"]]).setXY(350, 200).setSize("text", "text").setFont(40).makePickable().build()
          this.magicUI = new UIBuilder([["Fire"], ["Water"], ["Thunder"]]).setXY(350, 200).setSize("text", "text").setFont(40).setParent(this.attackUI).makeHidden().makePickable().build()
          this.magicUI.addGradient("Fire")
          this.magicUI.addGradient("Water")
          this.magicUI.addGradient("Thunder")
     }
     draw(ctx) {
          if (this.innerState === "playerChoose" || this.innerState === "playerPicked") {
               this.attackUI.draw(ctx)
               this.magicUI.draw(ctx)
          }
     }
             
     advance(event) {
          var currentUI = this.attackUI
          if (this.magicUI.hidden === false) {
               currentUI = this.magicUI
          }
          if (event === "down") {
               currentUI.index += 1
               if (currentUI.index >= currentUI.txt.length) {
                    currentUI.index = 0
               }
          } else if(event === "up"){
               currentUI.index -= 1
               if (currentUI.index < 0) {
                    currentUI.index = currentUI.txt.length - 1
               }
          } else if (event === "left") {
               this.magicUI.hidden = true
          }
     }
}

class combatState extends State {
     constructor() {
          super("combat")
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "statusUpdate", timeToTrigger: 5.0, repeat: true })
          this.eventKeeperBattle = new GameClock(Math.floor(Date.now() / 1000), 0)

          this.battleState = new battleState()
          this.img = new Image()
          this.img.src = "images/brick.png"

          this.log = [" ", " ", "Entered Battle"]

          this.playerUI = new UIBuilder([]).build()
          this.enemyUI = new UIBuilder([]).build()

          this.bgGradient = new Gradient("Magic")
          this.bgGradient.step_u = 0.001
     }

     draw(ctx, scope) {
          //console.log(window.game.state, scope)
          var scope = window.game.state 

          for (var i = 0; i < 20; i++){
               for (var j = 0; j < 15; j++){
                    ctx.drawImage(this.img, i * 50, j * 50)
               }
          }
          ctx.fillStyle = this.bgGradient.draw(ctx)
          ctx.fillRect(0, 0, window.game.constants.width, window.game.constants.height)

          if (this.battleState.innerState === "playerChoose" || this.battleState.innerState === "playerPicked") {
               scope.agents.players.setAttacker()
               var attacker = scope.agents.players.attacker
               console.log(attacker)
               if (attacker !== null) {
                    ctx.fillColor = "black"
                    ctx.fillStyle = "black"
                    ctx.strokeStyle = "black"

                    var sprites = attacker.biggerSprite.body.pos
                    console.log(sprites)
                    ctx.beginPath();
                    ctx.rect(sprites.x, sprites.y, 80, 80)
                    ctx.stroke();
               }
          }

          if (scope.hasOwnProperty('agents')) {
               scope.agents.goblins[0].draw(ctx, "big");
               scope.agents.players.draw(ctx, "big")

               scope.agents.goblins[0].drawParticles(ctx)
               scope.agents.players.drawParticles(ctx)

               var agents = scope.agents;
               for (var entity in agents) {
                    if (agents[entity].amMercenary === false) {
                         agents[entity].draw(ctx, "big");
                    } 
               }
               for (var entity in agents) {
                    if (agents[entity].amMercenary === false) {
                         agents[entity].drawParticles(ctx)
                    } 
               }
          }
          
          ctx.fillColor = "blue"
          ctx.fillStyle = "blue"
          this.battleState.draw(ctx)

          this.playerUI.draw(ctx, scope.agents.players.returnStatus())
          this.enemyUI.draw(ctx, scope.agents.goblins[0].returnStatus())
          this.logUI.draw(ctx, this.log.slice(-3))
     }
     update(scope, ctx) {
          var scope = window.game.state 
          scope.agents.goblins[0].update()
          
          scope.agents.players.update()
          var events = this.eventKeeper.update()
          for (var event in events) { this.dealWithEvent(scope, events[event], ctx) }
     }
     onEnter(scope) {
          console.log("Entered combat", scope)

          scope.textBoxManager.start("battleText")

          this.log = [" ", " ", "Entered Battle"]
          this.logUI = new UIBuilder(this.log).setXY(25, -6).setSize(window.game.constants.width - 100, 150).build()

          this.playerUI = new UIBuilder(["TMP"]).setXY(10, 550).setSize(window.game.constants.width * 0.45, 150).setFont(35).build()
          this.enemyUI = new UIBuilder(["TMP"]).setXY(window.game.constants.width/2, 550).setSize(window.game.constants.width * 0.5, 150).setFont(35).build()

          scope.agents.players.setPosition(200,200)
          scope.agents.players.enterCombat()

          scope.agents.goblins[0] = new goblinManager(900,350,60,60, "Goblin", scope.agents.players.agents[0].status.level)
          scope.agents.goblins[0].enterCombat()

          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)

                              
          this.battleState.innerStates = "playerChoose"
          this.eventKeeperBattle = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "playerChoose", timeToTrigger: 0.15 })
     }

     onExit(scope) {
          this.battleState = new battleState()
          scope.agents.players.resetAttackers()

          scope.agents.goblins[0].reset()
          scope.map.start = scope.map.battlefields[0].clone()//.getRandomTarget()
     }

     playerChoose(scope) {
          this.battleState.innerState = "playerChoose"
          this.battleState.magicUI.hidden = true 
          this.battleState.magicUI.index = 0
          this.battleState.attackUI.index = 0
          if (scope.menuDict["automation"]["fully"]["active"] === true || scope.menuDict["automation"]["combat"]["active"] === true) {
               this.battleState.innerState = "playerPicked"
               scope.agents.players.setAttacker()
               var attacker = scope.agents.players.attacker
               if (attacker.status.name === "Healer") {
                    this.eventKeeper.addEvent({ name: "magicAttackStep1", timeToTrigger: 0.25 })
               }

               
               this.eventKeeper.addEvent({ name: "playerAttack", timeToTrigger: 1.25 })
          }
     }

     ///moves to magic automatically
     magicAttackStep1(scope) {
          this.battleState.attackUI.index = 1
          this.eventKeeper.addEvent({ name: "magicAttackStep2", timeToTrigger: 0.25})
     }
     magicAttackStep2(scope) {
          this.battleState.magicUI.hidden = false
          scope.agents.players.magicAttack.advance()

          this.eventKeeper.addEvent({ name: "magicAttackStep3", timeToTrigger: 0.15})
     }
     magicAttackStep3(scope) {
          if (this.battleState.magicUI.index < scope.agents.players.magicAttack.index) {
               this.battleState.magicUI.index+=1
          } else if (this.battleState.magicUI.index > scope.agents.players.magicAttack.index) {
               this.battleState.magicUI.index-=1
          }
          if (this.battleState.magicUI.index !== scope.agents.players.magicAttack.index) {
               this.eventKeeper.addEvent({ name: "magicAttackStep3", timeToTrigger: 0.3})
          }
          //might need to advance index slowly
          //this.eventKeeper.addEvent({ name: "magicAttackStep2", timeToTrigger: 0.25 })
     }


     playerAttack(scope, isMagic) {
          if ( scope.agents.players.setAttacker() === true) {
               this.battleState.innerState = "playerAttack"
               var attacker = scope.agents.players.attacker
               attacker.hasAttacked = true 

               var goal = scope.agents.goblins[0].getTarget().getPosition()//body.pos
               scope.agents.players.magicAttack.setPositionV(attacker.sprite.body.pos)
               
               this.battleState.magicUI.hidden = true 
               this.battleState.magicUI.index = 0
               this.battleState.attackUI.index = 0
               if (isMagic === true || (attacker.status.name === "Healer" && (scope.menuDict["automation"]["fully"]["active"] === true || scope.menuDict["automation"]["combat"]["active"] === true))) {
                    
                    //this.battleState.magicUI.hidden = true
                    scope.agents.players.magicAttack.hidden = false
                    scope.agents.players.magicAttack.midLerp = true 
                    this.eventKeeper.addEvent({ name: "lerp", timeToTrigger: 0.05, count: 3, source: scope.agents.players.magicAttack, goal: goal })
                    this.eventKeeper.addEvent({ name: "playerDamage", timeToTrigger: 0.5, source: scope.agents.players.magicAttack })
               } else {
                    attacker.midLerp = true 
                    this.eventKeeper.addEvent({ name: "lerp", timeToTrigger: 0.05, count: 3, source: attacker, goal: goal })
                    this.eventKeeper.addEvent({ name: "playerDamage", timeToTrigger: 0.5, source: attacker })
               }
          }
     }
     playerDoDamage(scope, event) {
          console.log(event)
          event.source.midLerp = false 
          this.battleState.magicUI.hidden = true

          this.eventKeeper.addEvent({ name: "shake", timeToTrigger: 0.05, count: 4, type: 1 })

          scope.sounds["enemyHurt"].play()
          this.battleState.innerState = "playerDamage"        
          scope.agents.players.placeChildren("big")
                                  
          if (scope.agents.players.magicAttack.hidden === true) {
               this.log.push(scope.agents.players.battleCalculations(scope.agents.goblins[0].getTarget()))//what happened when he attacked
          } else {
               if (scope.agents.players.magicAttack.index === 2) {
                    console.log("ddddd")
                    this.log.push(scope.agents.players.battleCalculations(scope.agents.goblins[0].getTarget(), true))//what happened when he attacked
               } else {
                    this.log.push(scope.agents.players.battleCalculations(scope.agents.goblins[0].getTarget()))//what happened when he attacked
               }
          }
          scope.agents.players.magicAttack.hidden = true  
          scope.agents.players.magicAttack.setPosition(50, 50)


          if (scope.agents.goblins[0].areWeDead() === true) {
               this.log.push("BATTLE WON!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
               window.game.state.gold += 1
               this.eventKeeper.addEvent({ name: "leaveBattle", timeToTrigger: 3.5 })
          }else{
               if (scope.agents.players.setAttacker() === false) {
                    scope.agents.players.placeChildren("big")
                    scope.agents.players.resetAttackers()
                    this.eventKeeper.addEvent({ name: "goblinAttack", timeToTrigger: 0.5 })
               } else {
                    this.eventKeeper.addEvent({ name: "playerChoose", timeToTrigger: 0.25 })
               }
          }          
     }

     goblinAttack(scope) {
          this.battleState.innerState = "goblinAttack"    
          if (scope.agents.goblins[0].setAttacker() === true) {
               if (scope.agents.goblins[0].areWeDead() === false) {
                    var attacker = scope.agents.goblins[0].attacker
                    attacker.hasAttacked = true 
                    var goal = scope.agents.players.getTarget().getPosition()
                    attacker.midLerp = true 
                    this.eventKeeper.addEvent({ name: "lerp", timeToTrigger: 0.05, count: 3, source: attacker, goal: goal  })
                    this.eventKeeper.addEvent({ name: "goblinDamage", timeToTrigger: 0.5, source: attacker })
               }
          }
     }

     goblinDamage(scope, event) {
          event.source.midLerp = false 
          this.eventKeeper.addEvent({ name: "shake", timeToTrigger: 0.05, count: 4, type: -1 })

          scope.sounds["playerHurt"].play()

          this.battleState.innerState = "goblinDamage"         
          scope.agents.goblins[0].placeChildren("big")

          this.log.push(scope.agents.goblins[0].battleCalculations(scope.agents.players.getTarget()))

          if (scope.agents.players.areWeDead() === true) {
               this.eventKeeper.addEvent({ name: "leaveBattle", timeToTrigger: 3.5 })
          } else {
               if (scope.agents.goblins[0].setAttacker() === false) {
                    scope.agents.goblins[0].resetAttackers()
                    scope.agents.players.placeChildren("big")
                    this.eventKeeper.addEvent({ name: "playerChoose", timeToTrigger: 0.5 })
               } else {
                    this.eventKeeper.addEvent({ name: "goblinAttack", timeToTrigger: 0.5 })
               }
          }
     }

     
     dealWithEvent(scope, event, ctx) {
          if (event.name === "lerp") {
               if (event.source.midLerp === true) {
                    event.source.sprite.body.pos = event.source.sprite.body.pos.lerp(event.goal, 0.5)
                    if (event.count >= 0) {
                         this.eventKeeper.addEvent({ name: "lerp", timeToTrigger: 0.1, count: event.count - 1, source: event.source, goal: event.goal })
                    }
               }
          } else if (event.name === "playerChoose") {
               this.playerChoose(scope)
          } else if (event.name === "playerMagicAttack") {
               //this.playerMagicAttack(scope)
               this.playerAttack(scope, true)
          } else if (event.name === "playerAttack") {
               this.playerAttack(scope, false)
          } else if (event.name === "playerDamage") {
               this.playerDoDamage(scope, event)

          }else if (event.name === "goblinAttack") {
               this.goblinAttack(scope)
          } else if (event.name === "goblinDamage") {
               this.goblinDamage(scope, event)


          } else if (event.name === "magicAttackStep1") {
               this.magicAttackStep1(scope)
          } else if (event.name === "magicAttackStep2") {
               this.magicAttackStep2(scope)
          } else if (event.name === "magicAttackStep3") {
               this.magicAttackStep3(scope)

          } else if (event.name === "leaveBattle") {
               scope.worldStateManager.transition(scope, "map")  

          } else if (event.name === "shake") {
               if (event.count > 0) {
                    if (event.type === 1) {
                         ctx.scale(1.02,1.02)
                         this.eventKeeper.addEvent({ name: "shake", timeToTrigger: 0.05, count: event.count - 1, type: -1 })
                    } else if (event.type === -1) {
                         ctx.scale(0.9803,0.9803)
                         this.eventKeeper.addEvent({ name: "shake", timeToTrigger: 0.05, count: event.count - 1, type: 1 })

                    }
               } else {
                    ctx.setTransform(1, 0, 0, 1, 0, 0);

               }
          }
          
     }

     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
               
          } else {
               if (this.battleState.innerState === "playerChoose") {
                    if (event.Enter === true) {
                         delete event.Enter
                         if (this.battleState.magicUI.hidden === false) {
                                             
                              scope.agents.players.magicAttack.index = this.battleState.magicUI.index
                              this.battleState.magicUI.hidden = true 
                              this.battleState.magicUI.index = 0
                              this.battleState.attackUI.index = 0
                              this.battleState.innerState = "playerAttack"
                              this.eventKeeper.addEvent({ name: "playerMagicAttack", timeToTrigger: 0.25 })
                         } else {
                              if (this.battleState.attackUI.index === 2) {
                                   this.eventKeeper.addEvent({ name: "leaveBattle", timeToTrigger: 0.5 })
                              } else if (this.battleState.attackUI.index === 1) {
                                   this.battleState.magicUI.hidden = false
                              } else {
                                   this.battleState.innerState = "playerAttack"
                                   this.eventKeeper.addEvent({ name: "playerAttack", timeToTrigger: 0.25 })
                              }
                         }
                    } else if (event.ArrowDown === true) {
                         delete event.ArrowDown
                         this.battleState.advance("down")
                    } else if (event.ArrowUp === true) {
                         delete event.ArrowUp
                         this.battleState.advance("up")
                    } else if (event.ArrowLeft === true) {
                         delete event.ArrowLeft
                         this.battleState.advance("left")

                    }
               }
          }

     }
}


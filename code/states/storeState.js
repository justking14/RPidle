class storeState extends State {
     constructor() {
          super("store")
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "statusUpdate", timeToTrigger: 5.0, repeat: true })
     }
     draw(ctx, scope) {
          this.storeUI.draw(ctx)
     }
     update(scope) {
          var events = this.eventKeeper.update()
          for (var event in events) { this.dealWithEvent(scope, events[event]) }
     }
     onEnter(scope) {
          console.log("Entered store")

          this.storeUI = new storeMenu("store")
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
     }

     dealWithEvent(scope, event) {
          if (event.name === "Transition") {
               scope.worldStateManager.transition(scope, event.type)  
          }
     }
     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
               
          } else {
               if (event.Enter === true) {
                    delete event.Enter
                    if (this.storeUI.items[this.storeUI.index].name === "Escape") {
                         this.eventKeeper.addEvent({ name: "Transition", timeToTrigger: 1.0, type: "map" })
                    
                    } else {
                         this.storeUI.makePurchase()
                    }
               } else if (event.ArrowDown === true) {
                    delete event.ArrowDown
                    this.storeUI.advance("down")
               } else if (event.ArrowUp === true) {
                    delete event.ArrowUp
                    this.storeUI.advance("up")
               }
          }
     }
}
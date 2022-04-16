class menuState extends State{
     constructor() {
          super("menu")
          this.hidden = true 
          
          this.infoBody = new BodyBuilder().setXY(25, 10).setSize(1280 - 50, 130)
          this.body = new BodyBuilder().setXY(25, 140).setSize(1280 - 50, 720 - 150)

          this.menuUI = new optionMenu("options")

          this.index = 0
          this.color = null 
          this.menuUI.advance("up")
          this.menuUI.advance("down")
     }
          
     onEnter(scope) {
          console.log("LERRRORY JENKINNNNNS", scope.menuDict["automation"], this.menuUI.items)
     }
     onExit() {}

     update() {}
     draw(ctx, scope) {
          ctx.font = "32px Adventure"
          this.menuUI.draw(ctx)
     }

     
     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
          } else {
               if (event.ArrowDown === true) {
                    delete event.ArrowDown
                    this.menuUI.advance("down")
               } else if (event.ArrowUp === true) {
                    delete event.ArrowUp
                    this.menuUI.advance("up")
               }
               if (event.ArrowRight === true) {
                    delete event.ArrowRight
                    this.menuUI.changeValue("right")
               } else if (event.ArrowLeft === true) {
                    delete event.ArrowLeft
                    this.menuUI.changeValue("left")
               }               

               if (event.Enter === true) {
                    delete event.Enter
                    this.menuUI.changeValue("enter")
               }
          }
     }
}
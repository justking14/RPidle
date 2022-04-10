

class menuState extends State{
     constructor() {
          super("menu")
          this.hidden = true 
          this.body = new BodyBuilder().setXY(25, 25).setSize(1024 - 50, 768 - 50)
          
          this.infoBody = new BodyBuilder().setXY(25, 10).setSize(1280 - 50, 130)
          this.body = new BodyBuilder().setXY(25, 140).setSize(1280 - 50, 720 - 150)

          this.storeUI = new optionMenu("options")
 
          console.log(this.storeUI.items)
          
          this.index = 0
          this.color = null 
          this.storeUI.advance("up")
          this.storeUI.advance("down")
      
     }
          
     onEnter(scope) {

          console.log("LERRRORY JENKINNNNNS", scope.menuDict["automation"])
          
          console.log(this.storeUI.items)

     }
     update() {}
     draw(ctx, scope) {

          ctx.font = "32px Adventure"

          this.storeUI.draw(ctx)

     }

     onExit() {}
     
     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
               
          } else {
               
               if (event.ArrowDown === true) {
                    delete event.ArrowDown
                    this.storeUI.advance("down")

               } else if (event.ArrowUp === true) {
                    delete event.ArrowUp
                    this.storeUI.advance("up")
                    
               }

               if (event.ArrowRight === true) {
                    delete event.ArrowRight

                    this.storeUI.changeValue("right")

                    
               } else if (event.ArrowLeft === true) {
                    delete event.ArrowLeft

                    this.storeUI.changeValue("left")
               }               

               if (event.Enter === true) {
                    delete event.Enter
                    this.storeUI.changeValue("enter")
               }
          }
          //               scope.worldStateManager.currentState.menuChange("travel",  !scope.menuDict["automation"]["travel"])

     }
     
}


/*
class menuItem {
     draw(ctx, scope, x, y, selected) {
          ctx.font = this.fnt + 'px Adventure';
          this.y = 0
          var prevX = x

          if (this.unlocked === true) {

               //drawText(ctx, scope, this.name + ": ", x, y, "black", selected, this.fnt)
               x += ctx.measureText(this.name + ": ").width + 20

               for (var i = 0; i < this.options.length; i++) {
                    if (x + ctx.measureText(this.options[i]).width + 20 > this.parentBoundary) {
                         x = prevX;
                         this.y += 65
                    }
                    //drawText(ctx, scope, this.options[i], x, y + this.y, "black", i === this.itemIndex, this.fnt)
                    x += ctx.measureText(this.options[i]).width + 20
               }
          }
          return this.y 
     }
}
*/

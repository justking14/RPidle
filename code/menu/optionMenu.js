class optionMenu extends menuBase {
     constructor() {
          super("option")
     }
     addItems() {
          for (var i = 0; i < menu_data["options"].items.length; i++){
               var item = menu_data["options"].items[i]
               this.items.push(new optionItem(item, i, 1280))
          }
     }


     advance(event) {
          var keepMoving = true 
          if (event === "down") {
               while (keepMoving === true) {
                    this.index += 1
                    if (this.index > this.items.length - 1) {    this.index = 0 }
                    
                    if (this.items[this.index].visible === true) {   keepMoving = false }
               }
          } else if (event === "up") {
               while (keepMoving === true) {
                    this.index -= 1
                    if (this.index < 0) { this.index = this.items.length - 1 }
                    if (this.items[this.index].visible === true) { keepMoving = false }
               }
          }
     }

     changeValue(event) {
          if (event === "right") {
               var item = this.items[this.index]
               item.optionIndex += 1
               if (item.optionIndex > item.options.length - 1) {
                    item.optionIndex = 0
               }
               item.changeValue()
          } else if (event === "left") {
               var item = this.items[this.index]
               item.optionIndex -= 1
               if (item.optionIndex < 0) {
                    item.optionIndex = item.options.length - 1
               }
               item.changeValue()
          } else if (event === "enter") {
               var item = this.items[this.index]
               //item.optionIndex += 1
               if (item.type !== "binary") {
                    item.changeCount()
                    item.changeValue()
               } else if (item.type === "binary") {
                    if (item.optionIndex === 0) {
                         item.optionIndex = 1
                         item.changeValue()
                         return
                    } else if (item.optionIndex === 1) {
                         item.optionIndex = 0
                         item.changeValue()
                         return
                    }
                    
               }
          }

     }
}

class optionItem{
     constructor(item, i, width) {
          this.name = item.id 
          this.text = item.title
          this.title = item.title
          this.description = item.description
          this.options = item.options
          this.type = item.type
          //if(this.type !== "binary"){this.value = 0}
          this.itemIndex = i
          this.optionIndex = 1

          this.visible = true //change

          this.menuType = item.menuType;
          this.subMenu = item.subMenu;

          this.fnt = 32

          this.width = 1000;
     }

     changeCount() {
               var oldCount = this.count
               if (this.options[this.optionIndex] === "+") {
                    if (this.count < window.game.state.menuDict["automation"]["mercenaries"]["maxCount"]) {
                         this.count += 1
                    }
               } else {
                    if (this.count > 0) {
                         this.count -= 1
                    }
               }
               window.game.state.menuDict[this.menuType][this.subMenu]["active"] = (this.count > 0)
               window.game.state.menuDict[this.menuType][this.subMenu]["count"] = this.count;
               window.game.state.worldStateManager.currentState.menuChange(this.subMenu, oldCount)//,  !scope.menuDict[this.menuType][this.subMenu])

     }

     changeValue() {

          if (this.type === "binary") {
               window.game.state.worldStateManager.currentState.menuChange(this.subMenu)//,  !scope.menuDict[this.menuType][this.subMenu])
               window.game.state.menuDict[this.menuType][this.subMenu]["active"] = (this.optionIndex === 0)
          } else {

          }
     }


     draw(ctx, index, body, infoBody, x, y) {
          x = body.pos.x 
          y = body.pos.y
          this.y = 0
          var prevX = x

          this.visible = window.game.state.menuDict[this.menuType][this.subMenu]["unlocked"]
          if (this.type !== "binary") {
               this.count = window.game.state.menuDict[this.menuType][this.subMenu]["count"]
               this.maxCount = window.game.state.menuDict[this.menuType][this.subMenu]["maxCount"]
          }

          //this.visible = true
          if (this.visible === true) {
               if (index === this.itemIndex) {                    
                    drawText(ctx, this.description, infoBody.pos.x + 20, infoBody.pos.y + 20, "black", false, this.fnt)
               }
               
          
               drawText(ctx, this.text + ":", body.pos.x + 10, body.pos.y + 10 + (this.itemIndex * 50), "black", index === this.itemIndex, this.fnt)

               x += ctx.measureText(this.text + ": ").width + 20

               for (var i = 0; i < this.options.length; i++) {
                    if (x + ctx.measureText(this.options[i]).width + 20 > this.parentBoundary) {
                         //x = prevX;
                         //this.y += 65
                    }
                    drawText(ctx, this.options[i], body.pos.x + 10 + x, body.pos.y + 10 + (this.itemIndex * 50) + this.y, "black", this.optionIndex === i, this.fnt)

                    x += ctx.measureText(this.options[i]).width + 20
               }
               if (this.type !== "binary") {
                    drawText(ctx, this.count + "/" + this.maxCount, body.pos.x + 10 + x, body.pos.y + 10 + (this.itemIndex * 50) + this.y, "black", false, this.fnt)
               }

          }
          
          return this.y
     }
}

class menuBase {
     constructor(name) {
          this.name = name;
                    
          this.hidden = true           
          this.infoBody = new BodyBuilder().setXY(25, 10).setSize(1280 - 50, 130).build()
          this.body = new BodyBuilder().setXY(25, 140).setSize(1280 - 50, 720 - 150).build()

          this.index = 0
          this.items = []
          this.ranOnce = false
          this.addItems()
     }
     addItems() {}
     advance(event) {}
     update() { }
     draw(ctx) {
          this.infoBody.draw(ctx)
          this.body.draw(ctx)
          ctx.fillColor = "white"
          ctx.fillStyle = "white"
          for (var i = 0; i < this.items.length; i++) {
               this.items[i].draw(ctx, this.index, this.body, this.infoBody)
          }
          if (this.ranOnce === false) {
               this.advance("up")
               this.advance("down")
          }
     }    
}

/*

class itemBase{
     constructor(item, i, width) {
          this.name = item.id 
          this.text = item.title
          this.title = item.title
          this.price = item.cost
          this.description = item.description
          this.canBeBought = item.canBeBought;
          this.itemIndex = i
          this.type = item.type

          this.menuType = item.menuType;
          this.subMenu = item.subMenu;

          if (this.menuType !== undefined && this.subMenu !== undefined) {
               this.purchased = window.game.state.menuDict[this.menuType][this.subMenu]["unlocked"]
          } else {
               this.purchased = false
          }

          this.width = 1000;

          console.log(item)
     }
     update() { }
     draw(ctx, index, body, infoBody) {
          ctx.fillColor = "black"
          ctx.fillStyle = "black"

          if (this.purchased === true && this.type === "binary" ) { this.text = "PURCHASED" }
          var middle = "."
          var textWidth = ctx.measureText(this.text).width
          if (this.canBeBought === true && this.purchased === false) {
               while (textWidth < this.width) {
                    middle += "."
                    this.text = this.title + middle + "$" + this.price
                    textWidth = ctx.measureText(this.text).width
               }
          }
          if (index === this.itemIndex) {
               ctx.fillText(this.description, infoBody.pos.x + 10, infoBody.pos.y + 20, 1024)
               ctx.fillColor = "white"
               ctx.fillStyle = "white"
               ctx.fillRect(body.pos.x + 10, body.pos.y + 10 + (this.itemIndex * 50), textWidth, 30)

               ctx.fillColor = "black"
               ctx.fillStyle = "black"
          }
          
          ctx.fillText(this.text, body.pos.x + 10, body.pos.y + 10 + (this.itemIndex * 50), 1024)

     }
}


class itemBase{
     constructor(item, i, width) {
          this.name = item.id 
          this.text = item.title
          this.title = item.title
          this.price = item.cost
          this.description = item.description
          this.canBeBought = item.canBeBought;
          this.itemIndex = i
          this.type = item.type

          this.menuType = item.menuType;
          this.subMenu = item.subMenu;

          if (this.menuType !== undefined && this.subMenu !== undefined) {
               this.purchased = window.game.state.menuDict[this.menuType][this.subMenu]["unlocked"]
          } else {
               this.purchased = false
          }

          this.width = 1000;

          console.log(item)
     }
     update() { }
     draw(ctx, index, body, infoBody) {
          ctx.fillColor = "black"
          ctx.fillStyle = "black"

          if (this.purchased === true && this.type === "binary" ) { this.text = "PURCHASED" }
          var middle = "."
          var textWidth = ctx.measureText(this.text).width
          if (this.canBeBought === true && this.purchased === false) {
               while (textWidth < this.width) {
                    middle += "."
                    this.text = this.title + middle + "$" + this.price
                    textWidth = ctx.measureText(this.text).width
               }
          }
          if (index === this.itemIndex) {
               ctx.fillText(this.description, infoBody.pos.x + 10, infoBody.pos.y + 20, 1024)
               ctx.fillColor = "white"
               ctx.fillStyle = "white"
               ctx.fillRect(body.pos.x + 10, body.pos.y + 10 + (this.itemIndex * 50), textWidth, 30)

               ctx.fillColor = "black"
               ctx.fillStyle = "black"
          }
          
          ctx.fillText(this.text, body.pos.x + 10, body.pos.y + 10 + (this.itemIndex * 50), 1024)

     }
}
*/

class storeItem {
     constructor(name, price, width) {
          this.name = name 
          this.price = price 
          this.width = width
          this.txt = name + "." + price
          this.fnt = 20
          this.purchased = false
     }
     draw(ctx, index, body) {
          ctx.font = this.fnt + 'px Adventure';
          var count = 1
          var middle = "."

          if (this.name === "Escape") {
               this.txt = this.name
          } else if (this.purchased === true) {
               this.txt = "PURCHASED"
          } else {
               var textWidth = ctx.measureText(this.txt).width
               while (textWidth < this.width) {
                    count += 1
                    middle += "."
                    this.txt = this.name + middle + "$" + this.price
                    textWidth = ctx.measureText(this.txt).width
                    if (count > 500) {
                         break
                    }
               }
          }
          ctx.fillText(this.txt, body.pos.x + 10, body.pos.y + 10 + (index * 50), 1024)
     }
}

class Store{
     constructor(names, prices, width) {
          this.body = new Body(50, 100, 500, 300)

          this.items = []
          this.index = 0

          
          for (var i = 0; i < menu_data["store"].items.length; i++){
               var item = menu_data["store"].items[i]
               this.items.push(new storeItem(item.title, item.cost, width))
          }
     }
     draw(ctx) {
          this.body.draw(ctx)
          ctx.font = this.items[0].fnt + "px Adventure"
          for (var i = 0; i < this.items.length; i++) {
               if (this.items[i].purchased === true) {
                    this.items[i].txt = "PURCHASED"
               }

               if (i === this.index) {
                    ctx.fillColor = "white"
                    ctx.fillStyle = "white"
                    ctx.fillRect(this.body.pos.x + 10, this.body.pos.y + 10 + (i * 50), ctx.measureText(this.items[i].txt).width, 30)
                    //ctx.fillRect(this.centerX, this.yPos, ctx.measureText(this.txt[i]).width, lineHeight * 0.75)
                    ctx.fillColor = "black"
                    ctx.fillStyle = "black"
                    this.items[i].draw(ctx, i, this.body)
               } else {
                    ctx.fillColor = "black"
                    ctx.fillStyle = "black"
                    this.items[i].draw(ctx, i, this.body)
               }
          }
          //return this.items[i]
     }
}
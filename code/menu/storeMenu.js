class storeMenu extends menuBase {
     constructor() {
          super("store")

     }
     addItems() {
          for (var i = 0; i < menu_data["store"].items.length; i++){
               var item = menu_data["store"].items[i]
               this.items.push(new storeItemBase(item, i, 1280))
          }
     }
     advance(event) {
          var currentItem = this.items[this.index]

          if (event === "down") {
               var keepMoving = true 
               while (keepMoving === true) {
                    this.index += 1
                    if (this.index > this.items.length - 1) {    this.index = 0 }
                    currentItem = this.items[this.index]
                    if (currentItem.purchased === false || (currentItem.type === "numerical" &&  window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] < window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["cap"])) {   keepMoving = false }
               }
          } else if (event === "up") {
               var keepMoving = true 
               while (keepMoving === true) {
                    this.index -= 1
                    if (this.index < 0) { this.index = this.items.length - 1 }
                    currentItem = this.items[this.index]
                    if (currentItem.purchased === false || (currentItem.type === "numerical" &&  window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] < window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["cap"] )) {   keepMoving = false }
               }
          }
     }

     makePurchase() {
          var currentItem = this.items[this.index]
          ///console.log(currentItem)



          if (window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["unlocked"] === false) {
               if (window.game.state.gold >= currentItem.price) {
                    window.game.state.gold -= currentItem.price

                    currentItem.purchased = true 
                    window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["unlocked"] = true 

                    if (currentItem.type === "numerical") {
                         window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] += 1 
                         currentItem.text = currentItem.title + "." + "$" + currentItem.price + " (" + window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] + ")"
                    }
                    return true 
               }
          } else if (currentItem.type === "numerical") {
               if (window.game.state.gold >= currentItem.price && window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] < window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["cap"]) {
                    window.game.state.gold -= currentItem.price
                    console.log(window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"])
                    window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] += 1 

                                             
                    currentItem.text = currentItem.title + "." + "$" + currentItem.price + " (" + window.game.state.menuDict[currentItem.menuType][currentItem.subMenu]["maxCount"] + ")"
                    return true
               }
          }
          console.log("purchase not made")
          return false
     }
}

class storeItemBase{
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
          if (this.type === "binary") {
               if (this.canBeBought === true && this.purchased === false) {
                    while (textWidth < this.width) {
                         middle += "."
                         this.text = this.title + middle + "$" + this.price
                         textWidth = ctx.measureText(this.text).width
                    }
               }
          } else if (this.type === "numerical") {
               if (window.game.state.menuDict[this.menuType][this.subMenu]["maxCount"] < window.game.state.menuDict[this.menuType][this.subMenu]["cap"]) {
                    while (textWidth < this.width) {
                         middle += "."
                         this.text = this.title + middle + "$" + this.price + " (" + window.game.state.menuDict[this.menuType][this.subMenu]["maxCount"] + ")"
                         textWidth = ctx.measureText(this.text).width
                    }
               } else {
                    this.text = "PURCHASED"
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

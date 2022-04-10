class UI {
     constructor(ctx, x, y, width, height, fnt, pick, parent, hidden, menuList) {
          this.body = new Body(x, y, width, height)
          this.txt = menuList
          this.fnt = fnt;
          this.pickable = pick;
          this.index = 0
          this.parent = parent
          this.hidden = hidden
          this.gradient = []
          this.setToText = false 
          if (width === "text") {
               this.setToText = true 
          }
     }
     addGradient(type) {
          this.gradient.push(new Gradient(type))
     }

     draw(ctx, txt) {
          if(txt !== null && txt !== undefined){this.txt = txt}
          if (this.hidden === false) {
               ctx.font = this.fnt + 'px Adventure';

               //console.log(this.longestWord())

               var textWidth = ctx.measureText(this.longestWord()).width
               var lineHeight = this.fnt * 1.286;
               if (this.setToText === true) {
                    this.body.width = textWidth * 1.25;
               } else {
                    //console.log(this.longestWord(), textWidth, this.body.width)
                    var counter = 50
                    while (textWidth + 15 > this.body.width) {
                         counter--
                         this.fnt = this.fnt - 1
                         ctx.font = this.fnt + 'px Adventure'
                         textWidth = ctx.measureText(this.longestWord()).width

                         if (this.fnt === 1) {
                              break;
                         }
                    }
               }
               if (this.body.height === "text" || this.body.height < lineHeight * this.txt.length) {
                    this.body.height = lineHeight * (this.txt.length + 0.5)
               }

               if (this.parent !== null) {
                    this.body.pos.x = this.parent.body.pos.x + this.parent.body.width
               }
         
               this.body.draw(ctx, false)

               ctx.fillColor = "white"
               ctx.fillStyle = "white"

               for (var i = 0; i < this.txt.length; i++) {
                    this.centerX = this.body.pos.x + (this.body.width - ctx.measureText(this.txt[i]).width) / 2

                    this.yPos = (this.body.pos.y + lineHeight * i) + 5 + (lineHeight * 0.25)
                    if (this.pickable) {
                         if (this.index === i) {
                              ctx.fillColor = "white"
                              ctx.fillStyle = "white"
                              ctx.fillRect(this.centerX, this.yPos, ctx.measureText(this.txt[i]).width, lineHeight * 0.75)
                              ctx.fillColor = "black"
                              ctx.fillStyle = "black"
                              if (this.gradient.length !== 0) {
                                   ctx.fillStyle = this.gradient[i].draw(ctx, this.body)
                              }
                              ctx.fillText(this.txt[i], this.centerX, this.yPos, 1024)
                         } else {
                              ctx.fillColor = "white"
                              ctx.fillStyle = "white"
                              ctx.fillText(this.txt[i], this.centerX, this.yPos, 1024)

                         }
                    } else {
                         ctx.fillText(this.txt[i], this.centerX, this.yPos, 1024)
                    }
               }

          }
     }
     longestWord() {
          var longestWord = this.txt[0][0]
          for (var i = 0; i < this.txt.length; i++){
               //console.log(this.txt[i][0], this.txt[i][0].length, longestWord.length)
               if (this.txt[i][0].length > longestWord.length) {
                    longestWord = this.txt[i][0]
               }
          }
          return longestWord
     }

}

class UIBuilder{
     constructor(menuList) {
          this.pickable = false
          if (Array.isArray(menuList)) {
               this.menuList = menuList
          } else {
               this.menuList = [menuList]
          }
          this.parent = null;
          return this
     }
     setXY(x, y) {
          this.x = x;
          this.y = y;
          this.pos = new Vector(x, y)
          return this 
     }
     setSize(width, height) {
          //var textSize = this.ctx.measureText("ssssssss")//longestLength(this.ctx, this.menuList))
               this.width = width;
               this.height = height;
          
          return this
     }
     setFont(fnt) {
          this.fnt = fnt
          return this
     }
     makePickable() {
          this.pickable = true 
          return this
     }
     setParent(parent) {
          this.parent = parent;
          return this;
     }
     makeHidden() {
          this.hidden = true 
          return this
     }
     build() {
          //if (!('x' in this)) { throw new Error("x missing") }
          //if (!('y' in this)) { throw new Error("y missing") }

          return new UI(this.ctx, this.x, this.y, this.width, this.height, this.fnt || 32, this.pickable, this.parent || null, this.hidden || false, this.menuList)
     }
}

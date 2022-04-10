/*
class Menu{
     constructor(menuList, x, y, fs, width, height) {
          this.fontSize = fs 
          this.menuList = menuList;
          this.rect = new Rect(x,y,width || 0,height || 0)
          this.x = x;
          this.y = y;
          
     }
     checkSizes(ctx) {
          ctx.font = this.fontSize + 'px Adventure';
          var fits = false 

          var textSize = ctx.measureText(longestLength(ctx, this.menuList))
          this.text_w = textSize.width
          this.text_h = (textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent)
          this.rect.width = this.text_w * 1.2
          this.centerX = this.rect.x + (this.rect.width - this.text_w) / 2
          this.centerY = ((this.rect.y + (this.rect.height - this.text_h) / 2) + this.text_h)

          var textRect = new Rect(this.rect.x + this.text_w, this.rect.y, 0, this.rect.height)
          ctx.fillStyle = createGradient(ctx, textRect, [[0,colorOrange.stringify()], [0.1, colorBrown.stringify()], [0.9, colorBrown.stringify()], [1.0, colorOrange.stringify()]]) 
          
          roundRect(ctx, this.x, this.y, this.rect.width, this.rect.height, 10, true)
     }

     draw(ctx) {
          this.checkSizes(ctx)

          if (this.menuList.length === 1) {
               ctx.fillColor = "white"
               ctx.fillStyle = "white"
               ctx.fillText(this.menuList[0], this.centerX, this.centerY, this.rect.width)
          } else {
           
               var dstBtwWords = (this.rect.height - this.text_h * this.menuList.length) / this.menuList.length
               //console.log(dstBtwWords)
               for (var i = 0; i < this.menuList.length; i++) {
                    ctx.fillColor = "white"
                    ctx.fillStyle = "white"
                    var wordY = (this.rect.y  + (this.text_h+dstBtwWords) * (i+1)) - this.text_h*0.5
                    ctx.fillText(this.menuList[i], this.centerX, wordY, 1024)
               }
          }
     }
}


class pickableMenu extends Menu{
     constructor(menuList, x, y, fs, width, height ) {
          super(menuList, x, y, fs, width, height)
          this.menuList = menuList
          this.index = 0
     }

     
     draw(ctx) {
          this.checkSizes(ctx)

          if (this.menuList.length === 1) {

               ctx.fillColor = "white"
               ctx.fillStyle = "white"
               ctx.fillRect(this.centerX, this.centerY, this.rect.width, this.rect.height)
               ctx.fillColor = "black"
               ctx.fillStyle = "black"
               ctx.fillText(this.menuList[i], this.centerX, this.centerY, this.rect.width)
          } else {
           
               var dstBtwWords = (this.rect.height - this.text_h * this.menuList.length) / this.menuList.length

               for (var i = 0; i < this.menuList.length; i++) {
                    if (i !== this.index) {
                         ctx.fillColor = "white"
                         ctx.fillStyle = "white"
                         var wordY = (this.y + (this.text_h + dstBtwWords) * (i + 1)) - this.text_h * 0.5
                         ctx.fillText(this.menuList[i], this.centerX, wordY, 1024)
                    } else {
                         ctx.fillColor = "white"
                         ctx.fillStyle = "white"
                                                  
                         var wordY = (this.y + (this.text_h + dstBtwWords) * (i + 1)) - this.text_h * 0.5
                         ctx.fillRect(this.centerX, wordY - this.text_h * 0.9, ctx.measureText(this.menuList[i]).width, this.text_h)
                         ctx.fillColor = "black"
                         ctx.fillStyle = "black"
                         ctx.fillText(this.menuList[i], this.centerX, wordY, this.rect.width)
                    }
               }
          }
     }
     
     advance(event) {
          if (event === "down") {
               this.index += 1
               if (this.index >= this.menuList.length) {
                    this.index = 0
               }
          } else {
               this.index -= 1
               if (this.index < 0) {
                    this.index = this.menuList.length - 1
               }
          }
     }
}







class Button{
     constructor(text, x, y, width, height) {
          this.txt = text
          this.pos = new Vector(x, y)
          this.width = width
          this.height = height
     }
     draw(ctx, unable) {
          ctx.font = '60px Adventure';


          this.width = ctx.measureText(this.txt).width  * 1.05
          this.height = 60//ctx.measureText(this.txt).height
          //console.log(this.width, this.height)

          ctx.fillStyle = "brown"
          ctx.lineWidth = 3
          roundRect(ctx, this.pos.x, this.pos.y - 50, this.width, this.height, 15, true)


          if (unable === true) {
               ctx.fillStyle = "white"
          } else {
               ctx.globalAlpha = 0.5
               ctx.fillStyle = "gray"
          }
          ctx.fillText(this.txt, this.pos.x + 5, this.pos.y);
          ctx.globalAlpha = 1.0
          ctx.lineWidth = 1

          
     }
     checkForCollision(pt) {
          

          if (this.pos.x + this.width > pt.x && this.pos.x < pt.x && (this.pos.y - 50) + this.height > pt.y && (this.pos.y - 50) < pt.y) {

               return true 
          }
          return false
     }
     
}

*/
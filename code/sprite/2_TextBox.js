///create an array of textboxes being controlled by a parent outside or part of the state
class TextBox {
     constructor(name, body, text) {
          this.name = name
          this.body = body;
          this.index = 0
          this.textIndex = 0

          this.text = text
          this.fnt = 20

          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "advanceText", timeToTrigger: 0.5 })
          
          this.isActive = false

     }

     setPosition(x, y) { this.body.setPosition(x, y) }
     setPositionV(V) { this.body.setPositionV(V) }
     setSize(width, height) { this.body.setSize(width, height) }
     getPosition() { return this.body.pos }
     getSize() { return this.body.size }

     resetReset() {
          this.body.resetReset()
     }

     update() { 
          var events = this.eventKeeper.update()
          for (var event in events) { this.dealWithEvent( events[event]) }
     }
     draw(ctx) {
          this.body.draw(ctx)
          this.drawText(ctx)
     }

     drawText(ctx) {
          ctx.font = this.fnt + 'px Adventure';

          var startX = this.body.pos.x + 10
          var startY = this.body.pos.y + 10
          var x = startX
          var y = startY

          var yIncrement = 0
          var lineHeight = this.fnt * 1.286;

          ctx.fillColor = "white"
          ctx.fillStyle = "white"

          var words = this.text[this.index].split(' ');
          for (var i = 0; i < this.textIndex; i++) {
               if (x + ctx.measureText(words[i] + "  ").width > 1200) {
                    x = startX
                    yIncrement += 1
               }
               ctx.fillText(words[i], x, y + (yIncrement * lineHeight))
               x += ctx.measureText(words[i] + "  ").width
          }
     }
     dealWithEvent(event) {
          if (event.name === "advanceText") {
               this.advanceText()
          } else if (event.name === "advanceToNextIndex") {
               if (this.index < this.text.length - 1) {
                    this.index += 1
                    this.textIndex = 0
                    this.eventKeeper.addEvent({ name: "advanceText", timeToTrigger: 0.15})
               }
          }
     }
     advanceText() {
          var wordLength = this.text[this.index].split(' ').length 
          if (this.textIndex < wordLength) {
               this.textIndex += 1
               this.eventKeeper.addEvent({ name: "advanceText", timeToTrigger: 0.15})
          } else {
               this.eventKeeper.addEvent({ name: "advanceToNextIndex", timeToTrigger: 2.0})
          }
     }
}

class TextBoxBuilder{
     setBody(body) {
          this.body = body 
          return this
     }
     setName(name) {
          this.name = name 
          return this
     }
     setIndex(index) {
          this.index = index
          return this
     }
     setText(text) {
          this.text = text;
          return this
     }
     build() {
          if (!('body' in this)) { throw new Error("body missing") }
          return new TextBox(this.name, this.body, this.text)
     }
}
//var tBox1 = new TextBoxBuilder().setBody(new RectBuilder().setXY(10, 10).setSize(50, 50).build()).setName("mario Jumpman mario")
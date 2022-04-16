//stores an array of TextBoxes that makes up 
class TextBoxManager {
     constructor() {
          var width = 1280
          var defaultFont = 30
          this.texts = {
               "introText":  new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(["i am the very modle of a modern major general, i've information animeal vegetable and mineral.  i know the kings of england and i quote the fights historical from marathon to waterloo in orders categorical .", "sentence 2 of 2 3 4 5 6 7 8 9"]).build(),
               "battleText": new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(["you have entered battle", "may the gods have mercy on your soul"]).build(),
               "shopText":   new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(["Welcome to the shop!", "Here you can buy powerful abilities that will aid you on your journey"]).build(),
               "deathText":  new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(["You have died.", "Thankfully that is curable.", "Drag your tombstone to the inn to rest."]).build()

          }
          this.activelyTyping = false
          this.key = ""
     }
     start(keyValue) {
          this.key = keyValue || "introText"
          if (this.texts[this.key].wasTriggeredBefore === false) {
               this.activelyTyping = true
               this.texts[this.key].wasTriggeredBefore = true 
               this.texts[this.key].isActive = true
          }
     }
     dealWithInteraction() {
          this.texts[this.key].dealWithInteraction()
     }
     update() {
          if (this.activelyTyping === true) {
               if (this.texts[this.key].isActive === true) {
                    this.texts[this.key].update()
               } else {
                    this.activelyTyping = false
               }
          }
     }
     draw(ctx) {
          if (this.activelyTyping === true) {
               if (this.texts[this.key].isActive === true) {
                    this.texts[this.key].draw(ctx)
               }
          }
     }
}
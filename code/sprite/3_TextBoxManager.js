//stores an array of TextBoxes that makes up 
class TextBoxManager {
     constructor() {
          var width = 1280
          var defaultFont = 35
          var txt1 = ["Welcome to the land of Slidle, a land of magic and monsters.", "Use the arrow keys to move the reticle to the group of enemies and press Enter to travel there and begin combat."]
          var txt2 = ["You have entered battle.", "Use the arrow keys to navigate through the menu and defeat the enemy...or run away."]
          var txt3 = ["You have died.", "Thankfully that is treatable.", "Drag your tombstone to the inn to rest and once you're fully healed, return to battle."]
          var txt4 = ["Welcome to the shop!", "Here you can buy powerful abilities that will aid you on your journey."]

          var txt5 = ["You have earned some gold from defeated enemies.", "Head to the store to spend it."]
          var txt6 = ["You have purchased an upgrade.  Press M to open the menu and activate it."]

          var txt7 = ["You have contracted a mercenary.  Open the menu (M) to put them to work."]
          var txt8 = ["The mercenaries are doing well.  You should buy more.", "Buy more.", "Buy more.", "Buy more!"]
          var txt9 = ["What a beautiful army of soulless killing machines.", "You can go now.  You are no longer needed..."]
          
          this.texts = {
               "introText":  new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt1).build(),
               "battleText": new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt2).build(),
               "deathText":  new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt3).build(),
               "shopText":   new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt4).build(),

               "goToShopText":   new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt5).build(),
               "upgradeBoughtText":   new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt6).build(),

               "mercenaryBoughtText":  new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt7).build(),   
               "mercenaryDoingWellText": new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt8).build(),

               "finalText": new TextBoxBuilder().setFont(defaultFont).setBody(new BodyBuilder().setXY(25, 500).setSize(width - 50, 200).build()).setText(txt9).build(),

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
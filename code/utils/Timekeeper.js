class GameClock{
     constructor(startTime) {
          this.time = new Time(startTime, 0)
          this.events = []
          this.trigger = null;
     }
     //addEvent(identifier, timeLeft, target, trigger, count) {

     clearEvent(name) {
           var i = this.events.length;
          while(i--){
               if (this.events[i].name === name) {
                    this.events.splice(i,1)
               }
          }
     }
     addEvent(event) {
          event.timeMemory = event.timeToTrigger
          event.timeToTrigger += this.time.currentTimeRaw
          
          this.events.push(event)
     }
     update() {
          this.time.update()
          var triggeredEvents = []

          var i = this.events.length;
          while(i--){
               if (this.events[i].timeToTrigger < this.time.currentTimeRaw) {
                    //triggeredEvents.push([this.events[i].name, this.events[i].trigger, ])
                    triggeredEvents.push(this.events[i])
                    if (this.events[i].repeat) { this.repeatEvent(this.events[i]) }
                    this.events.splice(i,1)
               }
          }
          return triggeredEvents
     }
     repeatEvent(event) {
          var copiedEvent = JSON.parse(JSON.stringify(event));
          copiedEvent.timeToTrigger = copiedEvent.timeMemory
          this.addEvent(copiedEvent)
     }
     draw(ctx) {
          this.time.draw(ctx)
     }
}


class Time{
          //     var timeKeeper = new Time(Math.floor(Date.now() / 1000),  555 )
     constructor(startTime, endTime) {
          //startTime = Math.floor(Date.now() / 1000)
          //endTime = startTime + 100
               this.startTime = startTime
               this.currentTime = startTime
               this.currentTimeRaw = startTime
               this.endTime = endTime
               this.secondsPassed = 0
               this.minutesPassed = 0
               this.hoursPassed = 0
               this.triggerEvent = false 
          
     }
     
     update() {
               this.currentTimeRaw = Date.now()/1000
               this.currentTime = Math.floor(Date.now() / 1000)
              
               this.hoursPassed = 0
               this.minutesPassed = 0
               this.secondsPassed = (this.currentTime - this.startTime) * 1.0
               if (this.endTime !== 0) {
                    this.secondsPassed = this.endTime - this.secondsPassed
                    if(this.secondsPassed <=0){
                         this.secondsPassed = 0
                         this.triggerEvent = true 
                    }
               }
               while(this.secondsPassed >= 60){
                    this.minutesPassed+=1
                    this.secondsPassed = this.secondsPassed - 60
               }
               
               while(this.minutesPassed >= 60){
                    this.hoursPassed+=1
                    this.minutesPassed = this.minutesPassed - 60
               }
          
          }
          draw(ctx){
                 ctx.font = '100px Adventure';
                 ctx.fillColor = "white"

                 var secString = this.secondsPassed
                 if(secString < 10){secString = "0" + secString}
                 var minString = this.minutesPassed
               if(minString < 10){minString = "0" + minString}
               var hourString = this.hoursPassed
               if(hourString < 10){hourString = "0" + hourString}

               var stringTime = "H" + hourString + ":M" + minString + ":S" + secString
               //console.log(stringTime)
                 ctx.fillText(stringTime, 0, 100);
          }
     returnString() {
          var secString = this.secondsPassed
          if(secString < 10){secString = "0" + secString}
          var minString = this.minutesPassed
          if(minString < 10){minString = "0" + minString}
          var hourString = this.hoursPassed
          if(hourString < 10){hourString = "0" + hourString}

          var stringTime = "H" + hourString + ":M" + minString + ":S" + secString
          return stringTime
     }
     }
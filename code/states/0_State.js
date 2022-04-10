class State {
     constructor(name) { this.name = name; }
     update() {
     }
     draw() {
     }
     onEnter() {
     }
     onExit() {
     }
     dealWithInteraction() {
     }
     miniDraw() {
          
     }

     menuChange() {
          
     }
}

class stateManager{
     constructor(stateArrays) {
          this.states = new Map()
          for (var i = 0; i <  stateArrays.length; i++) {
               this.states.set(stateArrays[i].name, stateArrays[i])
          }
          this.currentState = this.states.get("holder")
     }
     transition(scope, newState) {
          console.log("Transitioning ", scope, newState)
          if (this.currentState.name !== newState) {
               this.currentState.onExit(scope)
               this.currentState = this.states.get(newState)
               this.currentState.onEnter(scope)
          }
     }
}



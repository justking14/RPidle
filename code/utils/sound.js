class Sound {
     constructor(src) {
          this.sound = document.createElement("audio");
          this.sound.src = src;
          this.sound.setAttribute("preload", "auto");
          this.sound.setAttribute("controls", "none");
          this.sound.style.display = "none";
          document.body.appendChild(this.sound);
     }
     play() {
          //pitch shift needs to be added
          this.sound.play()
     }
     stop() {
          this.sound.pause()
     }    
}

//this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'

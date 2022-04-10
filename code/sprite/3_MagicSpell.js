class MagicSpell extends Agent{
     //constructor(name, x, y, width, height, classification) {

     constructor() {
          super("spell", 50, 50, 100, 100, "spell")

          this.gradient = new Gradient("Fire")
          this.gradients = [
               new Gradient("Fire"), new Gradient("Water"), new Gradient("Thunder")
          ]
          this.colors = ["red", "blue", "yellow"]
          this.hidden = true  
          this.counter = 0
          this.midLerp = false
     }
     draw(ctx) {
          if (this.hidden === false) {
               this.counter += 0.25
               ctx.beginPath();
               ctx.arc(this.getPosition().x + 25, this.getPosition().y + 25, 25 + Math.sin(this.counter) * 15, 0, 2 * Math.PI, false);
               ctx.fillStyle = this.gradients[this.index].draw(ctx, this.sprite.body)
               ctx.fill();
               ctx.lineWidth = Math.sin(this.counter) * 15;
               ctx.strokeStyle = this.colors[this.index];
               ctx.stroke();
          }
     }

     advance() {
          this.index += 1
          //if(this.index > this.gradient.length-1){this.index = 0}
          if (this.index > this.gradients.length - 1) { this.index = 0; }
     }
}
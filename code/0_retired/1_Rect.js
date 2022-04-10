class Rect{
     constructor(x, y, width, height) {
          this.pos = new Vector(x, y)
          this.resetPosition = this.pos.clone()
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.color = null
     }
     setPosition(x, y) {
          if (x !== null) {
               this.x = x;
          }
          if (y !== null) {
               this.y = y
          }
          this.pos = new Vector(this.x, this.y)
     }
     //put this in the middle of another rect
     setToCenter(other) {
          this.pos.x = other.pos.x + (other.width - this.width) / 2
          this.pos.y = other.pos.y + (other.height - this.height) / 2
     }
     draw(ctx, fill) {
          if (this.color === null) {
               this.color = createGradient(ctx, this, [[0, colorOrange.stringify()], [0.33, colorBrown.stringify()], [0.66, colorBrown.stringify()], [1.0, colorOrange.stringify()]]) 
          }
                   
          ctx.fillStyle = this.color
          rounded_rect(ctx, this.pos.x, this.pos.y, this.width, this.height, 7, fill)
          
     }

}

class RectBuilder{
     setXY(x, y) {
          this.x = x;
          this.y = y;
          this.pos = new Vector(x, y)
          return this 
     }
     setSize(width, height) {
          this.width = width
          this.height = height
          this.size = new Vector(width, height)
          return this
     }
     build() {
          if (!('x' in this)) { throw new Error("x missing") }
          if (!('y' in this)) { throw new Error("y missing") }
          return new Rect(this.x, this.y, this.width, this.height)
     }
}
//new RectBuilder().setXY(10, 10).setSize(50, 50).build()


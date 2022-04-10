class Body{
     constructor(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.pos = new Vector(x, y);
          this.resetPosition = this.pos.clone()
          
          this.width = width;
          this.height = height;
          this.size = new Vector(width, height)

          this.color = null;
     }
     setPosition(x, y) {
          if (x !== null) { this.x = x; }
          if (y !== null) { this.y = y; }
          this.pos = new Vector(this.x, this.y);
     }
     setPositionV(V) {
          let tmpVec = V.clone()
          this.x = V.x;
          this.y = V.y;
          this.pos = new Vector(this.x, this.y)
     }
     setSize(width, height) {
          if (width !== null) { this.width = width; }
          if (height !== null) { this.height = height; }
          this.size = new Vector(this.width, this.height);
     }
     isEqualToVector(other) {
          if (this.pos.x === other.x && this.pos.y === other.y) { return true }
          return false
     }
     resetReset() {
          this.resetPosition = this.pos.clone()
     }
     draw(ctx, fill) {
          if (this.color === null) {
               this.color = createGradient(ctx, this, [[0, colorOrange.stringify()], [0.33, colorBrown.stringify()], [0.66, colorBrown.stringify()], [1.0, colorOrange.stringify()]]) 
          }              
          ctx.fillStyle = this.color
          rounded_rect(ctx, this.pos.x, this.pos.y, this.width, this.height, 7, fill)
     }
}

class BodyBuilder{
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
          return new Body(this.x, this.y, this.width, this.height)
     }
}

//new BodyBuilder().setXY(10, 10).setSize(50, 50).build()

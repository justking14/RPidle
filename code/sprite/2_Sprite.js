class Sprite{
     constructor(name, body, index) {
          this.name = name
          this.body = body;
          this.index = index 

          this.img = new Image()
          this.setImage()
     }
     setImage() {
          this.img.src = "images/" + this.name + ".png"
     }
     setPosition(x, y) { this.body.setPosition(x, y) }
     setPositionV(V){this.body.setPositionV(V)}
     setSize(width, height) { this.body.setSize(width, height) }
     getPosition() {     return this.body.pos }
     getSize() {    return this.body.size }

     resetReset() {
          this.body.resetReset()
     }

     update() { }
     draw(ctx) {
          ctx.drawImage(this.img, this.body.pos.x, this.body.pos.y)
     }
}
class SpriteBuilder{
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
     build() {
          if (!('body' in this)) { throw new Error("body missing") }
          if (!('name' in this)) { throw new Error("name missing") }
          return new Sprite(this.name, this.body, this.index || 0)
     }
}
//var mario = new SpriteBuilder().setBody(new RectBuilder().setXY(10, 10).setSize(50, 50).build()).setName("mario Jumpman mario")



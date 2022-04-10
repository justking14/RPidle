class Gradient {
     constructor(template) {
          if (template === "Fire") {
               this.colors = new Array(
                    new Color(231, 76, 60),
                    new Color(230, 126, 34),
                    new Color(241, 196, 15),
                    new Color(230, 126, 34));
          } else if (template === "Water") {
               this.colors = new Array(
                    new Color(22, 160, 133),
                    new Color(39, 174, 96),
                    new Color(41, 128, 185),
                    new Color(22, 160, 133),
                    new Color(39, 174, 96),
                    new Color(41, 128, 185));
     } else if (template === "Thunder") {
               this.colors = new Array(
                    new Color(34, 29, 84),
                    new Color(250, 251, 165),
                    new Color(240, 251, 62),
                    new Color(0, 56, 255),
                    new Color(30, 62, 118));
          } else {
               this.colors = new Array(
                    new Color(62, 35, 255),
                    new Color(60, 255, 60),
                    new Color(255, 35, 98),
                    new Color(45, 175, 230),
                    new Color(255, 0, 255),
                    new Color(255, 128, 0));
          }
          
          this.step = 0
          this.colorIndices = [0, 1,2,3]
          this.gradientSpeed = 0.005

          this.u = 0.0
          this.step_u = 0.05
     }
     
     draw(ctx, body) {
          var body = body || new Body(0,0,window.game.constants.width,window.game.constants.height)

          if (this.u >= 1.0) {
               this.u = 0
               this.colorIndices[0] += 1
               if(this.colorIndices[0] >= this.colors.length){this.colorIndices[0]=0}
               this.colorIndices[1] += 1
               if(this.colorIndices[1] >= this.colors.length){this.colorIndices[1]=0}
               this.colorIndices[2] += 1
               if(this.colorIndices[2] >= this.colors.length){this.colorIndices[2]=0}
               this.colorIndices[3] += 1
               if(this.colorIndices[3] >= this.colors.length){this.colorIndices[3]=0}
          }
          var r = Math.round((1 - this.u) * this.colors[this.colorIndices[0]].r + this.u * this.colors[this.colorIndices[1]].r);
          var g = Math.round((1 - this.u) * this.colors[this.colorIndices[0]].g + this.u * this.colors[this.colorIndices[1]].g);
          var b = Math.round((1 - this.u) * this.colors[this.colorIndices[0]].b + this.u * this.colors[this.colorIndices[1]].b);
     
          this.colorName1 = 'rgb(' + r + ',' + g + ',' + b + ')';
          var r = Math.round((1 - this.u) * this.colors[this.colorIndices[2]].r + this.u * this.colors[this.colorIndices[3]].r);
          var g = Math.round((1 - this.u) * this.colors[this.colorIndices[2]].g + this.u * this.colors[this.colorIndices[3]].g);
          var b = Math.round((1 - this.u) * this.colors[this.colorIndices[2]].b + this.u * this.colors[this.colorIndices[3]].b);
          this.colorName2 = 'rgb(' + r + ',' + g + ',' + b + ')';

          this.u += this.step_u
          
          var gradient = ctx.createLinearGradient(body.pos.x, body.pos.y, body.width, body.height)
          gradient.addColorStop(0, this.colorName1);
          gradient.addColorStop(1, this.colorName2)

          return gradient
     }
}

class Color {
     constructor(r, g, b) {
          this.r = r
          this.g = g 
          this.b = b
     }
     stringify() {
          return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
     }
}
var colorOrange = new Color(192, 57, 43)//pom
var colorBrown  = new Color(231, 76, 60)
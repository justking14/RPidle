class spriteParticle {
     constructor(x, y, size, angle) {
          this.size = size
          this.x = x;
          this.y = y;
          
          this.dx = Math.sin(angle)
          this.dy = Math.cos(angle)
          this.index = 0
          this.indexChange = 0.02
          this.alpha = 1.0
     }
     update() {
          this.dx*=1.015
          this.dy*=1.015
          this.y -= this.dx  
          this.x += this.dy 
          if (this.size >= 0.05) { this.size -= 0.4 }
     }
     draw(ctx) {
          this.index += this.indexChange
          this.indexChange+=0.0025
     
          var color = 'ffffff'
          if(this.index < 1){
               color = this.lerpColor('#ffffff', '#FFA500', Math.min(this.index, 1.0))
          }else if(this.index >= 1 && this.index < 2){
               color = this.lerpColor('#FFA500', '#ff0000', Math.min(this.index - 1.0, 1.0))
          }else{
               this.alpha = Math.max(0, this.alpha - 0.05)
               color = this.lerpColor("#ff0000", "#555555", Math.min(this.index - 2.0, 1.0))
          }
          ctx.fillStyle = color
          ctx.fillRect(this.x, this.y, this.size, this.size)
     }
     lerpColor(a, b, amount) {

          var ah = parseInt(a.replace(/#/g, ''), 16),
               ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
               bh = parseInt(b.replace(/#/g, ''), 16),
               br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
               rr = ar + amount * (br - ar),
               rg = ag + amount * (bg - ag),
               rb = ab + amount * (bb - ab);

          return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
     }
}

class spriteParticleManager {
     constructor(x, y) {
          this.x = x;
          this.y = y;
          this.particles = []
          this.hidden = true

          var cI = 0
          for (let i = 0; i < 180; i++) {
               this.particles.push(new spriteParticle(x, y, Math.random() * 150, cI))
               cI = 2.1 + (i * Math.PI / 90)
          }

     }
     update() {
          if (this.hidden === false) {
               for (let i = 0; i < this.particles.length; i++) {
                    this.particles[i].update()
                    if (this.particles[i].size <= 25) {
                         this.particles.splice(i, 1)
                         i--
                    }
               }
          }
     }
     draw(ctx) {
          if (this.hidden === false) {
               for (let i = 0; i < this.particles.length; i++) {
                    ctx.globalAlpha = this.particles[i].alpha
                    this.particles[i].draw(ctx)
               }
               ctx.globalAlpha = 1.0
          }
     }
}

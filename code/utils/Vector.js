class Vector {
     constructor(x, y) {
          this.x = x;
          this.y = y;
     }
     clone() {
          return new Vector(this.x, this.y)
     }
     lerp(targetPosition, ratio) {
          var ratio = ratio || 0.2
          // update position by 20% of the distance between position and target position
          var tmp = this.clone()
          tmp.x += (targetPosition.x - this.x) * ratio;
          tmp.y += (targetPosition.y - this.y) * ratio;
          return tmp
     }
     distance(other) {
          return Math.sqrt(Math.pow(other.x - this.x, 2) +  Math.pow(other.y - this.y, 2) * 1.0);
     }
     equals(other) {
          if (this.x === other.x && this.y === other.y) {
               return true 
          }
          return false
     }
}

class Status {
     constructor(name, level, ch, mh, atk,def, imgName) {

          this.name = name
          this.imgName = imgName
          this.level = level
          
          this.currentHealth = ch
          this.maxHealth = mh
          
          this.currentExp = 0;
          this.maxExp = 0
          this.getNextExpThreshold()

          this.attack = atk;
          this.defense = def;

          this.dead = false
     }
     levelUp() {
          this.attack+=1//this.attack*0.1
          this.maxHealth += 5//this.maxHealth * 0.1
          this.attack = Math.floor(this.attack)
          this.maxHealth = Math.floor(this.maxHealth)
          this.currentHealth = Math.min(this.currentHealth*1.25, this.maxHealth)
     }
     getNextExpThreshold() {
          this.maxExp = this.level ** 2;
     }
     returnStatus() {
          return  [this.name+ " LVL:"+ " " + this.level+ " XP: " + this.currentExp + "/" + this.maxExp+ " HP: " + this.currentHealth + "/" + this.maxHealth]
     }
     returnMiniStatus() {
                    return  [this.name+ " LV: " + this.level + "  Health: " + this.currentHealth + "/" + this.maxHealth]

     }
}

class StatusBuilder{
     constructor(name, classification) {
          this.name = name 
          if (classification === "enemy") {
               this.imgName = enemy_data[name].image
               this.currentHealth = enemy_data[name].health
               this.maxHealth = this.currentHealth
               this.attack = enemy_data[name].attack
               this.defense = enemy_data[name].defense
          } else if (classification === "player") {
               this.imgName = player_data[name].image
               this.currentHealth = player_data[name].health
               this.maxHealth = this.currentHealth
               this.attack = player_data[name].attack
               this.defense = player_data[name].defense
          }
     }
     setLevel(lv) {
          this.level = lv;
          return this;
     }
     setHealth(health) {
          this.currentHealth = health;
          this.maxHealth = health;
          return this;
     }
     setAttack(atk) {
          this.attack = atk;
          return this.attack;
     }
     build() {
          return new Status(this.name, this.level || 1, this.currentHealth || 50, this.maxHealth || 50, this.attack || 5, this.defense || 1, this.imgName )
     }
}
class AGraph {
     constructor(gameMap) {
          this.nodes = []
          this.open = [], this.closed = [];
          this.inn, this.store;
          this.selectedX = 3, this.selectedY = 3;

          this.battlefields = [];
          for (var i = 0; i < gameMap.length; i++) {
               var row = []
               for (var j = 0; j < gameMap[i].length; j++) {
                    var name;
                    if (gameMap[i][j] === "x") {
                         name = "grass"
                    } else {
                         name = "path"
                    }
                    var square = new Tile(i, j, (j * 60), (i * 60), 60, 60, name)
                    if (gameMap[i][j] === "I") {
                         this.inn = new Tile(i, j, (j * 60), (i * 60), 60, 60, "inn")
                    } else if (gameMap[i][j] === "G") {
                         this.battlefields[0] = square
                    } else if (gameMap[i][j] === "S") {
                         this.store = new Tile(i, j, (j * 60), (i * 60), 60, 60, "store")
                    }
                    row.push(square)
               }
               this.nodes.push(row)
          }
          this.assignNeighbors()

          for (var i = 0; i < 30; i++) {
               this.battlefields[i] = this.getRandomTarget()
          }

     }
     getRandomTarget() {
          var foundOne = false 
          var pickedNode;
          while (foundOne === false) {
               var rx = getRandomInt(0, this.nodes.length - 1)
               var ry = getRandomInt(0, this.nodes[0].length - 1)

               pickedNode = this.nodes[rx][ry]
               //console.log(pickedNode)
               if (pickedNode.isWall === false) {
                    foundOne = true 
                    for (var i = 0; i < this.battlefields.length; i++){
                         if(this.nodes[rx][ry].isEqual(this.battlefields[i]) === true){foundOne = false }
                    }
                    if (this.nodes[rx][ry].isEqual(this.inn) === true || this.nodes[rx][ry].isEqual(this.store) === true) {
                         foundOne = false 
                    }
               }
          }
          return pickedNode.clone()
     }
     
     getTarget() {
          return this.target.clone()//new Tile(this.selectedX, this.selectedY, (this.selectedY * 60), (this.selectedX * 60), 60, 60, "path")
     }
     assignNeighbors() {
          for (var i = 0; i < this.nodes.length; i++){
               for (var j = 0; j < this.nodes[0].length; j++){
                    this.nodes[i][j].assignNeighbors(this.nodes, i, j)
               }
          }
      }
     pathFind(start, goal, type) {
          //console.log(start, goal, type)
          //start = this.start
          
          var start_node = new Node(null, new Vector(start.xCoord, start.yCoord))
          var end_node = new Node(null, new Vector(goal.xCoord, goal.yCoord))

          this.open = [], this.closed = []
          this.open.push(start_node)

          var counter = 1000
          while (this.open.length > 0) {
               var currentNode = this.open[0]
               var currentIndex = 0;
               for (var i = 0; i < this.open.length; i++){
                    if (this.open[i].f < currentNode.f) {
                         currentNode = this.open[i];
                         currentIndex = i;
                    }
               }
               this.open.splice(currentIndex, 1)//.pop(currentIndex)
               this.closed.push(currentNode)
               

               if (currentNode.pos.x === end_node.pos.x && currentNode.pos.y === end_node.pos.y) {

                    var path = []
                    var current = currentNode;
                    while (current !== null) {
                         //console.log("Dog ", current.parent.xCoord, current.parent.yCoord)

                         path.push(current)
                         current = current.parent;
                    }
                    if (type === "player") {
                         //this.start = goal;
                    } else {
                         //this.start2 = goal
                    }
                    ///console.log(path)
                    return path.reverse()
               }
               var children = []
               var currentNodeRef;
               for (var i = 0; i < this.nodes.length; i++) {
                    for (var j = 0; j < this.nodes[0].length; j++) {
                         if (currentNode.pos.x === this.nodes[i][j].xCoord && currentNode.pos.y === this.nodes[i][j].yCoord) {
                              currentNodeRef = this.nodes[i][j]
                         }
                    }
               }
               for (var j = 0; j < currentNodeRef.neighbors.length; j++){
                    var newNode = new Node(currentNode, new Vector(currentNodeRef.neighbors[j].xCoord, currentNodeRef.neighbors[j].yCoord))
                    children.push(newNode)
               }
               for (var i = 0; i < children.length; i++){
                    var done = false 
                    for (var j = 0; j < this.closed.length; j++){
                         if (children[i].pos.equals(this.closed[j].pos)) {
                              done = true;
                         }
                    }
                    if(done === true){continue}

                    children[i].g = currentNode.g + 1
                    children[i].h = ((children[i].pos.x - end_node.pos.x) ** 2) + ((children[i].pos.y - end_node.pos.y) ** 2)
                    children[i].f = children[i].g + children[i].h

                    for (var j = 0; j < this.open.length; j++){
                         if (children[i].pos.equals(this.open[j].pos) && children[i].g > this.open[j].g) {
                              done = true 
                         }
                    } 
                    if(done === true){continue}

                    this.open.push(children[i])

               }
               counter--
               if(counter < 0){break}
          }
          this.start = goal 
     }
     draw(ctx, dayValue, mercenaries) {
         //console.log(mercenaries)
          for (var i = 0; i < this.nodes.length; i += 1) {
               for (var j = 0; j < this.nodes[0].length; j += 1) {

                    ctx.fillStyle = "white"
                    ctx.fillRect(j * 60, i * 60, 60, 60)

                    this.nodes[i][j].draw(ctx, dayValue)
                    this.nodes[i][j].selected = false 

                    if (j === this.selectedX && i === this.selectedY) {
                         ctx.beginPath();
                         ctx.rect(j * 60, i * 60, 60, 60)
                         ctx.stroke();
                    }

                    for (var k = 0; k < mercenaries.length; k++){
                         if (j === mercenaries[k].selectedVector.x && i === mercenaries[k].selectedVector.y && window.game.state.menuDict["automation"]["mercenaries"]["count"] > k) {
                              ctx.beginPath();
                              ctx.rect(j * 60, i * 60, 60, 60)
                              ctx.stroke();
                         }
                    }
               }
          }
          ctx.globalAlpha = 1.0

          for (var i = 0; i < this.nodes.length; i += 1) {
               for (var j = 0; j < this.nodes[0].length; j += 1) {
                    if (j * 60 === this.inn.xCoord && i * 60 === this.inn.yCoord) {
                         this.inn.draw(ctx)
                    }
                    if (j * 60 === this.store.xCoord && i * 60 === this.store.yCoord) {
                         this.store.draw(ctx)
                    }

                    if (j === this.selectedX && i === this.selectedY) {
                         this.nodes[i][j].selected = true
                         this.target = this.nodes[i][j]

                         ctx.beginPath();
                         ctx.rect(j * 60, i * 60, 60, 60)
                         ctx.stroke();
                    }

                    for (var k = 0; k < mercenaries.length; k++){
                         //console.log(k, window.game.state.menuDict["automation"]["mercenaries"])
                         if (j === mercenaries[k].selectedVector.x && i === mercenaries[k].selectedVector.y && window.game.state.menuDict["automation"]["mercenaries"]["count"] > k) {
                              this.nodes[i][j].selected = true
                              mercenaries[k].target = this.nodes[i][j]

                              ctx.beginPath();
                              ctx.rect(j * 60, i * 60, 60, 60)
                              ctx.stroke();
                         }
                    }
               }
          }         
     }
     reset() {
          //this.nodes = [], this.open = [], this.closed = []
          for (var i = 0; i < this.nodes.length; i += 1) {
               for (var j = 0; j < this.nodes[0].length; j += 1) {
                    this.nodes[i][j].reset()
               }
          }
     }
     update(){}
}

class Node{
     constructor(parent = null, pos = null) {
          this.parent = parent;
          this.pos = pos;

          this.f = 0;
          this.g = 0;
          this.h = 0;
     }
}



class Tile {
     constructor(i,j,x, y, width, height, name) {
          this.sprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName(name).build()
          if (name === "path" || name === "grass") {
               this.spriteNoon = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName(name + "Noon").build()
               this.spriteNight = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName(name + "Night").build()
          }

          this.pos = new Vector(x,y)
          this.xCoord = x;
          this.yCoord = y;

          this.i = i
          this.j = j

          this.checked = false;
          this.distanceFromSource = 99999;
          this.parent = null;
          this.partOfPath = false;
          this.isWall = false
          if(name === "grass"){this.isWall = true}
          this.neighbors = []
          this.blackedOut = false 
          this.name = name;

          this.dead = false
          this.index = 0;
          this.selected = false 
     }
     isEqual(other) {
          if (this.xCoord === other.xCoord && this.yCoord === other.yCoord) {
               return true 
          }
          return false
     }
     clone() {
          return new Tile(0,0, this.xCoord, this.yCoord, this.sprite.width, this.sprite.height, this.sprite.name)
     }
     returnPosition() {
          return new Vector(this.xCoord, this.yCoord)
     }
     reset() {
          this.checked = false;
          this.distanceFromSource = 99999
          this.parent = null;
          this.partOfPath = false
          this.dead = false
          this.index = 0
          this.blackedOut = false
          
     }
     assignNeighbors(paths, x, y) {
          if (x > 0) {
               this.left = paths[x - 1][y]
               if (this.left !== undefined && this.left.isWall === false) {
                    this.neighbors.push(this.left )
               }
          } else {
               this.left = null
          }
         if (x < paths.length - 1) {
              this.right = paths[x + 1][y]
              if (this.right !== undefined && this.right.isWall === false) {
                    this.neighbors.push(this.right )
               }
          } else {
               this.right = null
         }
          
          if (y > 0) {
               this.up = paths[x][y - 1]
               if (this.up !== undefined && this.up.isWall === false) {
                    this.neighbors.push(this.up )
               }
          } else {
               this.up = null
          }
         if (y < paths[0].length - 1) {
              this.down = paths[x][y + 1]
              if (this.down !== undefined && this.down.isWall === false) {
                    this.neighbors.push(this.down )
               }
          } else {
               this.down = null
         }    
     }
     checkNeighbors() {
          var validNeighbor = false 
          this.neighbors.forEach(function (item, index) {
               if (item.distanceFromSource === 99999) {
                    validNeighbor = true 
               }
          })
          if (validNeighbor === false) {
               this.dead = true 
          }
     }
     checkActiveNeighbors() {
          var score = 0;
           this.neighbors.forEach(function (item, index) {
               if (item.distanceFromSource === 99999) {
                    score+=1 
               }
           })
          return score
     }

     draw(ctx, dayValue) {
          if (this.selected === false) {
               if (this.name === "path" || this.name === "grass") {


                    if (dayValue <= 1) {
                         ctx.globalAlpha = 1.0 - dayValue
                         this.sprite.draw(ctx)
                         ctx.globalAlpha = Math.min(dayValue + 0.25, 1.0)
                         this.spriteNoon.draw(ctx)
                    } else if (dayValue > 1 && dayValue <= 3) {
                         this.spriteNoon.draw(ctx)

                    } else if (dayValue > 3 && dayValue <= 4) {
                         dayValue = dayValue - 3.0
                         ctx.globalAlpha = 1.0 - dayValue
                         this.spriteNoon.draw(ctx)
                         ctx.globalAlpha = Math.min(dayValue + 0.25, 1.0)
                         this.spriteNight.draw(ctx)
                    } else if (dayValue > 4 && dayValue <= 6) {
                         this.spriteNight.draw(ctx)

                    } else if (dayValue > 6 && dayValue <= 7) {
                         dayValue = dayValue - 6.0
                         ctx.globalAlpha = 1.0 - dayValue
                         this.spriteNight.draw(ctx)
                         ctx.globalAlpha = Math.min(dayValue + 0.25, 1.0)
                         this.spriteNoon.draw(ctx)
                    } else if (dayValue > 7 && dayValue <= 9) {
                         this.spriteNoon.draw(ctx)
                    
                    } else if (dayValue > 9 && dayValue <= 10) {
                         dayValue = dayValue - 9.0
                         ctx.globalAlpha = 1.0 - dayValue
                         this.spriteNoon.draw(ctx)
                         ctx.globalAlpha = Math.min(dayValue + 0.25, 1.0)
                         this.sprite.draw(ctx)

                    } else {
                         ctx.globalAlpha = 1.0
                         this.sprite.draw(ctx)
                    }
                    ctx.globalAlpha = 1.0
                    /*
                    if (dayValue <= 1) {
                         ctx.globalAlpha = 1.0 - dayValue
                         this.sprite.draw(ctx)
                         ctx.globalAlpha = dayValue
                         this.spriteNoon.draw(ctx)

                    } else if (dayValue > 1 && dayValue <= 4) {
                         this.spriteNoon.draw(ctx)
                    } else if (dayValue > 4 && dayValue <= 5) {
                         ctx.globalAlpha = 5.0 - dayValue
                         this.spriteNoon.draw(ctx)
                         ctx.globalAlpha = 0.25 + (dayValue - 4.0)
                         this.spriteNight.draw(ctx)
                    } else if (dayValue > 5 && dayValue <= 7) {
                         this.spriteNight.draw(ctx)

                    } else if (dayValue > 7 && dayValue <= 8) {
                         ctx.globalAlpha = 8.0 - dayValue
                         this.spriteNight.draw(ctx)
                         ctx.globalAlpha = 0.25 + (dayValue - 7.0)
                         this.spriteNoon.draw(ctx)
                    } else if (dayValue > 8 && dayValue <= 10) {
                         this.spriteNoon.draw(ctx)
                    
                    } else if (dayValue > 10 && dayValue <= 11) {
                         ctx.globalAlpha = 11.0 - dayValue
                         this.spriteNoon.draw(ctx)
                         ctx.globalAlpha = 0.25 + (dayValue - 10.0)
                         this.sprite.draw(ctx)
                    

                    



                    } else {
                         this.spriteNight.draw(ctx)
                    }

                    */
               } else {
                    this.sprite.draw(ctx)
               }
          }
     }
     
}
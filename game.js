function Game(w, h, targetFps, skipTitle) {
     // Setup some constants
     this.constants = {
          width: w,
          height: h,
          targetFps: targetFps,
          showFps: false
     };

     // Instantiate an empty state object
     this.state = {};
     this.state.agents = {}

     this.state.worldStateManager = new stateManager([new combatState(), new mapState(), new storeState(), new State("holder")])


     var gameMap = map_data.map3
     this.state.map =  new AGraph(gameMap) 


     var unlockedDefault = false;
     this.state.menuDict = {
          "top": {
               "top": {
                    "unlocked": true
               }
          },
          "automation":{
               "fully":{
                    "active": false,
                    "unlocked": unlockedDefault,
               },
               "combat": {
                    "active": false,
                    "unlocked": unlockedDefault,
               },
               "travel": {
                    "active": false,
                    "unlocked": unlockedDefault,
               },
               "mercenaries":{
                    "active": false,
                    "unlocked": unlockedDefault,
                    "count": 0,
                    "maxCount": 0,
                    "cap": 20,
               }
               
          },
          "Visuals":{
               "colorFilter": 0
          }
     }

     this.state.textBoxManager = new TextBoxManager()

     this.state.agents.players = new playerManager(0, 0, 75, 75 )
     this.state.agents.players.start = this.state.map.inn.clone()
     this.state.agents.mercenaries = []
     this.state.agents.goblins = []
     
     this.state.menu = new menuState()

     this.state.gold = 0;
     this.state.timeLeft = new Time(Math.floor(Date.now() / 1000),5)

     this.state.context = this.context

     this.state.pastTitle = false
     this.state.titleImage = document.getElementById('title')

     this.state.sounds = {playerHurt: new Sound("audio/hit1.wav"), enemyHurt: new Sound("audio/hit2.wav")}

     this.viewport = generateCanvas(w, h);
     this.state.context = this.viewport.getContext('2d');

     // Append our viewport into a container in the dom
     $container.insertBefore(this.viewport, $container.firstChild);

     this.state.context.font = '32px Adventure';
     this.state.context.fillStyle = '#fff';
     
     this.state.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);

     this.state.context.textAlign = 'left';  // this is the default to align horizontally to the left
     this.state.context.textBaseline = 'top';  // text will be aligned vertically to the top
     
     
     this.state.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
     this.state.eventKeeper.addEvent({ name: "time", timeToTrigger: 0.5 })



     this.update = gameUpdate(this);
     this.render = gameRender(this);
     this.loop = gameLoop(this);
     

     return this;
}
     function sleep(milliseconds) {
          const date = Date.now();
          let currentDate = null;
          do {
               currentDate = Date.now();
          } while (currentDate - date < milliseconds);
     }
     
$container = document.getElementById('container');

          const tit = document.getElementById('title');
          tit.style.display='none'

window.addEventListener('load', function(){
     ///sleep(100)
     const loading = document.getElementById('loading');
     loading.style.display = 'none';
     window.game = new Game(1280, 720, 60, true);
     waterfall() 

})

function dealWithEvent(event){
     if(event.name === "time"){
          window.game.state.timeLeft.update()
          //console.log(window.game.state.timeLeft)
          window.game.state.eventKeeper.addEvent({ name: "time", timeToTrigger: 1.0 })

     }
}

function gameUpdate(scope) {
     return function update(tFrame) {
          var state = scope.state || {};

          //state.timeLeft.update()
          var events = state.eventKeeper.update()
          for (var event in events) { dealWithEvent(events[event]) }

          if (JSON.stringify(keysPressed) !== '{}' && state.pastTitle === false) {
               keysPressed = {}
               state.pastTitle = true 

               state.worldStateManager.transition(state, "map")  
               scope.state.context.globalAlpha = 1.0
               state.textBoxManager.start("introText")
          }
          //disable key presses when textbox is up
          if (state.textBoxManager.activelyTyping === false) {
               if (keysPressed.p === true || keysPressed.P === true) {
                    delete keysPressed.p
                    delete keysPressed.P

                    console.log(state.menuDict)
                    for (const property in state.menuDict["automation"]) {
                         console.log("PROPERTY ", property)
                         state.menuDict["automation"][property]["unlocked"] = true 
                    }
                                        
                    //state.menuDict["automation"]["mercenaries"]["count"] = 50 //state.menuDict["automation"]["mercenaries"]["cap"]

                    state.menuDict["automation"]["mercenaries"]["maxCount"] = 50 //state.menuDict["automation"]["mercenaries"]["cap"]
                    console.log("Auto cheat activated/deactivated")
               }
               if (keysPressed.m === true || keysPressed.M === true) {
                    if (state.worldStateManager.currentState.name === "map" || state.worldStateManager.currentState.name === "store") {
                         delete keysPressed.m
                         delete keysPressed.M
                         state.menu.onEnter(state)
                         state.menu.hidden = !state.menu.hidden
                    }
               }
               if (keysPressed.g === true || keysPressed.G === true) {
                    state.gold = 100
               }
               if (state.menu.hidden === false) {
                    state.menu.dealWithInteraction(state, keysPressed)
               }
               state.worldStateManager.currentState.dealWithInteraction(state, keysPressed)
          } else {
               if (keysPressed.Enter) {
                    keysPressed = {}
                    state.textBoxManager.dealWithInteraction()
               }
          }
          state.worldStateManager.currentState.update(state, scope.state.context)

          state.textBoxManager.update()
          return state;
     }
}

function gameRender(scope) {
     var w = scope.constants.width, h = scope.constants.height;
     return function render() {
          if (scope.state.pastTitle === true) {
               var ctx = scope.state.context
               ctx.clearRect(0, 0, w, h);
               ctx.fillRect(0,0,w,h)

               // Spit out some text
               ctx.font = '32px Adventure';
               ctx.fillStyle = '#fff';
               //scope.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);
               if (scope.constants.showFps) {
                    ctx.fillStyle = '#ff0';
                    ctx.fillText(scope.loop.fps, w - 100, 50);
               }
               scope.state.worldStateManager.draw(ctx, scope.state)
               
               if(scope.state.menu.hidden === false){
                    scope.state.menu.draw(scope.state.context, scope.state)
               }
               scope.state.textBoxManager.draw(scope.state.context)

               filterStuff(scope.state.menuDict["Visuals"]["colorFilter"], scope.state.context.getImageData(0, 0, scope.constants.width, scope.constants.height), scope)
               
          } else {
               
          }
     }
}

function gameLoop(scope) {
     var loop = this;

     // Initialize timer variables so we can calculate FPS
     var fps = scope.constants.targetFps,
          fpsInterval = 1000 / fps,
          before = window.performance.now(),
          // Set up an object to contain our alternating FPS calculations
          cycles = {
               new: {
                    frameCount: 0,
                    startTime: before,
                    sinceStart: 0
               },
               old: {
                    frameCount: 0,
                    startTime: before,
                    sineStart: 0
               }
          },
          // Alternating Frame Rate vars
          resetInterval = 5,
          resetState = 'new';

     loop.fps = 0;

     // Main game rendering loop
     loop.main = function mainLoop(tframe) {
          // Request a new Animation Frame
          // setting to `stopLoop` so animation can be stopped via
          // `window.cancelAnimationFrame( loop.stopLoop )`
          loop.stopLoop = window.requestAnimationFrame(loop.main);

          // How long ago since last loop?
          var now = tframe,
               elapsed = now - before,
               activeCycle, targetResetInterval;

          // If it's been at least our desired interval, render
          if (elapsed > fpsInterval) {
               // Set before = now for next frame, also adjust for 
               // specified fpsInterval not being a multiple of rAF's interval (16.7ms)
               // ( http://stackoverflow.com/a/19772220 )
               before = now - (elapsed % fpsInterval);

               // Increment the vals for both the active and the alternate FPS calculations
               for (var calc in cycles) {
                    ++cycles[calc].frameCount;
                    cycles[calc].sinceStart = now - cycles[calc].startTime;
               }

               // Choose the correct FPS calculation, then update the exposed fps value
               activeCycle = cycles[resetState];
               loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

               // If our frame counts are equal....
               targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
                    ? resetInterval * fps // Wait our interval
                    : (resetInterval * 2) * fps); // Wait double our interval

               // If the active calculation goes over our specified interval,
               // reset it to 0 and flag our alternate calculation to be active
               // for the next series of animations.
               if (activeCycle.frameCount > targetResetInterval) {
                    cycles[resetState].frameCount = 0;
                    cycles[resetState].startTime = now;
                    cycles[resetState].sinceStart = 0;

                    resetState = (resetState === 'new' ? 'old' : 'new');
               }

               // Update the game state
               scope.state = scope.update(now);
               // Render the next frame
               scope.render();
          }
     };

     // Start off main loop
     loop.main();

     return loop;
}
var keysPressed = {}
document.addEventListener('keydown', (event) => {
     if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
          event.preventDefault();
     }
     keysPressed[event.key] = true;

     if (keysPressed['Control'] && event.key == 'a') {
          alert(event.key);
     }
});

document.addEventListener('keyup', (event) => {
     delete keysPressed[event.key];
});

function filterStuff(filter, imgData, scope){
     if (filter === 4) {
          for (i = 0; i < imgData.data.length; i += 4) {
               let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
               let colour = 0;
               if (count > 510) colour = 255;
               else if (count > 255) colour = 127.5;

               imgData.data[i] = 255 - imgData.data[i];
               imgData.data[i + 1] = 255 - imgData.data[i + 1];
               imgData.data[i + 2] = 255 - imgData.data[i + 2];
               imgData.data[i + 3] = 255;
          }

     }
     if(filter === 1){
          for (i = 0; i < imgData.data.length; i += 4) {
               let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
               let colour = 0;
               if (count > 510) colour = 255;
               else if (count > 255) colour = 127.5;

               imgData.data[i] = colour;
               imgData.data[i + 1] = colour;
               imgData.data[i + 2] = colour;
               imgData.data[i + 3] = 255;
          }
     }else if(filter === 2){
          for (i = 0; i < imgData.data.length; i += 4) {
               let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
               let colour = 0;
               if (count > 380) colour = 255;

               imgData.data[i] = colour;
               imgData.data[i + 1] = colour;
               imgData.data[i + 2] = colour;
               imgData.data[i + 3] = 255;
          }
     } else if (filter === 3) {
          var cd = Math.abs(Math.sin(Math.random()))
          var counter = introCounter
          introCounter+=0.4
          for (i = 0; i < imgData.data.length; i += 4) {
               counter+=0.01
               
               if(imgData.data[i] !== 255){
                    imgData.data[i] += Math.min(Math.sin(counter)*150, 25)//*= imgData.data[i] * counter;
               }
               if (imgData.data[i + 1] !== 255) {
                    imgData.data[i + 1]+= Math.min(Math.sin(counter) * 150, 25)///*= imgData.data[i+1] * counter
               }
               if (imgData.data[i + 2] !== 255) {
                    imgData.data[i + 2]+= Math.min(Math.sin(counter) * 150, 25)///*= imgData.data[i+2] * counter
               }
               imgData.data[i + 3] = 255;
          }
     }
     scope.state.context.putImageData(imgData, 0, 0);

}
function waterfall(){
          //myImage.crossOrigin = "Anonymous";

          var canvas = window.game.viewport
          var state = window.game.state
          var ctx = state.context 
          var myImage = state.titleImage

          var particles = new spriteParticleManager(1024/2, 768/2)
          
          ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)
          const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
          ctx.clearRect(0, 0, canvas.width, canvas.height)

     
     var bgImg = new Image()
     bgImg.src = "images/bgTitle.png"
     ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

          let particleArray = []
          const numOfParticles = 30000
          var dead = false 

          let mappedImage = []
          for (let y = 0; y < canvas.height; y++) {
               let row = [];
               for (let x = 0; x < canvas.width; x++) {
                    const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
                    const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
                    const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
                    const brightness = calculateRelativeBrightness(red, green, blue)
                    const cell = [
                         cellBrightness = brightness,
                         whiteness = red
                    ]
                    row.push(cell)
               }
               mappedImage.push(row)
          }

          function calculateRelativeBrightness(red, green, blue) {
               return Math.sqrt(
                    (red * red) * 0.299 +
                    (green * green) * 0.587 +
                    (blue * blue) * 0.114
               ) / 100
          }

          class Particle {
               constructor() {
                    this.x = clamp(Math.random() * canvas.width, 350, 915)
                    this.y = clamp(Math.random() * canvas.height, 150, canvas.height)// Math.random() * canvas.height/3;
                    this.speed = 0;
                    this.velocity = Math.random() * 1.75;
                    this.size = Math.random() * 15 + 5
                    this.position1 = Math.floor(this.y)
                    this.position2 = Math.floor(this.x)
               }
               update() {
                    this.position1 = Math.floor(this.y)
                    this.position2 = Math.floor(this.x)
                    this.speed = mappedImage[this.position1][this.position2][0] * 1//brightness 
                    let movement = (3.0 - this.speed) + this.velocity

                    this.y += movement//this.velocity
                    if (this.y >= canvas.height) {
                         this.y = 150;
                         this.x = clamp(Math.random() * canvas.width, 350, 915)
                    }
               }
               draw(color) {
                    ctx.fillStyle = color
                    ctx.fillRect(this.x, this.y, this.size, this.size)
               }
          }
          function init() {
               for (let i = 0; i < numOfParticles; i++) {
                    let size = Math.random() * 40 + 10
                    let x = 1024/2
                    let y = 768
                    particleArray.push(new Particle())
               }
          }
          init()
          function animate() {
               if (state.pastTitle === false) {
                         


                    ctx.globalAlpha = 0.05;

                    ctx.fillStyle = 'rgb(0,0,0)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                    ctx.globalAlpha = 1.0

                    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)


                    for (let i = 0; i < particleArray.length; i++) {
                         particleArray[i].update()
                         ctx.globalAlpha = (particleArray[i].speed * 0.35) + 0.075
                         particleArray[i].draw('rgb(' + (particleArray[i].speed * 40 )+ ', ' + (particleArray[i].speed * 20) + ',255)')  
                         if (particleArray[i].size <= 1) {
                              particleArray.splice(i, 1)
                              i--
                         }
                    }
                    ctx.globalAlpha = 1.0
                    particles.hidden = false
                    for (let i = 0; i < particles.length; i++) {
                         console.log(particles[i])
                         particles[i].update()
                         particles[i].draw(ctx)
                    }
                    requestAnimationFrame(animate)
               }
          }
          animate()
          
     }


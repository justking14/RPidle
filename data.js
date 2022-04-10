
var player_data = {
     "Hero": {
          "health": 100,
          "exp": 0,
          "attack": 35,
          "defense": 5,
          'attack_type': 'move',
          'image': 'Hero'
     },
      "Defender": {
          "health": 150,
          "exp": 0,
          "attack": 5,
          "defense": 25,
          'attack_type': 'move',
          'image': 'Defender'
     },
     "Healer": {
          "health": 50,
          "exp": 0,
          "attack": 5,
          "defense": 5,
          'attack_type': 'move',
          'image': 'Healer'
      }
}


var enemy_data = {
     "Goblin": {
          "health": 25,
          "exp": 0,
          "attack": 110,
          "defense": 5,
          'attack_type': 'move',
          'image': 'enemyL'
     }
}

var weapon_data = {
     "sword": {'damage': 50, 'defense':0, 'type':'weapon', 'graphic':'sword.png'},
}

//          this.storeUI = new Store(["Combat Automation", "Full Automation", "Mercenary", "Escape"], ["50", "5", "999", "0"], 400)

var menu_data = {
     "store": {
          items: [
               {
                    id: "CombatAutomation",
                    title: "Combat Automation",
                    cost: 50,
                    description: "Automates every aspect of the combat experience.",
                    unlockedByDefault: false,
                    canBeBought: true,
                    type: "binary",


                    menuType: "automation",
                    subMenu: "combat"
               },
               {
                    id: "TravelAutomation",
                    title: "Travel Automation",
                    cost: 5,
                    description: "Sends player to the next battle after combat or to the inn when Hero is dead.",
                    unlockedByDefault: false,
                    canBeBought: true,
                                        type: "binary",


                    menuType: "automation",
                    subMenu: "travel"
               },
               {
                    id: "FullAutomation",
                    title: "Full Automation",
                    cost: 25,
                    description: "Fully automates every aspect of the gameplay experience.",
                    unlockedByDefault: false,
                    canBeBought: true,
                                        type: "binary",


                    menuType: "automation",
                    subMenu: "fully"
               },
               {
                    id: "Mercenaries",
                    title: "Mercenary",
                    cost: 1,
                    description: "Adds one set of mercenaries to the player's army who will fight in their place.",
                    unlockedByDefault: false,
                    canBeBought: true,
                    type: "numerical",
     


                    menuType: "automation",
                    subMenu: "mercenaries"
               },
               {
                    id: "Escape",
                    title: "Escape",
                    cost: 0,
                    description: "Return to map",
                    unlockedByDefault: false,
                    canBeBought: false,
                    type: "Escape"
               }
          ]
     },
     "options": {
          items: [
               {
                    id: "FullAutomation",
                    key: "full",
                    title: "Full Automation",
                    options: ["Enabled", "Disabled"],
                    description: "Fully automates every aspect of the gameplay experience.",
                    type: "binary",
                                        
                    menuType: "automation",
                    subMenu: "fully"
               },
               {
                    id: "CombatAutomation",
                    key: "combat",
                    title: "Combat Automation",
                    options: ["Enabled", "Disabled"],
                    description: "Automates every aspect of the combat experience.",
                    type: "binary",

                    menuType: "automation",
                    subMenu: "combat"
               },
               {
                    id: "TravelAutomation",
                    key: "travel",
                    title: "Travel Automation",
                    options: ["Enabled", "Disabled"],
                    description: "Sends player to the next battle after combat or to the inn when Hero is dead.",
                    type: "binary",


                    menuType: "automation",
                    subMenu: "travel"
               },
               {
                    id: "Mercenaries",
                    title: "Mercenary",
                    key: "mercenary",
                    options: ["-", "+"],
                    type: "numerical",
                    count: 0,


                    description: "Adds one set of mercenaries to the player's army who will fight in their place.",

                    menuType: "automation",
                    subMenu: "mercenaries"
               },

          ]
     }
}

//options: ["0", "1", "2","3","4","5","6","7","8","9","10","11","12","13","14"],


//new menuItem("Mercenaries", ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"], limit, 32, "mercenaries", true)



var map_data = {
     "map1": [
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",

               "xxx................Ixx",
               "xxx.x.xxx..xxxxxxxxxxx",
               "xxx.xSx.x...........xx",
               "xxx.xx.....xxxxxxxx.xx",
               "xxx..x.xxx.xx....xx.xx",
               "xxx..x.....xxxxx.xx.xx",
               "xxx..xxxx..xxxxx.xx.xx",
               "xxx...G....xxxxx.xx.xx",
               "xxx.................xx",
               "xxxxxxxxxxxxxxxxxxxxxx",
               "xxxxxxxxxxxxxxxxxxxxxx",

     ],
     "map2": [
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxx.................xx",
          "xxx................Ixx",
          "xxx.................xx",
          "xxx.xSx.x...........xx",
          "xxx.................xx",
          "xxx.................xx",
          "xxx.................xx",
          "xxx.................xx",
          "xxx...G....xxxxx.xx.xx",
          "xxx.................xx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",

     ],
     "map3": [
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxx.x.x.x.x.x.x.x.xx",
          "xxxI......x.........xx",
          "xxxSx.x.x.x.x.x.x.x.xx",
          "xxx...x.......x.....xx",
          "xxx.x.x.x.x.x.x.x.x.xx",
          "xxx..x....x.....x...xx",
          "xxx.x.x.x.x.x.x.x.x.xx",
          "xxx...x.......x.....xx",
          "xxx.x.xGx.x.x.x.x.x.xx",
          "xxx.................xx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",

     ],

     "map4": [
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxI................xx",
          "xxxxxxxxxxxxxxxxxxx.xx",
          "xxx.................xx",
          "xxxSxxxxxxxxxxxxxxxxxx",
          "xxx.................xx",
          "xxxxxxxxxxxxxxxxxxx.xx",
          "xxx.................xx",
          "xxx.xxxxxxxxxxxxxxxxxx",
          "xxx.x...x...x...x...xx",
          "xxx...x...x...x...xGxx",
          "xxxxxxxxxxxxxxxxxxxxxx",
          "xxxxxxxxxxxxxxxxxxxxxx",

     ],


}

////TO DO LIST

///shop mercenary
///new paths and starts (for player)
///place victory sound in agent manager battle calc based on names
///remove all references to scope
//        Scope.context?
//font
//real time
//move isfighting to scope
///hp should always be an int, enemy chp

/*
Fix store 

HSV instead of RGB
goblin is fighting for mercenaries
darker less saturated

Make magic/attack different 
Stopping in the middle of the screen 
Prioritize attacking defender 
Off-time cookies. Text save. Time since last save 
Battle won in the center not the UI. 

HAND MADE WITH HIGH CONTRAST. 
changing settings should take affect 
Narrative. Building things up. 
Attending to the absurd 
Must be surprise but not too much. Needs expectations. Start simple. Automating things 
Peter Burr automated cities 

Moving tombstones is funny 
Interesting and satisfying even though she didn’t think it would be. 
Elemental affinity as a means of encouraging human players 

Title screen is creepy. Horror like 
Art is funny great? Cute 

Players don’t like dying. 
Fighting dwarf fortress 
Wants an achievement, sense of progress

Pokémon instinct to heal after battle 
Magic animations look cool
Mercenaries and players fighting at the same time?
Tell the player that dying isn’t bad as another puppet can be found. 

Make title more like a Zelda waterfall 
Make it clear who’s turn it is 
Integrate different systems. Upgrade everything. Hero, Healer, inn, etc. meaningful decisions. 
Gold can buy territory. Become a lord. Negotiate with neighbors. Random events.

*/


//DONE LIST
///MAKE NEW PARTICLE DRAW SYSTEM
//CHANGE HOW ENTITIES ARE DRAWN
///ENTITIES->AGENTS
//Fix inn healing. 
//Separate health from gold 
//Put health on side. Separate level and health 
//Health should not be a fraction 
//Fix map tiles on the bottom 
//day/night cycle
//add seperate reticule for each player manager

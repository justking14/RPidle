function drawText(ctx, text, x, y, color, selected, fnt) {
     ctx.font = fnt + 'px Adventure';
     var startX = x 
     var startY = y
     var yIncrement = 0
     var lineHeight = fnt * 1.286;

     if (selected === false || selected === undefined) {
          ctx.fillColor = color
          ctx.fillStyle = color

          if (typeof text === 'string' || text instanceof String) {
               var words = text.split(' ');
               for (var i = 0; i < words.length; i++) {
                    if (x + ctx.measureText(words[i] + "  ").width > 1200) {
                         x = startX
                         yIncrement += 1
                    }
                    ctx.fillText(words[i], x, y + (yIncrement * lineHeight))
                    x += ctx.measureText(words[i] + "  ").width
               }
          } else {
               ctx.fillText(text, x, y, 1280)
          }

     } else {
          //if selected, give it a black background 
          ctx.fillColor = "black"
          ctx.fillStyle = "black"
                    
          var textWidth = ctx.measureText(text).width;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';

          ctx.fillRect(x - 4, y - 4,  textWidth + 2, lineHeight + 2)
                         
          ctx.fillColor = "white"
          ctx.fillStyle = "white"
          ctx.fillText(text, x, y, 1280)
     }
}
/*
function drawText(ctx, scope, text, x, y, color, selected, fnt) {
     
     if (selected === false || selected === undefined) {
          if (scope.menuDict["Visuals"]["colorFilter"] === 2) {
               ctx.fillColor = "white"
               ctx.fillStyle = "white"
          } else {
     
               ctx.fillColor = color
               ctx.fillStyle = color
          }
                    
          ctx.fillText(text, x, y)
     } else {
          ctx.fillColor = "black"
          ctx.fillStyle = "black"
          if (scope.menuDict["Visuals"]["colorFilter"] === 2) {
               ctx.fillColor = "white"
               ctx.fillStyle = "white"
          } 
                    
          var lineHeight = fnt * 1.286;
          var textWidth = ctx.measureText(text).width;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';

          ctx.fillRect(x - 4, y - 4,  textWidth + 2, lineHeight + 2)
                         
          ctx.fillColor = "white"
          ctx.fillStyle = "white"
          ctx.fillText(text, x, y)
     }
}
*/
///ctx.fillText(string[i], distSoFar, this.body.pos.y + ((lineHeight*2)+100))                    
//drawText(ctx, scope, string[i], distSoFar, this.body.pos.y + ((lineHeight*2)+100, "black"))


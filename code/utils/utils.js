function rounded_rect(ctx,left,top, width, height, radius, fill){
     var K = 4 * (Math.SQRT2-1) / 3; //constant for circles using Bezier curve.

     var right=left+width;
     var bottom=top+height;
     ctx.beginPath();
     ctx.moveTo(left+radius,top);
     ctx.lineTo(right-radius,top);
     ctx.bezierCurveTo(right+radius*(K-1),top,right,top+radius*(1-K),right,top+radius);
     ctx.lineTo(right,bottom-radius);

     ctx.bezierCurveTo(right, bottom + radius * (K - 1), right + radius * (K - 1), bottom, right - radius, bottom);
     ctx.lineTo(left+radius,bottom);
     ctx.bezierCurveTo(left+radius*(1-K),bottom,left,bottom+radius*(K-1),left,bottom-radius);
     ctx.lineTo(left,top+radius);
     ctx.bezierCurveTo(left,top+radius*(1-K),left+radius*(1-K),top,left+radius,top);
     ctx.lineWidth=7;
     ctx.strokeStyle = "rgb(0,0,0)";
     //if (fill === true) {
     ctx.fill()
     //}
     ctx.stroke();
     ctx.closePath()
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
     if (typeof stroke === 'undefined') {
          stroke = true;
     }
     if (typeof radius === 'undefined') {
          radius = 5;
     }
     if (typeof radius === 'number') {
          radius = { tl: radius, tr: radius, br: radius, bl: radius };
     } else {
          var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
          for (var side in defaultRadius) {
               radius[side] = radius[side] || defaultRadius[side];
          }
     }
     ctx.beginPath();
     ctx.moveTo(x + radius.tl, y);
     ctx.lineTo(x + width - radius.tr, y);
     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
     ctx.lineTo(x + width, y + height - radius.br);
     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
     ctx.lineTo(x + radius.bl, y + height);
     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
     ctx.lineTo(x, y + radius.tl);
     ctx.quadraticCurveTo(x, y, x + radius.tl, y);
     ctx.closePath();
     if (fill) {
          ctx.fill();
     }
     if (stroke) {
          ctx.stroke();
     }

}

function longestLength(ctx, arr) {
     var longest = arr[0][0]
     var lgth = ctx.measureText(arr[0][0]).width
     for (var i = 0; i < arr.length; i++) {
          if (ctx.measureText(arr[i][0]).width > lgth) {

               lgth = ctx.measureText(arr[i][0]).width;
               longest = arr[i][0];
          }
     }
     //console.log("longest is", longest, lgth)
     return longest 
}






function getPixelRatio(context) {
     console.log('Determining pixel ratio.');

     // I'd rather not have a giant var declaration block,
     // so I'm storing the props in an array to dynamically
     // get the backing ratio.
     var backingStores = [
          'webkitBackingStorePixelRatio',
          'mozBackingStorePixelRatio',
          'msBackingStorePixelRatio',
          'oBackingStorePixelRatio',
          'backingStorePixelRatio'
     ];

     var deviceRatio = window.devicePixelRatio;

     // Iterate through our backing store props and determine the proper backing ratio.
     var backingRatio = backingStores.reduce(function (prev, curr) {
          return (context.hasOwnProperty(curr) ? context[curr] : 1);
     });

     // Return the proper pixel ratio by dividing the device ratio by the backing ratio
     return deviceRatio / backingRatio;
}

function generateCanvas(w, h) {
     console.log('Generating canvas.');

     var canvas = document.getElementById('canvas1'),
          context = canvas.getContext('2d');
     canvas.width = w
     canvas.height = h
     // Pass our canvas' context to our getPixelRatio method
     /*
     var ratio = this.getPixelRatio(context);

     // Set the canvas' width then downscale via CSS
     canvas.width = Math.round(w * ratio);
     canvas.height = Math.round(h * ratio);
     canvas.style.width = w + 'px';
     canvas.style.height = h + 'px';
     // Scale the context so we get accurate pixel density
     context.setTransform(ratio, 0, 0, ratio, 0, 0);
     */
     return canvas;
}







          /*
          const buttonElements = document.querySelectorAll('.button')
          let buttonMeasurements = []
          function measureButtons(){
               buttonMeasurements = []
               buttonElements.forEach(button =>{
                    buttonMeasurements.push(button.getBoundingClientRect())
               })
          }
          measureButtons()
          let particlesArray2 = [] 

          let activeButton = 0;
          buttonElements.forEach(button => button.addEventListener('mouseenter', function(){
               activeButton = button.dataset.number 
          }))
          buttonElements.forEach(button => button.addEventListener('mouseleave', function () {
               activeButton = -1
          }))
          function handleParticles2(){
               for(let i = 0; i < particlesArray2.length; i++){
                    particlesArray2[i].update()
                    particlesArray2[i].draw()
                    if(particlesArray2[i].size <= 1){
                         particlesArray2.splice(i,1)
                         i--
                    }
               }
          }
          function createParticles2(){
               if(activeButton > -1){
                    let size = Math.random()*40 + 10
                    let x = Math.random() * (buttonMeasurements[activeButton].width - size * 2) + buttonMeasurements[activeButton].x + size
                    let y = buttonMeasurements[activeButton].y + 40
                    particlesArray2.push(new Particle2(x,y,size))
               }
          }
          function animate2(){
               console.log(activeButton)
               ctx.clearRect(0,0,canvas.width, canvas.height)
               createParticles2()
               handleParticles2()
               requestAnimationFrame(animate2)
          }
          */


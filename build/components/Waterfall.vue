<template>
    <div class="container"></div>
</template>

<script>
  export default {
    name: 'Waterfall',

    mounted () {
      const script = function (p5) {
        var waterfall = [];
        var dropletWidth = 0.15;
        var droplets = 1050;
        var angle = 21;
      
        p5.setup = function setup() {
          if (window.innerWidth < 801) droplets = 400; //reduce drops on small displays
          p5.noStroke();
          p5.colorMode(p5.RGB, 255, 255, 255, 1);
          p5.createCanvas(window.innerWidth, window.innerHeight);
          for (var i = 0; i < droplets; i++) {
            var x = p5.random(p5.width);
            var y = p5.random(-p5.height); //start off screen
            var r = p5.random(0.2, 1.2);
            var h = p5.random(20, 255); //amount of blue
            var b = p5.random(10, 250); //opacity
            var s = p5.random(0.01, 0.02); //speed
            waterfall[i] = new WaterFall(x, y, r, h, b, s); //create waterfall droplets
          }
        }

        p5.draw = function draw() {
          // var blue = p5.random(0, 60);
          p5.background(18, 18, 18, 1);
          p5.strokeWeight(dropletWidth / 1.52);
          for (var i = 0; i < droplets; i++) {
            waterfall[i].move();
            waterfall[i].display();
          }
        }

        function WaterFall(tempX, tempY, tempDiameter, tempHue, tempB, s) {
          this.x = tempX;
          this.y = tempY;
          this.diameter = tempDiameter;
          this.h = tempHue;
          this.b = tempB;
          this.s = s;
          this.move = function () {
            var range = 1;
            var xspeed = this.s;
            angle += xspeed;
            var tx = p5.sin(angle) * range; //create swaying effect along x axis

            var ty = p5.random(1, 5) + 530 * this.s;

            this.x += tx;
            if (this.x > p5.width + dropletWidth || this.x < -dropletWidth) {
              this.x = p5.round(p5.random(p5.width / dropletWidth)) * dropletWidth;
            }
            this.y += ty;
            if (this.y > p5.height) {
              this.y = p5.random(-p5.height);
              this.x = p5.random(p5.width);
            }
          };

          this.display = function () {
            p5.stroke(117, 117, 117, 1);
            p5.line(this.x, this.y, this.x, this.y + this.s * 5000);
          };
        }
      }

      const P5 = require('p5');
      new P5(script)
    }
  };

</script>

<style scoped>
/* body {padding: 0; margin: 0; overflow: hidden;} */

.container {
  display: block;
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 42%;
  left: 100%;
  /* margin-left: -400px; */
  /* margin-top: -25px; */
  color: white;
  /* margin: 0 auto; */
  font-size: 30px;
  font-family: Arial;
  display: block;
  animation: glow 6s linear forwards, scroll 6s linear forwards;
}

@keyframes glow {
  0% {color: transparent; }
  35% {color: white; }
  65% {color: white; }
  75% {color: transparent; }
  100% {color: transparent; }
  
}

@keyframes scroll {
  0% {left: 100%;}
  100% {left: -100%;}
}
</style>

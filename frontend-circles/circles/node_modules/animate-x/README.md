# Animate X

A super small animation library for animating numbers, objects, and arrays.

## Installation

With npm:

```bash
npm install --save animate-x
```

Or with Yarn:

```bash
yarn add animate-x
```

## Usage

### Simple

```javascript
var Animate = require('animate-x')

var anim = new Animate({
      from: 0,
      to: 100,
      duration: 1000,
      onStep: function(state){
         console.log(state)
      }
   })
   .start()
```


### Easing

The simplest way to apply easing to your animation is with the [eases](https://www.npmjs.com/package/eases) module, but any easing function will work.

```javascript
var Animate = require('animate-x')
var eases = require('eases')

var el = document.querySelector('div')

var anim = new Animate({
      from: {
         x: 0,
         y: 0
      },
      to: {
         x: 100,
         y: 50
      },
      duration: 1000,
      easing: eases.bounceOut,
      onStep: function(state){
         el.style.transform = 'translate(' + state.x + 'px, ' + state.y + 'px)'
      }
   })
   .start()
```

## Options

Option | Description | Default
--- | --- | ---
from | A number, object, or array to start tweening from | `0`
to | A number, object, or array to tween to (must match schema of "from") | `100`
duration | The number of milliseconds the animation should last | `1000`
easing | An easing function for the animation | `function(time){ return time }`
loop | Loops the animation | `false`
onStep | A function that will be called every frame, with the first argument being the tweened state | n/a
onStart | A function that will be called every time the animation starts | n/a
onEnd | A function that will be called every time the animation ends | n/a

## Methods

Method | Description
--- | ---
`.start()` | Starts the animation from the beginning
`.stop()` | Stops the animation
`.pause()` | Pauses the animation if you need to ever resume from the same spot
`.unpause()` | Resumes the animation from the last known spot
`.toggle()` | Toggles between stop/start
`.togglePause()` | Toggles between pause/unpause
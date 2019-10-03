# Keyframe X

A super small library for tweening numbers, strings, objects, and arrays. Also tweens deep objects and arrays.

## Installation

With npm:

```bash
npm install --save keyframe-x
```

Or with Yarn:

```bash
yarn add keyframe-x
```

## Usage

```javascript
import { tween } from 'keyframe-x'

// Tween a number
let numTween = tween(0, 100)
console.log(numTween(.25)) // 25

// Tween a string
let stringTween = tween('translateX(0%)', 'translateX(50%)')
console.log(stringTween(.5)) // translateX(25%)

// Tween an object
let objectTween = tween({
   left: 100,
   top: 30
}, {
   left: 0,
   top: -30
})
console.log(objectTween(.75))

// Tween an array
let arrayTween = tween([
   0, 1
], [
   30, 9
])
console.log(arrayTween(.1))
```
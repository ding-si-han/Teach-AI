# React Animate X

A React implimentation of [Animate X](https://github.com/escaladesports/animate-x),
a super small animation library for animating components, numbers, objects, and arrays.

## Installation

With npm:

```bash
npm install --save react-animate-x
```

Or with Yarn:

```bash
yarn add react-animate-x
```

## Usage

### Simple

```jsx
import Animate from 'react-animate-x'

...

<Animate from={0}, to={100}>
   {state => (
      <div style={{ transform: `translateX(${state}px)` }}>Animating!</div>
   )}
</Animate>
```


### Easing

The simplest way to apply easing to your animation is with the [eases](https://www.npmjs.com/package/eases) module, but any easing function will work.

```jsx
import Animate from 'react-animate-x'
import { bounceOut } from 'eases'

...

<Animate
   from={{
      x: 0,
      y: 0,
   }}
   to={{
      x: 100,
      y: 150,
   }}
   easing={bounceOut}>
   {({ x, y }) => (
      <div style={{ transform: `translate(${x}px, ${y}px)` }}>Animating!</div>
   )}
</Animate>
```

## Props

Prop | Description | Default
--- | --- | ---
from | A number, object, or array to start tweening from | `0`
to | A number, object, or array to tween to (must match schema of "from") | `100`
duration | The number of milliseconds the animation should last | `1000`
easing | An easing function for the animation | `function(time){ return time }`
loop | Add this prop to loop the animation infinitely | `false`
onStart | A function that will be called every time the animation starts | n/a
onEnd | A function that will be called every time the animation ends | n/a
animating | Set to `false` to stop the animation | n/a
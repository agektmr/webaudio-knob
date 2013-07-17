# Polymer Knob Example

## Live Demo
[http://demo.agektmr.com/polymer/knob/](http://demo.agektmr.com/polymer/knob/)

## How to use
1. load polymer.js
2. link to webaudio-knob component

```
<script src="http://www.polymer-project.org/polymer-all/polymer/polymer.js">
<link rel="import" href="https://raw.github.com/agektmr/webaudio-knob/master/components/knob.html">
```

3. insert `webaudio-knob` element

```
<webaudio-knob></webaudio-knob>
```

## Attributes
- **min**: min value of the knob
- **max**: max value of the knob
- **value**: value of the knob
- **step**: step by moving mouse
- **range**: number of splite images your knob image have
- **diameter**: diameter of knob image
- **src**: path to knob image resource

## Events
- **change**: change event emitted everytime value changes

```
var knobs = document.getElementsByTagName('webaudio-knob');
for (var i = 0; i < knobs.length; i++) {
  var knob = knobs[i];
  knob.addEventListener('change', function(e) {
    console.log(e.target.value);
  });
}
```
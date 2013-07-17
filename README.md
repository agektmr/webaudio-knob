# Polymer Knob Example

## Live Demo
[http://demo.agektmr.com/polymer/knob/](http://demo.agektmr.com/polymer/knob/)

![](https://raw.github.com/agektmr/webaudio-knob/master/img/screenshot.png)

## How to use
- load polymer.js
- link to webaudio-knob component

```
<script src="http://www.polymer-project.org/polymer-all/polymer/polymer.js">
<link rel="import" href="https://raw.github.com/agektmr/webaudio-knob/master/components/knob.html">
```

- insert `webaudio-knob` element

```
<webaudio-knob src="img/MiniBrute.png" min="-127" max="127" value="0" step="3" diameter="" splites="100"></webaudio-knob>
```

- create imperatively

```
var knob = document.createElement('webaudio-knob');
```

- value can be changed by simply dragging up and down
- with 'shift' key pressed, value changes by 1 (otherwise per `step`)

## Attributes
- **min**: min value of the knob (default: 0)
- **max**: max value of the knob (default: 127)
- **value**: value of the knob (default: 0)
- **step**: step by moving mouse (default: 3)
- **splites**: number of splites your knob image has (default: 30)
- **diameter**: diameter of single knob (default: 64)
- **src**: path to knob image resource (default: 'img/org_amp.png')

## Events
- **change**: 'change' event emitted everytime value changes

```
var knobs = document.getElementsByTagName('webaudio-knob');
for (var i = 0; i < knobs.length; i++) {
  var knob = knobs[i];
  knob.addEventListener('change', function(e) {
    console.log(e.target.value);
  });
}
```
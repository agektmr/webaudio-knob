_**If you are interested in this project, please check [webaudio-controls](https://github.com/g200kg/webaudio-controls) by @g200kg as well. webaudio-controls has a fork of this project + slider, switch and even keyboard. Touch enabled too!**_

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
<webaudio-knob src="img/MiniBrute.png" min="-127" max="127" value="0" step="3" diameter="" sprites="100"></webaudio-knob>
```

- create imperatively

```
var knob = document.createElement('webaudio-knob');
```

- value can be changed by simply dragging up and down
- with 'shift' key pressed, value changes by 1 (otherwise per `step`)

## Attributes
### 'min'
**description**: min value of the knob  
**default**: `0`

### 'max'
**description**: max value of the knob  
**default**: `127`

### 'value'
**description**: value of the knob  
**default**: `0`

### 'step'
**description**: value change steps by moving mouse  
**default**: `3`

### 'sprites'
**description**: number of sprites your knob image has  
**default**: `30`

### 'diameter'
**description**: diameter of single knob  
**default**: `64`

### 'src'
**description**: path to knob image resource (relative from where you are refering)  
**default**: `'img/org_amp.png'`

## Events
### 'change'
**description**: 'change' event emitted everytime value changes

```
var knobs = document.getElementsByTagName('webaudio-knob');
for (var i = 0; i < knobs.length; i++) {
  var knob = knobs[i];
  knob.addEventListener('change', function(e) {
    console.log(e.target.value);
  });
}
```

## Creating knob images
- Go to [WebKnobMan](http://www.g200kg.com/en/webknobman/gallery.php)
- Find your favorite knob design and click 'Open with WebKnobMan'
- Click on 'Export' to download `png` file
- Of course, you can create your own!

**Note: comply with license requirements**

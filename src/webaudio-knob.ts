import { LitElement, property, customElement, html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('webaudio-knob')
class WebAudioKnob extends LitElement {
  @property({
    type: Number,
    reflect: true
  })
  value: number = 100

  @property({
    type: Number,
    reflect: true
  })
  min: number = 0

  @property({
    type: Number,
    reflect: true
  })
  max: number = 127

  @property({
    type: Number,
    reflect: true
  })
  diameter: number = 64

  @property({
    type: Number,
    reflect: true
  })
  step: number = 3

  @property({
    type: Number,
    reflect: true
  })
  sprites: number = 30

  @property({
    type: String,
    reflect: true
  })
  src: string = 'img/org_amp.png'

  @property({
    type: Number,
    reflect: true,
    attribute: 'start-pos'
  })
  startPos: number = null

  @property({
    type: Number,
    reflect: true,
    attribute: 'start-val'
  })
  startVal: number = 0

  private styles: any
  private boundMousemove
  private boundCancel

  render() {
    return html`
      <style>
        :host {
          * {
            display: inline-block;
          }
        }
        #knob {
          cursor: pointer;
          width: 64px;
          height: 64px;
          background-position-y: -64px;
          position: relative;
        }
        #value-tip {
          opacity: 0;
          border: solid 1px #666;
          background-color: #eee;
          position: absolute;
          top: 0;
          right: 0;
          padding: 1px 4px;
          font-size: 10px;
          font-family: Helvetica;
          transition: opacity 0.3s;
        }
      </style>
      <div class="knob" style="${styleMap(this.styles)}" id="knob">
        <span id="value-tip">${this.value}</span>
      </div>`;
  }

  connectedCallback() {
    this.styles.width = `${this.diameter}px`;
    this.styles.height = `${this.diameter}px`;
    this.styles.background = `url(${this.src})`;
    this.update.bind(this)(this.value);
  }

  private mousemove(e) {
    var offset = (this.startPos - e.pageY) || 0;
    var value = this.startVal + (e.shiftKey ? ~~(offset / 3) : this.step * offset);
    this.update.bind(this)(value);
  };

  private cancel(e) {
    this.startPos = null;
    this.$['value-tip'].style.opacity = 0;
    window.removeEventListener('mousemove', this.boundMousemove, true);
    window.removeEventListener('mouseup', this.boundCancel, true);
    this.fire('cancel');
  }

  private update(value: number): void {
    this.value = value < this.min ? this.min : value > this.max ? this.max : value;
    const range = this.max - this.min;
    const posY = `-${~~(this.sprites / range * (range - this.min + this.value) + 1) * this.diameter}px`;
    if('backgroundPositionY' in this.styles){
      this.styles.backgroundPositionY = posY;
    } else {
      this.styles.backgroundPosition = `center ${posY}`;
    }
    this.fire('change');
  }

  private valueChanged(oldVal, newVal) {
    this.update.bind(this)(newVal);
  }

  private mousedown(e) {
    this.$['value-tip'].style.opacity = 1;
    this.startPos = e.pageY;
    this.startVal = this.value;
    this.boundMousemove = this.mousemove.bind(this);
    this.boundCancel = this.cancel.bind(this);
    window.addEventListener('mousemove', this.boundMousemove, true);
    window.addEventListener('mouseup', this.boundCancel, true);
    e.preventDefault();
  }
}
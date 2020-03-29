import { LitElement, property, customElement, html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('webaudio-knob')
class WebAudioKnob extends LitElement {
  @property({
    type: Number,
    reflect: true,
    hasChanged(newVal) {
      return this.update(newVal);
    }
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
  private boundMousemove: EventListenerOrEventListenerObject
  private boundCancel: EventListenerOrEventListenerObject
  private valueTip: HTMLElement

  constructor() {
    super();
    this.valueTip = this.$('#value-tip');
  }

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
      <div
        class="knob"
        style="${styleMap(this.styles)}"
        @mousedown="${this.mousedown}"
        id="knob">
        <span id="value-tip">${this.value}</span>
      </div>`;
  }

  connectedCallback(): void {
    this.styles.width = `${this.diameter}px`;
    this.styles.height = `${this.diameter}px`;
    this.styles.background = `url(${this.src})`;
    this.updateValue(this.value);
  }

  protected $(query: string): any {
    return this.shadowRoot?.querySelector(query);
  }

  protected fire(
    eventName: string,
    eventDetail?: object
  ): void {
    const event = new CustomEvent(eventName, {
      detail: eventDetail,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private updateValue(value: number): boolean {
    this.value = value < this.min ? this.min : value > this.max ? this.max : value;
    const range = this.max - this.min;
    const posY = `-${~~(this.sprites / range * (range - this.min + this.value) + 1) * this.diameter}px`;
    if ('backgroundPositionY' in this.styles){
      this.styles.backgroundPositionY = posY;
    } else {
      this.styles.backgroundPosition = `center ${posY}`;
    }
    this.render();
    this.fire('change');
    return true;
  }

  private release(e: MouseEvent): void {
    e.preventDefault();
    this.startPos = null;
    this.valueTip.style.opacity = '0';
    this.removeEventListener('mousemove', this.boundMousemove, true);
    this.removeEventListener('mouseup', this.boundCancel, true);
    this.fire('cancel');
  }

  private mousemove(e: MouseEvent): void {
    const offset = (this.startPos - e.pageY) || 0;
    const value = this.startVal + (e.shiftKey ? ~~(offset / 3) : this.step * offset);
    this.updateValue(value);
  };

  private mousedown(e: MouseEvent): void {
    e.preventDefault();
    this.valueTip.style.opacity = '1';
    this.startPos = e.pageY;
    this.startVal = this.value;
    this.boundMousemove = this.mousemove.bind(this);
    this.boundCancel = this.release.bind(this);
    this.addEventListener('mousemove', this.boundMousemove, true);
    this.addEventListener('mouseup', this.boundCancel, true);
  }
}
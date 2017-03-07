import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-inner',
  template: `
    <div>
      <h1>Inner component!</h1>

      This came from the parent:
      <pre>{{ test | json }}</pre>

      <button (click)="pushEventToParent()">Push event to Parent</button>
    </div>
  `,
  styles: [`div { border:1px #000 solid; padding:20px; }`]
})
export class InnerComponent implements OnInit {
  @Input() test;
  @Output() calledFromInner = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  pushEventToParent() {
    this.calledFromInner.emit('Hi parent!');
  }


}

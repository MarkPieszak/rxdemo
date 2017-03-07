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
  // this gets passed in as <app-inner [test]="someVaribleHere"> within any Parent that uses it
  @Input() test;
  // This is the event the Parent can pick up on when it gets fired.
  @Output() calledFromInner = new EventEmitter();

  constructor() { }
  ngOnInit() { }

  pushEventToParent() {
    // Let's push or "emit" an event to the Parent, this could be an Object / or anything.
    this.calledFromInner.emit('Hi parent!');
  }


}

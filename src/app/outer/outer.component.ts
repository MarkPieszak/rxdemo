import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outer',
  template: `
    <div>
      <h1>Parent Component</h1>
      <span *ngIf="message.length">
        This came from the Child event: <strong>{{ message }}</strong><br>
      </span>

      <!-- notice we're passing data down with [test] that's an @Input() test; on the app-inner child component -->
      <app-inner [test]="something" (calledFromInner)="someMethod($event)"></app-inner>
      <!-- (calledFromInner) is the Event that comes from the child when it fires an .emit() upwards -->

    </div>
  `,
  styles: [`div { border:2px red solid; padding:25px; }`]
})
export class OuterComponent implements OnInit {

  public something = {
    data: [1, 2, 3],
    name: 'demo'
  };

  // this is our result from our child Component
  // In our case it's a String but it could be anything, [] {} etc
  public message = '';

  constructor() { }

  ngOnInit() {
  }

  // This is the method we created for the event coming up from the Child
  // (calledFromInner)="someMethod($event)" <-- passed the $event here, in our case it's just a String
  someMethod(message: string) {
    this.message = message;
    alert(message);
  }

}

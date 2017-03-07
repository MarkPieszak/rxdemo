import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outer',
  template: `
    <div>
      <h1>Parent Component</h1>
      <span *ngIf="message.length">
        This came from the Child event: <strong>{{ message }}</strong><br>
      </span>

      <app-inner [test]="something" (calledFromInner)="someMethod($event)"></app-inner>

    </div>
  `,
  styles: [`div { border:2px red solid; padding:25px; }`]
})
export class OuterComponent implements OnInit {

  public something = {
    data: [1, 2, 3],
    name: 'demo'
  }
  public message = '';

  constructor() { }

  ngOnInit() {
  }

  someMethod(message: string) {
    this.message = message;
    alert(message);
  }

}

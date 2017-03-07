import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nameForm: FormGroup;

  constructor() { }

  ngOnInit() {

    // Observables can even be used for regular events
    // You could even handle a click event in this way if you wanted
    Observable.fromEvent(window, 'resize')
      .throttleTime(1000) // fire event every 1000 seconds (different than debounce)
      // * Subscribe is when the Observale "actually" fires & becomes "hot", otherwise they're "cold" and don't run
      .subscribe(e => {
        console.log(e); // check your console to see all the data related with this event
      });

    this.setupForm();
  }

  private setupForm() {
    // Example ReactiveForm group
    this.nameForm = new FormGroup({
      first: new FormControl(),
      last: new FormControl()
    });

    // Check your console and you'll see the events streaming for the entire Form
    // You could also subscribe to 1 specific form item as well (in /rx/ folder you'll see an example);
    this.nameForm.valueChanges.subscribe(form => {
      console.log(form);
    });
  }

}

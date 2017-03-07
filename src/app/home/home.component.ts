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

    Observable.fromEvent(window, 'resize')
      .throttleTime(1000)
      .subscribe(e => {
        console.log(e);
      });

    this.setupForm();
  }

  private setupForm() {
    this.nameForm = new FormGroup({
      first: new FormControl(),
      last: new FormControl()
    });

    this.nameForm.valueChanges.subscribe(form => {
      console.log(form);
    });
  }

}

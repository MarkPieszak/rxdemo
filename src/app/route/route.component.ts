import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html'
})
export class RouteComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public params = {};

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.params = params;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

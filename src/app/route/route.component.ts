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
    // The Router is completely reactive as well, so we can subscribe to any events on it,
    // in this case we're grabbing the "params", so we can get hold of anything in the URL
    // /route/:id/:name
    this.subscription = this.route.params.subscribe(params => {
      this.params = params;
    });
  }

  ngOnDestroy() {
    // Don't forget with this type you want to "unsubscribe" from it since it doesn't automatically close
    this.subscription.unsubscribe();
  }

}

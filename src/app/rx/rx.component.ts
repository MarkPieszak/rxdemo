import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Http, Jsonp } from '@angular/http';

// Note: If you don't want to have to enter all of these for every file
// You can just put them in your `main.ts` file for example so they're shared throughout.
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-rx',
  template: `
    <input
      [formControl]="searchInput"
      placeholder="Wikipedia example typeahead" />

    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>

    <!-- async pipe automatically subscribes & unsubscribes FOR YOU -->
    <h1>Counter switch example:</h1>
    {{ count | async }}

  `,
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {

  public searchInput = new FormControl();

  public items: Observable<string[]>;
  public count: Observable<number>;

  constructor(
    private http: Http,
    private jsonp: Jsonp
  ) { }

  ngOnInit() {

    // This simple example doesn't wait any period of time before firing off the Async call, and has no minimum length
    // this.items = this.searchInput.valueChanges
    //   .switchMap(term => this.search(term));

    this.items = this.searchInput.valueChanges
      // make sure it's at least 2 characters long before continuing
      .filter(term => term.length > 2)
      // wait 1000ms between keypresses before continuing
      .debounceTime(1000)
      // make sure the value is actually different (this will ignore bizarre keypresses like uparrow that's unrelated)
      .distinctUntilChanged()
      // "SWITCH" to the new Stream (the Observable from this.search Http request)
      // also cancel/stop that previous Stream
      // & "MAP" those results to the -Parent- Observable ^^ (this.searchInput.valueChanges) one
      // In our case this inner value then gets mapped to `this.items` using the async pipe to display the data
      // * remember * Async pipe subscribes / unsubscribes automatically for you!!
      .switchMap(term => this.search(term));

    // Simple "interval" example that outputs values every 100ms
    this.count = Observable.interval(100)
      // Add 10 to the first value outputted
      .map(x => x + 10)
      // Only coninute if the value is above 20
      .filter(x => x > 20)
      // Only take (display) 3 results from this stream then STOP
      .take(3);


    // ******
    // These examples don't work but they just showcase the concept of mergeMap and what the
    // subscribe callbacks would look like without it

    // Inner subscribe, we don't want to do this!
    this.http.get('/api/products')
      .map(res => res.json())
      .map(res => res.name)
      .subscribe(product => {
        this.http.get('/api/details/' + product).subscribe(details => {
          // bind something here
        });
      });

    // mergeMap
    // gets value from inner Observable and passes it back to parent one
    this.http.get('/api/products')
      .map(res => res.json())
      .mergeMap(product => this.http.get('/api/details/' + product));
      // ^ this mergeMap pushed the values up to the parent one instead!


  }

  // Our wikipedia example
  search(searchTerm: string) {
    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', searchTerm);
    search.set('format', 'json');
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .map((request) => request.json()[1]);
  }

}

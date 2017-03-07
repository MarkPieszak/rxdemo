import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Http, Jsonp } from '@angular/http';

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

declare var window: any;

@Component({
  selector: 'app-rx',
  template: `
    <input
      [formControl]="searchInput"
      placeholder="Wikipedia example typeahead" />

    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>

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

    // this.items = this.searchInput.valueChanges
    //   .switchMap(term => this.search(term));

    this.items = this.searchInput.valueChanges
      .filter(term => term.length > 2)
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));





    this.count = Observable.interval(100)
      .map(x => x + 10)
      .filter(x => x > 20)
      .take(3);



    // Other examples:
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


  }

  search(searchTerm: string) {
    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', searchTerm);
    search.set('format', 'json');
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .map((request) => request.json()[1]);
  }

  testEnter() {
    console.log('ENTER HIT!');
  }

}

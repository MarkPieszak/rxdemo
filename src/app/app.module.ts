import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RxComponent } from './rx/rx.component';
import { RouteComponent } from './route/route.component';
import { HomeComponent } from './home/home.component';
import { InnerComponent } from './inner/inner.component';
import { OuterComponent } from './outer/outer.component';

@NgModule({
  declarations: [
    AppComponent,
    RxComponent,
    RouteComponent,
    HomeComponent,
    InnerComponent,
    OuterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'rxjs', component: RxComponent },
      { path: 'route/:id/:name', component: RouteComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

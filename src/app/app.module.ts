import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroPipe } from './pipes/hero.pipe';
import { MatchContainersComponent } from './components/match-containers/match-containers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroPipe,
    MatchContainersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

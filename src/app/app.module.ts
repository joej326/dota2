import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroPipe } from './pipes/hero.pipe';
import { MatchContainersComponent } from './components/match-containers/match-containers.component';
import { DurationPipe } from './pipes/duration.pipe';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TeamDetailsComponent } from './components/match-details/team-details/team-details.component';

const appRoutes: Routes = [
  {path: ':player/hero/:heroId/match/:matchId', component: MatchDetailsComponent},
  {path: '', component: MainComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeroPipe,
    MatchContainersComponent,
    DurationPipe,
    MatchDetailsComponent,
    MainComponent,
    TeamDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit {

  replayUrl: string = '';
  isWin: boolean | unknown;

  player: string = '';
  matchAllPlayersData: any;
  matchPlayerData: any;
  radiantPlayers: any;
  direPlayers: any;

  matchData: any;
  heroId: number;
  heroes: any;
  isLoading: boolean;
  httpErrorStatus: number;

  constructor(private api: ApiService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.heroes = JSON.parse(localStorage.getItem('heroes') as any);

    const matchId: string = this.route.snapshot.params['matchId'];
    this.heroId = Number(this.route.snapshot.params['heroId']);
    this.player = this.route.snapshot.params['player'];
    

    this.isLoading = true;
    this.api.getMatch(matchId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.matchData = data;
        if (data.replay_url) {
          this.replayUrl = data.replay_url;
        }
        this.matchAllPlayersData = [...data.players];
        this.radiantPlayers = [...data.players.filter((player: any) => player.isRadiant)];
        this.direPlayers = [...data.players.filter((player: any) => !player.isRadiant)];
        this.matchPlayerData = data.players.find((player: any) => player.hero_id === this.heroId);

        this.isWin = !!(this.matchPlayerData['win']);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log('There was an error:', err);
        
        this.httpErrorStatus = err.status;
        this.isLoading = false;
      }
    });
  }
}

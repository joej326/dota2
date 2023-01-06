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
  matchPlayerData: any;
  matchData: any;
  heroId: number;
  heroes: any;
  isLoading: boolean;

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
        this.matchPlayerData = data.players.find((player: any) => player.hero_id === this.heroId);

        this.isWin = !!(this.matchPlayerData['win']);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

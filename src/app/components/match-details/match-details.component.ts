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

  constructor(private api: ApiService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const matchId: string = this.route.snapshot.params['matchId'];
    const heroId = Number(this.route.snapshot.params['heroId']);
    this.player = this.route.snapshot.params['player'];


    this.api.getMatch(matchId).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.replay_url) {
          this.replayUrl = data.replay_url;
        }

        this.isWin = !!(data.players.find((player: any) => player.hero_id === heroId)['win']);
      }
    });
  }
}

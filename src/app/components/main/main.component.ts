import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  heroes: any[] = [];
  billiardMatches: any[] = [];
  samsclubMatches: any[] = [];

  billiardMatchesToDisplay: any[] = [];
  samsclubMatchesToDisplay: any[] = [];

  isSameMatchToggleOn: boolean = false;
  shouldShowBackToTopButton: boolean = false;



  constructor(private apiService: ApiService, private router: Router) { }


  ngOnInit() {

    this.apiService.getHeroes().subscribe({
      next: (data: any) => {
        this.heroes = data;
        localStorage.setItem('heroes', JSON.stringify(this.heroes as any));
      }
    });
    this.apiService.getPlayerRecentMatches(121010326).pipe(mergeMap((data: any) => {
      this.billiardMatches = data;
      return this.apiService.getPlayerRecentMatches(112553511);
    })).subscribe({
      next: (data: any) => {
        console.log(data);
        this.samsclubMatches = data;

        this.billiardMatches.forEach(billMatch => {
          const samsclubGameWithMatchingId = this.samsclubMatches.find(samsMatch => billMatch.match_id === samsMatch.match_id);
          if (samsclubGameWithMatchingId) {
            samsclubGameWithMatchingId['sameMatch'] = true;
            billMatch['sameMatch'] = true;
          }
        });
        this.billiardMatchesToDisplay = [...this.billiardMatches];
        this.samsclubMatchesToDisplay = [...this.samsclubMatches];

        document.addEventListener('scroll', () => {
          window.scrollY >= 1200 ? this.shouldShowBackToTopButton = true : this.shouldShowBackToTopButton = false;
        })

      }
    });
  }

  handleSameMatchesToggle() {
    if (this.isSameMatchToggleOn) {
      this.isSameMatchToggleOn = false;
      this.billiardMatchesToDisplay = [...this.billiardMatches];
      this.samsclubMatchesToDisplay = [...this.samsclubMatches];
    } else if (!this.isSameMatchToggleOn) {
      this.isSameMatchToggleOn = true;
      this.billiardMatchesToDisplay = [...this.billiardMatches.filter(match => match['sameMatch'])];
      this.samsclubMatchesToDisplay = [...this.samsclubMatches.filter(match => match['sameMatch'])];
    }
  }

  handleScrollToBottom() {
    window.scrollTo({top: 250 * this.billiardMatchesToDisplay.length, behavior: 'smooth'});
  }
  handleScrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  onMatchClick(match: any, player: 'billiard' | 'samsclub') {
    // this.apiService.getMatch(matchId).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     if (data.replay_url) {
    //       window.open(data.replay_url, '_blank');
    //     }
    //   }
    // });':player/hero/:heroId/match/:matchId'
    this.router.navigate([player + '/hero/' + match.hero_id + '/match/' + match.match_id]);
    
  }
}

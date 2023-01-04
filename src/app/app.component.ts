import { AfterViewInit, Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  heroes: any[] = [];
  billiardMatches: any[] = [];
  samsclubMatches: any[] = [];

  billiardMatchesToDisplay: any[] = [];
  samsclubMatchesToDisplay: any[] = [];

  isSameMatchToggleOn: boolean = false;
  shouldShowBackToTopButton: boolean = false;



  constructor(private apiService: ApiService) { }


  ngOnInit() {

    this.apiService.getHeroes().subscribe({
      next: (data: any) => {
        this.heroes = data;
      }
    });
    this.apiService.getPlayerRecentMatches(121010326).pipe(mergeMap((data: any) => {
      this.billiardMatches = data;
      return this.apiService.getPlayerRecentMatches(112553511);
    })).subscribe({
      next: (data: any) => {
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
    window.scrollTo({top: 150 * this.billiardMatchesToDisplay.length, behavior: 'smooth'});
  }
  handleScrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  onMatchClick(matchId: string) {
    this.apiService.getMatch(matchId).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.replay_url) {
          window.open(data.replay_url, '_blank');
        }
      }
    });
  }
}

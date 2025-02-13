import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';

import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  heroes: any[] = [];
  billiardMatches: any[] = [];
  samsclubMatches: any[] = [];

  billiardMatchesToDisplay: any[] = [];
  samsclubMatchesToDisplay: any[] = [];

  isSameMatchToggleOn: boolean = false;
  isRankedToggleOn: boolean = false;
  shouldShowBackToTopButton: boolean = false;

  scrollListenerFn: any;

  billiardSignal = signal<any>(undefined);
  samsclubSignal = signal<any>(undefined);


  constructor(private apiService: ApiService, private router: Router) {

    effect(() => {
  
        this.billiardMatches = this.billiardSignal();
        this.samsclubMatches = this.samsclubSignal();
  
        if (this.billiardMatches && this.samsclubMatches) {
  
          console.log(this.billiardMatches);
          this.samsclubMatches = this.samsclubSignal();
  
          this.billiardMatches.forEach(billMatch => {
            const samsclubGameWithMatchingId = this.samsclubMatches.find(samsMatch => billMatch.match_id === samsMatch.match_id);
            if (samsclubGameWithMatchingId) {
              samsclubGameWithMatchingId['sameMatch'] = true;
              billMatch['sameMatch'] = true;
            }
          });
          this.handleFilterToggle('init');
  
          this.scrollListenerFn = () => {
            window.scrollY >= 1200 ? this.shouldShowBackToTopButton = true : this.shouldShowBackToTopButton = false;
            localStorage.setItem('scrollPosition', window.scrollY.toString());
          };
  
          document.addEventListener('scroll', this.scrollListenerFn);
  
          setTimeout(() => {
            window.scrollTo({top: Number(localStorage.getItem('scrollPosition'))});
          });
  
        }
        
  
    });

  }


  ngOnInit() {
    this.isSameMatchToggleOn = localStorage.getItem('isSameMatchToggleOn') === 'true';
    this.isRankedToggleOn = localStorage.getItem('isRankedToggleOn') === 'true';

    this.apiService.getHeroes().subscribe({
      next: (data: any) => {
        this.heroes = data;
        localStorage.setItem('heroes', JSON.stringify(this.heroes as any));
      }
    });

    this.apiService.getPlayerRecentMatches(121010326).subscribe({next: (data) => this.billiardSignal.set(data)});
    this.apiService.getPlayerRecentMatches(112553511).subscribe({next: (data) => this.samsclubSignal.set(data)});

    // old mergemap way I was using before I implemented signals.

    // this.apiService.getPlayerRecentMatches(121010326).pipe(mergeMap((data: any) => {
    //   this.billiardMatches = data;
    //   return this.apiService.getPlayerRecentMatches(112553511);
    // })).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.samsclubMatches = data;

    //     this.billiardMatches.forEach(billMatch => {
    //       const samsclubGameWithMatchingId = this.samsclubMatches.find(samsMatch => billMatch.match_id === samsMatch.match_id);
    //       if (samsclubGameWithMatchingId) {
    //         samsclubGameWithMatchingId['sameMatch'] = true;
    //         billMatch['sameMatch'] = true;
    //       }
    //     });
    //     this.handleFilterToggle('init');

    //     this.scrollListenerFn = () => {
    //       window.scrollY >= 1200 ? this.shouldShowBackToTopButton = true : this.shouldShowBackToTopButton = false;
    //       localStorage.setItem('scrollPosition', window.scrollY.toString());
    //     };

    //     document.addEventListener('scroll', this.scrollListenerFn);

    //     setTimeout(() => {
    //       window.scrollTo({top: Number(localStorage.getItem('scrollPosition'))});
    //     });

    //   }
    // });
  }

  handleFilterToggle(filterType: 'sameMatch' | 'ranked' | 'init') {

    if (filterType === 'init') {
        this.filterArrays();
    } else {

      if (filterType === 'sameMatch') {
        this.isSameMatchToggleOn = !this.isSameMatchToggleOn;
        localStorage.setItem('isSameMatchToggleOn', this.isSameMatchToggleOn ? 'true' : 'false');
        this.filterArrays();
  
      } else if (filterType === 'ranked') {
        this.isRankedToggleOn = !this.isRankedToggleOn;
        localStorage.setItem('isRankedToggleOn', this.isRankedToggleOn ? 'true' : 'false');
        this.filterArrays();
      }
    }





    // if (isInit) {
    //   if (this.isSameMatchToggleOn) {
    //     this.billiardMatchesToDisplay = [...this.billiardMatches.filter(match => match['sameMatch'])];
    //     this.samsclubMatchesToDisplay = [...this.samsclubMatches.filter(match => match['sameMatch'])];
    //   } else {
    //     this.billiardMatchesToDisplay = [...this.billiardMatches];
    //     this.samsclubMatchesToDisplay = [...this.samsclubMatches];
    //   }


      
    // } else {
    //   if (this.isSameMatchToggleOn) {
    //     this.isSameMatchToggleOn = false;
    //     localStorage.setItem('isSameMatchToggleOn', 'false');
    //     this.billiardMatchesToDisplay = [...this.billiardMatches];
    //     this.samsclubMatchesToDisplay = [...this.samsclubMatches];
    //   } else if (!this.isSameMatchToggleOn) {
    //     this.isSameMatchToggleOn = true;
    //     localStorage.setItem('isSameMatchToggleOn', 'true');
    //     this.billiardMatchesToDisplay = [...this.billiardMatches.filter(match => match['sameMatch'])];
    //     this.samsclubMatchesToDisplay = [...this.samsclubMatches.filter(match => match['sameMatch'])];
    //   }
    // }

    
  }

  filterArrays() {

    if (this.isSameMatchToggleOn && !this.isRankedToggleOn) {
      this.billiardMatchesToDisplay = [...this.billiardMatches.filter(match => match['sameMatch'])];
      this.samsclubMatchesToDisplay = [...this.samsclubMatches.filter(match => match['sameMatch'])];
    } else if (!this.isSameMatchToggleOn && this.isRankedToggleOn) {
      this.billiardMatchesToDisplay = [...this.billiardMatches.filter(match => match['lobby_type'] === 7)];
      this.samsclubMatchesToDisplay = [...this.samsclubMatches.filter(match => match['lobby_type'] === 7)];
    } else if (this.isSameMatchToggleOn && this.isRankedToggleOn) {
      this.billiardMatchesToDisplay = [...this.billiardMatches.filter(match => match['sameMatch'] && match['lobby_type'] === 7)];
      this.samsclubMatchesToDisplay = [...this.samsclubMatches.filter(match => match['sameMatch'] && match['lobby_type'] === 7)];
    } else {
      this.billiardMatchesToDisplay = [...this.billiardMatches];
      this.samsclubMatchesToDisplay = [...this.samsclubMatches];
    }

  }

  handleScrollToBottom() {
    window.scrollTo({top: 250 * this.billiardMatchesToDisplay.length, behavior: 'smooth'});
  }
  handleScrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  onMatchClick(match: any, player: 'billiard' | 'samsclub') {
    
    this.router.navigate([player + '/hero/' + match.hero_id + '/match/' + match.match_id]);
    
  }

  ngOnDestroy(): void {
    document.removeEventListener('scroll', this.scrollListenerFn);
  }
}

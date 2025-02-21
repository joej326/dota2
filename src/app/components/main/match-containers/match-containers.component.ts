import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-match-containers',
  templateUrl: './match-containers.component.html',
  styleUrls: ['./match-containers.component.scss']
})
export class MatchContainersComponent {
  @Input() matches: any[] = [];
  @Input() playerName: string = '';
  @Input() heroes: any[] = [];

  @Output() onMatchClick$ = new EventEmitter();


  onMatchClick(matchId: string) {
    this.onMatchClick$.emit(matchId);
  }

}

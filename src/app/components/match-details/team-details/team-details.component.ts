import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {

  // application data
  @Input() heroes: any;
  @Input() matchData: any;
  @Input() heroId: any;

  // component data
  @Input() team: 'radiant' | 'dire';
  @Input() players: any;
  @Input() showKdaRatios: boolean;
  @Input() showUsernames: boolean;
}

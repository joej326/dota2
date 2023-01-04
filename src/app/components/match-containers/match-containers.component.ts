import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match-containers',
  templateUrl: './match-containers.component.html',
  styleUrls: ['./match-containers.component.scss']
})
export class MatchContainersComponent {
  @Input() matches: any[] = [];
  @Input() playerName: string = '';
  @Input() heroes: any[] = [];

}

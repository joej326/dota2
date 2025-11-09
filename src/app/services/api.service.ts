import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 // @ts-ignore 
import { apiKey } from '../../../.config';

// bruce
// 76561198053917287

// bill
// 76561198081276054

// me
// 76561198072819239

// me
// 112553511

// bill
// 121010326

@Injectable({
  providedIn: 'root'
})
export class ApiService {


    constructor(private http: HttpClient) { }

    getHeroes() {
        return this.http.get(`https://api.opendota.com/api/heroes`);
    }

    getMatch(matchId: string) {
        return this.http.get(`https://api.opendota.com/api/matches/${matchId}`);
    }

    getPlayerRecentMatches(dotaAccountId: number) {
        return this.http.get(`https://api.opendota.com/api/players/${dotaAccountId}/matches`);
    }


}
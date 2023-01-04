import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hero'
})
export class HeroPipe implements PipeTransform {

  transform(heroId: number, heroes: any[]): unknown {
    const hero = heroes.find(hero => hero.id === heroId);

    return hero && hero.localized_name;
  }

}

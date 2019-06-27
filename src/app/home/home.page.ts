import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { HeroesService } from './../services/heroes/heroes.service';
import { Hero } from '../models/hero.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public heroes: Array<Hero> = [];

  constructor(private apiService: HeroesService, private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  }

  loadData(refresh = false, refresher?) {
    this.apiService.getHeroes(refresh).subscribe(res => {
      this.heroes = res;
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

  postHero() {
    this.apiService.postHero({ name: 'Simon', categoryId: 0, active: true }).subscribe();
  }

}

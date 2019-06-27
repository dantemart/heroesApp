import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRequestService } from './../app-request.service';

import { Hero } from './../../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private _appRequestService: AppRequestService
  ) { }

  public getHeroes(): Observable<any> {
    return this._appRequestService.get('/Heroes', {})
  }

  public postHero(hero: Hero): Observable<any> {
    return this._appRequestService.post('/Heroes', hero)
  }

  public deleteHero(heroId: string): Observable<any> {
    return this._appRequestService.delete('/Heroes', heroId)
  }

  public putHero(hero: Hero, heroId: string): Observable<any> {
    return this._appRequestService.put('/Heroes', hero, heroId)
  }
}

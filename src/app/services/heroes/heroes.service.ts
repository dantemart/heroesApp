import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Storage } from '@ionic/storage';

import { AppRequestService } from './../app-request.service';
import { NetworkService, ConnectionStatus } from '../network/network.service';
import { OfflineService } from '../offline/offline.service';

import { Hero } from './../../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private storage: Storage,
    private _appRequestService: AppRequestService,
    private _networkService: NetworkService,
    private _offlineService: OfflineService
  ) { }

  public getHeroes(forceRefresh: boolean): Observable<any> {
    if (this._networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('users'));
    } else {
      return this._appRequestService.get('/Heroes', {}).pipe(
        tap(res => {
          this.setLocalData('heroes', res)
        })
      )
    }
  }

  public postHero(hero: Hero): Observable<any> {
    let url = '/Heroes';
    if (this._networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this._offlineService.storeRequest(url, 'POST', hero));
    } else {
      return this._appRequestService.post(url, hero).pipe(
        catchError(err => {
          this._offlineService.storeRequest(url, 'POST', hero);
          throw new Error(err);
        })
      )
    }
  }

  public deleteHero(heroId: string): Observable<any> {
    return this._appRequestService.delete('/Heroes', heroId)
  }

  public putHero(hero: Hero, heroId: string): Observable<any> {
    return this._appRequestService.put('/Heroes', hero, heroId)
  }

  private setLocalData(key, data) {
    this.storage.set(`${key}`, data);
  }

  private getLocalData(key) {
    return this.storage.get(`${key}`);
  }
}

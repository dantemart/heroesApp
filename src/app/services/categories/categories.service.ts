import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRequestService } from './../app-request.service';

import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private _appRequestService: AppRequestService
  ) { }

  public getCategories(): Observable<any> {
    return this._appRequestService.get('/Category', {})
  }

  public postCategory(category: Category): Observable<any> {
    return this._appRequestService.post('/Category', category)
  }

  public deleteCategory(categoryId: string): Observable<any> {
    return this._appRequestService.delete('/Category', categoryId)
  }

  public putCategory(category: Category, categoryId: string): Observable<any> {
    return this._appRequestService.put('/Heroes', category, categoryId)
  }
}

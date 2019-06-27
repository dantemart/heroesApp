import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment, API_URL, API_ACCESS_KEY } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppRequestService {

  private header: HttpHeaders
  private apiUrl: string

  constructor(
    public http: HttpClient
  ) {
    this.apiUrl = API_URL
    this.prepareHeader()
  }

  private prepareHeader() {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json', 'accessKey': API_ACCESS_KEY });
  }

  private extractData(res: any) {
    try {
      const body = res;
      return body.data || {};
    } catch (e) {
      return null;
    }
  }

  private handleError(response: HttpErrorResponse) {
    const body = response.error;
    return Observable.throw(body);
  }

  public get(endpoint: string, params = {}, id?: string): Observable<any> {
    return this.http.get(
      id ? `${this.apiUrl}${endpoint}${id}` : `${this.apiUrl}${endpoint}`,
      { headers: this.header, params }
    )
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  public post(endpoint: string, postObject: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${endpoint}`,
      postObject,
      { headers: this.header }
    )
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  public put(endpoint: string, postObject: any, id: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}${endpoint}${id}`,
      postObject,
      { headers: this.header }
    )
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError))
  }

  public delete(endpoint: string, id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}${endpoint}${id}`,
      { headers: this.header }
    )
    // .pipe(map(this.extractData))
    // .pipe(catchError(this.handleError))
  }

}
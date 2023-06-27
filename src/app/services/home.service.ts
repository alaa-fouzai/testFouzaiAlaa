import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
   }
  async fetchDataFromServer() {
    return await this.http.get<any>(environment.ServerURL).toPromise()
  }
}

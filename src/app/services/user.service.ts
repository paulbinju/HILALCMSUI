import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iusers } from '../interfaces/iusers.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = environment.apiUrl + `/User`;
  constructor(private http: HttpClient) { }

  getUsers() {
    console.log(this._url);
    return this.http.get<Iusers>(this._url);
  }

  postUser(iusers) {
    return this.http.post<Iusers>(this._url, iusers);
  }
  putUser(iusers) {
    return this.http.put<Iusers>(this._url + `/` + iusers.userID, iusers);
  }

  delUser(iusers) {
    return this.http.delete<Iusers>(this._url + `/` + iusers.userID, iusers);
  }
}

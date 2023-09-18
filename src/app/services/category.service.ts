import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategories } from '../interfaces/ICategories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _url: string = environment.apiUrl + `/Category`;

  constructor(private http: HttpClient ) { }

  getCategory() {
    return this.http.get<any>(this._url);
  }

  postCategory(ICategories) {
    return this.http.post<ICategories>(this._url, ICategories);
  }
  putCategory(ICategories) {
    return this.http.put<ICategories>(this._url + `/` + ICategories.categoryID, ICategories);
  }

  delCategory(ICategories) {
    return this.http.delete<ICategories>(this._url + `/` + ICategories.categoryID, ICategories);
  }
}

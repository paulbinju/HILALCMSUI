import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Isubcategories } from '../interfaces/ISubCategories';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private _url: string = environment.apiUrl + `/SubCategory`;

  constructor(private http: HttpClient ) { }

  getSubCategory() {
    return this.http.get<any>(this._url);
  }

  postSubCategory(ISubCategories) {
    return this.http.post<Isubcategories>(this._url, ISubCategories);
  }
  putSubCategory(ISubCategories) {
    return this.http.put<Isubcategories>(this._url + `/` + ISubCategories.subCategoryID, ISubCategories);
  }

  delSubCategory(ISubCategories) {
    return this.http.delete<Isubcategories>(this._url + `/` + ISubCategories.subCategoryID, ISubCategories);
  }
}

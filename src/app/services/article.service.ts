import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IArticles } from '../interfaces/IArticles';
import { IArticleExtensions } from '../interfaces/i-article-extensions';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _url: string = environment.apiUrl + `/Article`;
  private _urlExt: string = environment.apiUrl + `/ArticleExtension`;
  constructor(private http: HttpClient) { }
  getArticle() {
    return this.http.get<any>(this._url);
  }
  getArticlebyID(articleID) {
    return this.http.get<any>(this._url + `/` + articleID);
  }
  getArticlebyPubID(publicationID,issueID) {
    return this.http.get<any>(this._url + `/ByPubID/` + publicationID + `/`+issueID);
  }
  getArticlebyCategoryID(categoryID) {
    return this.http.get<any>(this._url + `/ByCategoryId/` + categoryID);
  }
  getArticlebyDate(createdDate) {
    return this.http.get<any>(this._url + `/ByDate/` + createdDate);
  }
  postArticle(any) {
    return this.http.post<IArticles>(this._url, any);
  }
  putArticle(any, articleID) {
    return this.http.put<IArticles>(this._url + `/` + articleID, any);
  }
  delArticle(articleID) {
    return this.http.delete<IArticles>(this._url + `/` + articleID);
  }

  getArticleExtensionbyArticleID(articleID){
    return this.http.get<any>(this._urlExt + `/` + articleID);
  }

  postArticleExtension(IArticleExtensions) {
    return this.http.post<any>(this._urlExt, IArticleExtensions);
  }

  delArticleExtension(articleExtensionID) {
    return this.http.delete<IArticles>(this._urlExt + `/` + articleExtensionID);
  }

}
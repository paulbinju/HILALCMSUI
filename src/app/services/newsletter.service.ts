import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INewsletters } from '../interfaces/i-newsletters';
import { INewsletterDetails } from '../interfaces/inewsletter-details';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  iNewsletters: INewsletters;
  private _url: string = environment.apiUrl + `/Newsletters`;
  private _urlDetails: string = environment.apiUrl + `/NewsletterDetail`;

  constructor(private http: HttpClient) { }

  getNewsletters(publicationID) {
    return this.http.get<any>(this._url + `/` + publicationID);
  }

  getNewslettersById(newsletterID) {
    return this.http.get<any>(this._url + `/ById/` + newsletterID);
  }



  postNewsletters(iNewsletters) {
    console.log(iNewsletters.value);
    return this.http.post<INewsletters>(this._url, iNewsletters.value);
  }

  postNewsletterDetail(iNewsletterDetails) {
    console.log(iNewsletterDetails);
    return this.http.post<INewsletterDetails>(this._urlDetails, iNewsletterDetails);
  }



  // putNewsletters(iNewsletters) {
  //   console.log('hello ',iNewsletters)
  //   return this.http.put<INewsletters>(this._url + `/` + iNewsletters.issueID, iNewsletters);
  // }

  delNewsletters(nlid) {
    return this.http.delete<INewsletters>(this._url + `/` + nlid);
  }
}

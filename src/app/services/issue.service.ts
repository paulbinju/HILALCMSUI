import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IIssues } from '../interfaces/iissues';


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private _url: string = environment.apiUrl + `/Issue`;
  constructor(private http: HttpClient) { }

  getIssues(publicationID) {
    return this.http.get<any>(this._url+`/`+publicationID);
  }

  postIssues(iIssues) {
    return this.http.post<IIssues>(this._url, iIssues);
  }
  putIssues(iIssues) {
    console.log('hello ',iIssues)
    return this.http.put<IIssues>(this._url + `/` + iIssues.issueID, iIssues);
  }

  delIssues(iIssues) {
    return this.http.delete<IIssues>(this._url + `/` + iIssues.issueID, iIssues);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { environment } from 'src/environments/environment'; 
import { Ilookup } from '../interfaces/ilookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private _url: string = environment.apiUrl+`/Lookup`;
  constructor(private http: HttpClient) { }

  getLookup(){
    return this.http.get<any>(this._url);
  }

  postLookup(lookupdata){
console.log(`lookupdata`, lookupdata);
    return this.http.post<Ilookup>(this._url,lookupdata);
  }

}

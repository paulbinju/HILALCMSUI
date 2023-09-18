import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private httpClient: HttpClient) { }

  fileUpload(fileToUpload: FormGroup) {
    const endpoint = 'https://localhost:7239/api/Article/UploadFile';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8'
      })
    };

    const formData = new FormData();
    formData.append('asdfa.jpg', fileToUpload.value.file);

    console.log(formData);
    return this.httpClient.post(endpoint, formData, httpOptions);
  }
}

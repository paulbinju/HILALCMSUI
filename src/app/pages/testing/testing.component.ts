import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.sass']
})
export class TestingComponent implements OnInit  {

  SERVER_URL = "https://localhost:7239/api/Article/UploadFile";
  uploadForm: FormGroup;  
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
 
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('ddd', '88');

    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });


    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
   
}

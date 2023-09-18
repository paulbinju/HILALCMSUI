import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-articleextension',
  templateUrl: './articleextension.component.html',
  styleUrls: ['./articleextension.component.css']
})
export class ArticleextensionComponent implements OnInit {
  public Editor = ClassicEditor;
  myForm: FormGroup;
  imageURL: string;

  constructor(private matdialogRef: MatDialogRef<ArticleextensionComponent>, private fb: FormBuilder, 
    private articleExtensionService: ArticleService,
    @Inject(MAT_DIALOG_DATA) public data: { extensionType: string, articleID: number }) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      mediaURL: [``],
      imageURL:[],
      textContent: [``],
      extensionOrder: [1],
      articleID: [this.data.articleID],
      articleExtensionTypeID: [this.data.extensionType]
    });
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('imageURL').setValue(file);
    }

    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  
  onSubmit() {

    const formData = new FormData();
    
    if(this.data.extensionType == '16'){
    formData.append('mediaURL', this.myForm.get('mediaURL').value);
    formData.append('textContent', `-`);

    }

    if(this.data.extensionType == '15'){
      formData.append('mediaURL', `-`);
      formData.append('imageURL', this.myForm.get('imageURL').value);
      formData.append('textContent', this.myForm.get('textContent').value);
    }

    if(this.data.extensionType == '14'){
      formData.append('mediaURL', `-`);
      formData.append('imageURL', ``);
      formData.append('textContent', this.myForm.get('textContent').value);
    }

    formData.append('extensionOrder', '1');
    formData.append('articleID', ``+this.data.articleID);
    formData.append('articleExtensionTypeID', this.data.extensionType);

  //  formData.forEach((value,key) => {
  //     console.log(key+" "+value)
  //   });

    this.articleExtensionService.postArticleExtension(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.matdialogRef.close();
  }


}

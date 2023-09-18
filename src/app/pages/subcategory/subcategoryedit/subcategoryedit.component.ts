import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { SubCategoryService } from 'src/app/services/SubCategory.service';
import { LookupService } from 'src/app/services/lookup.service';
import { Isubcategories } from 'src/app/interfaces/ISubCategories';
import { CategoryService } from 'src/app/services/category.service';
import { ICategories } from 'src/app/interfaces/ICategories';
@Component({
  selector: 'app-SubCategoryedit',
  templateUrl: './SubCategoryedit.component.html',
  styleUrls: ['./SubCategoryedit.component.css']
})
export class SubCategoryeditComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  articletypes:Ilookup;
  categories:ICategories;
  
  constructor(private fb: FormBuilder, private SubCategoryservice: SubCategoryService, private router: Router,
    private matdialogRef: MatDialogRef<SubCategoryeditComponent>, private _lookupservice: LookupService,
    private _categories : CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { groupNamex: string, isubcategories: Isubcategories }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subCategoryID:[this.data.isubcategories.subCategoryID],
      subCategoryName: [this.data.isubcategories.subCategoryName, Validators.required],
      publicationID: [this.data.isubcategories.publicationID],
      publication:[this.data.isubcategories.publication],
      articleTypeID: [this.data.isubcategories.articleTypeID],
      articleType:[this.data.isubcategories.articleType],
      categoryID: [this.data.isubcategories.categoryID],
      categoryName:[this.data.isubcategories.categoryName],
    });

    
    this.loadData();

  }

  loadData() {

    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == 'Publications');
        this.lookup = result;
        this.articletypes = data.filter(ltype => ltype.groupName == 'ArticleTypes')
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })

    this._categories.getCategory().subscribe({
      next: data => {
        this.categories = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  onSubmit(form: FormGroup) {
    this.SubCategoryservice.putSubCategory(form.value).subscribe();
    this.matdialogRef.close();
  }
}

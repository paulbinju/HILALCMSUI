import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { SubCategoryService } from 'src/app/services/SubCategory.service';
import { LookupService } from 'src/app/services/lookup.service';
import { ICategories } from 'src/app/interfaces/ICategories';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-SubCategoryadd',
  templateUrl: 'subcategoryadd.component.html',
  //styleUrls: ['']
})
export class SubCategoryaddComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  articletypes: Ilookup;
  categories:ICategories;

  constructor(private fb: FormBuilder, private SubCategoryservice: SubCategoryService, private router: Router,
    private matdialogRef: MatDialogRef<SubCategoryaddComponent>, private _lookupservice: LookupService,
    private _categories: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { groupName: string }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      subCategoryName: ['', Validators.required],
      publicationID: [``],
      publication:[''],
      articleTypeID: [``],
      articleType:[''],
      categoryID:[``],
      categoryName:[``]
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
    this.SubCategoryservice.postSubCategory(form.value).subscribe();
    this.matdialogRef.close();
  }
}

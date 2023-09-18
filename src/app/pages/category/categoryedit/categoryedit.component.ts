import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICategories } from 'src/app/interfaces/icategories';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { CategoryService } from 'src/app/services/category.service';
import { LookupService } from 'src/app/services/lookup.service';
@Component({
  selector: 'app-Categoryedit',
  templateUrl: './categoryedit.component.html',
  styleUrls: ['./categoryedit.component.css']
})
export class CategoryeditComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  articletypes:Ilookup;
  constructor(private fb: FormBuilder, private categoryservice: CategoryService, private router: Router,
    private matdialogRef: MatDialogRef<CategoryeditComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { groupNamex: string, icategory: ICategories }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      categoryID:[this.data.icategory.categoryID],
      categoryName: [this.data.icategory.categoryName, Validators.required],
      categoryCode: [this.data.icategory.categoryCode, Validators.required],
      publicationID: [this.data.icategory.publicationID],
      publication:[this.data.icategory.publication],
      refNo:[0]
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
  }

  onSubmit(form: FormGroup) {
    this.categoryservice.putCategory(form.value).subscribe();
    this.matdialogRef.close();
  }
}

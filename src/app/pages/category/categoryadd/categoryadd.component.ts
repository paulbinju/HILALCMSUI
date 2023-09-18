import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { CategoryService } from 'src/app/services/category.service';
import { LookupService } from 'src/app/services/lookup.service';
@Component({
  selector: 'app-categoryadd',
  templateUrl: 'categoryadd.component.html',
  //styleUrls: ['']
})
export class CategoryaddComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;

  constructor(private fb: FormBuilder, private categoryservice: CategoryService, private router: Router,
    private matdialogRef: MatDialogRef<CategoryaddComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { groupName: string }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryCode:['', Validators.required],
      publicationID: [``],
      publication:[''],
      refNo:[0]
    });
    this.loadData();
  }

  loadData() {
    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == 'Publications');
        this.lookup = result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  onSubmit(form: FormGroup) {
    this.categoryservice.postCategory(form.value).subscribe();
    this.matdialogRef.close();
  }
}

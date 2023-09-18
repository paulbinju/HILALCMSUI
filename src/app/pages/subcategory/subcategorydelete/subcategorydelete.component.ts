import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Isubcategories } from 'src/app/interfaces/ISubCategories';
import { SubCategoryService } from 'src/app/services/SubCategory.service';

@Component({
  selector: 'app-SubCategorydelete',
  templateUrl: './SubCategorydelete.component.html',
  //styleUrls: ['./SubCategorydelete.component.sass']
})
export class SubCategorydeleteComponent implements OnInit {
  constructor(private SubCategoryservice:SubCategoryService ,private matdialogRef: MatDialogRef<SubCategorydeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { isubcategories: Isubcategories }
    ) { }

  ngOnInit(): void {
  }

  

  deleteconfirm() {
    console.log(this.data.isubcategories);
    this.SubCategoryservice.delSubCategory(this.data.isubcategories).subscribe();
    this.matdialogRef.close();
  }


}

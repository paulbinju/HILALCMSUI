import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategories } from 'src/app/interfaces/icategories';
import { Iusers } from 'src/app/interfaces/iusers.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-Categorydelete',
  templateUrl: './categorydelete.component.html',
  //styleUrls: ['./Categorydelete.component.sass']
})
export class CategorydeleteComponent implements OnInit {
  constructor(private categoryservice:CategoryService ,private matdialogRef: MatDialogRef<CategorydeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { icategory: ICategories }
    ) { }

  ngOnInit(): void {
  }


  deleteconfirm() {
    this.categoryservice.delCategory(this.data.icategory).subscribe();
    this.matdialogRef.close();
  }


}

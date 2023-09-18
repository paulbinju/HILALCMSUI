import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Isubcategories } from 'src/app/interfaces/ISubCategories';
import { SubCategoryService } from 'src/app/services/SubCategory.service';
import { SubCategoryaddComponent } from '../subcategoryadd/categoryadd.component';
import { SubCategorydeleteComponent } from '../subcategorydelete/subcategorydelete.component';
import { SubCategoryeditComponent } from '../subcategoryedit/subcategoryedit.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubCategoryviewComponent implements OnInit {
  displayedColumns: string[] = ['subCategoryID', 'subCategoryName', 'articleType',  'categoryName','publication', 'action'];
  isubcategories: Isubcategories;

  constructor(private subcategoryservice: SubCategoryService , private dialog: MatDialog, private spinnerservice: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.spinnerservice.show();
    setTimeout(() => {
      this.subcategoryservice.getSubCategory().subscribe({
        next: data => {
          this.isubcategories = data;
          this.spinnerservice.hide();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }, 1000);
  }

  addnew() {
    this.dialog.open(SubCategoryaddComponent, {
      width: '60%',
      data: {
        groupName: 'Role'
      },
    }).afterClosed().subscribe(() => this.loaddata());
  }

  edit(isubcategories) {
    this.dialog.open(SubCategoryeditComponent, {
      width: '60%',
      data: {
        groupNamex: 'Role',
        isubcategories: isubcategories
      },
    }).afterClosed().subscribe(() => this.loaddata());
  }

  delete(isubcategories) {

    this.dialog.open(SubCategorydeleteComponent, {
      width: '30%',
      data: {
        isubcategories: isubcategories
      }
    }).afterClosed().subscribe(() => this.loaddata());

  }


}

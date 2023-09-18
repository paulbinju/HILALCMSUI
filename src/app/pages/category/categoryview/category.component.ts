import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICategories } from 'src/app/interfaces/icategories';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryaddComponent } from '../categoryadd/categoryadd.component';
import { CategorydeleteComponent } from '../categorydelete/categorydelete.component';
import { CategoryeditComponent } from '../categoryedit/categoryedit.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryviewComponent implements OnInit {
  displayedColumns: string[] = ['categoryID', 'categoryName','categoryCode',  'publication','refNo', 'action'];
  icategories: ICategories;

  constructor(private categoryservice: CategoryService, private dialog: MatDialog, private spinnerservice: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.spinnerservice.show();
    setTimeout(() => {
      this.categoryservice.getCategory().subscribe({
        next: data => {
          this.icategories = data;
          this.spinnerservice.hide();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }, 1000);
  }

  addnew() {
    this.dialog.open(CategoryaddComponent, {
      width: '60%',
      data: {
        groupName: 'Role'
      },
    }).afterClosed().subscribe(() => this.loaddata());
  }

  edit(icategory) {
    this.dialog.open(CategoryeditComponent, {
      width: '60%',
      data: {
        groupNamex: 'Role',
        icategory: icategory
      },
    }).afterClosed().subscribe(() => this.loaddata());
  }

  delete(icategory) {

    this.dialog.open(CategorydeleteComponent, {
      width: '30%',
      data: {
        icategory: icategory
      }
    }).afterClosed().subscribe(() => this.loaddata());

  }


}

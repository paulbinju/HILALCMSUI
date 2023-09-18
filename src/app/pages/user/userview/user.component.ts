import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iusers } from 'src/app/interfaces/iusers.model';
import { UserService } from 'src/app/services/user.service';
import { UseraddComponent } from '../useradd/useradd.component';
import { UserdeleteComponent } from '../userdelete/userdelete.component';
import { UsereditComponent } from '../useredit/useredit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserviewComponent implements OnInit {
  displayedColumns: string[] = ['userID', 'name', 'emailID', 'password', 'role', 'action'];
  iusers: Iusers;

  constructor(private userservice: UserService, private dialog: MatDialog, private spinnerservice: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.spinnerservice.show();
    setTimeout(() => {
      this.userservice.getUsers().subscribe({
        next: data => {
          this.iusers = data;
          this.spinnerservice.hide();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }, 1000);
  }

  addnew() {
    this.dialog.open(UseraddComponent, {
      width: '60%',
      data: {
        groupName: 'Role'
      },
    }).afterClosed().subscribe(() => this.loaddata());
  }

  edit(iuser) {
    this.dialog.open(UsereditComponent, {
      width: '60%',
      data: {
        groupNamex: 'Role',
        iuser: iuser
      },
    }).afterClosed().subscribe(() => this.loaddata());
  }

  delete(iuser) {

    this.dialog.open(UserdeleteComponent, {
      width: '30%',
      data: {
        iuser: iuser
      }
    }).afterClosed().subscribe(() => this.loaddata());

  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Iusers } from 'src/app/interfaces/iusers.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userdelete',
  templateUrl: './userdelete.component.html',
  styleUrls: ['./userdelete.component.sass']
})
export class UserdeleteComponent implements OnInit {
  constructor(private userservice: UserService,private matdialogRef: MatDialogRef<UserdeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { iuser: Iusers }
    ) { }

  ngOnInit(): void {
  }


  deleteconfirm() {
    this.userservice.delUser(this.data.iuser).subscribe();
    this.matdialogRef.close();
  }


}

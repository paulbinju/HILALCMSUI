import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { Iusers } from 'src/app/interfaces/iusers.model';
import { LookupService } from 'src/app/services/lookup.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router,
    private matdialogRef: MatDialogRef<UsereditComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { groupNamex: string, iuser: Iusers }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      userID:[this.data.iuser.userID],
      name: [this.data.iuser.name, Validators.required],
      emailID: [this.data.iuser.emailID, [Validators.required]],
      password: [this.data.iuser.password],
      roleID: [this.data.iuser.roleID],
      title:['']
    });

    
    this.loadData();

  }

  loadData() {

    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == 'Roles');
        this.lookup = result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  onSubmit(form: FormGroup) {
    this.userservice.putUser(form.value).subscribe();
    this.matdialogRef.close();
  }
}

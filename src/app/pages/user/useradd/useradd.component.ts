import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { LookupService } from 'src/app/services/lookup.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.sass']
})
export class UseraddComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router,
    private matdialogRef: MatDialogRef<UseraddComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { groupName: string }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      emailID: ['', [Validators.required]],
      password: [``],
      roleID: [``],
      title: ['']
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
    this.userservice.postUser(form.value).subscribe();
    this.matdialogRef.close();
  }
}

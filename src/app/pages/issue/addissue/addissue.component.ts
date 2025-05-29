import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { IssueService } from 'src/app/services/issue.service';
import { LookupService } from 'src/app/services/lookup.service';
@Component({
  selector: 'app-addissue',
  templateUrl: './addissue.component.html',
  styleUrls: ['./addissue.component.css']
})
export class AddIssueComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  constructor(private fb: FormBuilder, private issueservice: IssueService, private router: Router,
    private matdialogRef: MatDialogRef<AddIssueComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { publicationID: number }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      refNo: [0],
      publicationID: [this.data.publicationID, Validators.required],
      publication: [``],
      issueNo: [``, Validators.required],
      volume: [``, Validators.required],
      issueName: [``, Validators.required],
      issueDate: [``, Validators.required],
      published: [true],
    });
    this.loadData();
  }

  loadData() {

    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == 'Publications').filter(p => p.lookupID != 1);
        this.lookup = result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  onSubmit(form: FormGroup) {
    this.issueservice.postIssues(form.value).subscribe();
    localStorage.setItem('publicationID',form.value.publicationID);
    this.matdialogRef.close({ pubid: form.value.publicationID });
  }
}

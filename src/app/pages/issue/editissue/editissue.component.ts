import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IIssues } from 'src/app/interfaces/iissues';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { IssueService } from 'src/app/services/issue.service';
import { LookupService } from 'src/app/services/lookup.service';
@Component({
  selector: 'app-editissue',
  templateUrl: './editissue.component.html',
  styleUrls: ['./editissue.component.css']
})
export class EditissueComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  constructor(private fb: FormBuilder, private issueservice:IssueService , private router: Router,
    private matdialogRef: MatDialogRef<EditissueComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { groupNamex: string, iissues: IIssues }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      issueID : [this.data.iissues.issueID],
      refNo: [this.data.iissues.refNo],
      publicationID: [this.data.iissues.publicationID, Validators.required],
      publication:[this.data.iissues.publication],
      issueNo: [this.data.iissues.issueNo, Validators.required],
      volume: [this.data.iissues.volume, Validators.required],
      issueName: [this.data.iissues.issueName, Validators.required],
      issueDate: [this.data.iissues.issueDate, Validators.required],
      published: [this.data.iissues.published],
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
    this.issueservice.putIssues(form.value).subscribe();
    this.matdialogRef.close();
  }
}

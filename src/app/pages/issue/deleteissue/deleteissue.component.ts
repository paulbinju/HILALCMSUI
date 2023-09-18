import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IIssues } from 'src/app/interfaces/iissues';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-deleteissue',
  templateUrl: './deleteissue.component.html',
  styleUrls: ['./deleteissue.component.sass']
})
export class DeleteissueComponent implements OnInit {
  constructor(private issueservice: IssueService, private matdialogRef: MatDialogRef<DeleteissueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { iissues: IIssues }
  ) { }

  ngOnInit(): void {
  }
  deleteconfirm() {
    console.log(this.data.iissues);
    this.issueservice.delIssues(this.data.iissues).subscribe();
    this.matdialogRef.close();
  }
}

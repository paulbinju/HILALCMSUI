import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IIssues } from 'src/app/interfaces/iissues';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { IssueService } from 'src/app/services/issue.service';
import { LookupService } from 'src/app/services/lookup.service';
import { AddIssueComponent } from '../addissue/addissue.component';
import { DeleteissueComponent } from '../deleteissue/deleteissue.component';
import { EditissueComponent } from '../editissue/editissue.component';


@Component({
  selector: 'app-user',
  templateUrl: './viewissue.component.html',
  styleUrls: ['./viewissue.component.css']
})
export class ViewIssueComponent implements OnInit {
  displayedColumns: string[] = ['publication', 'issueNo', 'volume', 'issueName', 'issueDate', 'action'];
  iissues: IIssues;
  lookup: Ilookup;
  pubid: number = 2;
  constructor(private issueservice: IssueService, private dialog: MatDialog, private spinnerservice: NgxSpinnerService,
    private _lookupservice: LookupService, private router: Router
  ) { }

  ngOnInit(): void {
    this.loaddata(this.pubid);
  }




  loaddata(pubid) {
    this.pubid = pubid;
    this.spinnerservice.show();
    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == 'Publications').filter(p => p.lookupID != 1);
        this.lookup = result;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })



    setTimeout(() => {
      this.issueservice.getIssues(pubid).subscribe({
        next: data => {
          this.iissues = data;
          this.spinnerservice.hide();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }, 1000);
  }

  addnew() {
    this.dialog.open(AddIssueComponent, {
      width: '60%',
      data: {
        publicationID: this.pubid
      },
    }).afterClosed().subscribe(result => {
      this.loaddata(result.pubid);
    });
  }

  edit(iissues) {
    this.dialog.open(EditissueComponent, {
      width: '60%',
      data: {
        groupNamex: 'Role',
        iissues: iissues
      },
    }).afterClosed().subscribe(() => this.loaddata(this.pubid));
  }

  delete(iissues) {

    this.dialog.open(DeleteissueComponent, {
      width: '30%',
      data: {
        iissues: iissues
      }
    }).afterClosed().subscribe(() => this.loaddata(this.pubid));

  }

  selectIssue(iissues) {
    localStorage.setItem("PublicationID", iissues.publicationID);
    localStorage.setItem("issueID", iissues.issueID);
    this.router.navigate([`./pages/articleviewmag`]);

  }


}

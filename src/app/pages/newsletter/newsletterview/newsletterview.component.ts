import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { INewsletters } from 'src/app/interfaces/i-newsletters';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { LookupService } from 'src/app/services/lookup.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { environment } from 'src/environments/environment';
import { NewsletteraddComponent } from '../newsletteradd/newsletteradd.component';
import { NewsletterdeleteComponent } from '../newsletterdelete/newsletterdelete.component';



@Component({
  selector: 'app-user',
  templateUrl: './newsletterview.component.html',
  styleUrls: ['./newsletterview.component.css']
})
export class NewsletterviewComponent implements OnInit {
  displayedColumns: string[] = ['publication', 'newsletterName', 'action'];
  iNewsletters: INewsletters;
  lookup: Ilookup;
  pubid: number = 2;
  private _url: string = environment.apiUrl + `/Newsletters`;
  constructor(private newsletterservice: NewsletterService, private dialog: MatDialog, private spinnerservice: NgxSpinnerService,
    private _lookupservice: LookupService, private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
      this.newsletterservice.getNewsletters(pubid).subscribe({
        next: data => {
          this.iNewsletters = data;
          console.log(this.iNewsletters);
          this.spinnerservice.hide();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }, 1000);
  }

  addnew() {
    this.dialog.open(NewsletteraddComponent, {
      width: '60%',
      data: {
        publicationID: this.pubid
      },
    }).afterClosed().subscribe(result => {
      this.loaddata(result.pubid);
    });
  }



  delete(nlid) {
    console.log(nlid);
    this.dialog.open(NewsletterdeleteComponent, {
      width: '30%',
      data: {
        nlid: nlid
      }
    }).afterClosed().subscribe(() => this.loaddata(this.pubid));

  }

  selectIssue(newsletterID) {
    this.router.navigate([`./pages/newsletterdetails/` + newsletterID]);
  }
  downloadNl(newsletterID, publicationID) {
    let pub = '';
    if (publicationID == 2) {
      pub = 'GC';
    }
    else if (publicationID == 3) {
      pub = 'GI';
    }
    else if (publicationID == 4) {
      pub = 'OGN';
    }
    else if (publicationID == 5) {
      pub = 'TTN';
    }
    else if (publicationID == 6) {
      pub = 'ABC';
    }
    window.location.href = this._url + '/DownloadNl/' + pub + '/' + newsletterID;
  }

}

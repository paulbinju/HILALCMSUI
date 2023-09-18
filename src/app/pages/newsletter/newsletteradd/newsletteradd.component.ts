import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { IssueService } from 'src/app/services/issue.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
@Component({
  selector: 'app-newsletteradd',
  templateUrl: './newsletteradd.component.html',
  styleUrls: ['./newsletteradd.component.sass']
})
export class NewsletteraddComponent implements OnInit {
  myForm: FormGroup;
  groupName: string;
  lookup: Ilookup;
  constructor(private fb: FormBuilder, private newsletterService: NewsletterService, private router: Router,
    private matdialogRef: MatDialogRef<NewsletteraddComponent>, private _lookupservice: LookupService,
    @Inject(MAT_DIALOG_DATA) public data: { publicationID: number }

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      publicationID: [this.data.publicationID, Validators.required],
      newsletterName: [``, Validators.required],
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
    this.newsletterService.postNewsletters(form).subscribe();
    this.matdialogRef.close({ pubid: form.value.publicationID });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-articledelete',
  templateUrl: './newsletterdelete.component.html',
  styleUrls: ['./newsletterdelete.component.sass']
})
export class NewsletterdeleteComponent implements OnInit {

  constructor(private matdialogRef: MatDialogRef<NewsletterdeleteComponent>,private nlService: NewsletterService
    , @Inject(MAT_DIALOG_DATA) public data: { nlid: number }) { }

  ngOnInit(): void {
  }

  deleteconfirm() {
    this.nlService.delNewsletters(this.data.nlid).subscribe();
    this.matdialogRef.close();
  }

}

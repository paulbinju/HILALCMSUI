import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articledelete',
  templateUrl: './articledelete.component.html',
  styleUrls: ['./articledelete.component.sass']
})
export class ArticledeleteComponent implements OnInit {

  constructor(private matdialogRef: MatDialogRef<ArticledeleteComponent>,private articleService: ArticleService
    , @Inject(MAT_DIALOG_DATA) public data: { articleID: number }) { }

  ngOnInit(): void {
  }

  deleteconfirm() {
    this.articleService.delArticle(this.data.articleID).subscribe();
    this.matdialogRef.close();
  }

}

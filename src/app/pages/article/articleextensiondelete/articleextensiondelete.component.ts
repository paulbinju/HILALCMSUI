import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import { CategorydeleteComponent } from '../../category/categorydelete/categorydelete.component';

@Component({
  selector: 'app-articleextensiondelete',
  templateUrl: './articleextensiondelete.component.html',
  styleUrls: ['./articleextensiondelete.component.sass']
})
export class ArticleextensiondeleteComponent implements OnInit {

  constructor(private matdialogRef: MatDialogRef<ArticleextensiondeleteComponent>,
    private articleService: ArticleService,
    @Inject(MAT_DIALOG_DATA) public data: { articleExtensionID: number }
    ) { }

  ngOnInit(): void {
  }
  deleteconfirm() {
    this.articleService.delArticleExtension(this.data.articleExtensionID).subscribe();
    this.matdialogRef.close();
  }
}

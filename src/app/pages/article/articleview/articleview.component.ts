import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { locale } from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IArticles } from 'src/app/interfaces/IArticles';
import { ArticleService } from 'src/app/services/article.service';
import { ArticledeleteComponent } from '../articledelete/articledelete.component';

@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.css']
})
export class ArticleviewComponent implements OnInit {
  displayedColumns: string[] = ['articleID', 'title', 'categoryName', 'subCategoryName', 'createdDate', 'action'];
  articles: IArticles;
  today:Date = new Date();
  constructor(private articleService: ArticleService, private router: Router, private spinnerservice: NgxSpinnerService,
    private dialog: MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadArticles(formatDate(this.today,'dd/MM/YYYY','en-GB'));
  }

  loadArticles(createdDate) {
    this.spinnerservice.show();
    setTimeout(() => {

      this.articleService.getArticlebyDate(createdDate).subscribe({
        next: data => {
          this.articles = data;
          this.spinnerservice.hide();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
    }, 1000);
  }

  redirecttoadd() {
    localStorage.setItem("PublicationID", "1");
    this.router.navigate([`/pages/articleaddedit/0`]);
  }

  edit(articleID) {
    this.router.navigate([`/pages/articleaddedit/` + articleID]);
  }

  preview(articleID) {
    this.router.navigate([`/pages/articlepreview/` + articleID]);
  }



  deleteart(articleID) {
    this.dialog.open(ArticledeleteComponent, {
      width: '40%',
      data: {
        articleID: articleID
      }
    }).afterClosed().subscribe(() => {
      this.spinnerservice.show();
      setTimeout(() => {
        this.loadArticles(formatDate(this.today,'dd/MM/YYYY','en-GB'));
      }, 1000);
      setTimeout(() => {
        this.spinnerservice.hide();
        this.snackBar.open("Article Successfully Deleted!");
      }, 2000);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000);
    });
  }

  onChangeEvent(event){
    this.loadArticles(formatDate(event.value,'dd/MM/YYYY','en-GB'));
  }

}

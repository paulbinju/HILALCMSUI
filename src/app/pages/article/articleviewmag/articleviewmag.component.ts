import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IArticles } from 'src/app/interfaces/IArticles';
import { ArticleService } from 'src/app/services/article.service';
import { ArticledeleteComponent } from '../articledelete/articledelete.component';

@Component({
  selector: 'app-articleviewmag',
  templateUrl: './articleviewmag.component.html',
  styleUrls: ['./articleviewmag.component.sass']
})
export class ArticleviewmagComponent implements OnInit {
  displayedColumns: string[] = ['articleID', 'title', 'categoryName', 'createdDate', 'action'];
  articles: IArticles;
  constructor(private articleService: ArticleService, private router: Router, private spinnerservice: NgxSpinnerService,
    private dialog: MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.loadArticles();
  }

  loadArticles() {
    this.spinnerservice.show();
    setTimeout(() => {

      this.articleService.getArticlebyPubID(localStorage.getItem(`publicationID`),localStorage.getItem(`issueID`)).subscribe({
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
    this.router.navigate([`/pages/articleaddedit/0`]);
  }

  edit(articleID) {
    this.router.navigate([`/pages/articleaddedit/` + articleID]);
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
        this.loadArticles();
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

  preview(articleID) {
    this.router.navigate([`/pages/articlepreview/` + articleID]);
  }

}

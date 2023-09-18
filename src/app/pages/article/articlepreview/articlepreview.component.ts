import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleExtensions } from 'src/app/interfaces/i-article-extensions';
import { IArticles } from 'src/app/interfaces/IArticles';
import { ArticleService } from 'src/app/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articlepreview',
  templateUrl: './articlepreview.component.html',
  styleUrls: ['./articlepreview.component.sass']
})
export class ArticlepreviewComponent implements OnInit {

  articleID: number;
  iArticles: IArticles;
  iArticleExtensions: IArticleExtensions;
  public imageURL;
  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer, private router: Router
  ) { }

  ngOnInit(): void {
    this.imageURL = environment.imageURL;
    this.articleID = Number(this.activatedRoute.snapshot.paramMap.get('articleID'));
    this.articleService.getArticlebyID(this.articleID).subscribe({
      next: data => {
        this.iArticles = data;
      }
    });

    this.articleService.getArticleExtensionbyArticleID(this.articleID).subscribe({
      next: data => {
        this.iArticleExtensions = data;
      }
    })
  }

  loadArticleExtensions() {
    this.articleService.getArticleExtensionbyArticleID(this.articleID).subscribe(
      {
        next: data => {
          this.iArticleExtensions = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      }
    )
  }
  sanitizer(videoUrl) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  public imagePath(imagesource) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(environment.imageURL + imagesource);
  }

  closePreview() {
    this.router.navigate([`./pages/articleaddedit/` + this.articleID]);
  }
}

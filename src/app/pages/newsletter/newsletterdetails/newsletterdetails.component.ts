import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { IArticles } from 'src/app/interfaces/IArticles';
import { INewsletterDetails } from 'src/app/interfaces/inewsletter-details';
import { ArticleService } from 'src/app/services/article.service';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-newsletterdetails',
  templateUrl: './newsletterdetails.component.html',
  styleUrls: ['./newsletterdetails.component.sass']
})
export class NewsletterdetailsComponent implements OnDestroy, OnInit {
  private newsletterID: number;
  categoryID: number;
  public publication: string;
  public newsletterName: string;
  public newsCategoryID: number;
  iArticles: IArticles;


  MANY_ITEMS = 'MANY_ITEMS';
  public topnews = [];
  public latestnews = [];
  public sourcelist = [];



  ngOnInit(): void {

    this.rtr.routeReuseStrategy.shouldReuseRoute = () => false;
    this.newsletterID = Number(this.activatedRoute.snapshot.paramMap.get('newsletterID'));

    this.newsletterService.getNewslettersById(this.newsletterID).subscribe(
      data => {
        this.publication = data[0].publication;
        this.newsletterName = data[0].newsletterName;

        if (data[0].publicationID == 2) { //GC
          this.newsCategoryID = 3;
        }
        else if (data[0].publicationID == 3) { // GI
          this.newsCategoryID = 9;
        }
        else if (data[0].publicationID == 4) { // OGN
          this.newsCategoryID = 5;
        }
        else if (data[0].publicationID == 5) { // TTN
          this.newsCategoryID = 18;
        }
        else { // ABC
          this.newsCategoryID = 0;
        }


        this.articleService.getArticlebyCategoryID(this.newsCategoryID).subscribe(
          data => {
            this.iArticles = data;
            this.sourcelist = data;

            //   console.log(this.iArticles);
          }
        );
      }
    );
  }

  BAG = 'DRAGULA_EVENTS';
  subs = new Subscription();

  breadscrums = [
    {
      title: 'Drag & Drop',
      items: ['Apps'],
      active: 'Drag & Drop'
    }
  ];

  constructor(private dragulaService: DragulaService
    , private articleService: ArticleService
    , private newsletterDetailService: NewsletterService
    , private activatedRoute: ActivatedRoute
    , private newsletterService: NewsletterService
    , public rtr: Router
  ) {


    this.subs.add(dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
      })
    );


    this.dragulaService.createGroup('VAMPIRES', {});
    // articleService.getArticlebyCategoryID().subscribe((data)=>{

    // });
    this.dragulaService.dropModel('VAMPIRES').subscribe(({ el, target }) => {

      console.log(target);
    });

    this.subs.add(
      dragulaService.drag(this.BAG).subscribe(({ el }) => {
        this.removeClass(el, 'ex-moved');
      })
    );
    this.subs.add(
      dragulaService.drop(this.BAG).subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(
      dragulaService.over(this.BAG).subscribe(({ el, container }) => {
        console.log('over', container);
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(
      dragulaService.out(this.BAG).subscribe(({ el, container }) => {
        console.log('out', container);
        this.removeClass(container, 'ex-over');
      })
    );

    //spill
    dragulaService.createGroup('SPILL', {
      removeOnSpill: true
    });

    //revert
    dragulaService.createGroup('REVERT', {
      revertOnSpill: true
    });

    dragulaService.createGroup('COPYABLE', {
      copy: (el, source) => {
        return source.id === 'left';
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      }
    });
  }



  getArticles() {

    let tn = this.topnews.map(function (tnews) {
      return {
        sectionname: `Top News`,
        articleid: tnews.articleID
      }
    });


    let ln = this.latestnews.map(function (lnews) {
      return {
        sectionname: `Latest News`,
        articleid: lnews.articleID
      }
    });


    const nlid = this.newsletterID;
    const ncid = this.newsCategoryID;
    const nlservice = this.newsletterService;
    let nltcat = '';
    let nllcat = '';


    if (ncid == 2) {
      nltcat = 'Top Story';
      nllcat = 'Latest News';
    }
    else if (ncid == 3) {
      nltcat = 'Top Story';
      nllcat = 'Latest News';
    }
    else if (ncid == 4) {
      nltcat = 'Top Story';
      nllcat = 'Latest News';
    }
    else if (ncid == 5) {
      nltcat = 'Business News';
      nllcat = 'Analysis and Interviews';
    }
    else if (ncid == 6) {
      nltcat = 'Top Story';
      nllcat = 'Latest News';
    }


    tn.map(function (t) {

      const iNewsletterDetail: INewsletterDetails = {
        ArticleID: t.articleid,
        NewsletterID: nlid,
        CategoryID: 25,
        Category: nltcat,
        ArticleTitle: ''
      };
      nlservice.postNewsletterDetail(iNewsletterDetail).subscribe();

    });



    ln.map(function (l) {

      const iNewsletterDetail: INewsletterDetails = {
        ArticleID: l.articleid,
        NewsletterID: nlid,
        CategoryID: 26,
        Category: nllcat,
        ArticleTitle: ''
      };
      nlservice.postNewsletterDetail(iNewsletterDetail).subscribe();

    });


    setTimeout(() => {
      this.rtr.navigate([`./pages/newsletter`]);
    }, 2000);


    //  window.history.back();
  }


  ngOnDestroy() {
    this.dragulaService.destroy('VAMPIRES');
    this.dragulaService.destroy('SPILL');
    this.dragulaService.destroy('REVERT');
    this.dragulaService.destroy('COPYABLE');
    this.subs.unsubscribe();
  }

  private hasClass(el: Element, name: string): any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(
        new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'),
        ''
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticles } from 'src/app/interfaces/IArticles';
import { ICategories } from 'src/app/interfaces/ICategories';
import { IIssues } from 'src/app/interfaces/iissues';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { Isubcategories } from 'src/app/interfaces/ISubCategories';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { IssueService } from 'src/app/services/issue.service';
import { LookupService } from 'src/app/services/lookup.service';
import { SubCategoryService } from 'src/app/services/SubCategory.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ArticleextensionComponent } from '../articleextension/articleextension.component';
import { IArticleExtensions } from 'src/app/interfaces/i-article-extensions';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleextensiondeleteComponent } from '../articleextensiondelete/articleextensiondelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-articleaddedit',
  templateUrl: './articleaddedit.component.html',
  styleUrls: ['./articleaddedit.component.css']
})
export class ArticleaddeditComponent implements OnInit {
  public Editor = ClassicEditor;
  selectedFile: File | null = null;
  myForm: FormGroup;
  lookup: Ilookup;
  articletypes: Ilookup[];
  articletypesFiltered: Ilookup[];
  countries: Ilookup[];
  public editArticleID: number;
  icategories: ICategories[];
  icategoriesFiltered: ICategories[];
  iSubcategories: Isubcategories[];
  iSubcategoriesFiltered: Isubcategories[];
  iissues: IIssues[];
  iissuesFiltered: IIssues[];
  curUser: string;
  public iArticles: IArticles;
  public iArticleExtensions: IArticleExtensions;
  public imageURL: string;
  public showSubcategory: boolean = false;
  public showIssue: boolean = false;
  public showArticleType: boolean = true;
  public editImage: string;
  public saveButton: boolean = true;
  constructor(private fb: FormBuilder, private _lookupservice: LookupService, private categoryservice: CategoryService,
    private subcategoryservice: SubCategoryService, private issueservice: IssueService, private articleService: ArticleService,
    private router: Router, private httpClient: HttpClient, private dialog: MatDialog, private activatedRoute: ActivatedRoute,
    public domSanitizer: DomSanitizer, public spinnerservice: NgxSpinnerService, public snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.editArticleID = Number(this.activatedRoute.snapshot.paramMap.get('articleID'));
   
    this.myForm = this.fb.group({
      dateline: [``],
      byline: [``],
      slug: [``],
      title: [``, Validators.required],
      articleBody: [``],
      featuredImage: [``],
      featuredImageURL: [``],
      featuredImageCaption: [``],
      tags: [``],
      createdDate: [``],
      countryID: [0],
      country: [``],
      articleTypeID: [0],
      articleType: [``],
      publicationID: [null, Validators.required],
      publication: [``],
      authorID: [JSON.parse(localStorage.getItem('currentUser'))[0].userID],
      author: [JSON.parse(localStorage.getItem('currentUser'))[0].name],
      categoryID: [null, Validators.required],
      categoryName: [``],
      subCategoryID: [0],
      subCategoryName: [``],
      issueID: [0],
      issue: [``],
      publishToTA: [true],
      publishToMAG: [true],
      refNo: [0]
    });
    this.loadData();
  }
  loadData() {
    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == 'Publications');
        this.lookup = result;
        this.articletypes = data.filter(ltype => ltype.groupName == 'ArticleTypes')
        this.countries = data.filter(ltype => ltype.groupName == 'Countries')
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.categoryservice.getCategory().subscribe({
      next: data => {
        this.icategories = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
    this.subcategoryservice.getSubCategory().subscribe({
      next: data => {
        this.iSubcategories = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    if (this.editArticleID != 0) {

      this.spinnerservice.show();
      setTimeout(() => {
        this.articleService.getArticlebyID(this.editArticleID).subscribe({
          next: data => {
            this.iArticles = data;
            this.myForm.controls['publicationID'].setValue(this.iArticles[0].publicationID);
            this.myForm.controls['issueID'].setValue(this.iArticles[0].issueID);
            this.myForm.controls['categoryID'].setValue(this.iArticles[0].categoryID);
            this.myForm.controls['articleTypeID'].setValue(this.iArticles[0].articleTypeID);
            this.myForm.controls['subCategoryID'].setValue(this.iArticles[0].subCategoryID);
            this.myForm.controls['countryID'].setValue(this.iArticles[0].countryID);
            this.myForm.controls['authorID'].setValue(JSON.parse(localStorage.getItem('currentUser'))[0].userID);
            this.myForm.controls['author'].setValue(JSON.parse(localStorage.getItem('currentUser'))[0].name);
            this.myForm.get(`title`).setValue(this.iArticles[0].title);
            this.myForm.get(`byline`).setValue(this.iArticles[0].byline != `null` ? this.iArticles[0].byline : ``);
            this.myForm.get(`dateline`).setValue(this.iArticles[0].dateline != `null` ? this.iArticles[0].dateline : ``);
            this.myForm.get(`slug`).setValue(this.iArticles[0].slug != `null` ? this.iArticles[0].slug : ``);
            this.myForm.get(`tags`).setValue(this.iArticles[0].tags != `null` ? this.iArticles[0].tags : ``);
            this.myForm.get(`articleBody`).setValue(this.iArticles[0].articleBody);
            this.myForm.get(`featuredImageCaption`).setValue(this.iArticles[0].featuredImageCaption != `null` ? this.iArticles[0].featuredImageCaption : ``);
            this.myForm.get(`publishToTA`).setValue(this.iArticles[0].publishToTA);
            this.myForm.get(`publishToMAG`).setValue(this.iArticles[0].publishToMAG);

            if (this.iArticles[0].featuredImageURL != null) {
              this.imageURL = environment.imageURL + this.iArticles[0].featuredImageURL;
            }



          },
          error: error => {
            console.error('There was an error!', error);
          },
        });
      }, 1000);

      setTimeout(() => {
        this.onChangePublication(this.iArticles[0].publicationID);
        this.onChangeCategory(this.iArticles[0].categoryID);
        this.onChangeArticleType(this.iArticles[0].articleTypeID);
        this.spinnerservice.hide();
      }, 2000);

    }


    this.loadArticleExtensions();
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('featuredImage').setValue(file);
    }

    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  onSubmit() {

    if (this.myForm.valid) {

      this.saveButton = false;
      const formData = new FormData();
      formData.append('dateline', this.myForm.value.dateline);
      formData.append('byline', this.myForm.value.byline);
      formData.append('slug', this.myForm.value.slug);
      formData.append('title', this.myForm.value.title);
      formData.append('articleBody', this.myForm.value.articleBody);


      if (this.myForm.value.featuredImage != ``) {
        formData.append('featuredImage', this.myForm.get('featuredImage').value);
        formData.append('featuredImageURL', 'ta.jpg');
      }
      else {
        if (this.editArticleID != 0) {
          formData.append('featuredImageURL', this.iArticles[0].featuredImageURL);
        }
      }


      //default text values are only for initialization
      formData.append('featuredImageCaption', this.myForm.get('featuredImageCaption').value);
      formData.append('tags', this.myForm.value.tags);
      formData.append('countryID', this.myForm.value.countryID);
      formData.append('country', 'BAHRAIN');
      formData.append('articleTypeID', this.myForm.value.articleTypeID);
      formData.append('articleType', 'LATEST');
      formData.append('publicationID', this.myForm.value.publicationID);
      formData.append('publication', 'TRADEARABIA');
      formData.append('authorID', this.myForm.value.authorID);
      formData.append('author', this.myForm.value.author);
      formData.append('categoryID', this.myForm.value.categoryID);
      formData.append('categoryName', 'GC');
      formData.append('subCategoryID', this.myForm.value.subCategoryID);
      formData.append('subCategoryName', 'GCI');
      formData.append('issueID', this.myForm.value.issueID);
      formData.append('issue', '01jan');
      formData.append('publishToTA', this.myForm.value.publishToTA);
      formData.append('publishToMAG', this.myForm.value.publishToMAG);
      formData.append('refNo', '0');


      if (this.editArticleID == 0) {
        this.articleService.postArticle(formData).subscribe(
          (res) => {
            console.log(`reson - `, res);
            window.location.href = `../#/pages/articleaddedit/` + res.articleID;
          },
          (err) => console.log(err)
        );

      }
      else {
        console.log(`inside edit `);
        formData.append('articleID', '' + this.editArticleID);

        formData.forEach((value, key) => {
          console.log(key + " " + value)
        });

        this.articleService.putArticle(formData, this.editArticleID).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      this.snackBar.open("Article Successfully Saved!");

      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000);
    }
  }
  onChangePublication(selvalue) {
    this.icategoriesFiltered = this.icategories.filter(x => x.publicationID == selvalue);
    if (selvalue == 1) { // Tradearabia
      this.articletypesFiltered = this.articletypes.filter(x => x.title != 'Issue Article');
      this.showIssue = false;
      this.showSubcategory = true;
      this.showArticleType = true;
    }
    else {
      this.issueservice.getIssues(selvalue).subscribe({
        next: data => {
          this.iissues = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })
      this.myForm.value.articleTypeID = 13; // IssueArticle
      this.showSubcategory = false;
      this.showIssue = true;
      this.showArticleType = false;
    }
  }
  onChangeArticleType(selvalue) {
    this.iSubcategoriesFiltered = this.iSubcategories
      .filter(x => x.publicationID == this.myForm.value.publicationID)
      .filter(x => x.categoryID == this.myForm.value.categoryID)
      .filter(x => x.articleTypeID == selvalue);
  }
  onChangeCategory(selvalue) {
    this.iSubcategoriesFiltered = this.iSubcategories
      .filter(x => x.publicationID == this.myForm.value.publicationID)
      .filter(x => x.categoryID == selvalue)
      .filter(x => x.articleTypeID == this.myForm.value.articleTypeID);
  }
  ArticleExtension(extensiontype) {
    this.dialog.open(ArticleextensionComponent, {
      width: '60%',
      data: {
        extensionType: extensiontype,
        articleID: this.editArticleID
      },
    }).afterClosed().subscribe(() => {
      // this.spinnerservice.show();
      // setTimeout(() => {
      //   this.loadArticleExtensions();
      // }, 1000);
      // setTimeout(() => {
      //   this.spinnerservice.hide();
      // }, 2000);
      window.location.href = `../#/pages/articleaddedit/` + this.editArticleID;
    });
  }
  loadArticleExtensions() {
    this.articleService.getArticleExtensionbyArticleID(this.editArticleID).subscribe(
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
  delArtExt(articleExtensionID) {
    this.dialog.open(ArticleextensiondeleteComponent, {
      width: '30%',
      data: {
        articleExtensionID: articleExtensionID
      }
    }).afterClosed().subscribe(() => {
      this.spinnerservice.show();
      setTimeout(() => {
        this.loadArticleExtensions();
      }, 1000);
      setTimeout(() => {
        this.spinnerservice.hide();
      }, 2000);
    });
  }




  cancel() {
    this.router.navigate([`/pages/articleview`]);
  }

  preview() {
    this.router.navigate([`/pages/articlepreview/` + this.editArticleID]);
  }

}
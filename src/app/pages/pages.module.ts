import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AdvanceTableModule } from '../advtablelookup/advtablelookup.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { AddIssueComponent } from './issue/addissue/addissue.component';
import { ViewIssueComponent } from './issue/viewissue/viewissue.component';
import { DeleteissueComponent } from './issue/deleteissue/deleteissue.component';
import { EditissueComponent } from './issue/editissue/editissue.component';
import { UseraddComponent } from './user/useradd/useradd.component';
import { UserdeleteComponent } from './user/userdelete/userdelete.component';
import { UsereditComponent } from './user/useredit/useredit.component';
import { UserviewComponent } from './user/userview/user.component';
import { LookupaddComponent } from './lookup/lookupadd/lookupadd.component';
import { LookupComponent } from './lookup/lookupview/lookup.component';
import { CategoryaddComponent } from './category/categoryadd/categoryadd.component';
import { CategoryviewComponent } from './category/categoryview/category.component';
import { CategoryeditComponent } from './category/categoryedit/categoryedit.component';
import { CategorydeleteComponent } from './category/categorydelete/categorydelete.component';
import { ArticleaddeditComponent } from './article/articleaddedit/articleaddedit.component';
import { ArticleviewComponent } from './article/articleview/articleview.component';
import { SubCategoryaddComponent } from './subcategory/subcategoryadd/categoryadd.component';
import { SubCategoryeditComponent } from './subcategory/subcategoryedit/subcategoryedit.component';
import { SubCategorydeleteComponent } from './subcategory/subcategorydelete/subcategorydelete.component';
import { SubCategoryviewComponent } from './subcategory/subcategoryview/subcategory.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TestingComponent } from './testing/testing.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ArticleextensionComponent } from './article/articleextension/articleextension.component';
import { ArticleextensiondeleteComponent } from './article/articleextensiondelete/articleextensiondelete.component';
import { ArticledeleteComponent } from './article/articledelete/articledelete.component';
import { ArticlepreviewComponent } from './article/articlepreview/articlepreview.component';
import { FaqComponent } from './faq/faq.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ArticleviewmagComponent } from './article/articleviewmag/articleviewmag.component';
import { NewsletteraddComponent } from './newsletter/newsletteradd/newsletteradd.component';
import { NewsletterdetailsComponent } from './newsletter/newsletterdetails/newsletterdetails.component';
import { NewsletterviewComponent } from './newsletter/newsletterview/newsletterview.component';
import { NewsletterdeleteComponent } from './newsletter/newsletterdelete/newsletterdelete.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    LookupaddComponent,
    LookupComponent,
    AddIssueComponent,
    ViewIssueComponent,
    DeleteissueComponent,
    EditissueComponent,
    UseraddComponent,
    UserdeleteComponent,
    UsereditComponent,
    UserviewComponent,
    CategoryaddComponent,
    CategoryviewComponent,
    CategoryeditComponent,
    CategorydeleteComponent,
    ArticleaddeditComponent,
    ArticleviewComponent,
    SubCategoryaddComponent,
    SubCategoryeditComponent,
    SubCategorydeleteComponent,
    SubCategoryviewComponent,
    TestingComponent,
    ArticleextensionComponent,
    ArticleextensiondeleteComponent,
    ArticledeleteComponent,
    ArticlepreviewComponent,
    FaqComponent,
    ArticleviewmagComponent,
    NewsletteraddComponent,
    NewsletterdetailsComponent,
    NewsletterviewComponent,
    NewsletterdeleteComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AdvanceTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatSlideToggleModule,
    DragulaModule.forRoot(),

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class PagesModule { }

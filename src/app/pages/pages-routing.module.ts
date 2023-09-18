import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleaddeditComponent } from './article/articleaddedit/articleaddedit.component';
import { ArticlepreviewComponent } from './article/articlepreview/articlepreview.component';
import { ArticleviewComponent } from './article/articleview/articleview.component';
import { ArticleviewmagComponent } from './article/articleviewmag/articleviewmag.component';
import { CategoryviewComponent } from './category/categoryview/category.component';
import { FaqComponent } from './faq/faq.component';
import { ViewIssueComponent } from './issue/viewissue/viewissue.component';
import { LookupComponent } from './lookup/lookupview/lookup.component';
import { NewsletterdetailsComponent } from './newsletter/newsletterdetails/newsletterdetails.component';
import { NewsletterviewComponent } from './newsletter/newsletterview/newsletterview.component';
import { SubCategoryviewComponent } from './subcategory/subcategoryview/subcategory.component';
import { TestingComponent } from './testing/testing.component';
import { UserviewComponent } from './user/userview/user.component';


const routes: Routes = [
  { path: `lookup/:ltype`, component: LookupComponent },
  { path: `user`, component: UserviewComponent },
  { path: `issue`, component: ViewIssueComponent },
  { path: `category`, component: CategoryviewComponent },
  { path: `subcategory`, component: SubCategoryviewComponent },
  { path: `articleaddedit/:articleID`, component: ArticleaddeditComponent },
  { path: `articleview`, component: ArticleviewComponent },
  { path: `articleviewmag`, component:ArticleviewmagComponent },
  { path: `articlepreview/:articleID`, component: ArticlepreviewComponent },
  { path: `faq`, component: FaqComponent },
  { path:`newsletter`, component: NewsletterviewComponent},
  { path:`newsletterdetails/:newsletterID`, component: NewsletterdetailsComponent },
  { path: `tt`, component: TestingComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

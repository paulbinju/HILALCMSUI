import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvanceTableComponent } from './advtablelookup.component';

const routes: Routes = [
  {
    path: '',
    component: AdvanceTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceTableRoutingModule {}

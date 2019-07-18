import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ViewMastersComponent } from './Components/Main/view-masters/view-masters.component';
import { ViewFieldsComponent } from './Components/Main/view-fields/view-fields.component';
import { AddFieldsComponent } from './Components/Main/add-fields/add-fields.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-masters',
    pathMatch: 'full'
  },
  {
    path: 'all-masters',
    component: ViewMastersComponent,
  },
  {
    path: 'add-fields',
    component: AddFieldsComponent,
  },
  {
    path: 'master-details/:mastername',
    component: ViewFieldsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'notFound', loadChildren: './modules/pages/page-not-found/page-not-found.module#PageNotFoundModule' },
    { path: '', loadChildren: './modules/pages/home/home.module#HomeModule'},
    { path: '**', redirectTo: 'notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

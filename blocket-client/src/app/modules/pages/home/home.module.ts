import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ImagePipe } from 'src/app/core/pipes/image.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import { AdsComponent } from './components/ads/ads.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
    declarations: [
        HomeComponent,
        ImagePipe,
        SearchComponent,
        AdsComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        HomeRoutingModule,
    ]
})
export class HomeModule { }

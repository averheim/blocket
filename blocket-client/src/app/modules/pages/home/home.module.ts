import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ImagePipe } from 'src/app/core/pipes/image.pipe';

@NgModule({
    declarations: [
        HomeComponent,
        ImagePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
    ]
})
export class HomeModule { }

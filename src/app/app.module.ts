import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ViewAreaComponent } from './components/view-area/view-area.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import {ImageService} from "./services/image.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ViewAreaComponent,
    HeaderComponent,
    ImageListComponent,
    ImageSliderComponent,
    ImageDetailsComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

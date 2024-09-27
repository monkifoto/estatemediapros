import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Sections/navbar/navbar.component';
import { HeroSectionComponent } from './Sections/hero-section/hero-section.component';
import { PhotoSectionComponent } from './Sections/photography-section/photography-section.component';
import { TestPageComponent } from './Sections/test-page/test-page.component';
import { AerialSectionComponent } from './Sections/aerial-section/aerial-section.component';
import { VideoSectionComponent } from './Sections/video-section/video-section.component';
import { Tour3dSectionComponent } from './Sections/tour3d-section/tour3d-section.component';
import { FloorplanSectionComponent } from './Sections/floorplan-section/floorplan-section.component';
import { StagingSectionComponent } from './Sections/staging-section/staging-section.component';
import { FooterSectionComponent } from './Sections/footer-section/footer-section.component';
import { ContactSectionComponent } from './Sections/contact-section/contact-section.component';
import { PricingSectionComponent } from './Sections/pricing-section/pricing-section.component';
import { StoreComponent } from './Sections/Store/store/store.component';
import { CartComponent } from './Sections/Store/cart/cart.component';
import { PhotosComponent } from './Sections/Store/photos/photos.component';
import { VideoComponent } from './Sections/Store/video/video.component';
import { TourComponent } from './Sections/Store/tour/tour.component';
import { StagingComponent } from './Sections/Store/staging/staging.component';
import { FloorplanComponent } from './Sections/Store/floorplan/floorplan.component';
import { BundlesComponent } from './Sections/Store/bundles/bundles.component';
import { CustomerInfoComponent } from './Sections/Store/customer-info/customer-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterByTypePipe } from './Pipes/filter-by-type.pipe';
import { HomeSectionComponent } from './Sections/home-section/home-section.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    PhotoSectionComponent,
    TestPageComponent,
    AerialSectionComponent,
    VideoSectionComponent,
    Tour3dSectionComponent,
    FloorplanSectionComponent,
    StagingSectionComponent,
    FooterSectionComponent,
    ContactSectionComponent,
    PricingSectionComponent,
    StoreComponent,
    CartComponent,
    PhotosComponent,
    VideoComponent,
    TourComponent,
    StagingComponent,
    FloorplanComponent,
    BundlesComponent,
    CustomerInfoComponent,
    FilterByTypePipe,
    HomeSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

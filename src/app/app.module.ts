import { HeroSectionComponent } from './Sections/hero-section/hero-section.component';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Sections
import { NavbarComponent } from './Sections/navbar/navbar.component';
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
import { GalleryComponent } from './Sections/gallery/gallery.component';
import { OrderPdfComponent } from './Sections/order-pdf/order-pdf.component';

// Store
import { StoreComponent } from './Sections/Store/store/store.component';
import { CartComponent } from './Sections/Store/cart/cart.component';
import { PhotosComponent } from './Sections/Store/photos/photos.component';
import { VideoComponent } from './Sections/Store/video/video.component';
import { TourComponent } from './Sections/Store/tour/tour.component';
import { StagingComponent } from './Sections/Store/staging/staging.component';
import { FloorplanComponent } from './Sections/Store/floorplan/floorplan.component';
import { BundlesComponent } from './Sections/Store/bundles/bundles.component';
import { CustomerInfoComponent } from './Sections/Store/customer-info/customer-info.component';
import { ProductItemComponent } from './Sections/Store/product-item/product-item.component';

// Admin
import { AdminComponent } from './Admin/admin/admin.component';
import { LoginComponent } from './Admin/login/login.component';
import { ProductListComponent } from './Admin/product-list/product-list.component';
import { SubscribersComponent } from './Admin/subscribers/subscribers.component';
import { AddEditProductComponent } from './Admin/add-edit-product/add-edit-product.component';
import { OrderListComponent } from './Admin/order-list/order-list.component';
import { UploadFilesComponent } from './Admin/upload-files/upload-files.component';
import { OrderEditComponent } from './Admin/order-edit/order-edit.component';

// Pipes
import { FilterByTypePipe } from './Pipes/filter-by-type.pipe';
import { SortByPipe } from './Pipes/sort-by.pipe';

// Firebase Imports (New API)
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/Environments/environment';

// HTTP Client
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeSectionComponent } from './Sections/home-section/home-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // PhotoSectionComponent,
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
    SortByPipe,
    ProductItemComponent,
    AdminComponent,
    LoginComponent,
    ProductListComponent,
    SubscribersComponent,
    AddEditProductComponent,
    OrderListComponent,
    GalleryComponent,
    UploadFilesComponent,
    OrderEditComponent,
    OrderPdfComponent,
    HeroSectionComponent,
    HomeSectionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()) // If using Firebase Storage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

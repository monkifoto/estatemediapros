import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutSectionComponent } from './photography-section/photography-section.component';
import { TestPageComponent } from './test-page/test-page.component';
import { AerialSectionComponent } from './aerial-section/aerial-section.component';
import { VideoSectionComponent } from './video-section/video-section.component';
import { Tour3dSectionComponent } from './tour3d-section/tour3d-section.component';
import { FloorplanSectionComponent } from './floorplan-section/floorplan-section.component';
import { StagingSectionComponent } from './staging-section/staging-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { ShoppingSectionComponent } from './shopping-section/shopping-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    TestPageComponent,
    AerialSectionComponent,
    VideoSectionComponent,
    Tour3dSectionComponent,
    FloorplanSectionComponent,
    StagingSectionComponent,
    FooterSectionComponent,
    ContactSectionComponent,
    PricingSectionComponent,
    ShoppingSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

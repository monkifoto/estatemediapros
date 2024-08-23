import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    StagingSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

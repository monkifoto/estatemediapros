import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './Sections/Store/store/store.component';
import { AppComponent } from './app.component';
import { HomeSectionComponent } from './Sections/home-section/home-section.component';
import { PhotoSectionComponent } from './Sections/photography-section/photography-section.component';
import { FloorplanSectionComponent } from './Sections/floorplan-section/floorplan-section.component';
import { StagingSectionComponent } from './Sections/staging-section/staging-section.component';

const routes: Routes = [
  { path: '', component: HomeSectionComponent , title: 'PACIFIC PROPERY PHOTOS - Home' },
  { path: 'photos', component: PhotoSectionComponent , title: 'PACIFIC PROPERY PHOTOS - Photos' },
  { path: 'floorplan', component: FloorplanSectionComponent , title: 'PACIFIC PROPERY PHOTOS - Floorplan' },
  { path: 'virtualstaging', component: StagingSectionComponent , title: 'PACIFIC PROPERY PHOTOS - Virtual Staging' },
  { path: 'book', component: StoreComponent  , title: 'PACIFIC PROPERY PHOTOS - Booking' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

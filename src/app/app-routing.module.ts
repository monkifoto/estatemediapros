import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './Sections/Store/store/store.component';
import { HomeSectionComponent } from './Sections/home-section/home-section.component';
import { PhotoSectionComponent } from './Sections/photography-section/photography-section.component';
import { FloorplanSectionComponent } from './Sections/floorplan-section/floorplan-section.component';
import { StagingSectionComponent } from './Sections/staging-section/staging-section.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { LoginComponent } from './Admin/login/login.component';
import { adminAuthGuard } from './Guard/auth.guard';
import { AddEditProductComponent } from './Admin/add-edit-product/add-edit-product.component';
import { ProductListComponent } from './Admin/product-list/product-list.component';
import { OrderListComponent } from './Admin/order-list/order-list.component';
import { SubscribersComponent } from './Admin/subscribers/subscribers.component';
import { GalleryComponent } from './Sections/gallery/gallery.component';
import { UploadFilesComponent } from './Admin/upload-files/upload-files.component';
import { OrderEditComponent } from './Admin/order-edit/order-edit.component';
import { PolicyComponent } from './Sections/policy/policy.component';
import { TosComponent } from './Sections/tos/tos.component';
import { VideoSectionComponent } from './Sections/video-section/video-section.component';
import { Tour3dSectionComponent } from './Sections/tour3d-section/tour3d-section.component';

const routes: Routes = [
  { path: '', component: HomeSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Home', pathMatch: 'full' },
  { path: 'home', component: HomeSectionComponent, title: 'PACIFIC PROPERY PHOTOS' },
  { path: 'video', component: VideoSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Video' },
  { path: 'tour', component: Tour3dSectionComponent, title: 'PACIFIC PROPERY PHOTOS - 3D Tours' },
  { path: 'photos', component: PhotoSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Photos' },
  { path: 'floorplan', component: FloorplanSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Floorplan' },
  { path: 'virtualstaging', component: StagingSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Virtual Staging' },
  { path: 'book', component: StoreComponent, title: 'PACIFIC PROPERY PHOTOS - Booking' },
  { path: 'gallery/:id', component: GalleryComponent },
  { path: 'policy', component: PolicyComponent},
  { path: 'tos', component: TosComponent},


  { path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard] , children: [
    { path: 'products', component: ProductListComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'subscribers', component: SubscribersComponent },
    { path: 'edit-product/:id', component: AddEditProductComponent },
    { path: 'add-product', component: AddEditProductComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' }, // Default route
    { path: 'admin/order-list', component: OrderListComponent },
    { path: 'upload-files/:id', component: UploadFilesComponent },
    { path: 'edit-order/:id', component: OrderEditComponent },

] },
  { path: 'login', component: LoginComponent },
  // { path: 'admin/add-product/:id', component: AddEditProductComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './Sections/Store/store/store.component';
import { HomeSectionComponent } from './Sections/home-section/home-section.component';
import { PhotoSectionComponent } from './Sections/photography-section/photography-section.component';
import { FloorplanSectionComponent } from './Sections/floorplan-section/floorplan-section.component';
import { StagingSectionComponent } from './Sections/staging-section/staging-section.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { LoginComponent } from './Admin/login/login.component';
import { AdminAuthGuard } from './Guard/auth.guard';
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
import { PhotoGalleryComponent } from './Galleries/photo-gallery/photo-gallery.component';
import { PhotoGallerySectionComponent } from './Sections/photo-gallery-section/photo-gallery-section.component';
import { VideoGallerySectionComponent } from './Sections/video-gallery-section/video-gallery-section.component';
import { FloorGallerySectionComponent } from './Sections/floor-gallery-section/floor-gallery-section.component';
import { VirtualGallerySectionComponent } from './Sections/virtual-gallery-section/virtual-gallery-section.component';

const routes: Routes = [
  { path: '', component: HomeSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Home', pathMatch: 'full' },
  { path: 'home', component: HomeSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA' },
  { path: 'video', component: VideoSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Video' },
  { path: 'tour', component: Tour3dSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - 3D Tours' },
  { path: 'photos', component: PhotoSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Photos' },
  { path: 'floorplan', component: FloorplanSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Floorplan' },
  { path: 'virtualstaging', component: StagingSectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Virtual Staging' },
  { path: 'book', component: StoreComponent, title: 'SEATTLE RELA ESTATE MEDIA - Booking' },
  { path: 'gallery/:id', component: GalleryComponent },
  { path: 'policy', component: PolicyComponent},
  { path: 'tos', component: TosComponent},
  { path: 'photo-gallery-section', component: PhotoGallerySectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Photography Gallery' },
  { path: 'video-gallery-section', component: VideoGallerySectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Video Gallery' },
  { path: 'floor-gallery-section', component: FloorGallerySectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Floor Plans Gallery' },
  { path: 'photo-gallery', component: PhotoGallerySectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Video' },
  { path: 'virtual-gallery-section', component: VirtualGallerySectionComponent, title: 'SEATTLE RELA ESTATE MEDIA - Virtual Staging Gallery' },

  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] , children: [
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
   { path: 'admin/add-product/:id', component: AddEditProductComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

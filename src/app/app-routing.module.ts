import { NgModule } from '@angular/core';
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

const routes: Routes = [
  { path: '', component: HomeSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Home', pathMatch: 'full' },
  { path: 'home', component: HomeSectionComponent, title: 'home' },
  { path: 'home2', component: HomeSectionComponent, title: 'home2' },
  { path: 'photos', component: PhotoSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Photos' },
  { path: 'floorplan', component: FloorplanSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Floorplan' },
  { path: 'virtualstaging', component: StagingSectionComponent, title: 'PACIFIC PROPERY PHOTOS - Virtual Staging' },
  { path: 'book', component: StoreComponent, title: 'PACIFIC PROPERY PHOTOS - Booking' },


  { path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard] , children: [
    { path: 'products', component: ProductListComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'subscribers', component: SubscribersComponent },
    { path: 'add-product/:id', component: AddEditProductComponent },
    { path: 'add-product', component: AddEditProductComponent }, // For adding a new product without an ID
    { path: '', redirectTo: 'products', pathMatch: 'full' }, // Default route
] },
  { path: 'login', component: LoginComponent },
  { path: 'admin/add-product/:id', component: AddEditProductComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

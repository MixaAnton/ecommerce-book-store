import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/orders/order-history/order-history.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { RoleEnum } from './enums/role-enum';

const routes: Routes = [
  
  {path: '', redirectTo:'/home',pathMatch:'full'},
  { path: 'home', component:HomeComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'about-us', component:AboutComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'products/:id', component:ProductDetailsComponent},
  { path: 'product-create', component:ProductCreateComponent,canActivate :[authGuard],data: { expectedRoles: [RoleEnum.Admin, RoleEnum.Manager] }},
  { path: 'product-edit/:id', component:ProductEditComponent,canActivate :[authGuard],data: { expectedRoles: [RoleEnum.Admin, RoleEnum.Manager] }},
  { path: 'users',component:UserListComponent,canActivate: [authGuard],data: { expectedRoles: [RoleEnum.Manager]}},
  { path: 'category/:id',component: ProductListComponent},
  { path: 'category',component: ProductListComponent},
  { path: 'products', component:ProductListComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'cart-details', component: CartComponent, canActivate: [authGuard],data: { expectedRoles: [RoleEnum.User]}},
  {path: 'checkout', component: CheckoutComponent,canActivate :[authGuard],data: { expectedRoles: [RoleEnum.User]}},
  {path: 'order-history', component: OrderHistoryComponent,canActivate :[authGuard],data: { expectedRoles: [RoleEnum.Admin, RoleEnum.Manager,RoleEnum.User]}},
  {path: 'order/:id', component:OrderDetailsComponent,canActivate :[authGuard],data: { expectedRoles: [RoleEnum.Admin, RoleEnum.Manager,RoleEnum.User]}},
  // { path: '', redirectTo: '/products', pathMatch:'full'},
  { path: '**', redirectTo: '/products', pathMatch:'full'}

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

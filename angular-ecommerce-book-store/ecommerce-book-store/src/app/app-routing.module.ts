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

const routes: Routes = [
  {path: '', redirectTo:'/home',pathMatch:'full'},
  { path: 'home', component:HomeComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'about-us', component:AboutComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'products', component:ProductListComponent},
  { path: 'product/:id', component:ProductDetailsComponent},
  { path: 'product-create', component:ProductCreateComponent},
  { path: 'product-edit/:id', component:ProductEditComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'about-us', component:AboutComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'products', component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

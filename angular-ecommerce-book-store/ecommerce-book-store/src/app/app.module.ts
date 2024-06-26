import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/layout/menu/menu.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderItemComponent } from './components/orders/order-item/order-item.component';
import { CartComponent } from './components/shoping-cart/cart/cart.component';
import { CartItemComponent } from './components/shoping-cart/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BillComponent } from './components/checkout/bill/bill.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    MenuComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    ProductCreateComponent,
    UserInfoComponent,
    UserEditComponent,
    UserListComponent,
    OrderListComponent,
    OrderItemComponent,
    CartComponent,
    CartItemComponent,
    CheckoutComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    NgxSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

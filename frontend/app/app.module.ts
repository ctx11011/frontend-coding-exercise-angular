import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app.router';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { OrderListItemComponent } from './order/order-list/order-list-item/order-list-item.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    OrderListComponent,
    OrderComponent,
    OrderListItemComponent,
    PaginationComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

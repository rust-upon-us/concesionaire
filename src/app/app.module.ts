import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';
import { ProductsBranchComponent } from './products/products-branch/products-branch.component';
import { RoutingErrorComponent } from './routing-error/routing-error.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { DashboardProfileComponent } from './dashboard/dashboard-profile/dashboard-profile.component';
import { DashboardChartComponent } from './dashboard/dashboard-profile/dashboard-chart/dashboard-chart.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardNewsComponent } from './dashboard/dashboard-list/dashboard-news/dashboard-news.component';
import { DashboardClientComponent } from './dashboard/dashboard-list/dashboard-client/dashboard-client.component';
import { DashboardVehicleComponent } from './dashboard/dashboard-list/dashboard-vehicle/dashboard-vehicle.component';
import { DashboardBillingComponent } from './dashboard/dashboard-list/dashboard-billing/dashboard-billing.component';
import { DashboardHardwareComponent } from './dashboard/dashboard-list/dashboard-hardware/dashboard-hardware.component';
import { DashboardFinancingComponent } from './dashboard/dashboard-list/dashboard-financing/dashboard-financing.component';
import { DashboardNavigationComponent } from './dashboard/dashboard-list/dashboard-navigation/dashboard-navigation.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    ProductsBranchComponent,
    ProductsListComponent,
    ProductsDetailComponent,
    RoutingErrorComponent,
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardProfileComponent,
    DashboardChartComponent,
    DashboardListComponent,
    DashboardNewsComponent,
    DashboardClientComponent,
    DashboardBillingComponent,
    DashboardVehicleComponent,
    DashboardHardwareComponent,
    DashboardFinancingComponent,
    DashboardNavigationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

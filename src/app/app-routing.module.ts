
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingErrorComponent } from './routing-error/routing-error.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsBranchComponent } from './products/products-branch/products-branch.component';
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProfileComponent } from './dashboard/dashboard-profile/dashboard-profile.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardNewsComponent } from './dashboard/dashboard-list/dashboard-news/dashboard-news.component';
import { DashboardClientComponent } from './dashboard/dashboard-list/dashboard-client/dashboard-client.component';
import { DashboardVehicleComponent } from './dashboard/dashboard-list/dashboard-vehicle/dashboard-vehicle.component';
import { DashboardBillingComponent } from './dashboard/dashboard-list/dashboard-billing/dashboard-billing.component';
import { DashboardHardwareComponent } from './dashboard/dashboard-list/dashboard-hardware/dashboard-hardware.component';
import { DashboardFinancingComponent } from './dashboard/dashboard-list/dashboard-financing/dashboard-financing.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "productos", component: ProductsComponent, children:[
    { path: "", component: ProductsBranchComponent, pathMatch: "full" },
    { path: ":branch", component: ProductsListComponent },
    { path: "producto/:id", component: ProductsDetailComponent },
  ] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService], children:[
    { path: "", component: RoutingErrorComponent, pathMatch: "full" },
    { path: "vehicle", component: DashboardListComponent },
    { path: "vehicle/:id", component: DashboardVehicleComponent },
    { path: "client", component: DashboardListComponent },
    { path: "client/:id", component: DashboardClientComponent },
    { path: "billing", component: DashboardListComponent },
    { path: "billing/:id", component: DashboardBillingComponent },
    { path: "financing", component: DashboardListComponent },
    { path: "financing/:id", component: DashboardFinancingComponent },
    { path: "hardware", component: DashboardListComponent },
    { path: "hardware/:id", component: DashboardHardwareComponent },
    { path: "news", component: DashboardListComponent },
    { path: "news/:id", component: DashboardNewsComponent },
    { path: "404", component: RoutingErrorComponent },
    { path: "**", redirectTo: "/dashboard/404" },
  ] },
  { path: "login", component: LoginComponent },
  { path: "404", component: RoutingErrorComponent },
  { path: "**", redirectTo: "/404" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerManagementComponent } from './customer/customer-management.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/_guards/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductManagementComponent } from './product/product-management.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { OrderManagementComponent } from './order/order-management.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomerManagementComponent, canActivate: [AuthGuard] },
    { path: 'customer/:id/edit', component: CustomerDetailComponent, data: {action: 'edit'}, canActivate: [AuthGuard] },
    { path: 'customer/new', component: CustomerDetailComponent, data: {action: 'create'}, canActivate: [AuthGuard] },
    { path: 'products', component: ProductManagementComponent, canActivate: [AuthGuard] },
    { path: 'product/:id/edit', component: ProductDetailComponent, data: {action: 'edit'}, canActivate: [AuthGuard] },
    { path: 'product/new', component: ProductDetailComponent, data: {action: 'create'}, canActivate: [AuthGuard] },
    { path: 'orders', component: OrderManagementComponent, canActivate: [AuthGuard] },
    { path: 'order/:id/edit', component: OrderDetailComponent, data: {action: 'edit'}, canActivate: [AuthGuard] },
    { path: 'order/new', component: OrderDetailComponent, data: {action: 'create'}, canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

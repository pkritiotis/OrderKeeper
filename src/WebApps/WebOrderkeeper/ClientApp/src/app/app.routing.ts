import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerManagementComponent } from './customer/customer-management.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/_guards/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'customers', component: CustomerManagementComponent, canActivate: [AuthGuard] },
    { path: 'customer/:id/edit', component: CustomerDetailComponent, data: {action: 'edit'}, canActivate: [AuthGuard] },
    { path: 'customer/new', component: CustomerDetailComponent, data: {action: 'create'}, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

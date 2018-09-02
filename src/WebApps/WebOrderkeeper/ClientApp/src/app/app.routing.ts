import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/_guards/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
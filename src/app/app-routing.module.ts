import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { authGuard } from './services/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
{path: '',redirectTo: '/signin', pathMatch: 'full'},
{path: 'signup',component: RegistrationComponent},
{path: 'signin',component: LoginComponent},
{path: 'forget-password', component: ForgetPasswordComponent},
{path: 'dashBoard',component: TabsComponent, canActivate: [authGuard],
  children: [
    {path: 'transactionDetails', component: TransactionDetailsComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

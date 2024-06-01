import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PartyComponent } from './party/party.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'Party',
        component:PartyComponent
    }
];

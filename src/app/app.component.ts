import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterOutlet, HttpClientModule, FormsModule, MatFormFieldModule, MatButtonModule, MatCardModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [LoginService]
})
export class AppComponent implements OnInit {
    constructor(
        private router:Router
    ){}

    ngOnInit(): void {
        
    }
    NavigateToLogin() {
        this.router.navigateByUrl('login')
    }
}
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,CommonModule, MatButtonModule, MatCardModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
    successMessage: string = '';
    loginForm:FormGroup = this.fb.group({});


    constructor(private apiService: LoginService, private fb:FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: "testing",
            password: "Test@Test",
        })
    }
    login(): void {

        this.apiService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                 this.NavigateToLogin()
            
            } else {
                console.log('Login failed');
            }
        });
    }   
    NavigateToLogin() {
        this.router.navigateByUrl('/Party')
    }
}
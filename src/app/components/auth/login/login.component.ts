import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Add this import
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone:true,
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginForm! : FormGroup;

  constructor(private router: Router, private authService: AuthService) { }
/*
  onLogin(): void {
    if (this.email && this.password) {
      console.log('Logging in with', this.email, this.password);
      this.router.navigate(['/']);  
    }
  }*/
  
  onLogin(): void {
    if (this.email.trim() && this.password.trim()) {
      console.log('Login data:', { email: this.email, password: this.password });
      // Call login method and handle success or failure
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login successful:', response);

          // Store the token in sessionStorage
          sessionStorage.setItem('token', response.mytoken);
          console.log('Token stored:', response.mytoken);

          // Navigate to the home page or dashboard
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed:', error);

          // Show an alert or update UI to display error message
          alert('Invalid email or password. Please try again.');
        }
      );
    } else {
      alert('Both email and password are required.');
    }
  }
  logout() {
    sessionStorage.removeItem('token'); 
    this.router.navigate(['/login']);  
     }
}

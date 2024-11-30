import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone:true,
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router,private authService: AuthService) { }

  onRegister(): void {
    if (this.name && this.email && this.password && this.confirmPassword) {
      // Simulate registration (replace with real registration logic)
      console.log('Registering user:', this.name, this.email);
      this.router.navigate(['/login']);  // Redirect to login page on successful registration
    }
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']); // Redirect to login on success
      },
      (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}

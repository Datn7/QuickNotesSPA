import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formData = {
    username: '',
    password: '',
  };

  confirmPassword = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.formData.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.api.register(this.formData).subscribe({
      next: () => {
        this.successMessage =
          'Registration successful. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed.';
      },
    });
  }
}

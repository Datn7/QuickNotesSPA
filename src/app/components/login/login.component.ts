import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  formData = {
    username: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    if (!this.formData.username || !this.formData.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.api.login(this.formData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 100); // give token time to be saved
      },
      error: (err) => {
        this.errorMessage =
          err.error || 'Login failed. Check your credentials.';
      },
    });
  }
}

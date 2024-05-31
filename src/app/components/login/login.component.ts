import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '@services/data.service';
import { LoginUser } from '@models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  status: 'init' | 'loading' | 'error' | 'success' = 'init';
  passwordVisible = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]]
    });
  }

  ngOnInit(): void { }

  login() {
    if (this.form.valid) {
      this.status = 'loading';
      let user: LoginUser = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value
      };
      this.dataService.login(user).subscribe({
        next: (data) => {
          this.status = 'success';
          localStorage.setItem('jwt', data.token);
          this.router.navigate(['/']).then(() => {
            location.reload();
          });
        },
        error: (error) => {
          console.log(error);
          this.status = 'error';
        }
      });
    }
  }

  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}

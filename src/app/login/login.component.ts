import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
// import { HttpClient } from '@angular/common/http';
// import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css', 
})
export class LoginComponent {
  // fb = inject(FormBuilder);
  // http = inject(HttpClient);
  // router = inject(Router);

  // form = this.fb.nonNullable.group({
  //   email: ['', Validators.required],
  //   password: ['', Validators.required]
  // });

  constructor(
    // public auth: AuthService
  ) { }

  // loginWithRedirect(): void {
  //   this.auth.loginWithRedirect();
  // }


  onSubmit(form: NgForm): void {
    console.log("Login works!");
  }

}

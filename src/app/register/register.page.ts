import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  cadastroUsuario: FormGroup;
  isSubmitted = false;

  constructor(public authService: AuthService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cadastroUsuario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      userPwd: ['', [Validators.required]]
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.cadastroUsuario.valid) {
      console.log('Por favor preencha todos os campos')
      return false;
    } else {
      this.authService.SignUp(this.cadastroUsuario.value.userEmail, this.cadastroUsuario.value.userPwd)
    }
  }

  get errorControl() {
    return this.cadastroUsuario.controls;
  }
}

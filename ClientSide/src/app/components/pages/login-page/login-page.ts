import { Component } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, RouterLink , Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    PasswordModule, 
    MessageModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    RouterLink,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],

    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    
    this.userService.login({
      email: this.fc['email'].value,
      password: this.fc['password'].value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  isInvalid(controlName: string){
    const control = this.fc[controlName];
    return control?.invalid && (control.touched || this.isSubmitted);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validators';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    PasswordModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    RouterLink
],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void{
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['',Validators.required],
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    const fv = this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address,
    };

    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  isInvalid(controlName: string) {
    const control = this.fc[controlName];
    return control?.invalid && (control.touched || this.isSubmitted);
  }
}

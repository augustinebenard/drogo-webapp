import { AuthService } from './../helpers/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form!:FormGroup
  constructor(private router: Router,private authService:AuthService,private fb:FormBuilder, private spinner:NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit() {
    this.form=this.fb.group({
      username:['',[Validators.required]],
      new_password:['',[Validators.required]],
      securityQuestion:['',[Validators.required]],
      securityAnswer:['',[Validators.required]],
    })
  }
  resetPassword() {
    console.log(this.form.value);

    this.spinner.show()
    // stop here if form is invalids
    if (this.form.invalid) {
      const invalid = [];
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }

      this.toastr.error('The Following fields are Invalid: ' + invalid, 'Invalid Fields');
      this.spinner.hide()
      return;

    }

    this.authService.forgotPasssword(this.form.value).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide()
    },
      (error: any) => {
        console.log(error);

      }
    )
  }

  login() {
    this.router.navigate(['login'])
  }
}

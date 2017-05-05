import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;

  constructor(private router: Router, private authServise: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSignin() {
    const { email, password } = this.signinForm.value;
    this.authServise.signinUser(email, password)
      .then(() => this.router.navigate(['/']))
      .catch(console.log); // TODO: error hahdling
  }

  onSigninWithGoogle() {
    this.authServise.signinGoogle()
      .then(() => this.router.navigate(['/']))
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // [START_EXCLUDE]
        // if (errorCode === 'auth/account-exists-with-different-credential') {
        //   alert('You have already signed up with a different auth provider for that email.');
        //   // If you are using multiple auth providers on your app you should handle linking
        //   // the user's accounts here.
        // } else {
        // }
        // [END_EXCLUDE]
        console.error(error); // TODO: error hahdling
      });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as firebase from 'firebase/app';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private user: firebase.User;
  private authServiceSubscription: Subscription;

  constructor(private authenticationService: AuthService) {}

  ngOnInit() {
    this.authServiceSubscription = this.authenticationService.authStatusChanged
      .subscribe((user: firebase.User | null) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }

  onSignUp() {}

  onSignIn() {
    this.authenticationService.toggleSignIn();
  }

  onSignOut() {
    this.authenticationService.toggleSignIn();
  }
}

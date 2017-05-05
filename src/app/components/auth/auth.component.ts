import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private authServiceSubscription: Subscription;
  public user: firebase.User;

  constructor(private router: Router, private authenticationService: AuthService) {}

  ngOnInit() {
    this.authServiceSubscription = this.authenticationService.authStatusChanged
      .subscribe((user: firebase.User | null) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }

  onSignOut() {
    this.authenticationService.signoutUser()
      .then(() => this.router.navigate(['/']))
      .catch(console.log); // TODO: error hahdling
  }
}

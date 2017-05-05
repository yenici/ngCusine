import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  public authStatusChanged = new Subject<firebase.User | null>();

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.auth
      .onAuthStateChanged((user: firebase.User) => {
        this.authStatusChanged.next(user);
      });
  }

  isAuthenticated(): boolean {
    return !!this.firebaseService.auth.currentUser;
  }

  /**
   * Function called when clicking the Login/Logout button.
   */
  signinGoogle(): firebase.Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseService.auth.signInWithPopup(provider);
  }

  signupUser(email: string, password: string): firebase.Promise<firebase.User> {
    return this.firebaseService.auth.createUserWithEmailAndPassword(email, password);
  }

  signinUser(email: string, password: string): firebase.Promise<firebase.User> {
    return this.firebaseService.auth.signInWithEmailAndPassword(email, password);
  }

  signoutUser(): firebase.Promise<void> {
    return this.firebaseService.auth.signOut();
  }
}

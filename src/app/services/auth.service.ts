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
        console.log('Auth Changed', user);
        this.authStatusChanged.next(user);
      });
  }

  // get user(): firebase.User | null {
  //   return this.app.auth().currentUser;
  // }

  /**
   * Function called when clicking the Login/Logout button.
   */
  toggleSignIn() {
    if (!this.firebaseService.auth.currentUser) {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.firebaseService.auth.signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        console.log('Access Token', result.credential.accessToken);
      }).catch((error) => {
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
          console.error(error);
        // }
        // [END_EXCLUDE]
      });
    } else {
      this.firebaseService.auth.signOut();
    }
  }

}

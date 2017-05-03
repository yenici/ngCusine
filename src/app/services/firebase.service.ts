import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../firebase.config';

@Injectable()
export class FirebaseService {
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig, 'ngCusine');
  }

  get auth() {
    return this.app.auth();
  }

  get database() {
    return this.app.database();
  }

}

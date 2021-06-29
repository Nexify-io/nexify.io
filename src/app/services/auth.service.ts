import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // userData: any; // Save logged in user data

    constructor(
        public afs: AngularFirestore,
        public auth: AngularFireAuth,
        public router: Router
    ) {
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.auth.authState.subscribe(user => {
            console.log("authentication state updated", user);
            if (user) {
                // this.userData = user;
                // localStorage.setItem('nexify.user', JSON.stringify(this.userData));
                // JSON.parse(localStorage.getItem('user'));
            } else {
                // localStorage.setItem('nexify.user', null);
                // JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    // Sign in with email/password ;,;
    signIn(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("authenticated !!", result)
                // this.ngZone.run(() => {
                //     this.router.navigate(['home']);
                // });
                // this.SetUserData(result.user);
            })
    }

    isLoggedIn(): Observable<boolean> {
        return this.auth.user.pipe(
            map(user => {
                return !!user;
            })
        );
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: any = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    // Sign out 
    signOut() {
        return this.auth.signOut().then(() => {
            localStorage.removeItem('nexify.user');
        })
    }

}
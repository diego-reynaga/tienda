import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  User,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  register(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        // Una vez creado el usuario, actualiza su perfil para incluir el nombre
        return updateProfile(userCredential.user, {
          displayName: nombre,
        }).then(() => {
          // También puedes guardar información adicional del usuario en Firestore si lo deseas
          // this.firestore.collection('users').doc(userCredential.user.uid).set({
          //   nombre: nombre,
          //   email: email,
          //   fechaRegistro: new Date()
          // });

          return userCredential;
        });
      }
    );
  }
  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  loginFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }
  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}

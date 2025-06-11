import { Injectable } from '@angular/core';
import { Auth, authState, User, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}

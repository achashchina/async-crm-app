import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TUser } from './types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // user
  get user$(): Observable<User | null> {
    return authState(this.auth);
  }

  // public
  async signInWithPopupGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(this.auth, provider);

      const profile = getAdditionalUserInfo(user);
      // save only new users to firestore
      if (profile && profile.isNewUser)
        await this.saveUser(user.user, profile.profile ?? undefined);

      this.redirect('home');

      return user;
    } catch (error) {
      const err = error as Error;
      this.alert(err.message);
      throw new Error(err.message);
    }
  }

  async signInWithPopupGithub(): Promise<UserCredential> {
    try {
      const provider = new GithubAuthProvider();
      const user = await signInWithPopup(this.auth, provider);

      const profile = getAdditionalUserInfo(user);
      if (!profile) throw new Error('');
      // save only new users to firestore
      if (profile && profile.isNewUser)
        await this.saveUser(user.user, profile.profile ?? undefined);

      this.redirect('domain');

      return user;
    } catch (error) {
      const err = error as Error;
      this.alert(err.message);
      throw new Error(err.message);
    }
  }

  async createUserWithEmailAndPassword(
    user?: Partial<{ [x: string]: string }>
  ): Promise<UserCredential> {
    try {
      const loggedUser = await createUserWithEmailAndPassword(
        this.auth,
        (user && user['email']) || '',
        (user && user['password']) || ''
      );

      await this.updateUserProfile(loggedUser.user, {
        displayName: user && user['username'],
      });

      this.alert('Please Verify Your Email: ' + loggedUser.user.email);

      // send verification
      this.sendEmailVerification();

      // logout & redirect to confirmation
      this.logout();
      this.redirect('auth/confirmation');

      return loggedUser;
    } catch (error) {
      const err = error as Error;
      this.alert(err.message);
      throw new Error(err.message);
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.redirect('auth/confirmation');
    } catch (error) {
      const err = error as Error;
      this.alert(err.message);
      throw new Error(err.message);
    }
  }

  async signInWithEmailAndPassword(user: TUser): Promise<UserCredential> {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      );

      if (!loggedUser.user.emailVerified) {
        this.alert('Email not verified');
        this.logoutAndRedirect();
        return loggedUser;
      }

      this.saveUser(loggedUser.user, {});

      // redirect
      this.redirect('domain');

      return loggedUser;
    } catch (error) {
      const err = error as Error;
      this.alert(err.message);
      throw new Error(err.message);
    }
  }

  async updateEmail(email: string): Promise<void> {
    return await updateEmail(this.auth.currentUser!, email);
  }

  async logout() {
    await signOut(this.auth);
  }

  async logoutAndRedirect() {
    await signOut(this.auth);
    this.redirect('auth/login');
  }

  async deleteUser(): Promise<void> {
    try {
      return await deleteUser(this.auth.currentUser!);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // private
  async sendEmailVerification(): Promise<void> {
    return await sendEmailVerification(this.auth.currentUser!);
  }

  async saveUser(user: User, profile?: Record<string, unknown>) {
    const { displayName, email, photoURL, phoneNumber, uid } = user;
    const data = {
      displayName,
      email,
      photoURL,
      phoneNumber,
      ...profile,
    };

    await setDoc(this.doc('users', uid), data, { merge: true });
  }

  async updateUserProfile(
    user: User,
    partialUser: Partial<User>
  ): Promise<void> {
    return await updateProfile(user, partialUser);
  }

  collectionRef(path: string) {
    return collection(this.firestore, path);
  }

  doc(path: string, id: string) {
    return doc(this.collectionRef(path), id);
  }

  redirect(path: string) {
    this.router.navigateByUrl(path);
  }

  alert(msg: string) {
    console.log(msg);
  }
}

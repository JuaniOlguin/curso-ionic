import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) { }

  login(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.auth.signOut();
  }

  register(email: string, password: string){
    this.auth.createUserWithEmailAndPassword(email, password)
  }

  async getUID(){
    const user = await this.auth.currentUser; //retorna credenciales del usuario
    if(user == undefined){
      return null;
    } else {
      return user.uid;
    }
  }
}

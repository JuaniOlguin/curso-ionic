import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { FirebaseauthService } from './../../services/firebaseauth.service';
import { MenuController } from '@ionic/angular';
import { Cliente } from './../../models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    phone: '',
    photo: '',
    address: '',
    ubic: null,
    name: '',
  };

  newFile = '';

  constructor(
    public menuController: MenuController,
    public authService: FirebaseauthService,
    public firestorage: FirestorageService,
    public firestore: FirestoreService
  ){ }

  async ngOnInit(){
    const uid = await this.authService.getUID();
  }

  openMenu(){
    this.menuController.toggle('menuLateral')
  }

  async newImageUpload(event: any){
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.cliente.photo = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async register(){
    const credentials = {
      email: this.cliente.email,
      password: this.cliente.phone
    };
    const res = await this.authService.register(credentials.email, credentials.password); //se puede hacer algo con el response para avisar errores en el form
    const uid = await this.authService.getUID();
    this.cliente.uid = uid;
    this.saveUser();
  }

  async saveUser(){
    console.log(this.cliente);
    
    const path = 'clientes';
    const name = this.cliente.name;
    if(this.newFile !== undefined){
      const res = await this.firestorage.uploadImage(this.newFile, path, name);
      this.cliente.photo = res;
    }
    this.firestore.createDoc(this.cliente, path, this.cliente.uid);
  }

  async logout(){
    const uid = await this.authService.getUID()
    console.log(uid);
    this.authService.logout();
  }
}

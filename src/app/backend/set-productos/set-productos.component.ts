import { Producto } from 'src/app/models';
import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  private path: string = 'productos/';
  productos: Producto[] = [];
  enableNewProducto: boolean = false;
  loading: any
  toast: any
  alert: any

  newProducto: Producto
  newImage = '';
  newFile = '';

  constructor(
    public menuController: MenuController,
    private firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public firestorageService: FirestorageService
  ){  }

  ngOnInit(){
    this.getProductos();
  }

  openMenu(){
    this.menuController.toggle('menuLateral')
  }

  async guardarProducto(){
    this.presentLoading();
    //Guardar imagen
    const path = 'productos';
    const name = this.newProducto.nombre;
    
    const res = await this.firestorageService.uploadImage(this.newFile, path, name);

    this.newProducto.foto = res;

    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id)
      .then(res => {
        this.loading.dismiss()
        this.presentToast('Producto guardado con éxito');
      }).catch( err => {
        this.presentToast('Ocurrió un error, intente nuevamente');
      })
  }

  async getProductos(){
    await this.presentLoading();
    this.firestoreService.getCollection<Producto>(this.path)
      .subscribe(res => {
      this.productos = res;
      this.loading.dismiss()
    });
  }

  async deleteProducto(producto: Producto){
    const alert = await this.alertController.create({
      cssClass: 'alert-custom-class-set-prod',
      header: 'Confirmar acción',
      message: `¿Desea eliminar ${producto.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {
            this.firestoreService.deleteDoc(this.path, producto.id)
              .then(res =>{
                this.presentToast('Producto eliminado con éxito');
              }).catch( err => {
                this.presentToast('Ocurrió un error, intente nuevamente');
              })
          }
        }
      ]
    });
    await alert.present();
  }

  toggleNewProducto(){
    this.enableNewProducto = true;
    this.newProducto = {
      id: this.firestoreService.getId(),
      nombre: '',
      precioNormal: null,
      precioReducido: null,
      foto: '',
      fecha: new Date()
    }
    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-custom-class-set-prod',
      message: 'Cargando',
    });
    await this.loading.present();
  }

  async presentToast(msg: string){
    this.toast = await this.toastController.create({
      cssClass: 'toast-custom-class-set-prod',
      message: msg,
      duration: 3000,
      position: 'bottom',
    });
    this.toast.present()
  }

  async newImageUpload(event: any){
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newProducto.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}

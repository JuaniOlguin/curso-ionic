import { Producto } from 'src/app/models';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  private path: string = 'productos/';
  productos: Producto[] = [];
  enableNewProducto: boolean = false;

  newProducto: Producto

  constructor(
    public menuController: MenuController,
    private firestoreService: FirestoreService
  ){  }

  ngOnInit(){
    this.getProductos();
  }

  openMenu(){
    this.menuController.toggle('menuLateral')
  }

  guardarProducto(){
    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id)
  }

  getProductos(){
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res;
    });
  }

  deleteProducto(producto: Producto){
    this.firestoreService.deleteDoc(this.path, producto.id);
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
}

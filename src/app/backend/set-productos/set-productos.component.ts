import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Producto from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  newProducto: Producto = {
    name: '',
    price: null,
    priceSale: null,
    image: ''
  };

  constructor(
    public menuController: MenuController, 
    private productosServices: ProductosService,
  )
  {

  }

  ngOnInit() {}

  openMenu(){
    this.menuController.toggle('menuLateral')
  }
  guardarProd(){
    this.productosServices.addProduct(this.newProducto)
  }
}

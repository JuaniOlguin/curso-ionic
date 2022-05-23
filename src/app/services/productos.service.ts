import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Producto from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) { }


  //ver si se puede hacer un servicio generico (seguro que si)
  addProduct(product: Producto){
    const prodRef = collection(this.firestore, 'products');
    return addDoc(prodRef, product)
  }

  getProduct(): Observable<Producto[]>{
    const prodRef = collection(this.firestore, 'products');
    return collectionData(prodRef, { idField: 'id' }) as Observable<Producto[]>
  }
}

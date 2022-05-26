export interface Producto{
    id: string;
    nombre: string;
    precioNormal: number;
    precioReducido: number;
    foto: string;
    fecha: Date;
}

export interface Cliente{
    uid: string;
    email: string;
    phone: string;
    photo: string;
    address: string;
    name: string;
    ubic: any;
}
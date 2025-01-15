// Sistema de ventas

// Creación de la clase Producto
class Producto {
    static contadorProductos = 0; // Contador estático para IDs únicos

    constructor(nombre, precio, cantidad, categoria) {
        this._idproducto = ++Producto.contadorProductos;
        this._nombre = nombre;
        this._precio = precio >= 0 ? precio : "El precio no puede ser negativo";
        this._cantidad = cantidad ;
        this._categoria = categoria;
    }

    get idproducto() {
        return this._idproducto;
    }
    get nombre() {
        return this._nombre;
    }
    get precio() {
        return this._precio;
    }
    get cantidad() {
        return this._cantidad;
    }
    get categoria() {
        return this._categoria;
    }

    set precio(nuevoPrecio) {
        this._precio = nuevoPrecio >= 0 ? nuevoPrecio : "El precio no puede ser negativo";
    }
    set cantidad(nuevaCantidad) {
        this._cantidad = nuevaCantidad
    }

    toString() {
        return `ID Producto: ${this._idproducto}, Nombre: ${this._nombre}, Precio: ${this._precio.toFixed(2)}, Cantidad: ${this._cantidad}, Categoría: ${this._categoria}`;
    }
}

// Creación de la clase Orden
class Orden {
    static contadorOrdenes = 0;

    static get MaxProductos() {
        return 5; // Máximo número de productos en una orden
    }

    constructor() {
        this._idOrden = ++Orden.contadorOrdenes;
        this._productos = [];
    }

    get idOrden() {
        return this._idOrden;
    }
    get productos() {
        return this._productos;
    }

    agregarProducto(producto, cantidadSolicitada ) {
        if (this._productos.length < Orden.MaxProductos) {
            if (producto.cantidad >= cantidadSolicitada) {
                this._productos.push({ producto, cantidad: cantidadSolicitada });
                producto.cantidad -= cantidadSolicitada; 
            } else {
                console.log(`El producto "${producto.nombre}" no tiene suficiente stock. Quedan ${producto.cantidad} unidades.`);
            }
        } else {
            console.log("No se pueden agregar más productos. Límite alcanzado.");
        }
    }

    calcularImpuesto(tasaImpuesto) {
        for (let item of this._productos) {
            let producto = item.producto;
            let precioConImpuesto = producto.precio * tasaImpuesto;
            producto.precio += precioConImpuesto;
        }
        console.log(`Se aplicó un impuesto del ${tasaImpuesto * 100}% a los productos.`);
    }

    descuento(categoria, descuento) {
        for (let item of this._productos) {
            let producto = item.producto;
            if (producto.categoria === categoria) {
                let descuentoAplicado = producto.precio * descuento;
                producto.precio -= descuentoAplicado;
                console.log(`Descuento aplicado al producto "${producto.nombre}" de la categoría "${categoria}": ${descuento * 100}%`);
            }
        }
    }

    calcularTotal() {
        let total = 0;
        for (let item of this._productos) {
            let producto = item.producto;
            let descuento = producto.categoria === "Electronica" ? 0.10 : 0; // Descuento para electrónica
            total += producto.precio * item.cantidad * (1 - descuento);
        }
        return total.toFixed(2);
    }


    listarProductosPorPrecioDesc() {
        // Ordenamos el array directamente sin usar slice() ni spread operator
        this._productos.sort((a, b) => b.producto.precio - a.producto.precio);
        
        // Mostramos los productos ordenados por precio
        console.log("Productos ordenados por precio (descendente):");
        
        // Usamos un bucle for clásico para recorrer el array de productos ordenados
        for (let i = 0; i < this._productos.length; i++) {
            let item = this._productos[i];
            let producto = item.producto;
            console.log(`Nombre: ${producto.nombre}, Precio: ${producto.precio.toFixed(2)}, Cantidad: ${item.cantidad}`);
        }
    }

    mostrarOrden() {
        console.log(`Resumen de la Orden #${this._idOrden}:`);
        let productosOrden = "";
        for (let item of this._productos) {
            productosOrden += `Nombre: ${item.producto.nombre}, Precio Unitario: ${item.producto.precio.toFixed(2)}, Cantidad: ${item.cantidad}, Subtotal: ${(item.producto.precio * item.cantidad).toFixed(2)}\n`;
        }
        console.log(`Total: ${this.calcularTotal()} USD\nProductos en la Orden:\n${productosOrden}`);
    }
}



// Creación de productos y desceutno de 10% para electrónica
let producto1 = new Producto("Producto 1", 10, 5, "Electronica");
let producto2 = new Producto("Producto 2", 20, 3, "Ropa");
let producto3 = new Producto("Producto 3", 30, 2, "Electronica");

// Creación de una orden
let orden1 = new Orden();

// Agregar productos a la orden
orden1.agregarProducto(producto1, 2); 
orden1.agregarProducto(producto2, 3); 
orden1.agregarProducto(producto3, 1); 


orden1.calcularImpuesto(0.12);


orden1.listarProductosPorPrecioDesc();

orden1.descuento("Electronica", 0.10);

orden1.mostrarOrden();
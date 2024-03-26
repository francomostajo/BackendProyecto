class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!(title && description && price && thumbnail && code && stock)) {
            console.error('Todos los campos son obligatorios.');
            return;
        }

        if (this.products.some(p => p.code === code)) {
            console.error('El código de producto ya existe.');
            return;
        }

        this.lastId++;
        const product = {
            id: this.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        console.log('Producto agregado:', product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error('Producto no encontrado.');
        }
        return product;
    }
}

// Pruebas
const manager = new ProductManager();

console.log(manager.getProducts()); // []

manager.addProduct('producto prueba', 'Este es un producto prueba1', 200, 'Sin imagen', 'abc123', 25);
manager.addProduct('producto prueba 2', 'Este es un producto prueba', 600, 'img.jpg', 'def456', 20);
manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25); //Mensaje producto ya existente

console.log(manager.getProductById(1)); 
console.log(manager.getProductById(5)); // Producto no encontrado.
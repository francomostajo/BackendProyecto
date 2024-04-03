const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
        this.loadProducts();
    }
//carga el json
    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }
//guarda los producto en json
    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
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
            await this.saveProducts();
            console.log('Producto agregado:', product);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
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

    async updateProduct(id, updatedFields) {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }

            this.products[index] = { ...this.products[index], ...updatedFields };
            await this.saveProducts();
            console.log('Producto actualizado:', this.products[index]);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    async deleteProduct(id) {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                console.error('Producto no encontrado.');
                return;
            }

            this.products.splice(index, 1);
            await this.saveProducts();
            console.log('Producto eliminado.');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

// Pruebas
(async () => {
    const manager = new ProductManager('Productos.json');

    console.log(manager.getProducts()); // []

    await manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    await manager.addProduct('producto prueba 2', 'Este es un producto prueba', 600, 'img.jpg', 'def456', 20);
    await manager.addProduct('producto prueba 3', 'Este es un producto prueba3', 500, 'img2.jpg', 'ghi789', 30);
    await manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25); //Mensaje producto ya existente
    console.log(manager.getProductById(1));
    console.log(manager.getProductById(5)); // Producto no encontrado.

    await manager.updateProduct(1, { price: 250 });
    await manager.deleteProduct(2);

    console.log(manager.getProducts());
})();

























/* class ProductManager {
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
console.log(manager.getProductById(5)); // Producto no encontrado. */


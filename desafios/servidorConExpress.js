
const express = require('express');
const ProductManager = require('./productManagerDesafio2.js');
const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Endpoint para obtener todos los productos
const manager = new ProductManager('Productos.json');

app.get('/products', async (req, res) => {
    await manager.loadProducts(); // Cargar productos desde el archivo JSON
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = limit ? manager.getProducts().slice(0, limit) : manager.getProducts();
    res.json(products);
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const product = manager.getProductById(parseInt(pid));
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});









































































//clase
/* 
const fs = require('fs').promises


class ManagerUsuarios {
    constructor() {
        this.usuariosFile = "Usuarios.json"
    }

    async crearUsuario(usuario) {
        try {
            let usuarios = await this.leerUsuarios()

            usuarios.push(usuario)
            await fs.writeFile(this.usuariosFile, JSON.stringify(usuarios, null, 2))
            console.log("Usuario creado correctamente")
        } catch (error) {
            console.error("Error al crear el usuario", error)
        }
    }

    async consultarUsuarios() {
        try {
            return await this.leerUsuarios()
        } catch (error) {
            console.error("Error al consultar usuarios", error)
            return []
        }
    }

    async leerUsuarios() {
        try {
            const data = await fs.readFile(this.usuariosFile, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }
}

module.exports = ManagerUsuarios */



























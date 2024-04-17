
const express = require('express');
const ProductManager = require('./productManagerDesafio2.js');
const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const manager = new ProductManager('Productos.json');

// Endpoints
app.get('/products', async (req, res) => {
    await manager.loadProducts(); 
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




































































//Clase

/* 
const express = require('express')
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let tasks = [
    { id: 1, title: "Tarea 1" },
    { id: 2, title: "Tarea 2" },
    { id: 3, title: "Tarea 3" }
]

//Endpoints

app.get('/tasks', (req, res) => {
    res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find((task) => task.id === taskId)
    if (task) {
        res.json(task)
    } else {
        res.status(404).json({ message: "Tarea no encontrada" })
    }
})

app.post('/tasks', (req, res) => {
    const { title } = req.body

    const newTask = { id: tasks.length + 1, title: title }
    tasks.push(newTask)
    res.status(201).json(newTask)

})

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find((task) => task.id === taskId)

    if (task) {
        const { title } = req.body
        task.title = title
        res.json(task)
    } else {
        res.status(404).json({ message: "Tarea no encontrado" })
    }
})

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    tasks = tasks.filter((task) => task.id !== taskId)
    res.json({ message: "Tarea eliminada correctamente" })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
 */

























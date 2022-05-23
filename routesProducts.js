const Container = require('./container');
const {Router} = require('express');
const router = Router();

const nuevaLista = new Container();

router.get("/productos", (req,res)=>{
    const productos = nuevaLista.getAll();
    res.json({productos: productos});
});
router.get("/productos/:id",(req,res)=>{
    const {id} = req.params;
    const productsById = nuevaLista.getById(parseInt(id));
    res.json(productsById);
});
router.post("/productos",(req,res)=>{
    //lo usamos solo para agregar
    const producto = req.body;
    const productoAgregado = nuevaLista.save(producto)
    res.json({productoAgregado: productoAgregado})
})
router.put("/productos/:id",(req,res)=>{
    //lo usamos para actualizar
    const producto = req.body;
    const {id} = req.params;
    nuevaLista.updateById(id,producto)
    res.json({mensaje: 'Producto act'})
    
    
})
router.delete("/productos/:id",(req,res)=>{
    const {id} = req.params;
    nuevaLista.eliminarById(id)
    res.json({mensaje: 'producto eliminado.'})
})

module.exports = router;
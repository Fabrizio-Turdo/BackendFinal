class Container{
    constructor(){
        this.productos = [];
    }

    save(object){

        let idAnterior = 0;

        if(this.productos.length === 0){
            idAnterior = 1
        } else {
            let idUltimo = 0;
            this.productos.forEach(element =>{idUltimo = element.id});
            idAnterior = idUltimo + 1;
        }
        
        let objeto = {
            id: idAnterior,
            title: object.title,
            price: object.price,
            thumbnail: object.thumbnail
        }
        this.productos.push(objeto);

        return object

    }
    getById(id){
        const findProduct = this.productos.find(producto => producto.id);
        console.log('Producto encontrado.');
        if(findProduct === undefined){
            const err = {error: 'Producto no ingresado'}
            return err
        } else {
            return findProduct
        }
    }

    //eliminar un producto en especial ?
    eliminarById(id){
        const contenido = this.productos;
        const eliminarId = contenido.filter(element =>element.id !== parseInt(id));
        this.productos = eliminarId;
    }

    getAll(){
        return this.productos
    }
    deleteAll(){
        const listaVacia = [];
        this.productos = listaVacia;
        console.log('Lista vaciada exitosamente.')
    }

    updateById(id,newProduct){
        const index = this.productos.findIndex(producto => producto.id == id )
        this.productos[index] = newProduct;
        this.productos[index].id = id 
        
    }

}

module.exports = Container;

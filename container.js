class container{
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
        console.log('Producto encontrado.')
    }
}


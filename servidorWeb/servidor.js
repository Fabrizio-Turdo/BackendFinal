const fs = require('fs');

const http = require('http');
const express = require('express');


const mensaje = () =>{
    const hora = new Date().getHours()
    if(hora>=6 && hora <=12){
        return "Buenos dias!."
    } else if(hora>=13 && hora <=19){
        return "Buenas tardes!."
    }else{
        return "Buenas noches!."
    }
}

//SERVER HTTP

// //req=request res=response
// const app = http.createServer((req,res)=>{
//     res.end(mensaje())
// })
// //defino el puerto en el que voy a operar
// const PORT = 8080;
// app.listen(8080);
// console.log(`servidor http escuchando puerto ${PORT}`)


//creo server con express
const app = express() 
//conecto el servidor
const PORT = 8080;
app.listen(8080);
console.log(`servidor http escuchando puerto ${PORT}`);

class Contenedor {
    constructor (miArchivo){
        this.nombreArchivo = miArchivo;
    }

    //creo o leo el archivo

    async readArchivo(){
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                const data = await fs.promises.readFile(this.nombreArchivo);
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (err) {
            console.log('No se pudo crear el archivo',err)
        }
    }

    //Agrego o edito el contenido del archivo

    async writeArchivo(content) {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(content));
        } catch (err) {
            console.log('No se pudo escribir el archivo',err);
        }
    }

    //Guardar productos

    async save(producto) {
        const content = await this.readArchivo();
        let id = content.length + 1;
        producto["id"] = id;
        content.push(producto);
        await this.writeArchivo(content);
        return `id del prodcuto agregado: ${id}`
    }

    //obtener todos los productos

    async getAll(){
        console.log(await this.readArchivo);
        return await this.readArchivo()
    }

    //obtener elementos mediante id

    async getById(id){
        const content = await this.readArchivo();
        let producto = {}
        producto = content.find(element => element.id == id);
        if(!producto){
            producto=null;
        }
        return producto
    }

    //elliminar producto mediante id

    async deleteById(){
        const contenido = await this.readArchivo();
        const newContenido =contenido.filter(element => element.id !== id);
        await this.writeArchivo(newContenido);
    }

    //eliminar todos los productos

    async deleteAll(){
        const contenido = [];
        await this.writeArchivo(contenido);
    }
}


const container = new Contenedor('./miArchivo.txt');
const agregoArchivo = async () =>{
    await container.save({
        title: "Escuadra",
        price: 20,
        thumbnail: "foto"
    });
    
    await container.save({
        title: "Cuaderno",
        price: 23,
        thumbnail: "foto2"
    });

    await container.save({
        title: "cartuchera",
        price: 12,
        thumbnail: "foto3"
    });

    await container.save({
        title: "tijera",
        price: 11,
        thumbnail: "foto4"
    })
}


//pedir info al server
app.get('/productos',async(req,res)=>{
    const productos = await container.getAll();
    console.log(productos)
 
    res.json(productos) //para enviar arrays y .send para strings
})
// let visitas = 0;
// app.get('/visitas',(req,res)=>{
//     res.send(`La cantidad de visitas es: ${++visitas}`)
// })
// app.get('/fyh',(req,res)=>{
//     res.send({fyh: new Date().toLocaleString()})
// })
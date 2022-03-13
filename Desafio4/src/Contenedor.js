"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contenedor = void 0;
const fs = require("fs");
class Contenedor {
    productos;
    _uid;
    file;
    constructor(file) {
        this.productos = [];
        this.file = file;
        this._uid = 0;
    }
    async readContent() {
        try {
            const products = await fs.promises.readFile(this.file, "utf-8").then(elem => JSON.parse(elem));
            this.productos = products;
            this.productos.map((producto) => {
                if (producto.id && this._uid < producto.id) {
                    this._uid = producto.id;
                }
            });
            return this.productos;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async readFile() {
        console.log(await this.readContent());
    }
    async save(producto) {
        this._uid++;
        producto.id = this._uid;
        this.productos.push(producto);
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(this.productos));
            return this._uid;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    getById(idNum) {
        const foundObject = this.productos.filter(elem => elem.id === idNum);
        return foundObject;
    }
    async getAll() {
        const allProducts = await this.readContent();
        return allProducts;
    }
    async deleteByID(idNum) {
        try {
            const products = await this.readContent();
            const nuevo = products.filter(elem => elem.id !== idNum);
            this.productos = nuevo;
            await fs.promises.writeFile(this.file, JSON.stringify(nuevo))
                .then(() => this._uid--);
        }
        catch (err) {
            console.log(`No se pudo borrar el elemento con id: ${idNum}`);
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, "")
                .then(() => console.log("Se borro todo"))
                .then(() => {
                this.productos = [];
                this._uid = 0;
            });
        }
        catch (err) {
            console.log(`No se pudieron borrar los elementos del archivo`);
        }
    }
}
exports.Contenedor = Contenedor;
//# sourceMappingURL=Contenedor.js.map
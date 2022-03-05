import fs = require('fs');

export type ProductType = {
    id?: number
    title: string
    price: number
    thumbnail: string
}


interface ContenedorType{
    productos: ProductType[]
    _uid: number
    file: string
    save(producto:ProductType): Promise<number>
    getById(id:number):ProductType
    getAll():Promise<ProductType[]>
    deleteByID(id:number):Promise<void>
    deleteAll():Promise<void>

}

export class Contenedor implements ContenedorType {
    productos: ProductType[]
    _uid: number
    file: string
    constructor(file:string){
        this.productos=[]
        this.file=file
        this._uid=0
    }

    private async readContent() :Promise<ProductType[]>{
        try{
           
            const products:ProductType[] = await fs.promises.readFile(this.file,"utf-8").then(elem =>JSON.parse(elem))
            this.productos=products

            
            this.productos.map( (producto:ProductType) => {
                if(producto.id && this._uid < producto.id){
                    this._uid = producto.id
                }
            })
            return this.productos
        } catch (error:any){
            throw new Error(error)
        }

    }
    async readFile() :Promise<void>{
        
        console.log(await this.readContent())
    }


    async save(producto:ProductType):Promise<number>{
        this._uid++
        producto.id =this._uid
        this.productos.push(producto)
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(this.productos))
            return this._uid
        }catch(error:any){
            throw new Error(error)
        }
        
    }

    getById(idNum:number):ProductType{
        
        const foundObject:any = this.productos.filter(elem => elem.id === idNum)
        return foundObject
    }
    
    async getAll() :Promise<ProductType[]>{
        const allProducts = await this.readContent()
        return  allProducts
    }

    async deleteByID(idNum:number):Promise<void>{
        try{
            const products = await this.readContent()
            const nuevo = products.filter(elem => elem.id !== idNum)
            this.productos=nuevo
        await fs.promises.writeFile(this.file, JSON.stringify(nuevo))
        .then(()=> this._uid--)
        }catch (err){
            console.log(`No se pudo borrar el elemento con id: ${idNum}`)
        }
    }

    
    async deleteAll():Promise<void>{
        try{
        await fs.promises.writeFile(this.file, "")
        .then(()=> console.log("Se borro todo"))
        .then(()=>{
            this.productos=[]
            this._uid=0
        })
        }catch (err){
            console.log(`No se pudieron borrar los elementos del archivo`)
        }
    }
}

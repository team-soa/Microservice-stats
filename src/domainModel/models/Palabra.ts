export default class Palabra{
    _id: any
    palabra: string|undefined
    presicion: number|undefined
    apariciones: number|undefined

    constructor(palabra:string, presicion: number){
        this.palabra = palabra
        this.presicion = presicion
        this.apariciones = 1
    }
}
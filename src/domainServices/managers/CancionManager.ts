import IDataBase from "../../applicationServices/database/IDataBase";
import Cancion from "../../domainModel/models/Cancion";
import ICancionManager from "./ICancionManager";

export default class CancionManager implements ICancionManager{
    dataBase:IDataBase

    constructor(dataBase: IDataBase) {
        this.dataBase = dataBase;
    }
    async getCancionsStatistics():Promise<Cancion[]>{
        return (await this.dataBase.getCancions()).sort((a,b)=>b.reproducciones!-a.reproducciones!)
    }
    async increaseCancionReproductions(cancion: string): Promise<boolean> {
        let query = new Cancion()
        query.nombre = cancion
        let cancionObject = await this.dataBase.getCancion(query)
        if(cancionObject){
            cancionObject.reproducciones!++
            return await this.dataBase.updateCancion(query, cancionObject)
        }else{
            let newCancion = new Cancion()
            newCancion.nombre = cancion
            newCancion.reproducciones = 1
            return await this.dataBase.insertCancion(newCancion)
        }
    }
}
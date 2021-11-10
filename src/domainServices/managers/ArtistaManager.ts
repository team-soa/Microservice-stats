import IDataBase from "../../applicationServices/database/IDataBase";
import Artista from "../../domainModel/models/Artista";
import IArtistaManager from "./IArtistaManager";

export default class ArtistaManager implements IArtistaManager{
    dataBase:IDataBase

    constructor(dataBase: IDataBase) {
        this.dataBase = dataBase;
    }
    async getArtistasStatistics():Promise<Artista[]>{
        return (await this.dataBase.getArtistas()).sort((a,b)=>b.reproducciones!-a.reproducciones!)
    }
    async increaseArtistaReproductions(artista: string): Promise<boolean> {
        let query = new Artista()
        query.nombre = artista
        let artistaObject = await this.dataBase.getArtista(query)
        if(artistaObject){
            artistaObject.reproducciones!++
            return await this.dataBase.updateArtista(query, artistaObject)
        }else{
            let newArtista = new Artista()
            newArtista.nombre = artista
            newArtista.reproducciones = 1
            return await this.dataBase.insertArtista(newArtista)
        }
    }
}
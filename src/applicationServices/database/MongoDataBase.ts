import Artista from "../../domainModel/models/Artista"
import Cancion from "../../domainModel/models/Cancion"
import Palabra from "../../domainModel/models/Palabra"
import IDataBase from "./IDataBase"

const MongoClient = require('mongodb').MongoClient

export default class MongoDataBase implements IDataBase{
  artistaCollection:any
  cancionCollection:any
  palabraCollection:any
    constructor(connectionString:string){
        MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then((client:any) => {
          console.log('Connected to Database')
          const db = client.db("statistics")
          this.artistaCollection = db.collection('artista')
          this.cancionCollection = db.collection('cancion')
          this.palabraCollection = db.collection('palabras')
      }).catch((e:any)=> console.log(e))      
    }

  
  async insertArtista(artista: Artista): Promise<boolean> {
    let result = await this.artistaCollection.insertOne(artista)
    return result.insertedId !== undefined
  }
  async getArtista(query: Artista): Promise<Artista> {
    return await this.artistaCollection.findOne(query)
  }
  async updateArtista(query: Artista, artista: Artista): Promise<boolean> {
    const result = await this.artistaCollection.updateOne(query, {"$set":artista})
    return result.matchedCount === 1;
  }
  async getArtistas(): Promise<Artista[]> {
    let data = await this.artistaCollection.find()
    let artistas: Artista[] = []
    await data.forEach((artista:Artista) => {
      artistas.push(artista)
    });
    return artistas
  }

  async insertCancion(cancion: Cancion): Promise<boolean> {
    let result = await this.cancionCollection.insertOne(cancion)
    return result.insertedId !== undefined
  }
  async getCancion(query: Cancion): Promise<Cancion> {
    return await this.cancionCollection.findOne(query)
  }
  async updateCancion(query: Cancion, cancion: Cancion): Promise<boolean> {
    const result = await this.cancionCollection.updateOne(query, {"$set":cancion})
    return result.matchedCount === 1;
  }
  async getCancions(): Promise<Cancion[]> {
    let data = await this.cancionCollection.find()
    let canciones: Cancion[] = []
    await data.forEach((cancion:Cancion) => {
      canciones.push(cancion)
    });
    return canciones
  }


  async insertPalabra(palabra: Palabra): Promise<boolean> {
    let result = await this.palabraCollection.insertOne(palabra)
    return result.insertedId !== undefined
  }
  async getPalabra(query: Palabra): Promise<Palabra> {
    return await this.palabraCollection.findOne(query)
  }
  async updatePalabra(query: Palabra, palabra: Palabra): Promise<boolean> {
    const result = await this.palabraCollection.updateOne(query, {"$set":palabra})
    return result.matchedCount === 1;
  }
  async getPalabras(): Promise<Palabra[]> {
    let data = await this.palabraCollection.find()
    let palabras: Palabra[] = []
    await data.forEach((palabra:Palabra) => {
      palabras.push(palabra)
    });
    return palabras
  }
}

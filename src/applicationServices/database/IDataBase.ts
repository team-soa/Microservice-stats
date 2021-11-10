import Artista from "../../domainModel/models/Artista";
import Cancion from "../../domainModel/models/Cancion";
import Palabra from "../../domainModel/models/Palabra";

export default interface IDataBase{
    insertArtista(artista: Artista): Promise<boolean>
    getArtista(query: Artista): Promise<Artista> 
    updateArtista(query: Artista, artista: Artista): Promise<boolean> 
    getArtistas(): Promise<Artista[]> 
    insertCancion(cancion: Cancion): Promise<boolean>
    getCancion(query: Cancion): Promise<Cancion> 
    updateCancion(query: Cancion, cancion: Cancion): Promise<boolean> 
    getCancions(): Promise<Cancion[]> 
    insertPalabra(palabra: Palabra): Promise<boolean> 
    getPalabra(query: Palabra): Promise<Palabra> 
    updatePalabra(query: Palabra, palabra: Palabra): Promise<boolean> 
    getPalabras(): Promise<Palabra[]>
}

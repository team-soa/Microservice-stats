import Artista from "../../domainModel/models/Artista";

export default interface IArtistaManager{

    getArtistasStatistics():Promise<Artista[]>
    increaseArtistaReproductions(artista: string): Promise<boolean> 
}
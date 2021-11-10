import Cancion from "../../domainModel/models/Cancion";

export default interface ICancionManager{

    getCancionsStatistics():Promise<Cancion[]>
    increaseCancionReproductions(cancion: string): Promise<boolean> 
}
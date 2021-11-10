import NewStatistics from "../../domainModel/models/NewStatistics";
import Palabra from "../../domainModel/models/Palabra";

export default interface IPalabraManager{
    getPalabrasStatistics():Promise<Palabra[]>
    updatePalabrasStatistics(palabra: string, newStatistics:NewStatistics):Promise<Boolean>
}
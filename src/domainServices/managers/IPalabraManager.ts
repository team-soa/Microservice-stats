import NewStatistics from "../../domainModel/models/NewStatistics";
import Palabra from "../../domainModel/models/Palabra";
import { OrderEnum } from "./OrderEnum";

export default interface IPalabraManager{
    getPalabrasStatistics():Promise<Palabra[]>
    updatePalabrasStatistics(palabra: string, newStatistics:NewStatistics):Promise<Boolean>
    getPalabrasStatisticsByOrder(order:OrderEnum):Promise<Palabra[]>
}
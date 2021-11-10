import NewStatistics from "../models/NewStatistics";
import Palabra from "../models/Palabra";

export default interface IStatisticsUpdater{
    updatePalabra(oldPalabra: Palabra, newData: NewStatistics): Palabra
}
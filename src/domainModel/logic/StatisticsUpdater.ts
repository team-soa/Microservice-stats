import IStatisticsUpdater from "./IStatisticsUpdater";
import NewStatistics from "../models/NewStatistics";
import Palabra from "../models/Palabra";

export default class StatisticsUpdater implements IStatisticsUpdater{
    updatePalabra(oldPalabra: Palabra, newData: NewStatistics): Palabra{
        oldPalabra.presicion = (oldPalabra.presicion!*oldPalabra.apariciones! + newData.score!)/(++oldPalabra.apariciones!)
        return oldPalabra
    }
}
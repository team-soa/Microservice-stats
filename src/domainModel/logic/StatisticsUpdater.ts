import IStatisticsUpdater from "./IStatisticsUpdater";
import Statistics from "../models/statistics";
import NewStatistics from "../models/NewStatistics";

export default class StatisticsUpdater implements IStatisticsUpdater{
    // To-do: implementar
    updateStatistics(statistics: Statistics, newData: NewStatistics){
        return statistics
    }
}
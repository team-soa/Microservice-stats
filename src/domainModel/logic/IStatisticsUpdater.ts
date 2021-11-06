import NewStatistics from "../models/NewStatistics";
import Statistics from "../models/statistics";

export default interface IStatisticsUpdater{
    updateStatistics(statistics: Statistics, newData: NewStatistics): Statistics
}
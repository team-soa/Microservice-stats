import IStatisticsUpdater from "../../domainModel/logic/IStatisticsUpdater";
import NewStatistics from "../../domainModel/models/NewStatistics";
import Statistics from "../../domainModel/models/statistics";
import IStatisticsManager from "../managers/IStatisticsManager";
import IMessageExecuter from "./IMessageExecuter";

export default class UpdateStatisticsExecuter implements IMessageExecuter{
    statisticsManager: IStatisticsManager
    statisticsUpdater: IStatisticsUpdater
    constructor(statisticsManager: IStatisticsManager, statisticsUpdater: IStatisticsUpdater){
        this.statisticsManager = statisticsManager
        this.statisticsUpdater = statisticsUpdater
    }
    async executeMessage(message: string) {
        let newData:NewStatistics =  JSON.parse(message)
        if(newData.username){
            let currentStatistics: Statistics = await  this.statisticsManager.getStatiscticsByUser(newData.username!)
            let newStatistics:Statistics = this.statisticsUpdater.updateStatistics(currentStatistics, newData)
            await this.statisticsManager.updateStatisticsByUser(newData.username!, newStatistics)
        }
    }
}
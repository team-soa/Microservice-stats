import IStatisticsManager from "../managers/IStatisticsManager";
import IMessageExecuter from "./IMessageExecuter";
import InitializeStatisticsRequest from "./Models/InitializeStatisticsRequest";

export default class InitializeStatisticsExecuters implements IMessageExecuter{
    statisticsManager: IStatisticsManager
    constructor(statisticsManager: IStatisticsManager){
        this.statisticsManager = statisticsManager
    }
    async executeMessage(message: string): Promise<void> {
        let request:InitializeStatisticsRequest =  JSON.parse(message)
        if(request.username){
            await this.statisticsManager.initializeStatistics(request.username)
        }
    }
}
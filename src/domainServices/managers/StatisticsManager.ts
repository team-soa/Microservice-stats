import IDataBase from "../../applicationServices/database/IDataBase";
import IStatisticsManager from "./IStatisticsManager";
import Statistics from "../../domainModel/models/statistics";

export default class StatisticsManager implements IStatisticsManager{
    dataBase:IDataBase

    constructor(dataBase: IDataBase) {
        this.dataBase = dataBase;
    }
    async initializeStatistics(username: string): Promise<boolean> {
        let statistics = new Statistics(username)
        return await this.dataBase.insertStatistics(statistics)
    }
    async getStatiscticsByUser(username: string): Promise<Statistics> {
        let statistics = new Statistics(username)
        return await this.dataBase.getStatistics(statistics)
    }
    async updateStatisticsByUser(username: string, statistics: Statistics): Promise<boolean> {
        let query = new Statistics(username)
        return await this.dataBase.updateStatistics(query, statistics)
    }
}

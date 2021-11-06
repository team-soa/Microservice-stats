import Statistics from "../../domainModel/models/statistics";

export default interface IStatisticsManager{
    initializeStatistics(username:string): Promise<boolean>
    getStatiscticsByUser(username:string): Promise<Statistics>
    updateStatisticsByUser(username:string, statistics: Statistics): Promise<boolean>
}

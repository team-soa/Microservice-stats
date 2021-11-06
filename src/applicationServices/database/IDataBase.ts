import Statistics from "../../domainModel/models/statistics";

export default interface IDataBase{
    insertStatistics(statistics:Statistics):Promise<boolean>
    getStatistics(query:Statistics): Promise<Statistics>
    updateStatistics(query:Statistics, statistics:Statistics):Promise<boolean>
}

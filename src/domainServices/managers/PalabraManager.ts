import IDataBase from "../../applicationServices/database/IDataBase";
import IStatisticsUpdater from "../../domainModel/logic/IStatisticsUpdater";
import NewStatistics from "../../domainModel/models/NewStatistics";
import Palabra from "../../domainModel/models/Palabra";
import IPalabraManager from "./IPalabraManager";

export default class PalabraManager implements IPalabraManager{
    dataBase:IDataBase
    statisticsUpdater: IStatisticsUpdater
    constructor(dataBase: IDataBase, statisticsUpdater: IStatisticsUpdater) {
        this.dataBase = dataBase;
        this.statisticsUpdater = statisticsUpdater;
    }
    async getPalabrasStatistics():Promise<Palabra[]>{
        return (await this.dataBase.getPalabras()).sort((a,b)=>b.presicion!-a.presicion!)
    }

    async updatePalabrasStatistics(palabra: string, newStatistics:NewStatistics):Promise<Boolean>{
        let query = <Palabra>{palabra}
        let palabraObject = await this.dataBase.getPalabra(query)
        if(palabraObject){
            palabraObject = this.statisticsUpdater.updatePalabra(palabraObject, newStatistics)
            return await this.dataBase.updatePalabra(query, palabraObject)
        }else{
            let newPalabra = new Palabra(palabra, newStatistics.score!)
            return await this.dataBase.insertPalabra(newPalabra)
        }
    }
}
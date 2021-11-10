import NewStatistics from "../../domainModel/models/NewStatistics";
import IPalabraManager from "../managers/IPalabraManager";
import IMessageExecuter from "./IMessageExecuter";

export default class UpdateStatisticsExecuter implements IMessageExecuter{
    palabraManager: IPalabraManager
    constructor(palabraManager: IPalabraManager){
        this.palabraManager = palabraManager
    }
    async executeMessage(message: string){
        let newData:NewStatistics[] =  JSON.parse(message)
        for(let i=0; i< newData.length; i++){
            let newDatum = newData[i]
            if(newDatum.word && newDatum.score){
                await this.palabraManager.updatePalabrasStatistics(newDatum.word, newDatum)
            }
        }
    }
}
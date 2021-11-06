import Statistics from "../../domainModel/models/statistics"
import IDataBase from "./IDataBase"

const MongoClient = require('mongodb').MongoClient

export default class MongoDataBase implements IDataBase{
  statisticsCollection:any
    constructor(connectionString:string){
        MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then((client:any) => {
          console.log('Connected to Database')
          const db = client.db("statistics")
          this.statisticsCollection = db.collection('statistics')
      }).catch((e:any)=> console.log(e))      
    }
  async insertStatistics(statistics: Statistics): Promise<boolean> {
    let result = await this.statisticsCollection.insertOne(statistics)
    return result.insertedId !== undefined
  }
  async getStatistics(query: Statistics): Promise<Statistics> {
    return await this.statisticsCollection.findOne(query)
  }
  async updateStatistics(query: Statistics, statistics: Statistics): Promise<boolean> {
    const result = await this.statisticsCollection.updateOne(query, {"$set":statistics})
    return result.matchedCount === 1;
  }

}

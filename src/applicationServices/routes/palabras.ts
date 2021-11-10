var express = require('express');
var router = express.Router();
var cors = require('cors')
import {app, corsOptions, palabraManager} from '../../configuration/app'
import Palabra from '../../domainModel/models/Palabra';
const keycloak2 = require('../config/keycloak').getKeycloak();


router.get('/',  keycloak2.protect('user'), cors(corsOptions), async function(req:any, res:any, next:any) {
  try{
    let statistics: Palabra[] = await palabraManager.getPalabrasStatistics()
    if(statistics){
      res.jsonp(statistics);
    }else{
      res.status(404).jsonp({message: "No  were found"});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});

module.exports = router;
router.options('/', cors(corsOptions))

var express = require('express');
var router = express.Router();
var cors = require('cors')
import {app, corsOptions, statisticsManager} from '../../configuration/app'
import Statistics from "../../domainModel/models/statistics";
const keycloak2 = require('../config/keycloak').getKeycloak();

router.get('/:username',  keycloak2.protect('user'), cors(corsOptions), async function(req:any, res:any, next:any) {
  try{
    let username = req.params.username
    if(req.kauth.grant.access_token.content.preferred_username === username){
      let statistics: Statistics = await statisticsManager.getStatiscticsByUser(username)
      if(statistics){
        res.jsonp(statistics);
      }else{
        res.status(404).jsonp({message: "No statistics were found"});
      }
    }else{
      res.status(403).jsonp({message: "Access Denied to the requested resources"});
      return
    }
}
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});





module.exports = router;
router.options('/', cors(corsOptions)) // enable pre-flight request for DELETE request
router.options('/:id', cors(corsOptions)) // enable pre-flight request for DELETE request

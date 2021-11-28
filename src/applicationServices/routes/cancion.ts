var express = require('express');
var router = express.Router();
var cors = require('cors')
import {app, corsOptions, cancionManager} from '../../configuration/app'
import Cancion from '../../domainModel/models/Cancion';
const keycloak2 = require('../config/keycloak').getKeycloak();


router.get('/', cors(corsOptions), async function(req:any, res:any, next:any) {
  try{
    let statistics: Cancion[] = await cancionManager.getCancionsStatistics()
    if(statistics){
      res.jsonp(statistics);
    }else{
      res.status(404).jsonp({message: "No statistics were found"});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});

router.post('/update/:cancion',   cors(corsOptions), async function(req:any, res:any, next:any) {
  try{
    let cancion = req.params.cancion
    let result = await cancionManager.increaseCancionReproductions(cancion)
    if(result){
      res.jsonp({message: "Succesfully updated"});
    }else{
      res.status(500).jsonp({message: "Unable to update"});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).jsonp({message:"Internal Server Error"});
  }
});



module.exports = router;
router.options('/', cors(corsOptions)) // enable pre-flight request for DELETE request
router.options('/update/:cancion', cors(corsOptions)) // enable pre-flight request for DELETE request

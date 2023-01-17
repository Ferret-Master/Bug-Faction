/**
 * This file controls locking/unlocking units even when a scenario is not picked
 */

//hardcoded locks, research packs can add to this by appending to it, units that have been locked will be removed, ensures units stay locked on resets

model.unitsToLock = ["/pa/units/land/bug_grunt_big/bug_grunt_big.json",
                    "/pa/units/land/bug_ripper_stealth/bug_ripper_stealth.json",
                    "/pa/units/land/bug_combat_fab/bug_combat_fab_cheap.json",
                    "/pa/units/land/bug_needler/bug_needler_fast.json",
                    "/pa/units/land/bug_crusher/bug_crusher.json",
                    "/pa/units/land/bug_hydra/bug_hydra.json",
                    "/pa/units/land/bug_boomer/bug_boomer_r.json",
                    "/pa/units/structure/bug_mine/bug_mine.json"
                    ];

//tracks locked units
model.lockedUnits = [];

//hardcoded pairs, can be added to by research packs by appending, format is [[researchfactoryunit,[unitsToUnlock],[unitToLock],replaceLockedUnitsBool]

//with the addition of replacing units queued I think I will have it be default as the only edge case is research which I will just not track

//to combo replace/lock have locked units be on the end of the unitsToLock array and not match up numerically with the unitsToUnlock array

//issue when I want to unlock a unit + replace another so need to double up on the unlock

model.unlockPairs = [

    //alpha grunt
    ["/pa/units/research/unlocks/bug_grunt_big_unlock/bug_grunt_big_unlock.json",//trigger unit
    ["/pa/units/land/bug_grunt_big/bug_grunt_big.json"],//units added
    ["/pa/units/land/bug_grunt/bug_grunt.json","/pa/units/research/unlocks/bug_grunt_big_unlock/bug_grunt_big_unlock.json"],//units replaced/locked
    true],//is a replace rather than just locks

    //stealth ripper
    ["/pa/units/research/unlocks/bug_ripper_stealth_unlock/bug_ripper_stealth_unlock.json",
    ["/pa/units/land/bug_ripper_stealth/bug_ripper_stealth.json"],
    ["/pa/units/land/bug_ripper/bug_ripper.json","/pa/units/research/unlocks/bug_ripper_stealth_unlock/bug_ripper_stealth_unlock.json"],
    true],

    //cheap combat fabs
    ["/pa/units/research/unlocks/bug_combat_fab_cheap_unlock/bug_combat_fab_cheap_unlock.json",
    ["/pa/units/land/bug_combat_fab/bug_combat_fab_cheap.json"],
    ["/pa/units/land/bug_combat_fab/bug_combat_fab.json","/pa/units/research/unlocks/bug_combat_fab_cheap_unlock/bug_combat_fab_cheap_unlock.json"],
    true],

    //fast needler
    ["/pa/units/research/unlocks/bug_needler_fast_unlock/bug_needler_fast_unlock.json",
    ["/pa/units/land/bug_needler/bug_needler_fast.json"],
    ["/pa/units/land/bug_needler/bug_needler.json","/pa/units/research/unlocks/bug_needler_fast_unlock/bug_needler_fast_unlock.json"],
     true],

     //boomer mine transform unlock
    ["/pa/units/research/unlocks/bug_boomer_mine_unlock/bug_boomer_mine_unlock.json",
    ["/pa/units/land/bug_boomer/bug_boomer_r.json","/pa/units/structure/bug_mine/bug_mine.json"],
    ["/pa/units/land/bug_boomer/bug_boomer.json","/pa/units/structure/bug_mine/bug_mine.json", "/pa/units/research/unlocks/bug_boomer_mine_unlock/bug_boomer_mine_unlock.json"],
     true],
     
     //crusher unlock
    ["/pa/units/research/unlocks/bug_crusher_unlock/bug_crusher_unlock.json",
    ["/pa/units/land/bug_crusher/bug_crusher.json"],
    ["/pa/units/research/unlocks/bug_crusher_unlock/bug_crusher_unlock.json"],
    false],

    //hydra unlock
    ["/pa/units/research/unlocks/bug_hydra_unlock/bug_hydra_unlock.json",
    ["/pa/units/land/bug_hydra/bug_hydra.json"],
    ["/pa/units/research/unlocks/bug_hydra_unlock/bug_hydra_unlock.json"],
    false],
 

    

//   ["/pa/units/research/unlocks/bug_ripper_normal_unlock/bug_ripper_normal_unlock.json",
//   ["/pa/units/land/bug_ripper/bug_ripper.json","/pa/units/research/unlocks/bug_ripper_stealth_return_unlock/bug_ripper_stealth_return_unlock.json"],
//   ["/pa/units/land/bug_ripper_stealth/bug_ripper_stealth.json","/pa/units/research/unlocks/bug_ripper_normal_unlock/bug_ripper_normal_unlock.json"],
//   true],

//   ["/pa/units/research/unlocks/bug_ripper_stealth_return_unlock/bug_ripper_stealth_return_unlock.json",
//   ["/pa/units/land/bug_ripper_stealth/bug_ripper_stealth.json","/pa/units/research/unlocks/bug_ripper_normal_unlock/bug_ripper_normal_unlock.json"],
//   ["/pa/units/land/bug_ripper/bug_ripper.json","/pa/units/research/unlocks/bug_ripper_stealth_return_unlock/bug_ripper_stealth_return_unlock.json"],
//   true]
]

//for circular research the older ones need to be deleted if a newer research is done.
model.deleteOldPairs = [

]

model.reLockUnits = function(){
    model.lockedUnits.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
      

    })
}
researchLoop = function(){
   
    model.unitsToLock.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
        model.lockedUnits.push(unit)

    })
    model.unitsToLock = []
    
    if(model.lockedUnits.length > 0){
       
        var armyPromise = model.allPlayerArmy(model.armyIndex())
        
        armyPromise.then(function(result){

            var armyKeys = _.keys(result)
           
            model.unlockPairs.forEach(function(pair){
              
                
                if(_.contains(model.lockedUnits,pair[1][0])){//if the pair is not already unlocked
                
                 
                    if(_.contains(armyKeys,pair[0])){//unlock unit exists so unit should be unlocked
                      
                        var armyDataPromise = api.getWorldView(0).getUnitState(result[pair[0]])
                        armyDataPromise.then(function(result){
                       
                        if(result[0].built_frac == undefined){
                      
                       

                        //if the unlock should actually be a replace
                        if(pair[3] !== true){
                        pair[1].forEach(function(unit){
                            console.log("unlocking ",+unit)
                            api.Panel.message("build_bar", 'unlockUnit',unit)
                     
                        })
                        if(pair[2] !== undefined){
                            pair[2].forEach(function(unit){
                                console.log("locking ",+unit)
                                api.Panel.message("build_bar", 'lockUnit',unit)
                                model.lockedUnits.push(unit)
                            })

                        }}
                        else{
                            console.log("replacing units")
                            for(var i = 0; i< pair[2].length;i++){
                                if(pair[1][i] == pair[2][i] && pair[1][i] !== undefined){//needed for more unlocks combined with replace
                                    api.Panel.message("build_bar", 'unlockUnit',pair[1][i])
                                }
                                else if(pair[1][i] !== undefined){//matching replace
                                 
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[pair[1][i]], pair[3]])
                                }
                                else{//lock the pair 2 as it has no match
                                   
                                    //replace that sets the new unit to undefined as a way to cancel its build order
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[undefined], pair[3]])
                                    api.Panel.message("build_bar", 'lockUnit',pair[2][i])
                                }
                            }
                        }



                        for(var i = 0;i<model.lockedUnits.length;i++){
                           // console.log(lockedUnits[i],pair[1])
                           pair[1].forEach(function(unit){
                            if(model.lockedUnits[i] == unit){
                                model.lockedUnits.splice(i,1)
                            }
                        })
                        
                     
                        
                           
                        }

                        }
                        })
                        
                    }
                    
                }
        
            })

        })
        
    }
    

    _.delay(researchLoop,1000)

}



_.delay(researchLoop,1000)


var world = api.getWorldView(0)

// the below is yoinked from scenarios, it is not really needed to be this complex for research


var unitJsons = model.unitSpecs//I think this has a list of unit keys that then have types

model.allPlayerArmy = function(playerId,unitType, stateFlag,unitTypeValue){
    var planets = model.planetListState()
    var promiseArray = [];
    for(planet in planets.planets){
        planet = planets.planets[planet]
        if(planet.id !== undefined || planet.id === 0){
            var chosenPlanet = planet.index;
        }
        else{continue}

        promiseArray.push(model.playerArmy(playerId, chosenPlanet,unitType, stateFlag,unitTypeValue))
    }
    var allPlanetArmyPromise = Promise.all(promiseArray)
    return allPlanetArmyPromise.then(function(result){
        var finalUnits = {};
        for(army in result){// for each player planet
            var armyKeys = _.keys(result[army])
           

            for(unit in armyKeys){//for each unit on a planet
              
                if(!(armyKeys[unit] in finalUnits)){finalUnits[armyKeys[unit]] = []};//if 
               
                
                for(i in result[army][armyKeys[unit]]){
                 
                    finalUnits[armyKeys[unit]].push(result[army][armyKeys[unit]][i])
                }
               
            
        }
    }
      
        return finalUnits;

    })

}
model.playerArmy = function(playerId, planetId,unitType, stateFlag,unitTypeValue){

    if(unitJsons == undefined){unitJsons = model.unitSpecs}
    var one = !_.isArray(unitType);
    if (one){
        unitType = [unitType];

    }
    var one = !_.isArray(unitTypeValue);
    if (one){
        unitTypeValue = [unitTypeValue];

    }

    var promise = new Promise(function(resolve,reject){

        if(world){

            if(stateFlag !== true){
                
            
                
                var promise2 = world.getArmyUnits(playerId,planetId).then(function (result){
                   
                   
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                 
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                       
                        result =  finalResult;
                    }
                
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
                      
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                  
                                    //if(_.contains(unitJsons[jsonKeys[i]].types,"UNITTYPE_NoBuild")){continue}
                                    matchedValue++;
                             
                                }
                            }
                            
                           
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                     
                        result = finalResult;

                    }
               

                    return result
                
                
                
                
                })
           
                resolve(promise2)
            
            
            
            }//TODO add unit filter here
    
            else{
         
                    var promise2 = world.getArmyUnits(playerId,planetId).then(function(result){ 
    
                    var unitArray = [];
                    
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                        
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                      
                        result =  finalResult;
                    }
                 
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                    matchedValue++;
                             
                                }
                            }
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                        result = finalResult;

                    }
                    
                    armyKeys = _.keys(result)
                    for(var i = 0;i<armyKeys.length;i++){
                        unitArray.push(result[armyKeys[i]])
                    }
                    unitArray = _.flatten(unitArray)
                   
                    return world.getUnitState(unitArray).then(function (ready) {
                        var unitData = this.result;
                        var one = !_.isArray(unitData);
                        if (one){
                                unitData = [unitData];
    
                        }
              
                        
                      return unitData;
                    }
                    
                   
                    )
                })
                
            }
          
            promise2.then(function(result){resolve(result)})
    
        }

    })

    promise.then(function(result){return result})
    
    return promise;
   


}



handlers.buildRestart = function(payload){//build ui has restarted so tell it what to lock again
    model.reLockUnits();
}
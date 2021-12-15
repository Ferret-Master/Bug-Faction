/**
 * This file controls locking/unlocking units even when a scenario is not picked
 */

//hardcoded locks, research packs can add to this by appending to it, units that have been locked will be removed, ensures units stay locked on resets

model.unitsToLock = [];

//tracks locked units
model.lockedUnits = [];

//hardcoded pairs, can be added to by research packs by appending, format is [[researchfactoryunit,unittounlock],[]]
model.unlockPairs = [
  

]
//for circular research the older ones need to be deleted if a newer research is done.
model.deleteOldPairs = [

]
researchLoop = function(){

    model.unitsToLock.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
        model.lockedUnits.push(unit)

    })
    model.unitsToLock = []
    if(model.lockedUnits.length>0){
        var armyPromise = model.allPlayerArmy(model.armyIndex())
        
        armyPromise.then(function(result){

            var armyKeys = _.keys(result)
        
            model.unlockPairs.forEach(function(pair){

                if(_.contains(model.lockedUnits,pair[1])){//if the pair is not already unlocked
                 // console.log("pair not unlocked")
                 
                    if(_.contains(armyKeys,pair[0])){//unlock unit exists so unit should be unlocked
                       // console.log("unlock unit exists")
                        var armyDataPromise = api.getWorldView(0).getUnitState(result[pair[0]])
                        armyDataPromise.then(function(result){
                       
                        if(result[0].built_frac == undefined){
                           // console.log("unlocking unit")
                        api.Panel.message("build_bar", 'unlockUnit',pair[1])
                        if(pair[2] !== undefined){
                            pair[2].forEach(function(unit){
                                api.Panel.message("build_bar", 'lockUnit',unit)
                                model.lockedUnits.push(unit)
                            })

                        }

                        for(var i = 0;i<model.lockedUnits.length;i++){
                           // console.log(lockedUnits[i],pair[1])
                            if(model.lockedUnits[i] == pair[1]){
                                model.lockedUnits.splice(i,1)
                            }
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
//taken from live game, stores the most up to date build order of selections
model.parseSelection = function (payload)
        {
            var i = 0;
            var tabs = {};
            var selectionCanBuild = false;

            self.allowedCommands = {};

            self.buildItemMinIndex(0);

            self.cmdIndex(-1);
            self.selectionTypes([]);

            for (var id in payload.spec_ids) {
                var unit = self.unitSpecs[id];
                if (!unit)
                    continue;

                for (i = 0; i < unit.commands.length; i++)
                    self.allowedCommands[unit.commands[i]] = true;

                selectionCanBuild |= unit.canBuild;

                self.selectionTypes().push(id);
            }

            if (!tabs[self.activeBuildGroup()])
                self.activeBuildGroup(null);

            self.selectedMobile(payload.selected_mobile);

            if (self.reviewMode() || self.isSpectator())
                selectionCanBuild = false;

            if (selectionCanBuild) {
                if (self.selectedMobile()) {
                    modify_keybinds({ remove: ['build unit'], add: ['build structure'] });
                } else {
                    modify_keybinds({ remove: ['build structure'], add: ['build unit'] });
                }
            }
            else {
                modify_keybinds({ remove: ['build structure', 'build unit'] });
                model.clearBuildSequence();
            }

            if (!$.isEmptyObject(payload.spec_ids))
                self.selection(payload);
            else
                self.selection(null);
        };
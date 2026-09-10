/**
 * This file is for the functions that allow live editing of the build bar/available units with the intent of allowing research to be a mechanic
 * 
 * model.buildSet().units contains the unit list I need to edit
 */


 model.oldUnits = []

 model.newUnits = []

var lockedUnits = []

// Galactic War (and GW Overhaul) tags every unit spec a player's own army
// can build with a per-army suffix appended after ".json" - e.g.
// "...bug_crusher.json.player" instead of the plain path research.js
// hardcodes - so this build set's own unit keys can differ from the
// untagged names research.js sends over. These helpers match and preserve
// that tag instead of requiring an exact untagged key.
function unitPathBase(path){
    if(typeof path !== "string"){return path}
    var jsonIndex = path.lastIndexOf(".json");
    return jsonIndex === -1 ? path : path.slice(0, jsonIndex + 5);
}

function sameUnitBase(a,b){
    return unitPathBase(a) === unitPathBase(b);
}

//whatever GW appended after ".json" on taggedPath (e.g. ".player"), or ""
//if taggedPath isn't a tagged form of basePath
function specTagSuffix(taggedPath, basePath){
    if(typeof taggedPath !== "string" || typeof basePath !== "string"){return ""}
    var base = unitPathBase(basePath);
    if(taggedPath.slice(0, base.length) !== base){return ""}
    return taggedPath.slice(base.length);
}

model.findBuildUnitKey = function(unitName){
    var units = model.buildSet().units;
    if(units[unitName] !== undefined){return unitName}
    var keys = _.keys(units);
    for(var i = 0;i<keys.length;i++){
        if(sameUnitBase(keys[i], unitName)){return keys[i]}
    }
    return undefined;
}


model.lockUnit = function(unitName){//units are locked by adding _disabled to the end of the id
    var buildSet = model.buildSet();
    if(buildSet == undefined){_.delay(model.lockUnit,100,unitName)}
    var units = model.buildSet().units
    var resolvedName = model.findBuildUnitKey(unitName);
    if(resolvedName !== undefined){
        var unitId = units[resolvedName].id
        if(unitId.endsWith("_disabled")){return}
        units[resolvedName].id = unitId + "_disabled"
    }
}

model.unlockUnit = function(unitName){//units are unlocked by removing the _disabled for units that otherwise match the id

    var units = model.buildSet().units
    var resolvedName = model.findBuildUnitKey(unitName);
    if(resolvedName !== undefined){
        var unitId = units[resolvedName].id
        if(unitId.endsWith("_disabled")){
            units[resolvedName].id = resolvedName
        }
        else{return}


    }
}
//model.buildSet().tabs()[0].items()[0][0]

//goes tabs -> ITEMS/ROWS -> slots , check via id
//loop through each of these and replace any id's/buildbar icons that need replacing

//takes in array of units to replace and what to replace them with
//if replaceQueue is true it replaces the old unit in the queue, if it is false it removes it, if undefined nothing
model.replaceUnit = function(originalNames, replacementNames, replaceQueue){
    console.log(replacementNames[0])
    if(replacementNames[0] !== null){
    var tabs = model.buildSet().tabs()
    for(var i = 0;i<tabs.length;i++){
        var tab = tabs[i].items();
        for(var j = 0; j<tab.length;j++){
            var row = tab[j];
            for(var k = 0;k<row.length;k++){
                var slot = row[k];
                for(var nameIndex = 0;nameIndex < originalNames.length;nameIndex++){

                    if(sameUnitBase(slot.id, originalNames[nameIndex])){

                        //keep whatever GW tagged this player's own copy of the
                        //slot with, rather than overwriting it with the bare
                        //untagged path - the tagged replacement spec is what
                        //this army can actually build. A non-string
                        //replacement (undefined) cancels the build order and
                        //is passed through as-is.
                        var newId = replacementNames[nameIndex]
                        if(typeof newId === "string"){
                            newId = unitPathBase(newId) + specTagSuffix(slot.id, originalNames[nameIndex])
                        }

                        model.buildSet().tabs()[i].items()[j][k].id =  newId
                        var buildbarReplacement = replacementNames[nameIndex].replace('.json','_icon_buildbar.png')
                        buildbarReplacement =  "coui:/" + buildbarReplacement
                        // console.log("old image")
                        // console.log(model.buildSet().tabs()[i].items()[j][k].buildIcon())

                        // console.log("new image")
                        // console.log(buildbarReplacement)
                        model.buildSet().tabs()[i].items()[j][k].buildIcon(buildbarReplacement)
                    }
                }
            }
        }
    }
}
    for(var i = 0; i< originalNames.length;i++){
        if(replacementNames[0] !== null){
        api.Panel.message(api.Panel.parentId,'replaceHotkey',[originalNames[i],replacementNames[i]]);}
        if(replaceQueue == true){api.Panel.message(api.Panel.parentId,'replaceQueue',[originalNames[i],replacementNames[i]]);}
        if(replacementNames[0] !== null){
        model.setupReplaceCount([originalNames[i],replacementNames[i]])
        }

        //can use autofac method or sendOrder method, autofac is known to work so will go with that
    // if(factoryMap !== undefined && replaceQueue !== undefined){
    //     var facKeys = _.keys(factoryMap)
    //     var facsToReQueue = []
    //     for(var j = 0; j < facKeys.length; j++){
    //         if(factoryMap[facKeys[j]][originalNames[i]] > 0){//if the factory has any of the original unit
    //             facsToReQueue.push(facKeys[j])
    //         }
    //     }
    //     if(replaceQueue === true){
    //         model.replaceUnitQueue(facsToReQueue,originalNames[i],replacementNames[i], false)
    //     }
    //     else{
    //         model.replaceUnitQueue(facsToReQueue,originalNames[i],replacementNames[i], true)
    //     }
    // }
    }

    

}



handlers.lockUnit = function(payload){
    console.log("locking unit"+payload)
    model.lockUnit(payload)
}


handlers.unlockUnit = function(payload){
    console.log("unlocking unit"+payload)
    model.unlockUnit(payload)
}

handlers.replaceUnit = function(payload){
    console.log("replacing units"+payload)
    model.replaceUnit(payload[0],payload[1],payload[2])
}

var tempfunction = function(selection)//shadowing the selection function to fake unit counts
{
 
    var curSpecs = model.buildSet().selectedSpecs();
    var removeSpecs = _.clone(curSpecs);
    var addSpecs = {};

    // Calculate the spec delta
    _.forIn(selection.spec_ids, function(count, id)
    {
        if (removeSpecs[id] || curSpecs[id])
        {
            delete removeSpecs[id];
            return;
        }

        if (model.buildSet().buildLists[id])
            addSpecs[id] = model.buildSet().buildLists[id];
    });

    var addEmpty = _.isEmpty(addSpecs);
    var removeEmpty = _.isEmpty(removeSpecs);
    if (!addEmpty || !removeEmpty)
    {
        if (!removeEmpty)
        {
            _.forIn(removeSpecs, function(build, id)
            {
                delete curSpecs[id];
            });
        }
        if (!addEmpty)
        {
            _.assign(curSpecs, addSpecs);
        }
        model.buildSet().selectedSpecs.notifySubscribers(curSpecs);
    }

    // Update counts
    var buildItems = model.buildSet().buildItems();
    var clears = _.transform(buildItems, function(result, item, id) { result[id] = item.count(); });
    _.forIn(selection.build_orders, function(count, id)
    {
        if (count)
            delete clears[id];
        if (buildItems[id])
            buildItems[id].count(count);
    });
    _.forIn(clears, function(value, id)
    {
        if (value)
            buildItems[id].count(0);
    });

    for(key in selection.build_orders){// if a new unit is queued is adds the count to the old unit to update the ui
        var unit = key
     
        for(var i = 0;i<model.newUnits.length;i++){
           
            if(unit == model.newUnits[i]){
          
                var newUnitCount = selection.build_orders[model.newUnits[i]]
                

                var oldUnit =  model.oldUnits[i];
            
       
                model.buildSet().buildItems()[oldUnit].count(newUnitCount)
               
            }
        }

    }
};

model.setupReplaceCount = function(unitPair){
    for(var i = 0;i<model.oldUnits.length;i++){
        if(unitPair[0] == model.oldUnits[i]){
            model.newUnits[i] = unitPair[1];
            return;
        }
    }
    model.oldUnits.push(unitPair[0])
    model.newUnits.push(unitPair[1])
}

var delayedAssign = function(){
    model.buildSet().parseSelection = tempfunction;
}

_.delay(delayedAssign,5000)

if (model.BuildSet && model.BuildSet.tabsTemplate) {
    model.BuildSet.tabsTemplate = model.BuildSet.tabsTemplate.concat([
        ["bug_factory", "!LOC:factory"],
        ["bug_combat", "!LOC:combat"],
        ["bug_utility", "!LOC:utility"],
        ["bug_ground", "!LOC:land"],
        ["bug_ground_2", "!LOC:swarm"],
        ["bug_air", "!LOC:air"],
        ["bug_research", "!LOC:research"],
        ["bug_adv_research", "!LOC:research"],
        ["bug_research_2", "!LOC:research"]
    ]);
}

api.Panel.message(api.Panel.parentId,'buildRestart',"restarted");
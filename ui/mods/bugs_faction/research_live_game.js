//this keeps track of replaced units and allows hotkeys to work on them

//not sure exactly how multiple replacements would work, I will need to set it to replace the new unit value without touching the old

model.oldUnits = []//units being replaced, this is checked before building anything

model.newUnits = []//replaces the id if an old unit is hotkeyed

model.executeStartBuild = function (params) {
    var id = params.item;
    for(var i = 0;i<model.oldUnits.length;i++){
        if(id == model.oldUnits[i]){
            id = model.newUnits[i];
        }
    }
    var batch = params.batch;
    var cancel = params.cancel;
    var urgent = params.urgent;
    var more = params.more;


    if (model.selectedMobile()) {
        model.endCommandMode();
        model.currentBuildStructureId(id);
        api.arch.beginFabMode(id)
                .then(function (ok) {
                    if (!ok)
                        model.endFabMode();
                });

        model.mode('fab');
        model.fabCount(0);
    }
    else {
        var count = batch ? model.batchBuildSize() : 1;
        console.log(id)
        console.log(urgent)
        console.log(count)
        console.log(more)
        if (cancel) {
            api.unit.cancelBuild(id, count, urgent);
            api.audio.playSound('/SE/UI/UI_factory_remove_from_queue');
        }
        else {
            api.unit.build(id, count, urgent).then(function (success) {
                if (success) {
                    var secondary = more ? '_secondary' : '';
                    api.audio.playSound('/SE/UI/UI_Command_Build' + secondary);
                }
            });
        }
    }
}
model.buildItemBySpec = function (spec_id) {
    for(var i = 0;i<model.oldUnits.length;i++){
        if(spec_id == model.oldUnits[i]){
            spec_id = model.newUnits[i];
        }
    }
    var item = model.unitSpecs[spec_id];
    if (item)
        model.buildItem(item);
}

handlers.replaceHotkey = function(unitPair){
    for(var i = 0;i<model.oldUnits.length;i++){
        if(unitPair[0] == model.oldUnits[i]){
            model.newUnits[i] = unitPair[1];
            return;
        }
    }
    model.oldUnits.push(unitPair[0])
    model.newUnits.push(unitPair[1])
}
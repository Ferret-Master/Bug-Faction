var newBuildScenario = {

    //utility
    "/pa/units/structure/bug_basic_energy/bug_basic_energy.json": ["bug_utility", 9, {row: 1, column: 3}],
    "/pa/units/structure/bug_advanced_energy/bug_advanced_energy.json": ["bug_utility", 3, {row: 0, column: 3}],
    "/pa/units/structure/bug_basic_extractor/bug_basic_extractor.json": ["bug_utility", 10, {row: 1, column: 4}],
    "/pa/units/structure/bug_advanced_extractor/bug_advanced_extractor.json": ["bug_utility", 4, {row: 0, column: 4}],
    "/pa/units/structure/bug_radar/bug_radar.json": ["bug_utility", 14, {row: 2, column: 2}],
    "/pa/units/structure/bug_radar_advanced/bug_radar_advanced.json": ["bug_utility", 8, {row: 1, column: 2}],

    
    //defenses
    "/pa/units/structure/bug_turret_small/bug_turret_small.json": ["bug_combat", 6, {row: 1, column: 0}],
    "/pa/units/structure/bug_aa_small/bug_aa_small.json": ["bug_combat", 13, {row: 2, column: 1}],
    "/pa/units/structure/bug_aa_large/bug_aa_large.json": ["bug_combat", 7, {row: 1, column: 1}],

    //factorys
    "/pa/units/structure/basic_hive/basic_hive.json": ["bug_factory", 16, {row: 2, column: 4}],
    "/pa/units/structure/advanced_hive/advanced_hive.json": ["bug_factory", 10, {row: 1, column: 4}],
    "/pa/units/research/basic_research_station/basic_research_station.json": ["bug_factory", 0, {row: 0, column: 0}],

    //unlocks
    "/pa/units/research/unlocks/bug_ripper_normal_unlock/bug_ripper_normal_unlock.json": ["bug_research", 0, {row: 2, column: 0}],
    "/pa/units/research/unlocks/bug_ripper_stealth_return_unlock/bug_ripper_stealth_return_unlock.json":["bug_research",1,{row:2,column:1}],
    "/pa/units/research/unlocks/bug_ripper_stealth_unlock/bug_ripper_stealth_unlock.json":["bug_research",2,{row:2,column:2}],
    "/pa/units/research/unlocks/bug_grunt_big_unlock/bug_grunt_big_unlock.json":["bug_research",2,{row:2,column:3}],
   

    //t1 hive
    "/pa/units/land/bug_bot_fab/bug_bot_fab.json": ["bug_ground", 12, {row: 2, column: 0}],
    "/pa/units/land/bug_grunt/bug_grunt.json": ["bug_ground", 13, {row: 2, column: 1}],
    "/pa/units/land/bug_ripper/bug_ripper.json": ["bug_ground", 14, {row: 2, column: 2}],
    "/pa/units/land/bug_needler/bug_needler.json": ["bug_ground", 20, {row: 2, column: 6}],
    "/pa/units/land/bug_runner/bug_runner.json": ["bug_ground", 15, {row: 2, column: 3}],
    "/pa/units/land/bug_aa/bug_aa.json": ["bug_ground", 15, {row: 2, column: 4}],

    //t2 hive
    "/pa/units/land/bug_bot_fab_advanced/bug_bot_fab_advanced.json": ["bug_ground", 6, {row: 1, column: 0}],
    "/pa/units/land/bug_scorcher/bug_scorcher.json": ["bug_ground", 7, {row: 1, column: 1}],
    "/pa/units/land/bug_manticore/bug_manticore.json": ["bug_ground", 15, {row: 2, column: 4}],
    "/pa/units/land/bug_crusher/bug_crusher.json": ["bug_ground", 15, {row: 1, column: 4}],
    "/pa/units/land/bug_aa-big/bug_aa_big.json": ["bug_ground", 15, {row: 1, column: 6}],

    //titans
    "/pa/units/land/bug_titan/bug_titan.json": ["bug_factory", 3, {row: 0, column: 3}],
    //ammo
    "/pa/units/structure/bug_mine/bug_mine.json": ["bug_ammo", 14, {row: 2, column: 2}],
}
if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
    _.extend(Build.HotkeyModel.SpecIdToGridMap, newBuildScenario);
}
var newBuildScenario = {

     //factorys
     "/pa/units/structure/basic_hive/basic_hive.json": ["bug_factory", 16, {row: 2, column: 4}],
     "/pa/units/structure/bug_swarm_hive/bug_swarm_hive.json": ["bug_factory", 16, {row: 2, column: 5}],
     "/pa/units/structure/advanced_hive/advanced_hive.json": ["bug_factory", 10, {row: 1, column: 4}],
     "/pa/units/research/basic_research_station/basic_research_station.json": ["bug_factory", 0, {row: 0, column: 0}],
     "/pa/units/research/advanced_research_station/advanced_research_station.json": ["bug_factory", 0, {row: 0, column: 1}],
     "/pa/units/structure/bug_orbital_launcher/bug_orbital_launcher.json": ["bug_factory", 12, {row: 2, column: 0}],
     "/pa/units/structure/basic_air_hive/basic_air_hive.json": ["bug_factory", 14, {row: 2, column: 2}],
     "/pa/units/structure/advanced_air_hive/advanced_air_hive.json": ["bug_factory", 14, {row: 1, column: 2}],
     "/pa/units/structure/basic_naval_hive/basic_naval_hive.json": ["bug_factory", 13, {row: 2, column: 1}],

    //utility
    "/pa/units/structure/bug_basic_energy/bug_basic_energy.json": ["bug_utility", 9, {row: 1, column: 3}],
    "/pa/units/structure/bug_advanced_energy/bug_advanced_energy.json": ["bug_utility", 3, {row: 0, column: 3}],
    "/pa/units/structure/bug_basic_extractor/bug_basic_extractor.json": ["bug_utility", 10, {row: 1, column: 4}],
    "/pa/units/structure/bug_advanced_extractor/bug_advanced_extractor.json": ["bug_utility", 4, {row: 0, column: 4}],
    "/pa/units/structure/bug_radar/bug_radar.json": ["bug_utility", 14, {row: 2, column: 2}],
    "/pa/units/structure/bug_radar_advanced/bug_radar_advanced.json": ["bug_utility", 8, {row: 1, column: 2}],
    "/pa/units/structure/bug_metal_storage/bug_metal_storage.json": ["bug_utility", 16, {row: 2, column: 4}],
    "/pa/units/structure/bug_energy_storage/bug_energy_storage.json": ["bug_utility", 15, {row: 2, column: 3}],
    "/pa/units/structure/bug_teleporter/bug_teleporter.json": ["bug_utility", 13, {row: 2, column: 1}],

    
    //defenses
    "/pa/units/structure/bug_turret_small/bug_turret_small.json": ["bug_combat", 6, {row: 1, column: 0}],
    "/pa/units/structure/bug_aa_small/bug_aa_small.json": ["bug_combat", 13, {row: 2, column: 1}],
    "/pa/units/structure/bug_aa_large/bug_aa_large.json": ["bug_combat", 7, {row: 1, column: 1}],
     "/pa/units/structure/bug_anti_orbital/bug_anti_orbital.json": ["bug_combat", 16, {row: 2, column: 4}],
     "/pa/units/structure/bug_arty_small/bug_arty_small.json": ["bug_combat", 14, {row: 2, column: 2}],
     "/pa/units/structure/bug_arty_large/bug_arty_large.json": ["bug_combat", 2, {row: 0, column: 2}],

   

    //unlocks

    "/pa/units/research/unlocks/bug_ripper_stealth_unlock/bug_ripper_stealth_unlock.json":["bug_research",2,{row:2,column:0}],
    "/pa/units/research/unlocks/bug_grunt_big_unlock/bug_grunt_big_unlock.json":["bug_research",2,{row:2,column:1}],
    "/pa/units/research/unlocks/bug_needler_fast_unlock/bug_needler_fast_unlock.json":["bug_research",2,{row:2,column:2}],
    "/pa/units/research/unlocks/bug_combat_fab_cheap_unlock/bug_combat_fab_cheap_unlock.json":["bug_research",2,{row:2,column:3}],

    //t1 hive
    "/pa/units/land/bug_bot_fab/bug_bot_fab.json": ["bug_ground", 12, {row: 2, column: 0}],
    "/pa/units/land/bug_needler/bug_needler.json": ["bug_ground", 20, {row: 2, column: 1}],
    "/pa/units/land/bug_grunt/bug_grunt.json": ["bug_ground", 13, {row: 2, column: 2}],
    "/pa/units/land/bug_aa/bug_aa.json": ["bug_ground", 18, {row: 2, column: 3}],
    "/pa/units/land/bug_gren/bug_gren.json": ["bug_ground", 13, {row: 2, column: 4}],

     //t2 hive
     "/pa/units/land/bug_bot_fab_advanced/bug_bot_fab_advanced.json": ["bug_ground", 6, {row: 1, column: 0}],
     "/pa/units/land/bug_manticore/bug_manticore.json": ["bug_ground", 15, {row: 1, column: 1}],
     "/pa/units/land/bug_crusher/bug_crusher.json": ["bug_ground", 15, {row: 1, column: 2}],
     "/pa/units/land/bug_aa_big/bug_aa_big.json": ["bug_ground", 15, {row: 1, column: 3}],
     "/pa/units/land/bug_hydra/bug_hydra.json": ["bug_ground", 15, {row: 0, column: 4}],
     "/pa/units/land/bug_scorcher/bug_scorcher.json": ["bug_ground", 7, {row: 1, column: 5}],
     "/pa/units/land/bug_sniper/bug_sniper.json": ["bug_ground", 15, {row: 1, column: 6}],
     "/pa/units/land/bug_boomer_big/bug_boomer_big.json": ["bug_ground", 15, {row: 0, column: 0}],

   
    //swarm hive
    "/pa/units/land/bug_combat_fab/bug_combat_fab.json": ["bug_ground_2", 15, {row: 2, column: 0}],
    "/pa/units/land/bug_boomer/bug_boomer.json": ["bug_ground_2", 17, {row: 2, column: 1}],
    "/pa/units/land/bug_ripper/bug_ripper.json": ["bug_ground_2", 14, {row: 2, column: 2}],
    "/pa/units/land/bug_runner/bug_runner.json": ["bug_ground_2", 16, {row: 2, column: 3}],

    //t1 air hive
    "/pa/units/air/bug_fighter/bug_fighter.json": ["bug_air", 13, {row: 2, column: 1}],
    "/pa/units/air/bug_bomber/bug_bomber.json": ["bug_air", 14, {row: 2, column: 2}],
    "/pa/units/air/bug_air_scout/bug_air_scout.json": ["bug_air", 15, {row: 2, column: 3}],
    "/pa/units/air/bug_air_fab/bug_air_fab.json": ["bug_air", 12, {row: 2, column: 0}],
    "/pa/units/air/bug_harpy/bug_harpy.json": ["bug_air", 17, {row: 2, column: 5}],

    //t2 air hive
    "/pa/units/air/bug_basilisk/bug_basilisk.json": ["bug_air", 17, {row: 1, column: 5}],


    //titans
    "/pa/units/land/bug_titan/bug_titan.json": ["bug_factory", 3, {row: 0, column: 3}],
    //ammo
    "/pa/units/structure/bug_mine/bug_mine.json": ["bug_ammo", 14, {row: 2, column: 2}],
    "/pa/units/structure/bug_mine_big/bug_mine_big.json": ["bug_ammo", 15, {row: 2, column: 3}],
}
if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
    _.extend(Build.HotkeyModel.SpecIdToGridMap, newBuildScenario);
}


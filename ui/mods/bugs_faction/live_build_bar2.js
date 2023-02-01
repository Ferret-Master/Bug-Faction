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

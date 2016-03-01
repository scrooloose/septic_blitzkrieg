function WorldState(tank1, tank2) {
    this.tank1 = tank1;
    this.tank2 = tank2;
}

WorldState.projects.toJSON = function() {
    return "{}";
}

const Sheep = require('./Sheep');

class Pilot {

    constructor(pilotInfo = {}) {
        this.nickname = pilotInfo.nickname || 'Test';
        this.sheep = new Sheep(pilotInfo.sheep);
    }
}

module.exports = Pilot;
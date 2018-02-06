class Sheep {

    constructor(sheepInfo = {}) {
        this.model = sheepInfo.model || 'Test model';
    }
}

module.exports = Sheep;
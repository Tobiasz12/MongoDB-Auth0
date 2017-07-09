var mongoose = require('mongoose');

var shipmentSchema = new mongoose.Schema({
    givenName: {
        type: String
    },
    nickName: {
        type: String
    }
});

module.exports = mongoose.model('shipmentSchema', shipmentSchema);

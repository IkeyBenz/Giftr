const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    message: { type: String, required: true },
    amount: { type: Number, required: true },
    image: { type: String, required: false },
    dateCreated: { type: Date, defualt: Date.now() }
});

module.exports = mongoose.model('Gift', GiftSchema);
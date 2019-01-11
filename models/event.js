const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift', required: true }],
    date: { type: String, required: true },
    address: { type: String, required: true },
    totalCollected: { type: Number, default: 0.00 },
    dateCreated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Event', EventSchema);

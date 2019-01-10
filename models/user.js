const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// TODO: validate email input
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift' }]
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
            this.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, next) {
    return bcrypt.compare(password, this.password, next);
}

module.exports = mongoose.model('User', UserSchema);
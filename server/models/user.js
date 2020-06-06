const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required!', 
        minLength: [4, 'Minimum username characters is 4'], 
        maxLength: [32, 'Maximum username characters is 32']
    },
    email: {
        type: String, 
        minLength: [6, 'Minimum email length is 6 characters'], 
        maxLength: [50, 'Maxiumum email length is 50 characters'], 
        uniqe: true, 
        lowercase: true, 
        required: 'Email is required!', 
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password: {
        type: String, 
        minLength: [6, 'Password must be at least 6 characters'],
        maxLegth: [40, 'Password cannot be longer than 40 characters'],
        required: 'Password is required'
    }
});

userSchema.methods.hasSamePassword = function(providedPassword) {
    const user = this;
    return bcrypt.compareSync(providedPassword, user.password);
}

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', userSchema);
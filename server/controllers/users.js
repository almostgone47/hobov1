const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({errors: [{title: 'Missing data', details: 'Missing email or password'}]})
    }

    User.findOne({email}, (err, existingUser) => {
        if (err) { return res.mongoError(err)}

        if (!existingUser) {
            return res.status(422).send({errors: [{ title: 'Invalid email', details: 'User with this email does not exist' }]})
        }

        if (existingUser.hasSamePassword(password)) {
            const token = jwt.sign({
                sub: existingUser.id,
                username: existingUser.username
            }, config.JWT_SECRET, { expiresIn: '24h' })
            return res.json(token);
        } else {
            return res.status(422).send({errors: [{ title: 'DB Error', details: 'Incorrect Password' }] })
        }
    })
}

exports.registerUser = (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;
    if (!email || !password || !username) {
        return res.status(422).send({errors: [{title: 'Missing data', details: 'Email,username and password are required'}]})
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Cannot confirm password', details: 'Password Confirmation does not match password'}]})
    }
    User.findOne({email}, (err, existingUser) => {
        if (err) { return res.mongoError(err)}

        if (existingUser) {
            return res.status(422).send({errors: [{ title: 'Invalid email', details: 'User email already exists' }]})
        }
        const user = new User({ username, email, password });
        user.save((err) => {
            if (err) { return res.mongoError(err)}
            return res.json({status: 'Successfully registered user!'})
        })
    })
}

exports.onlyAuthUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const decodedToken = parseToken(token);
        if (!decodedToken) { return notAuthorized(res) }

        User.findById(decodedToken.sub, (err, foundUser) => {
            if (err) { return res.mongoError(err) }
            if (foundUser) {
                res.locals.user = foundUser;
                next()
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res)
    }
}

function parseToken(token) {
    try {
        return jwt.verify(token.split(' ')[1], config.JWT_SECRET) || null;
    } catch(err) {
        return null
    }
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{ title: 'You are not authorized to do that.', details: 'You must be logged in to perform this function'}] })
}
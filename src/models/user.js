const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }, 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to Login')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new Error('Unable to Login')
    }

    return user
}

userSchema.methods.toJSON = function() {
    
    const userObject = this.toObject()
    
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id.toString()}, 'thisismynewcourse')
    
    this.tokens = this.tokens.concat({ token })
    await this.save()
    
    return token
}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner' 
})

const User = mongoose.model('User', userSchema)

module.exports = User
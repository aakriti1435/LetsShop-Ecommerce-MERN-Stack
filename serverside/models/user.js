import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
}, {timestamps: true});

//Hashing the password
userSchema.virtual('password').set(function(password){
    this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(){
        return bcrypt.compare(password, this.hashPassword);
    }
};

const User = mongoose.model('User', userSchema);
export default User;
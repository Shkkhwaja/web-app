import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    user: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
}, 
{ collection: 'register' }
);

// Hash password before saving to the database
UserSchema.pre('save', async function(next) {
    if (this.isModified('pass') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.pass = await bcrypt.hash(this.pass, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

const userData = mongoose.model('userdata', UserSchema);
export default userData;

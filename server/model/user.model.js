import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name : {
        type: String, 
        require: true
    },
    user : {
        type: String, 
        require: true
    },
    email : {
        type: String,
        require: true,
        unique: true
    },
    pass : {
        type: String,
        require: true
    }

},
{ collection: 'register'}
)
const userData = mongoose.model('userdata', User)
export default userData
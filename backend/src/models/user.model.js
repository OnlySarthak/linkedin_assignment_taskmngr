import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.generateToken = function() {
    try {
        const token = jwt.sign({ id: this._id,
                username: this.username
         }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}

const User = mongoose.model('User', userSchema);
export default User;
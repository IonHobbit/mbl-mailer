import { model, Schema } from 'mongoose';
import { User } from '../../interfaces/user.interface';

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const UserModel = model<User>('User', userSchema);

export default UserModel;

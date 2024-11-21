import mongoose from 'mongoose';
import { validatePermissions } from '../utils/helperFunctions.js';

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
      maxLength: [50, 'Title cannot exceed 50 characters'],
    },
    permissions: {
      type: [String],
      validate: [
        {
          validator: permissions => permissions.length > 0,
          message: 'Array must have at least one permission',
        },
        {
          validator: validatePermissions,
          message: 'One or more permissions are invalid',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Role', roleSchema);

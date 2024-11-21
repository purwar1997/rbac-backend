import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required'],
      maxLength: [100, 'Name cannot exceed 100 characters'],
    },
    role: {
      type: Schema.Types.ObjectId,
      required: [true, 'Role is required'],
      ref: 'Role',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);

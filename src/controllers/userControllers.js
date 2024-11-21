import User from '../models/user.js';
import handleAsync from '../utils/handleAsync.js';
import CustomError from '../utils/customError.js';
import { sendResponse } from '../utils/helperFunctions.js';

// Checks whether a user exists or not
export const checkUserExistence = handleAsync(async (req, res) => {
  const { username } = req.query;

  const user = await User.findOne({ name: username }).populate('role');

  if (!user) {
    throw new CustomError("User by this name doesn't exists", 404);
  }

  sendResponse(res, 200, 'User by this name exists', user);
});

// Fetches a list of users
export const getUsers = handleAsync(async (_req, res) => {
  const users = await User.find().populate({
    path: 'role',
    select: 'title',
  });

  sendResponse(res, 200, 'Users fetched successfully', users);
});

// Fetches a user by ID
export const getUserById = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate({
    path: 'role',
    select: 'title',
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'User fetched by ID successfully', user);
});

// Adds a new user
export const addNewUser = handleAsync(async (req, res) => {
  const { name } = req.body;

  const user = await User.findOne({ name });

  if (user) {
    throw new CustomError('User by this name already exists. Please provide a different name', 409);
  }

  const newUser = await User.create(req.body);

  sendResponse(res, 201, 'User added successfully', newUser);
});

// Updates an existing user
export const updateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const userByName = await User.findOne({ name });

  if (userByName) {
    throw new CustomError('User by this name already exists. Please provide a different name', 409);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    runValidators: true,
    new: true,
  });

  sendResponse(res, 200, 'User updated successfully', updatedUser);
});

// Deletes a user
export const deleteUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'User deleted successfully');
});

// Activates a user
export const activateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  if (user.isActive) {
    throw new CustomError('User is already active', 409);
  }

  user.isActive = true;
  const activatedUser = await user.save();

  sendResponse(res, 200, 'User activated successfully', activatedUser);
});

// Deactivates a user
export const deactivateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  if (!user.isActive) {
    throw new CustomError('User is already inactive', 409);
  }

  user.isActive = false;
  const deactivatedUser = await user.save();

  sendResponse(res, 200, 'User deactivated successfully', deactivatedUser);
});

// Archives a user
export const archiveUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  if (user.isArchived) {
    throw new CustomError('User is already archived', 409);
  }

  user.isArchived = true;
  const archivedUser = await user.save();

  sendResponse(res, 200, 'User archived successfully', archivedUser);
});

// Restores an archived user
export const restoreUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  if (!user.isArchived) {
    throw new CustomError('User is already unarchived', 409);
  }

  user.isArchived = false;
  const restoredUser = await user.save();

  sendResponse(res, 200, 'Archived user restored successfully', restoredUser);
});

import User from '../models/user.js';
import Role from '../models/role.js';
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

  const user = await User.findById(userId).populate('role');

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'User fetched by ID successfully', user);
});

// Adds a new user
export const addNewUser = handleAsync(async (req, res) => {
  const { name, role: roleId } = req.body;

  const user = await User.findOne({ name });

  if (user) {
    throw new CustomError('User by this name already exists. Please provide a different name', 409);
  }

  const role = await Role.findById(roleId);

  if (!role) {
    throw new CustomError('Provided role does not exist', 404);
  }

  const newUser = await User.create(req.body);

  await Role.findByIdAndUpdate(newUser.role, {
    $inc: { userCount: 1 },
  });

  sendResponse(res, 201, 'User added successfully', newUser);
});

// Updates an existing user
export const updateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const { name, role: roleId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const userByName = await User.findOne({ name, _id: { $ne: userId } });

  if (userByName) {
    throw new CustomError('User by this name already exists. Please provide a different name', 409);
  }

  const role = await Role.findById(roleId);

  if (!role) {
    throw new CustomError('Provided role does not exist', 404);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    runValidators: true,
    new: true,
  });

  if (updatedUser.role !== user.role) {
    await Role.findByIdAndUpdate(updatedUser.role, {
      $inc: { userCount: 1 },
    });

    await Role.findByIdAndUpdate(user.role, {
      $inc: { userCount: -1 },
    });
  }

  sendResponse(res, 200, 'User updated successfully', updatedUser);
});

// Deletes a user
export const deleteUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new CustomError('User not found', 404);
  }

  await Role.findByIdAndUpdate(deletedUser.role, {
    $inc: { userCount: -1 },
  });

  sendResponse(res, 200, 'User deleted successfully', userId);
});

// Activates a user
export const activateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const activatedUser = await User.findByIdAndUpdate(
    userId,
    { isActive: true },
    { runValidators: true, new: true }
  );

  if (!activatedUser) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'User activated successfully', activatedUser);
});

// Deactivates a user
export const deactivateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const deactivatedUser = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { runValidators: true, new: true }
  );

  if (!deactivatedUser) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'User deactivated successfully', deactivatedUser);
});

// Archives a user
export const archiveUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const archivedUser = await User.findByIdAndUpdate(
    userId,
    { isArchived: true },
    { runValidators: true, new: true }
  );

  if (!archivedUser) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'User archived successfully', archivedUser);
});

// Restores an archived user
export const restoreUser = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const restoredUser = await User.findByIdAndUpdate(
    userId,
    { isArchived: false },
    { runValidators: true, new: true }
  );

  if (!restoredUser) {
    throw new CustomError('User not found', 404);
  }

  sendResponse(res, 200, 'Archived user restored successfully', restoredUser);
});

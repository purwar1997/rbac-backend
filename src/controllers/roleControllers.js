import Role from '../models/role.js';
import handleAsync from '../utils/handleAsync.js';
import CustomError from '../utils/customError.js';
import { sendResponse } from '../utils/helperFunctions.js';

// Fetches a list of roles
export const getRoles = handleAsync(async (_req, res) => {
  const roles = await Role.find();

  sendResponse(res, 200, 'Roles fetched successfully', roles);
});

// Fetches a role by ID
export const getRoleById = handleAsync(async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId);

  if (!role) {
    throw new CustomError('Role not found', 404);
  }

  sendResponse(res, 200, 'Role fetched by ID successfully', role);
});

// Adds a new role
export const addNewRole = handleAsync(async (req, res) => {
  const { title } = req.body;

  const role = await Role.findOne({ title });

  if (role) {
    throw new CustomError(
      'Role by this title already exists. Please provide a different title',
      409
    );
  }

  const newRole = await Role.create(req.body);

  sendResponse(res, 201, 'Role added successfully', newRole);
});

// Updates an existing role
export const updateRole = handleAsync(async (req, res) => {
  const { roleId } = req.params;
  const { title } = req.body;

  const role = await Role.findById(roleId);

  if (!role) {
    throw new CustomError('Role not found', 404);
  }

  const roleByTitle = await Role.findOne({ title });

  if (roleByTitle) {
    throw new CustomError(
      'Role by this title already exists. Please provide a different title',
      409
    );
  }

  const updatedRole = await Role.findByIdAndUpdate(roleId, req.body, {
    runValidators: true,
    new: true,
  });

  sendResponse(res, 200, 'Role updated successfully', updatedRole);
});

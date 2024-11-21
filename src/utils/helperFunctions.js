import { PERMISSIONS } from '../constants.js';

export const sendResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const validatePermissions = permissions =>
  permissions.every(value => Object.values(PERMISSIONS).includes(value));

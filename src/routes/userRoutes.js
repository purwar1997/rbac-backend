import express from 'express';
import {
  getUsers,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser,
  activateUser,
  deactivateUser,
  archiveUser,
  restoreUser,
  checkUserExistence,
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/users').get(getUsers).post(addNewUser);
router.route('/users/:userId').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/users/:userId/activate').put(activateUser);
router.route('/users/:userId/deactivate').put(deactivateUser);
router.route('/users/:userId/archive').put(archiveUser);
router.route('/users/:userId/restore').put(restoreUser);
router.route('/users/exists').get(checkUserExistence);

export default router;

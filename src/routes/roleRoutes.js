import express from 'express';
import {
  getRoles,
  addNewRole,
  getRoleById,
  updateRole,
} from '../controllers/roleControllers.js';

const router = express.Router();

router.route('/roles').get(getRoles).post(addNewRole);
router.route('/roles/:roleId').get(getRoleById).put(updateRole);

export default router;

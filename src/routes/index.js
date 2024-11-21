import express from 'express';
import userRouter from './userRoutes.js';
import roleRouter from './roleRoutes.js';

const router = express.Router();

router.use(userRouter);
router.use(roleRouter);

export default router;

import express from 'express';
import areas from './areas';

const router = express.Router();

areas(router, '/areas');

export default router;

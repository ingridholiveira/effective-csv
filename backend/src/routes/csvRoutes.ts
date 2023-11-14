import express from 'express';
import controller from '../controllers/csvController';
import { csvUpload } from "../middleware/csvUpload"
import multer from 'multer';
const router = express.Router();

router.get('/api/users', controller.getApiUsers);
router.post('/api/files',  multer(csvUpload.getConfig).single("file"), controller.postFilesCsv);

export = router;
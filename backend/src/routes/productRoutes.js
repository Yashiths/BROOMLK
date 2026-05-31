import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (png, jpg, jpeg, webp) are allowed!'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.route('/')
  .get(getProducts)
  .post(upload.single('image'), createProduct); // 👈 Form-data image stream parsing injected

router.route('/:id')
  .put(upload.single('image'), updateProduct)   // 👈 Form-data image stream parsing injected
  .delete(deleteProduct);

export default router;
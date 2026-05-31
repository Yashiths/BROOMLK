import Product from '../models/Product.js';

/**
 * @desc    Get all products (with optional category filtering)
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error retrieving inventory' });
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, stock, description } = req.body;
    if (!name || !brand || !category || !price) {
      return res.status(400).json({ error: 'Please provide all required fields (name, brand, category, price)' });
    }

    // Capture uploaded file destination route path pointer
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = await Product.create({
      name,
      brand,
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      description,
      image: imagePath // 👈 Saves string reference block inside MongoDB instance
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc    Update a product spec
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, price, stock, description } = req.body;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Build operational parameter object array
    const updateData = {
      name,
      brand,
      category,
      price: parseFloat(price),
      stock: stock !== undefined ? parseInt(stock) : product.stock,
      description
    };

    // If new binary image stream appended, update dynamic object mapping path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc    Delete product from database
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting product' });
  }
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
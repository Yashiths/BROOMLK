const Product = require('../models/Product');

/**
 * @desc    Get all products (with optional category filtering)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving inventory' });
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, stock, description } = req.body;
    if (!name || !brand || !category || !price) {
      return res.status(400).json({ error: 'Please provide all required fields (name, brand, category, price)' });
    }
    const newProduct = await Product.create({
      name,
      brand,
      category,
      price,
      stock: parseInt(stock) || 0,
      description
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
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, price, stock, description } = req.body;
    
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        brand,
        category,
        price,
        stock: parseInt(stock) !== undefined ? parseInt(stock) : product.stock,
        description
      },
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
const deleteProduct = async (req, res) => {
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

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

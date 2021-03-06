const router = require("express").Router();
import Product from '../models/productModel';

router.get('/', async (req, res) => {
    const products = await Product.find({ });
    res.send(products);
});
router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});
router.post('/',  async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    qtyInStock: req.body.countInStock,
    description: req.body.description,
   
  });
  
  const newProduct = await product.save();
  if (newProduct) {
    console.log(newProduct)
    return res
      .status(200)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.qtyInStock = req.body.qtyInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

export default router;
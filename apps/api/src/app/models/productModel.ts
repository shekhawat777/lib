import mongoose from 'mongoose';


const prodctSchema = new mongoose.Schema({
  name: { type: String, required: false },
  image: { type: String, required: false },
  price: { type: Number, default: 0, required: false },
  qtyInStock: { type: Number, default: 0, required: false },
  description: { type: String, required: false },
  });

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;
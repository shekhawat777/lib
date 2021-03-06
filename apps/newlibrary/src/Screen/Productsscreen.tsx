import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut
  
} from '../actions/productAction';
import Axios from 'axios';


function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [qtyInStock, setqtyInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave,successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDescription(product.description);
    setqtyInStock(product.qtyInStock);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        image,
        price,
        qtyInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };

 
  const postDetails = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","lib-app")
    data.append("cloud_name","libapp")
    fetch("https://api.cloudinary.com/v1_1/libapp/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })

 
}
  return (
  <>
     <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                
                  id="image"
                  onChange={(e) => setImage(e.target.value[0])}
                ></input>
                <input type="file" onChange={postDetails}></input>
                {uploading && <div>Uploading...</div>}
              </li>
          
              <li>
                <label htmlFor="qtyInStock">InStock</label>
                <input
                  type="text"
                  name="qtyInStock"
                  value={qtyInStock}
                  id="qtyInStock"
                  onChange={(e) => setqtyInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                {id ? 'Update' : 'Create'}
                   </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
         
        </div>
        )}
       <div className="product-list">
        <table className="table">
          <thead>
          <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              
            </tr>
          </thead>
          <tbody>
          {products.map((product) => (
                <tr key={product._id}>
               
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.price}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
        </>
       );
  
}
export default ProductsScreen;

import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { detailsProduct } from '../../../actions/productAction'
import { productDetailsReducer } from '../../../reducers/productReducers';
function ProductScren(props){
  const [qty, setQty] = useState("1");
    const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return()=>{

    };
}, []);
const handleAddToCart = () => {
  props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
};
    

return <div>
<div className="back-to-result">
  
</div>
{loading ? (
  <div>Loading...</div>
) : error ? (
  <div>{error} </div>
) : (
  <>
    <div className="details">
      <div className="details-image">
        <img src={product.imgsrcc} alt="product"></img>
      </div>
      <div className="details-info">
        <ul>
          <li>
            <h4>{product.title}</h4>
          </li>
         
          <li>
            Price: <b>${product.bprice}</b>
          </li>
          <li>
            Description:
            <div>{product.description}</div>
          </li>
          
        </ul>
      </div>
      <div className="details-action">
        <ul>
          <li>Price: {product.bprice}</li>
          <li>
                  Status:{' '}
                  {product.qtyInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
          <li>
                  Qty:{''}
                  <select
                    value={qty} onChange={(e) => {  setQty(e.target.value); }}
                  >
                    {[...Array(product.qtyInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
         
          
                <li>
                  {product.qtyInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
            
          </li>
        </ul>
      </div>
    </div>
   
  </>
)}
</div>
}
export default ProductScren

import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { detailsProduct } from '../actions/productAction'
import Cards from "../Bookdetails/Cardss";
function ProductScren(props){
    const ProductDetails= useSelector(state=>state.ProductDetails);
    const { product, loading, error } = ProductDetails;
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return()=>{

    };
}, []);
    

  
    return loading? <div>loading..</div>:
    error? <div>{error}</div>:
    (
    
        <>
        <div className='Searchbar'></div>
        
            <input type="Text" placeholder='Search Book'/>
            
        {product.map((product)=>{
            return(
                <Cards 
                key={product.id}
                imgsrc={product.imgsrcc}
                title={product.title}
                
                />
            );
        })
    } 
        </>
        )
  }
export default ProductScren

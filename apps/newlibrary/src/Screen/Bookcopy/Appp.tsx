import React, { useEffect, useState } from 'react'
import Card from './Cards'
import {useSelector,useDispatch} from 'react-redux';
import { listProducts } from '../../actions/productAction';
const Sons=()=>{

    const productList = useSelector((state) => state.productList);
    const {  products, loading, error } = productList;
    const dispatch = useDispatch();
    
   
    useEffect(() => {
    dispatch(listProducts());
    return()=>{

    };
}, []);

  
   

    
    return loading? <div>loading..</div>:
error? <div>{error}</div>:
(

    <>
    <div className='Searchbar'></div>
    
        <input type="Text" placeholder='Search Book'/>
        
    { products.map((product)=>{
        return(
            <Card 
            key={product._id}
            imgsrc={product.image}
            title={product.name}
            bname={product.price}
            
            />
            
        );
    })
} 
    </>
    )
}
export default Sons


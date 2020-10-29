import React, { useEffect, useState } from 'react'
import Card from './Cards'
import {useSelector,useDispatch} from 'react-redux';
import { listProducts } from '../actions/productAction';
const Sons=()=>{

    const productList = useSelector((state) => state.productList);
    const { datas, loading, error } = productList;
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
        
    {datas.map((val,index)=>{
        return(
            <Card 
            key={val.id}
            imgsrc={val.imgsrcc}
            title={val.title}
            bname={val.bprice}
            />
        );
    })
} 
    </>
    )
}
export default Sons


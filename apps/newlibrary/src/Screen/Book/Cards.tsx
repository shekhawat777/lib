import React from 'react';
import { Link } from "react-router-dom";
function Card(props){
  
    return( <>
    
    
      <div className='cards'>
        <div className='card'>
          <img src={props.imgsrc} alt ='mypic' className='card_img'/>
          <div className='card-info'>
    <span className='card_category'>{props.title}</span>

    <h3 className='card_tittle'>{props.bname}</h3>
    <div>
      <Link to={"/api/products/" +props.id}><button>Borrow-Now</button> </Link>
    </div>
    
          </div>
        </div>
      </div>
    </>
  
    )
  }
export default Card


import React from 'react';
function cards(props){
  
    return( <>
    
    
      <div className='cards'>
        <div className='card'>
          <img src={props.imgsrc} alt ='mypic' className='card_img'/>
          <div className='card-info'>
    <span className='card_category'>{props.title}</span>
    
    
          </div>
        </div>
      </div>
    </>
  
    )
  }
export default cards


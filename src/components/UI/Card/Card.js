import React, { useEffect } from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  useEffect(()=>{
    console.log('En card');
  },[])
  return (
    <div className={`${classes.card} ${props.className}`}><span>Hola {props.miguel}</span>{props.children}</div>
  );
};

export default Card;

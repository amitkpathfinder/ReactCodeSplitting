import React from 'react';

export default function Avatar(props) {
  return <div>
  				<div>{props.user}</div>
  				<div>{props.size}</div>
  		 </div>;
}
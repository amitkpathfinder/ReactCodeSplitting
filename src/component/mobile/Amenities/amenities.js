import React from 'react';

import style from './component.css';

const sortByActive = (a, b) => {
  let activeItem = 0;
  return activeItem = (b.status > a.status) ? 1 : (b.status < a.status) ? -1 : 0;
}

const renderAmenities = (amenities) => {
  if (amenities) {
    var sortedObj = Object.values(amenities).sort(sortByActive);
    return Object.keys(sortedObj).map((index) => {
     console.log('============',Object.values(sortedObj)[index].tag);
      return (
        <div key={index}
        className={`${style.amenitiesBlock} ${style[(Object.values(sortedObj)[index].visibility === false) ? 'absentAmn' : '']}`}
       >
          <i className={`${style.npIconS} ${style[Object.values(sortedObj)[index].tag]}`}></i>
          <div>{Object.values(sortedObj)[index].name}</div>
        </div>
      )
    })
  }

}

const PseudoAmenities = (props) => (
  <div id='amenitiesWrp' className={`${style.xidBasicAmn}`}>
    <div className={`${style.lineHead}`}>
      <div>basic</div>
    </div>
    <div>
      {renderAmenities(props.amenities)}
    </div>
  </div>
);


export default PseudoAmenities;
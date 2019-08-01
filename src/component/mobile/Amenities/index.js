import React from 'react';
import PseudoAmenities from './amenities';
import temp from './amenities.json'
import XidLifeStyle from './lifeStyle';

// import style from '../../../assets/css/pseudoListings.css'

const premiumcategoryExplain = {
  "CONV": "CONVENIENCE & SECURITY",
  "ENTMT": "ENTERTAINMENT & SOCIALIZING",
  "ECO": "ECO FRIENDLY",
  "SPORTS": "SPORTS & FITNESS",
  "SERV": "SERVICES"
}

const XidAmenitiesWrap = (props) => {
  let tmp = temp.BASIC;
  let LifeStyle = temp.PREMIUM;
  
  console.log('LifeStyle-----------',tmp);
  // let { data: { Basic, LifeStyle } = {} } = props;
  return (
    <div>
      <div className='contentWrap'>       
          <div className='npMainHeading'>Amenities</div>
          <PseudoAmenities amenities={tmp} />
          <div className='clear'></div>
          {LifeStyle && (<XidLifeStyle lifeStyleList={LifeStyle} lifestyleCatgry={premiumcategoryExplain} />)}
        </div>
     
    </div>
  );
}


export default XidAmenitiesWrap;

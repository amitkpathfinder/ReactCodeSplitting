import React from 'react';
import LifeStyleList from './lifeStyleList';
import style from './component.css';

const XidLifeStyle = (props) => {
  let { lifeStyleList, lifestyleCatgry } = props;
  return (
    <div className={`${style.xidPrmAmn}`}>
      <div className={`${style.lineHead}`}>
        <div>lifestyle</div>
      </div>
      <LifeStyleList lifeStyleList={lifeStyleList} lifestyleCatgry={lifestyleCatgry} />
    </div>
  );
}

export default XidLifeStyle;
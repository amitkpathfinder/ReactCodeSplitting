import React from 'react';

import style from './component.css';

let renderLifestyle = (list, lifestyleCatgry) => {
  var mainArr = [], tuple = [];
  mainArr = Object.values(list).map((data, index) => {
    let temp = [];
    temp.push(data.title);
    var dataTmp = data.tuples;
    var temp1 = [];
    tuple =  Object.keys(dataTmp).forEach(function (key) {
      var obj = dataTmp[key];
      temp1.push(obj.name)
    });
    return temp.concat(temp1);   
  })

  var merged = [].concat.apply([], mainArr);
  var i, tempArray = [], chunk =  Math.floor(merged.length/2);
  for (i = 0; i < merged.length; i += chunk) {
    tempArray.push(merged.slice(i, i + chunk));
  }
  // console.log('list-----',merged);
  return Object.keys(tempArray).map((index, key) => {
    return (
      <ul key={key}>
         {repeatLi(tempArray[index], lifestyleCatgry)}
       </ul>
     )
   });
}

let repeatLi = (tempArray, lifestyleCatgry) => {
  return Object.values(tempArray).map((lists, index) => {
    return (
      <li key={`${lists}${index}`} className={lists == lists.toUpperCase() ? `${style.amnSubHead}` : ''}>
        {lifestyleCatgry.hasOwnProperty(lists) ? lifestyleCatgry[lists] : lists}
      </li>
    )
  })
}

const LifeStyleList = (props) => {
  let { lifeStyleList, lifestyleCatgry } = props;
  return (
    <div>
      {lifeStyleList != '' ? renderLifestyle(lifeStyleList, lifestyleCatgry) : ''}
    </div>
  )
}

export default LifeStyleList;
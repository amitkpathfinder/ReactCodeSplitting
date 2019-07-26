import React, { Component } from 'react';

export default function PageLayout(props) {
  return <div>
  			<div>{props.userLink}</div>
  			<div>{props.artist}</div>
  		</div>;
}
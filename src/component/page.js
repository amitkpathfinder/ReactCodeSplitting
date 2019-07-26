import React, { Component } from 'react';
import PageLayout from './PageLayout';
import Avatar from './Avatar';
import Artist from './Artist';


export default function Page(props) {
  	  const user = props.user;
	const artist = <Artist user={user} />;
  const userLink = (
    <a href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </a>
  );
  return <PageLayout artist={artist} userLink={userLink} />;
}
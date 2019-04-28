import React from 'react';
import Card from './Card';

const MyDeck = props => {
  const {count, name} = props;
  return (
    <div id="my-deck">
      <p>{name}</p>
      <Card classes="my-deck-dim" />
      <p>{count}</p>
    </div>
  )
}

export default MyDeck;

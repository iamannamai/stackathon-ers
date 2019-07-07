# ERS

MVP implementation of a multi-player real-time Egyptian Rat Screw game. The main pile is represented by a stack, players hands are queues.

## Rules

**Objective**: The goal of the game is to win all the cards in a deck by slapping the pile fastest when valid card sequences are played.

**Valid Card Sequences**
Currently only the following card sequences have been implemented:

- sandwiches - two cards of the same value in a row
- doubles - two of the same cards with a different value card in between

## Current Features

- Players can create new rooms and share room links so friends can join their game.
- Users can join a created room with a url.
- Any user in a room can start a game.
- Users can play cards into a pile in turn, slap piles, and accumulate cards.
- Server determines which slaps are valid are invalid.
  - Slapping a valid sequence fastest adds the current pile into the hand of the first player that slapped.
  - Slapping an invalid sequence "burns" a card, resulting in discarding the first card in a user's hand into the bottom of the pile.

## Start Developing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Start Developing

Clone the repository and run:

```
  npm start
```

This will open the project up on `http://localhost:3000/`. Create React App supports live reloads (on edit).

### Deploy

This project is hooked up to Firebase. The following takes care of deployment for the React app as well as Firebase Functions.

```
  npm build
  npm deploy
```

### To Do

- Implement turns so that users cannot add cards to a pile out of turn (doubly linked list, where tail points to head)
- Identify to all users whose turn it is (either by highlighting user's deck whose turn it is or having some type of indicator)
- Implement rules for playing face cards

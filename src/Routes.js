import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {NewGame, ExistingGame} from './components';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={NewGame} />
      <Route path='/:roomName' component={ExistingGame}/>
    </Switch>
  )
};

export default Routes;

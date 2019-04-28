import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import './App.css';
import Routes from './Routes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            {/* <Header /> */}
            <Routes />
          </header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

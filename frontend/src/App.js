import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LogInteractionScreen from './screens/LogInteractionScreen';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <LogInteractionScreen />
    </Provider>
  );
}

export default App;

import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/router';
import store from './src/redux/Store/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast />
    </Provider>
  );
};
export default App;

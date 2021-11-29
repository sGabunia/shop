import React from 'react';

import store from './store/store';
import {Provider} from 'react-redux';

import ShopNavigator from './navigation/ShopNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;

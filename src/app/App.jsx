import React from 'react';
import AppRouter from '../routes/appRouter';
import { Provider } from 'react-redux';
import { store } from './store';
import ToastConfig from "../Services/toastConfig";

function App() {
  return (
    <Provider store={store}>
      <ToastConfig />
      <AppRouter />
    </Provider>
  );
}

export default App;

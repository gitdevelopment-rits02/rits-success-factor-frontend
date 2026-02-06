// import React from 'react'

// function App() {
//   return (
//     <div className="text-3xl font-bold underline"> 
//       Hello, success-factor frontend!!!.
//     </div>
//   )
// }

// export default App


import React from 'react'
import AppRouter from '../routes/appRouter';
import { Provider } from 'react-redux';
import {store} from './store'
import ToastConfig from "../Services/toastConfig";

function App() {

  return (
    <Provider
    store={store}>
  <ToastConfig />
  <AppRouter />
  </Provider>
  );
}

export default App;

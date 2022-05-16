import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./Redux";
import "@vkontakte/vkui/dist/vkui.css";
import './Stylesheets/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      {/*<React.StrictMode> rerender fix*/}
          <App />
      {/*</React.StrictMode>*/}
  </Provider>
);
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import applicationRoutes from './routes';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './axiosInstance'


ReactDOM.render(
  <React.Suspense fallback={<div> Loading... </div>}>
    <Router style={{ minHeight: '100%', overflowX: 'hidden'}}>
      {applicationRoutes}
    </Router>
  </React.Suspense>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

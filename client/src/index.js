import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';


import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
//--middlware 을 통해서 store 에 function 과 promise 를 등록할 수  있게 하기 위함. + redux devtools 사용
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
//
ReactDOM.render(
  <Provider store = {createStoreWithMiddleware(Reducer)}>
    <App />
  </Provider>    
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

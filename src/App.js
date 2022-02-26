import './App.scss';
import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom"; //use browserRouter for localhost, hashRouter for github pages

import { createStore} from 'redux';
import {Provider} from "react-redux";
import { requestAuthReducer } from './redux/reducers';

import Listing from "./pages/listing/Listing";
import Detail from "./pages/detail/Detail";

function App() {
  const store = createStore(requestAuthReducer);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Listing />} />
          <Route exact path='/listing' element={<Listing />} />
          <Route exact path='/detail/:id' element={<Detail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
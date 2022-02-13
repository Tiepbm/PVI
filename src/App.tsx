import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ConfigProvider} from "antd";
import {HashRouter, Route, Routes} from "react-router-dom";
import Products from "./containers/Products";
import Healthy from "./containers/Healthy";
import Vehicle from "./containers/Vehicle";

function App() {
  return (
    <div id={"app-main"} className={""}>
      <ConfigProvider>
        <HashRouter>
          <Routes>
            <Route path={'/'} element={<Products/>}></Route>
            <Route path={'/products/healthy'} element={<Healthy/>}></Route>
            <Route path={'/products/vehicle'} element={<Vehicle/>}></Route>
          </Routes>
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;

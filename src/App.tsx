import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ConfigProvider} from "antd";
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import CategoryDetail from "./containers/CategoryDetail";
import ProductDetail from "./containers/ProductDetail";

function App() {
  return (
    <div id={"app-main"} className={""}>
      <ConfigProvider>
        <HashRouter>
          <Routes>
            <Route path={'/'} element={<Home/>}></Route>
            <Route path={'/categories/detail'} element={<CategoryDetail/>}></Route>
            <Route path={'/products/detail'} element={<ProductDetail/>}></Route>
          </Routes>
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;

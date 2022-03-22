import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ConfigProvider} from "antd";
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import CategoryDetail from "./containers/CategoryDetail";
import ProductDetail from "./containers/ProductDetail";
import RegisterInsurance from "./containers/RegisterInsurance";
import RuleProductDetail from "./containers/RuleProductDetail";
import About from "./containers/About";
import viVN from 'antd/lib/locale-provider/vi_VN'
import moment from "moment";
import {useSessionStorage} from "./hooks/useSessionStorage";
moment.locale('vi', {
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthsShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  weekdays: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: 'vài giây trước',
    ss: '%d giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    w: '1 tuần',
    ww: '%d tuần',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
});
function App() {
  return (
    <div id={"app-main"} className={""}>
      <ConfigProvider locale={viVN}>
        <HashRouter>
          <Routes>
            <Route path={'/'} element={<Home/>}></Route>
            <Route path={'/categories/detail'} element={<CategoryDetail/>}></Route>
            <Route path={'/products/:productId/register'} element={<RegisterInsurance/>}></Route>
            <Route path={'/products/:productId'} element={<ProductDetail/>}></Route>
            <Route path={'/rule/:productId'} element={<RuleProductDetail/>}></Route>
            <Route path={'/about'} element={<About/>}></Route>

          </Routes>
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;

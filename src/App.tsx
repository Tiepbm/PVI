import React, {useEffect, useState} from 'react';
import './App.css';
import {ConfigProvider} from "antd";
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import CategoryDetail from "./containers/CategoryDetail";
import ProductDetail from "./containers/ProductDetail";
import RegisterInsurance from "./containers/RegisterInsurance";
import RuleProductDetail from "./containers/RuleProductDetail";
import About from "./containers/About";
import Login from "./containers/Login";
import Orders from "./containers/Orders";
import viVN from 'antd/lib/locale-provider/vi_VN'
import moment from "moment";
import {useSessionStorage} from "./hooks/useSessionStorage";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import {userRepository} from "./repositories/UserRepository";
import numeral from "numeral";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useSessionStorage('profile', false);
  const [webCode, setWebCode] = useSessionStorage('web_code', '');
  const [cardid, setCardId] = useSessionStorage('cardid', '');
  useEffect(() => {
    if (numeral.locales.vi === undefined) {
      numeral.register('locale', 'vi', {
        delimiters: {
          thousands: '.',
          decimal: ',',
        },
        abbreviations: {
          thousand: 'k',
          million: 'm',
          billion: 'b',
          trillion: 't',
        },
        ordinal: function (number) {
          return '';
        },
        currency: {
          symbol: '₫',
        },
      });
      numeral.locale('vi');
    }
  }, []);
  useEffect(()=>{
    const search = window.location.search;
    if(search){
      let params = new URLSearchParams(search.substring(search.indexOf('?')));
      let urlCallback = params.get('urlcallback');
      // let webcode = params.get('webcode');
      let requestId = params.get('requestid');
      let cpid = params.get('cpid');
      let sign = params.get('sign');
      let cardid = params.get('cardid');
      if (urlCallback && requestId&&cpid&&sign&&cardid) {
        let body = {
          URLCallBack: urlCallback,
          RequestId: requestId,
          CpId: cpid,
          Sign: sign
        }
        userRepository.getProfile(body).then(res=>{
            setProfile(true);
            setWebCode(res.WebCode);
            setCardId(cardid);
          window.location.href='/';
        }).catch(err=>{
          if(urlCallback)
            window.location.href=urlCallback;
          else  window.location.href='/';
        });
      }
    }
  },[]);
  return (
    <div id={"app-main"} className={""}>
      <ConfigProvider locale={viVN}>
        <HashRouter>
          <Routes>
            <Route path={'/'} element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
            <Route path={'/categories/:categoryId'} element={<ProtectedRoute><CategoryDetail/></ProtectedRoute>}></Route>
            <Route path={'/products/:productId/register'} element={<ProtectedRoute><RegisterInsurance/></ProtectedRoute>}></Route>
            <Route path={'/products/:productId'} element={<ProtectedRoute><ProductDetail/></ProtectedRoute>}></Route>
            <Route path={'/rule/:productId'} element={<ProtectedRoute><RuleProductDetail/></ProtectedRoute>}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/about'} element={<About/>}></Route>
            <Route path={'/orders'} element={<Orders/>}></Route>

          </Routes>
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;

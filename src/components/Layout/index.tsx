import React, {useEffect, useState} from 'react';
import {Avatar, Button, Col, Divider, Layout, Menu, Popover, Row} from 'antd';
import './styles.scss';
import ProgressBar from "../Spinner/ProgressBar";
import {localStorageRead, localStorageSave} from "../../utils/LocalStorageUtils";
import {PROFILE_KEY, TENANT_KEY, TOKEN_KEY} from "../../core/config";
import DocumentTitle from 'react-document-title';
import {useLocation, useSearchParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import useWindowDimensions from "../../hooks";
import logo from '../../resources/images/logo-pvi-view.png';
import MediaQuery, {useMediaQuery} from 'react-responsive';
import {useSessionStorage} from "../../hooks/useSessionStorage";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

const {Header, Sider, Content, Footer} = Layout;
const PERCENT_COMPLETE = 100;

export interface MainLayoutProps {
    children: any;
    showProgressBar?: boolean;
    title?: any;
}

function MainLayout(props: MainLayoutProps) {
    const {children, showProgressBar, title} = props;
    const [collapsed, setCollapsed] = useState(true);
    const [percent, setPercent] = useState<number>(-1);
    const [autoIncrement, setAutoIncrement] = useState<boolean>(false);
    const [intervalTime, setIntervalTime] = useState<number>(200);
    const [activeKey, setActiveKey] = useState<string>('');
    let [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {height} = useWindowDimensions();
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
    useEffect(() => {
        if (showProgressBar) {
            startWithAutoIncrement();
        } else {
            setPercentValue(PERCENT_COMPLETE);
        }
    }, [showProgressBar]);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.pathname && location.pathname !== '/') {
            let pathname: string[] = location.pathname.split('/');
            setActiveKey(pathname[pathname.length - 1])
        }
        // this.setState({activeKey: activeKey})
                let code = searchParams.get('code');
                if (code){
                    setWebCode(code);
                }
    }, []);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const [confirmLogOut, setConfirmLogOut] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onConfirmLogOut = () => {
        // console.log('logout');
        setLoading(true)
        localStorageSave(PROFILE_KEY, null);
        localStorageSave(TOKEN_KEY, null);
        localStorageSave(TENANT_KEY, null);
        window.location.href = process.env.REACT_APP_LOGOUT_URL!;
        setLoading(false)
        // console.log(process.env.REACT_APP_LOGOUT_URL)
    }

    const onCancelLogOut = () => {
        setConfirmLogOut(false);
        setLoading(false)
    }


    /**
     * hiển thị progressbar
     **/
    const startWithAutoIncrement = () => {
        setPercent(0);
        setAutoIncrement(true);
        setIntervalTime(Math.random() * 150);
    };

    /**
     * Dừng progressbar
     **/
    const stopWithAutoIncrement = () => {
        setPercent(-1);
        setAutoIncrement(false);
        setIntervalTime(150);
    };

    const setPercentValue = (percent: number) => {
        setPercent(percent);
        if (percent === PERCENT_COMPLETE) {
            setTimeout(() => {
                stopWithAutoIncrement();
            }, 500);

        }
    };
    const clickMenu = (key: string) => {
       navigate(`/${key}`);
    }
    return (
        <DocumentTitle title={`${title ? title : 'M24'}`}>
            <div className={''}>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="header-left">
                                    <div className="header-logo">
                                        <a href="#"><img src={require('../../resources/images/logo.png')} alt=""/></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="header-right">
                                    <div className="header-intro">
                                        <a href="gioithieu.html"><img src={require('../../resources/images/icon-gt.png')} alt=""/>Giới thiệu</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <ProgressBar
                    percent={percent}
                    autoIncrement={autoIncrement}
                    intervalTime={intervalTime}
                    spinner={false}
                />
                <Content style={{minHeight: height - 50}}
                         className="content"
                >
                    {children}
                </Content>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Tổng Công ty Bảo hiểm PVI</h2>
                                <p style={{textAlign: 'justify'}}>Tổng công ty Bảo hiểm PVI được thành lập năm 1996, tiền
                                    thân là công ty bảo hiểm thuộc Tập đoàn Dầu khí Việt Nam (nay là PetroVietnam, PVN).
                                    Bảo hiểm PVI là nhà bảo hiểm đứng đầu trong lĩnh vực công nghiệp và là đối tác bảo
                                    hiểm hàng đầu của các tập đoàn, công ty trong và ngoài nước. Hiện nay Bảo hiểm PVI
                                    là doanh nghiệp dẫn đầu thị trường bảo hiểm phi nhân thọ trên các chỉ tiêu: vốn điều
                                    lệ, tổng tài sản, tổng doanh thu, lợi nhuận từ hoạt động kinh doanh bảo hiểm, lợi
                                    nhuận trước thuế và tỉ suất lợi nhuận/vốn chủ sở hữu…, top 50 Doanh nghiệp lợi nhuận
                                    tốt nhất Việt Nam 2021.
                                    Xếp hạng năng lực tài chính A.M Best của Bảo hiểm PVI hiện ở mức B++ (Tốt).
                                </p>
                            </div>
                            <div className="col-md-6" style={{paddingLeft: 100}}>
                                <h2>Contact</h2>
                                <ul>
                                    <li>Tầng 24, Tòa nhà PVI tower, Số 1 Phạm Văn Bạch, Cầu Giấy, Hà Nội</li>
                                    <li><i className="fal fa-phone-alt mgr5"></i>(84-24) 37733 5588 - Fax: (84-24) 3733 6284</li>
                                    <li><i className="fal fa-envelope mgr5"></i>baohiempvi@pvi.com.vn</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </DocumentTitle>
    );
}

export default MainLayout;

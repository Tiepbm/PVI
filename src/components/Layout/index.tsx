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
            <Layout className={'main-layout'}>
                <Header className={`border-bottom-1x bd-color-gray header ${isTabletOrMobile&&'header-mobile'}`}>
                    {isDesktopOrLaptop&&<Row className={'align-items-center justify-content-between pdl50 pdr50 height100'}>
                        <Col span={18}>
                            <Row className={'align-items-center'}>
                                <img className={'cursor-pointer'} onClick={()=> navigate('/')} style={{height: 30, backgroundColor: 'white', paddingLeft: 10, paddingRight:10}} src={logo}></img>
                                <div>
                            <span style={{height: 30}} onClick={() => clickMenu('')}
                                  className={`${activeKey === '' ? 'txt-color-blue border-bottom-2x-blue pdbt5' : 'txt-color-blue'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Trang chủ</span>
                                </div>
                            {/*    <div>*/}
                            {/*<span onClick={() => clickMenu('orders')}*/}
                            {/*      className={`${activeKey === 'orders' ? 'txt-color-blue border-bottom-2x-blue pdbt5' : 'txt-color-blue'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Đơn hàng</span>*/}
                            {/*    </div>*/}
                                <div>
                            <span onClick={() => clickMenu('about')}
                                  className={`${activeKey === 'about' ? 'txt-color-blue border-bottom-2x-blue pdbt5' : 'txt-color-blue'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Giới thiệu</span>
                                </div>
                            </Row>
                        </Col>
                        {/*<Col>*/}
                        {/*    <Row className={'justify-content-end align-items-center'}>*/}
                        {/*        <span className={'cursor-pointer robotobold txt-size-h6 txt-color-white'}>Đăng nhập</span>*/}
                        {/*        <Divider type={'vertical'} className={'bg-color-white'}></Divider>*/}
                        {/*        <span className={'cursor-pointer robotobold txt-size-h6 txt-color-white'}>Đăng ký</span>*/}
                        {/*    </Row>*/}
                        {/*</Col>*/}

                    </Row>}
                    {isTabletOrMobile&&<Row className={'align-items-center justify-content-center pdl5 pdr5 height100'}>

                            <img className={'cursor-pointer'} onClick={()=> navigate('/')}  style={{height: 20, backgroundColor: 'white', paddingLeft: 10, paddingRight:10}} src={logo}></img>

                            {/*<Row className={'justify-content-end align-items-center'}>*/}
                            {/*    <span className={'cursor-pointer robotobold txt-size-h6 txt-color-white'}>Đăng nhập</span>*/}
                            {/*    <Divider type={'vertical'} className={'bg-color-white'}></Divider>*/}
                            {/*    <span className={'cursor-pointer robotobold txt-size-h6 txt-color-white'}>Đăng ký</span>*/}
                            {/*</Row>*/}
                    </Row>}
                </Header>
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
                {isTabletOrMobile&&<Row className={'footer-mobile justify-content-center pdt10 border-top-1x'}>
                    <Col span={8} onClick={()=> navigate('/')} className={`dpl-flex align-items-center flex-direction-column ${activeKey===''?'txt-color-blue':'txt-color-black'}`}>
                        <Row><i className="far fa-home-alt"></i></Row>
                        <Row><span onClick={()=> navigate('/')}>Trang chủ</span></Row>
                    </Col>
                    {/*<Col span={8} onClick={()=> navigate('/orders')} className={`dpl-flex align-items-center flex-direction-column ${activeKey==='orders'?'txt-color-blue':'txt-color-black'}`}>*/}

                    {/*    <Row><i className="far fa-file-alt"></i></Row>*/}
                    {/*    <Row><span>Đơn hàng</span></Row></Col>*/}
                   <Col span={8} onClick={()=> navigate('/about')} className={`dpl-flex align-items-center flex-direction-column ${activeKey==='about'?'txt-color-blue':'txt-color-black'}`}>
                       <Row><i className="far fa-info-circle"></i></Row>
                       <Row><span>Giới thiệu</span>
                       </Row> </Col>
                   </Row>}
                {isDesktopOrLaptop&&<Footer style={{textAlign: 'center'}}>
                    <Row className={'justify-content-center pdbt50'}><span>©2022 Created by PVI</span></Row></Footer>}
            </Layout>
        </DocumentTitle>
    );
}

export default MainLayout;

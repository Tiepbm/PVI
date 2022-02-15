import React, {useEffect, useState} from 'react';
import {Avatar, Col, Layout, Menu, Popover, Row} from 'antd';
import './styles.scss';
import ProgressBar from "../Spinner/ProgressBar";
import {localStorageRead, localStorageSave} from "../../utils/LocalStorageUtils";
import {PROFILE_KEY, TENANT_KEY, TOKEN_KEY} from "../../core/config";
import DocumentTitle from 'react-document-title';
import {useLocation, useSearchParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import useWindowDimensions from "../../hooks";
import logo from '../../resources/images/logo.png';

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
    useEffect(() => {
        if (showProgressBar) {
            startWithAutoIncrement();
        } else {
            setPercentValue(PERCENT_COMPLETE);
        }
    }, [showProgressBar]);
    useEffect(() => {
        if (location.pathname && location.pathname !== '/') {
            if (location.pathname.indexOf('categories/detail') > 0) {
                let code = searchParams.get('code');
                if (code) setActiveKey(code);
            }else setActiveKey('other');
        }
        // this.setState({activeKey: activeKey})
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
        if (key) {
            navigate(`/categories/detail?code=${key}`);
            window.location.reload();
        } else navigate(`/`);
    }
    return (
        <DocumentTitle title={`${title ? title : 'M24'}`}>
            <Layout className={'main-layout'}>
                <Header className="header">
                    <Row className={'align-items-center'}>
                        <img style={{height: 60, backgroundColor: 'white', paddingLeft: 10}} src={logo}></img>
                        <div>
                            <span style={{height: 30}} onClick={() => clickMenu('')}
                                  className={`${activeKey === '' ? 'txt-color-yellow border-bottom-2x-yellow pdbt5' : 'txt-color-white'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Trang chủ</span>
                        </div>
                        <div>
                            <span onClick={() => clickMenu('healthy')}
                                  className={`${activeKey === 'healthy' ? 'txt-color-yellow border-bottom-2x-yellow pdbt5' : 'txt-color-white'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Sức khỏe</span>
                        </div>
                        <div>
                            <span onClick={() => clickMenu('travel')}
                                  className={`${activeKey === 'travel' ? 'txt-color-yellow border-bottom-2x-yellow pdbt5' : 'txt-color-white'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Du lịch</span>
                        </div>
                        <div>
                            <span onClick={() => clickMenu('accident')}
                                  className={`${activeKey === 'accident' ? 'txt-color-yellow border-bottom-2x-yellow pdbt5' : 'txt-color-white'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Tai nạn</span>
                        </div>
                        <div><span onClick={() => clickMenu('assets')}
                                  className={`${activeKey === 'assets' ? 'txt-color-yellow border-bottom-2x-yellow pdbt5' : 'txt-color-white'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Tài sản</span>
                        </div>
                        <div>
                            <span onClick={() => clickMenu('vehicle')}
                                  className={`${activeKey === 'vehicle' ? 'txt-color-yellow border-bottom-2x-yellow pdbt5' : 'txt-color-white'} cursor-pointer robotobold txt-size-h6 mgl50 mgr50`}>Xe</span>
                        </div>
                    </Row>
                </Header>
                <ProgressBar
                    percent={percent}
                    autoIncrement={autoIncrement}
                    intervalTime={intervalTime}
                    spinner={false}
                />
                <Content style={{minHeight: height - 64}}
                         className="content"
                >
                    {children}
                </Content>
                <Footer style={{textAlign: 'center'}}>©2022 Created by PVI</Footer>
            </Layout>
        </DocumentTitle>
    );
}

export default MainLayout;

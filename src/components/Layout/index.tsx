import React, {useEffect, useState} from 'react';
import {Avatar, Button, Col, Divider, Layout, Menu, Popover, Row} from 'antd';
import './styles.scss';
import ProgressBar from "../Spinner/ProgressBar";
import {localStorageRead, localStorageSave} from "../../utils/LocalStorageUtils";
import {PROFILE_KEY, TENANT_KEY, TOKEN_KEY} from "../../core/config";
import DocumentTitle from 'react-document-title';
import {Link, useLocation, useParams, useSearchParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import useWindowDimensions from "../../hooks";
import logo from '../../resources/images/logo-pvi-view.png';
import MediaQuery, {useMediaQuery} from 'react-responsive';
import {useSessionStorage} from "../../hooks/useSessionStorage";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import iconSale1 from '../../resources/images/sale 1.svg';
import iconInsurance1 from '../../resources/images/insurance-2 1.svg';
import iconInsurance2 from '../../resources/images/insurance-2 2.svg';
import iconAsset1 from '../../resources/images/asset 1.svg';
import iconTralve1 from '../../resources/images/travel 1.svg';

const {Header, Sider, Content, Footer} = Layout;
const PERCENT_COMPLETE = 100;

export interface MainLayoutProps {
    children: any;
    showProgressBar?: boolean;
    title?: any;
    isDetail?:boolean;
}
const MENU=[
    {
        code:'transport',
        name:'Xe',
        icon:iconSale1
    },
    {
        code:'healthy',
        name:'Sức khỏe',
        icon:iconInsurance2
    },
    {
        code:'accident',
        name:'Tai nạn',
        icon:iconInsurance1
    },
    {
        code:'asset',
        name:'Tài sản',
        icon:iconAsset1
    },
    {
        code:'tralve',
        name:'Du lịch',
        icon:iconTralve1
    }
]
function MainLayout(props: MainLayoutProps) {
    const {children, showProgressBar, title, isDetail} = props;
    const [collapsed, setCollapsed] = useState(true);
    const [percent, setPercent] = useState<number>(-1);
    const [autoIncrement, setAutoIncrement] = useState<boolean>(false);
    const [intervalTime, setIntervalTime] = useState<number>(200);
    const [activeKey, setActiveKey] = useState<string>('');
    let {categoryId} = useParams();
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
                                        <Link to={'/'}><img src={require('../../resources/images/logo.png')} alt=""/></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="header-right">
                                    <div className="header-intro">
                                        <Link to={'/about'}><img src={require('../../resources/images/icon-gt.png')} alt=""/>Giới thiệu</Link>
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
                    {isDetail&& <div className="nav main-menu">
                        <div className="container">
                            <ul>
                                {MENU.map((x: any)=>{
                                    return  <li onClick={()=>{
                                        navigate(`/categories/${x.code}`);
                                        // window.location.reload();
                                    }
                                    }><a className={categoryId&&categoryId===x.code?'active':''}><img src={x.icon} alt=""/>{x.name}</a></li>
                                })}
                            </ul>
                        </div>
                    </div>}
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

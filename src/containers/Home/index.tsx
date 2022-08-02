import {Avatar, Button, Card, Carousel, Col, Image, Row} from "antd";
import MainLayout from "../../components/Layout";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './styles.scss';
import {ENSURE_CAR, ENSURE_ELECTRIC, ENSURE_HOUSE} from "../../core/config";
import {useMediaQuery} from "react-responsive";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import iconSale1 from '../../resources/images/sale 1.svg';
import iconInsurenace1 from '../../resources/images/insurance-2 1.svg';
import iconInsurance2 from '../../resources/images/insurance-2 2.svg';
import iconAsset1 from '../../resources/images/asset 1.svg';
import iconTralve1 from '../../resources/images/travel 1.svg';

import iconScooter from '../../resources/images/scooter 1.svg';
import iconCar1 from '../../resources/images/car 1.svg';
import iconCar2 from '../../resources/images/car-2 1.svg';

import iconClinic1 from '../../resources/images/clinic 1.svg';
import iconFamily from '../../resources/images/family 1.svg';
import iconHospitalBed1 from '../../resources/images/hospital-bed 1.svg';

import iconHealthyCare1 from '../../resources/images/healthy-care 1.svg';
import iconPlugin1 from '../../resources/images/plugin1.svg';

import iconHome1 from '../../resources/images/home 1.svg';
import iconSmartphone1 from '../../resources/images/smartphone 1.svg';

function Home() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const navigate = useNavigate();
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 })
    const categories = [
        {
            name: 'Bảo hiểm xe',
            items: [
                {
                    name: 'TNDS xe máy',
                    id:'tndsxemay',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/3403ac1e-069d-49bd-859c-879789be7f48.png',
                    status:'pending',
                },
                {
                    name: 'TNDS ô tô',
                    id:ENSURE_CAR,
                    logo: require(isDesktopOrLaptop?'../../resources/images/car.jpg':'../../resources/images/mobile-car.png'),
                    status:'active',
                },
                {
                    name: 'Thân vỏ ô tô',
                    id:'than_oto',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/77614a36-c2a6-4393-8f18-eab81551204f.png',
                    status:'pending',
                }
            ]
        },
        {
            name: 'Bảo hiểm sức khỏe',
            items: [
                {
                    name: 'Hỗ trợ nằm viện',
                    id:'hotronamvien',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/c9cb6614-2207-4a47-a02a-45b87e255f40.jpg'
                }, {
                    name: 'Ngũ phúc ưu việt',
                    id:'nguphucuuviet',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/c9cb6614-2207-4a47-a02a-45b87e255f40.jpg'
                }, {
                    name: 'An phúc ưu việt',
                    id:'anphucuuviet',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/1913f348-6ab9-41e9-8b1e-57254021ea90.png'
                }
            ]
        },
        {
            name: 'Bảo hiểm tai nạn',
            items: [
                {
                    name: 'Tai nạn cá nhân',
                    id:'tainancanhan',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/fffb2a2a-f87c-4bf3-a62c-3da8f71b9eef.jpg'
                },
                {
                    name: 'Tai nạn hộ sử dụng điện',
                    id:ENSURE_ELECTRIC,
                    status:'active',
                    logo: require(isDesktopOrLaptop?'../../resources/images/electric.jpg':'../../resources/images/mobile-electric.png')
                }
            ]
        },
        {
            name: 'Bảo hiểm tài sản',
            items: [
                {
                    name: 'Nhà ở toàn diện',
                    id:ENSURE_HOUSE,
                    status:'active',
                    logo: require(isDesktopOrLaptop?'../../resources/images/house.jpg':'../../resources/images/mobile-house.png')
                },
                {
                    name: 'Màn hình điện thoại',
                    id:'manhinhdienthoai',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/f1234db6-cbad-4743-9bde-0df271402a88.png'
                }
            ]
        },
        {
            name: 'Bảo hiểm du lịch',
            items: [
                {
                    name: 'Du lịch trong nước',
                    id:'dulichtrongnuoc',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/client-assets/images/category/Du%20l%E1%BB%8Bch.Jpg'
                },
                {
                    name: 'Du lịch quốc tế',
                    id:'dulichquocte',
                    status:'pending',
                    logo: 'https://baohiem.viettelpay.vn/client-assets/images/category/Du%20l%E1%BB%8Bch.Jpg'
                }
            ]
        }
    ]
    const banners=[
        {
            id: 'tainansudungdien',
            banner: require('../../resources/images/banner-electric.jpg'),
            bannerMobile: require('../../resources/images/banner-electric-mobile.jpg'),
        }, {
            id: 'tndsoto',
            banner: require('../../resources/images/banner-car.png'),
            bannerMobile: require('../../resources/images/banner-car-mobile.png'),
        }, {
            id: 'nhaotoandien',
            banner: require('../../resources/images/banner-house.jpg'),
            bannerMobile: require('../../resources/images/banner-house-mobile.jpg'),
        }
    ]
    const renderItem = (item: any) => {
        if(isDesktopOrLaptop)
        return <Card className={'mgt20'}>
            <span className={'robotobold txt-size-h1'}>{item.name}</span>
            <Row className={'justify-content-center mgt20'}>
                {item.items.map((x: any) => {
                    return <Col onClick={()=> navigate(`/products/${x.id}`)} className={'cursor-pointer article mgr20'} span={7}>

                                 <div className="article__tag">
                                     <span>{x.status==='active'?'Hot':'Sắp ra mắt'}</span>
                                </div>
                        <div className={'article__picture'}>
                            <Image preview={false} src={x.logo} height={300} width={350}></Image>
                        </div>
                          <Row className={'article__content justify-content-between'}>
                              <span className={'robotobold txt-color-blue txt-size-h4'}>{x.name}</span>
                              <span className={'robotobold txt-color-black txt-size-h6 mgt5'}>{'Từ 8.000đ'}</span>
                          </Row>
                    </Col>
                })}
            </Row>
        </Card>
       else return <Card className={'mgt20'}>
            <span className={'robotobold txt-size-h6'}>{item.name}</span>
            <Row className={'justify-content-center mgt20'}>
                {item.items.map((x: any) => {
                    return <Col onClick={()=> navigate(`/products/${x.id}`)} className={'cursor-pointer'} span={8}>
                        <Row className={'justify-content-center'}><Image src={x.logo} width={90} height={90}  preview={false}></Image></Row>
                        <Row className={'justify-content-center txt-size-h7'}>
                            <span style={{maxWidth: 85}} className={'mgt10 txt-center txt-color-black'}>{x.name}</span>
                        </Row>
                    </Col>
                })}
            </Row>
        </Card>
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <div className="banner">
                <div className="myslider">
                    <div className="item a">
                        <a href="tainanhosudungdien.html">
                            <img src={require('../../resources/images/banner2.png')} alt="" />
                            <div className="container banner-content">
                                <h2>Bảo hiểm tai nạn hộ sử dụng điện</h2>
                                <ul>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Phí chỉ từ 28.000 đ/năm </li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Quyền lợi lên tới 40 triệu đ/người/vụ</li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Không giới hạn số người tham gia trong gia đình</li>
                                </ul>
                            </div>
                        </a>
                    </div>
                    <div className="item b">
                        <a href="tndsoto.html">
                            <img src={require('../../resources/images/banner3.png')} alt="" />
                            <div className="container banner-content">
                                <h2>Bảo hiểm ô tô</h2>
                                <p>Trách nhiệm dân sự bắt buộc và tự nguyện</p>
                                <ul>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />An tâm trên mọi chặng đường</li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Phí chỉ từ 480.700 đ/năm</li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Quyền lợi lên đến 350 triệu đ/vụ</li>
                                </ul>
                            </div>
                        </a>
                    </div>
                    <div className="item c">
                        <a href="nhaotoandien.html">
                            <img src={require('../../resources/images/banner1.png')} alt="" />
                            <div className="container banner-content">
                                <h2>Bảo hiểm nhà ở toàn diện</h2>
                                <ul>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />An tâm vẹn nguyên giá trị căn nhà</li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Chi phí chỉ từ 165.000 đ/năm</li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Quyền lợi lên đến 600 triệu đ/năm</li>
                                </ul>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="container box_item_content">
                    <div className="banner-content-bt">
                        <div>
                            <a href="tndsxemay.html" />
                            <a href="#"><img src={require('../../resources/images/icon-up.png')} alt="" /></a>
                            <img src={iconSale1} alt="" />
                            <p>Bảo hiểm <br />xe</p>
                        </div>
                        <div>
                            <a href="hotronamvien.html" />
                            <a href="#"><img src={require('../../resources/images/icon-up.png')} alt="" /></a>
                            <img src={iconInsurance2} alt="" />
                            <p>Bảo hiểm <br />sức khỏe</p>
                        </div>
                        <div>
                            <a href="tainanhosudungdien.html" />
                            <a href="#"><img src={require('../../resources/images/icon-up.png')} alt="" /></a>
                            <img src={iconInsurenace1} alt="" />
                            <p>Bảo hiểm <br />tai nạn</p>
                        </div>
                        <div>
                            <a href="nhaotoandien.html" />
                            <a href="#"><img src={require('../../resources/images/icon-up.png')} alt="" /></a>
                            <img src={iconAsset1} alt="" />
                            <p>Bảo hiểm <br />tài sản</p>
                        </div>
                        <div>
                            <a href="dulichtrongnuoc.html" />
                            <a href="#"><img src={require('../../resources/images/icon-up.png')} alt="" /></a>
                            <img src={iconTralve1} alt="" />
                            <p>Bảo hiểm <br />du lịch</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="content-box box-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Bảo hiểm xe</h2>
                                <p>Trách nhiệm dân sự bắt buộc và tự nguyện dành cho xe máy, ô tô.</p>
                                <div className="list-insurances">
                                    <a href="tndsxemay.html" className="insurance-item">
                                        <span><img src={iconScooter} /></span>
                                        <p><span className="bg-red">Mới</span></p>
                                        <p>Trách nhiệm <br /> dân sự xe máy</p>
                                    </a>
                                    <a href="tndsoto.html" className="insurance-item">
                                        <span><img src={iconCar1} /></span>
                                        <p><span className="bg-red">Mới</span></p>
                                        <p>Trách nhiệm <br /> dân sự ô tô</p>
                                    </a>
                                    <a href="thanvoto.html" className="insurance-item">
                                        <span><img src={iconCar2} /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Thân vỏ ô tô</p>
                                    </a>
                                </div>
                                <a href="tndsxemay.html"><img src={require('../../resources/images/icon-up-wt.png')} />Xem chi tiết</a>
                            </div>
                            <div className="col-md-6" />
                        </div>
                    </div>
                </div>
                <div className="content-box box-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Bảo hiểm sức khỏe</h2>
                                <p>Bảo vệ sức khỏe khỏi những rủi ro ốm đau, bệnh tật, nằm viện.</p>
                                <div className="list-insurances">
                                    <a href="hotronamvien.html" className="insurance-item">
                                        <span><img src={iconClinic1} /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Hỗ trợ nằm viện</p>
                                    </a>
                                    <a href="nguphucuuviet.html" className="insurance-item">
                                        <span><img src={iconFamily} /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Ngũ phúc ưu việt</p>
                                    </a>
                                    <a href="anphucuuviet.html" className="insurance-item">
                                        <span><img src={iconHospitalBed1} /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>An phúc ưu việt</p>
                                    </a>
                                </div>
                                <a href="hotronamvien.html"><img src="images/icon-up-wt.png" />Xem chi tiết</a>
                            </div>
                            <div className="col-md-6" />
                        </div>
                    </div>
                </div>
                <div className="content-box box-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Bảo hiểm tai nạn</h2>
                                <p>An tâm trước những rủi ro tai nạn bất ngờ của cuộc sống.</p>
                                <div className="list-insurances">
                                    <a href="tainancanhan.html" className="insurance-item">
                                        <span><img src={iconHealthyCare1} /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Tai nạn cá nhân</p>
                                    </a>
                                    <a href="tainanhosudungdien.html" className="insurance-item">
                                        <span><img src={iconPlugin1} /></span>
                                        <p><span className="bg-red">Mới</span></p>
                                        <p>Tai nạn hộ sử dụng điện</p>
                                    </a>
                                </div>
                                <a href="tainanhosudungdien.html"><img src="images/icon-up-wt.png" />Xem chi tiết</a>
                            </div>
                            <div className="col-md-6" />
                        </div>
                    </div>
                </div>
                <div className="content-box box-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Bảo hiểm tài sản</h2>
                                <p>Bảo vệ mọi tài sản từ lớn tới nhỏ như nhà cửa, đồ vật trong nhà,…</p>
                                <div className="list-insurances">
                                    <a href="nhaotoandien.html" className="insurance-item">
                                        <span><img src={iconHome1}/></span>
                                        <p><span className="bg-red">Mới</span></p>
                                        <p>Nhà ở toàn diện</p>
                                    </a>
                                    <a href="manhinhdienthoai.html" className="insurance-item">
                                        <span><img src={iconSmartphone1} /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Màn hình điện thoại</p>
                                    </a>
                                </div>
                                <a href="nhaotoandien.html"><img src="images/icon-up-wt.png" />Xem chi tiết</a>
                            </div>
                            <div className="col-md-6" />
                        </div>
                    </div>
                </div>
                <div className="content-box box-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Bảo hiểm du lịch</h2>
                                <p>An toàn thỏa sức khám phá dù ở bất cứ đâu.</p>
                                <div className="list-insurances">
                                    <a href="dulichtrongnuoc.html" className="insurance-item">
                                        <span><img src="images/plane-ticket 1.svg" /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Du lịch trong nước</p>
                                    </a>
                                    <a href="dulichquocte.html" className="insurance-item">
                                        <span><img src="images/passport 1.svg" /></span>
                                        <p><span className="bg-orange">Sắp ra mắt</span></p>
                                        <p>Du lịch quốc tế</p>
                                    </a>
                                </div>
                                <a href="dulichtrongnuoc.html"><img src="images/icon-up-wt.png" />Xem chi tiết</a>
                            </div>
                            <div className="col-md-6" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </MainLayout>
}

export default Home;

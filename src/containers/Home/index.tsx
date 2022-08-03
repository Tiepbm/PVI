import {Avatar, Button, Card, Carousel, Col, Image, Row} from "antd";
import MainLayout from "../../components/Layout";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './styles.scss';
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
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <div className="banner">
                <Carousel autoplay={true} dotPosition={'right'} className={'myslider'}>
                    <a className="item a">
                        <div>
                            <img src={require('../../resources/images/banner2.png')} alt="" />
                            <div className="container banner-content">
                                <h2>Bảo hiểm tai nạn hộ sử dụng điện</h2>
                                <ul>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Phí chỉ từ 28.000 đ/năm </li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Quyền lợi lên tới 40 triệu đ/người/vụ</li>
                                    <li><img src={require('../../resources/images/icon-tick.png')} alt="" />Không giới hạn số người tham gia trong gia đình</li>
                                </ul>
                            </div>
                        </div>
                    </a>
                    <a className="item b">
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
                    </a>
                    <a className="item c">
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
                    </a>
                </Carousel>
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

import React, {useState} from 'react';
import MainLayout from "../../components/Layout";
import {Button, Carousel, Col, DatePicker, Row, Select} from "antd";
import {UserAddOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";

function ProductDetail() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const [currentPackage, setCurrentPackage] = useState<string>('basic');
    let {productId} = useParams();
    const navigate = useNavigate();
    function handleChange(value: any) {
        console.log(`selected ${value}`);
    }

    return <MainLayout showProgressBar={showProgressBar} title={'Chi Tiết Sản Phẩm'}>
        <div className={'mgbt20 mgt1'}>
            <img
                src={'https://baohiem.viettelpay.vn/filepath/files/products/c61b2398-bac6-41f7-9547-537f81840bff.png'}></img>
        </div>
        <div className={'main-content'}>
            <span className={'txt-size-h5'}>Theo thống kê, trung bình mỗi năm ở nước ta có khoảng hơn 7.000 vụ tai nạn điện và hơn 250 người chết vì tai nạn điện. Con số này vẫn chưa dừng lại và còn tiếp tục gia tăng vì sự bất cẩn của người sử dụng điện. Với bảo hiểm tai nạn hộ sử dụng điện, chỉ cần 1 người mua, cả hộ gia đình cùng được bảo vệ. Bảo hiểm không chỉ giới hạn trong phạm vi nơi ở mà còn mở rộng ra bất cứ đâu </span>
            <Row><span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Thông tin quyền lợi</span></Row>
            <Row>
                <Col span={8} className={'mgr2'}>
                    <Row style={{height: 50}}>

                    </Row>
                    <div className={'bg-color-gray'}>
                    <Row style={{minHeight:100}}>
                    <span className={'pd10'}>
                            Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.
                        </span>
                    </Row>
                    <Row style={{minHeight:100}}>
                    <span className={'pd10'}>
                            Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.
                        </span>
                    </Row>
                    <Row style={{minHeight:100}}>
                    <span className={'pd10'}>
                            Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.
                        </span>
                    </Row>
                    </div>
                </Col>
                <Col flex={'auto'}>
                    <Row>
                        <Col flex={1} onClick={() => setCurrentPackage('basic')}
                             className={`${currentPackage === 'basic' ? 'bd-color-blue bd1px' : ''} bg-color-gray border-top-radius  cursor-pointer`}>
                            <div style={{height: 50}}
                                 className={`${currentPackage === 'basic' ? 'bg-color-blue' : 'bg-color-blue3'} border-top-radius dpl-flex align-items-center justify-content-center cursor-pointer`}>
                                <span
                                    className={`${currentPackage === 'basic' ? 'txt-color-white' : 'txt-color-black'} robotobold txt-size-h6`}>Gói cơ bản</span>
                            </div>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>

                        </Col>
                        <Col flex={1} onClick={() => setCurrentPackage('standard')}
                             className={`${currentPackage === 'standard' ? 'bd-color-blue bd1px' : ''} bg-color-gray border-top-radius mgl2 mgr2  cursor-pointer txt-center`}>
                            <div style={{height: 50}}
                                 className={`${currentPackage === 'standard' ? 'bg-color-blue' : 'bg-color-blue3'} border-top-radius  dpl-flex align-items-center justify-content-center`}>
                                <span
                                    className={`${currentPackage === 'standard' ? 'txt-color-white' : 'txt-color-black'} robotobold txt-size-h6`}>Gói tiêu chuẩn</span>
                            </div>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>

                        </Col>
                        <Col  flex={1} onClick={() => setCurrentPackage('advance')}
                             className={`${currentPackage === 'advance' ? 'bd-color-blue bd1px' : ''} bg-color-gray border-top-radius  cursor-pointer`}>
                            <div style={{height: 50}}
                                 className={`${currentPackage === 'advance' ? 'bg-color-blue' : 'bg-color-blue3'} border-top-radius  dpl-flex align-items-center justify-content-center cursor-pointer`}>
                                <span
                                    className={`${currentPackage === 'advance' ? 'txt-color-white' : 'txt-color-black'} robotobold txt-size-h6`}>Gói nâng cao</span>
                            </div>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                            <Row className={'justify-content-center'} style={{minHeight:100}}><span className={'txt-size-h6 pd10'}>Không quá 10 triệu</span></Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className={'bg-color-gray mgt20 pd20'}>
                <Row>
                    <Col span={6}>
                        <Row><span>Ngày hiệu lực</span></Row>
                        <DatePicker suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'} format={'dd/MM/YYYY'} onChange={handleChange}/>
                    </Col>
                    <Col span={6} className={'mgl10'}>
                        <Row><span>Chu kỳ thanh toán</span></Row>
                        <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                            <Select.Option value="1">1 năm</Select.Option>
                            <Select.Option value="2">2 năm</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row className={'mgt10 justify-content-between align-items-center'}>
                    <Button onClick={()=>navigate(`/products/${productId}/register`)} size={'large'} className={''} type={'primary'} danger shape={'round'}>
                        <span className={'robotobold txt-size-h4'}>Đăng ký <i className="mgl5 fas fa-angle-right"></i></span>
                    </Button>
                    <div>
                        <Row><span>Thành tiền:</span></Row>
                        <span className={'robotobold txt-size-h4 txt-color-red'}>1000 đ</span>
                    </div>
                </Row>
            </div>
            <Row><span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Mô tả chi tiết</span></Row>
            <div className={'dpl-flex justify-content-center'}>
                <img
                    src={'https://baohiem.viettelpay.vn/filepath/images/FileUpload/40ee56bd-a6df-4677-8026-8d0e7a56c011.jpg'}></img>

            </div>
        </div>
    </MainLayout>
};
export default ProductDetail;

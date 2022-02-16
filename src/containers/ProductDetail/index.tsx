import React, {useEffect, useState} from 'react';
import MainLayout from "../../components/Layout";
import {Button, Carousel, Col, DatePicker, Input, Row, Select} from "antd";
import {UserAddOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";
import lodash from "lodash";
import moment from "moment";
import {formatDate} from "../../core/helpers/date-time";
import {STANDARD_DATE_FORMAT} from "../../core/config";

const data = [
    {
        id: 'tainansudungdien',
        banner: 'https://baohiem.viettelpay.vn/filepath/files/products/c61b2398-bac6-41f7-9547-537f81840bff.png',
        description: 'Theo thống kê, trung bình mỗi năm ở nước ta có khoảng hơn 7.000 vụ tai nạn điện và hơn 250 người chết vì tai nạn điện. Con số này vẫn chưa dừng lại và còn tiếp tục gia tăng vì sự bất cẩn của người sử dụng điện. Với bảo hiểm tai nạn hộ sử dụng điện, chỉ cần 1 người mua, cả hộ gia đình cùng được bảo vệ. Bảo hiểm không chỉ giới hạn trong phạm vi nơi ở mà còn mở rộng ra bất cứ đâu ',
        benefit: {
            categories: [
                {
                    name: 'Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.',
                    code: '1'
                },
                {
                    name: 'Thương tật thân thể vĩnh viễn do dòng diện gây ra. Chi trả theo tỷ lệ thương tật của từng thành viên trong hộ.',
                    code: '2'
                },
                {
                    name: 'Tử vong do dòng điện gây ra. Chi trả một lần toàn bộ số tiền bảo hiểm cho từng thành viên trong hộ. ',
                    code: '3'
                }
            ],
            packages: [
                {
                    name: 'Gói cơ bản',
                    code: 'basic',
                    benefits: [
                        {
                            category: '1',
                            value: 'Không quá 10 triệu đồng/người'
                        },
                        {
                            category: '2',
                            value: 'Tỷ lệ thương tật * 10 triệu đồng/người'
                        },
                        {
                            category: '3',
                            value: '10 triệu đồng/người'
                        }
                    ]
                },
                {
                    name: 'Gói tiêu chuẩn',
                    code: 'standard',
                    benefits: [
                        {
                            category: '1',
                            value: 'Không quá 20 triệu đồng/người'
                        },
                        {
                            category: '2',
                            value: 'Tỷ lệ thương tật * 20 triệu đồng/người'
                        },
                        {
                            category: '3',
                            value: '20 triệu đồng/người'
                        }
                    ]
                },
                {
                    name: 'Gói nâng cao',
                    code: 'advance',
                    benefits: [
                        {
                            category: '1',
                            value: 'Không quá 40 triệu đồng/người'
                        },
                        {
                            category: '2',
                            value: 'Tỷ lệ thương tật * 40 triệu đồng/người'
                        },
                        {
                            category: '3',
                            value: '40 triệu đồng/người'
                        }
                    ]
                }
            ]
        },
        detail: 'https://baohiem.viettelpay.vn/filepath/images/FileUpload/40ee56bd-a6df-4677-8026-8d0e7a56c011.jpg'
    },
    {
        id: 'tndsoto',
        banner: 'https://baohiem.viettelpay.vn/filepath/files/products/e647b523-2d3c-43de-9dea-ecd787cf158d.png',
        description: 'Bảo hiểm TNDS ô tô là giấy tờ bắt buộc khi đăng kiểm xe và tham gia giao thông với chế tài 400.000 - 600.000 đồng/lần khi vi phạm. Trường hợp chủ xe ô tô gây tai nạn, bảo hiểm sẽ chi trả cho người bị nạn số tiền lên đến 150 triệu đồng/người/vụ cho tổn thất về người và 100 triệu đồng/vụ cho tổn thất về tài sản. Ngoài sản phẩm bắt buộc, Viettel Money cung cấp thêm cho KH các gói bảo hiểm tự nguyện dành cho lái xe, phụ xe và người ngồi trên xe ô tô với mức quyền lợi từ 10 triệu đến 100 triệu đồng/người/vụ với chi phí chỉ từ 20.000 đồng.',
        benefit: {
            categories: [
                {
                    name: 'Thiệt hại của nạn nhân dẫn đến tử vong, thương tật thân thể do tai nạn',
                    code: '1'
                },
                {
                    name: 'Thiệt hại về tài sản của nạn nhân do va chạm',
                    code: '2'
                },
                {
                    name: 'Thiệt hại của lái xe, phụ xe, người ngồi trên xe dẫn đến tử vong, thương tật thân thể do tai nạn',
                    code: '3'
                }
            ],
            packages: [
                {
                    name: 'Gói bắt buộc',
                    code: 'basic',
                    benefits: [
                        {
                            category: '1',
                            value: 'Tối đa 150 triệu đồng/người/vụ'
                        },
                        {
                            category: '2',
                            value: 'Tối đa 100 triệu đồng/người/vụ'
                        },
                        {
                            category: '3',
                            value: 'Không bao gồm'
                        }
                    ]
                },
                {
                    name: 'Gói tiêu chuẩn',
                    code: 'standard',
                    benefits: [
                        {
                            category: '1',
                            value: 'Tối đa 150 triệu đồng/người/vụ'
                        },
                        {
                            category: '2',
                            value: 'Tối đa 100 triệu đồng/người/vụ'
                        },
                        {
                            category: '3',
                            value: 'Không bao gồm'
                        }
                    ]
                },
                {
                    name: 'Gói nâng cao',
                    code: 'advance',
                    benefits: [
                        {
                            category: '1',
                            value: 'Tối đa 150 triệu đồng/người/vụ'
                        },
                        {
                            category: '2',
                            value: 'Tối đa 100 triệu đồng/người/vụ'
                        },
                        {
                            category: '3',
                            value: 'Không bao gồm'
                        }
                    ]
                }
            ]
        },
        detail: 'https://baohiem.viettelpay.vn/filepath/images/FileUpload/6dab5b5c-fa96-4016-af7c-b3f8a4d4bc36.jpg'
    },
    {
        id: 'nhaotoandien',
        banner: 'https://baohiem.viettelpay.vn/filepath/files/products/e765c579-8c18-48b7-b240-90f690af1b02.png',
        description: 'Ngôi nhà là tài sản lớn, là thành quả tích lũy trong thời gian dài của bạn và gia đình. Thành quả đó sẽ bền lâu và tiếp tục phát triển nếu bạn luôn có những phương án để bảo vệ nó trước những rủi ro không lường trước được trong cuộc sống. Hãy tham gia Bảo hiểm toàn diện nhà ở chỉ từ 165.000đ/năm để luôn yên tâm với giải pháp bảo hiểm toàn diện cho Ngôi nhà của bạn. Bảo hiểm toàn diện nhà ở sẽ cùng gánh vác những tổn thất khi phát sinh rủi ro cho Ngôi nhà và các tài sản bên trong của bạn lên đến 600 triệu đồng/ năm',
        benefit: {
            categories: [
                {
                    name: 'Thiệt hại phần khung nhà',
                    code: '1'
                },
                {
                    name: 'Thiệt hại tài sản bên trong',
                    code: '2'
                },
            ],
            packages: [
                {
                    name: 'Gói cơ bản',
                    code: 'basic',
                    benefits: [
                        {
                            category: '1',
                            value: '150.000.000đ/ năm'
                        },
                        {
                            category: '2',
                            value: '150.000.000đ/ năm'
                        },
                    ]
                },
                {
                    name: 'Gói tiêu chuẩn',
                    code: 'standard',
                    benefits: [
                        {
                            category: '1',
                            value: '150.000.000đ/ năm'
                        },
                        {
                            category: '2',
                            value: '150.000.000đ/ năm'
                        },
                    ]
                },
                {
                    name: 'Gói nâng cao',
                    code: 'advance',
                    benefits: [
                        {
                            category: '1',
                            value: '150.000.000đ/ năm'
                        },
                        {
                            category: '2',
                            value: '150.000.000đ/ năm'
                        },
                    ]
                }
            ]
        },
        detail: 'https://baohiem.viettelpay.vn/filepath/images/FileUpload/9b43db25-da8e-4ffc-98b0-72fbbe18e0e8.jpg'
    },
]

function ProductDetail() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const [currentPackage, setCurrentPackage] = useState<string>();
    let {productId} = useParams();
    const [detail, setDetail] = useState<any>();
    const navigate = useNavigate();
    useEffect(() => {
        if (productId) {
            let item = data.find((x: any) => x.id === productId);
            if (item) {
                setDetail(item);
                setCurrentPackage(item.benefit.packages[0].code);
            }

        }
    }, []);

    function handleChange(value: any) {
        console.log(`selected ${value}`);
    }

    const renderBenefit = () => {

        return <div>
            <Row><span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Thông tin quyền lợi</span></Row>
            <Row>
                <Col span={6}>
                    <Row style={{height: 50}}>

                    </Row>
                    <div className={'bg-color-gray mgr2'}>
                        {
                            detail && detail?.benefit?.categories.map((x: any, index: number) => {
                                return <Row key={index} style={{minHeight: 100}}>
                                    <span className={'mgt20 txt-size-h7 pdl10 pdr10'}>{x.name}</span>
                                </Row>
                            })
                        }
                    </div>
                </Col>
                <Col span={18}>
                    <Row className={'bg-color-white justify-content-between'}>
                        {
                            detail && detail.benefit.packages.map((x: any, index: number) => {
                                return <Col key={index} span={8} >
                                    <Col onClick={() => setCurrentPackage(x.code)}
                                         className={`${currentPackage === x.code ? 'bd-color-blue bd1px' : ''} bg-color-gray border-top-radius  cursor-pointer ${index%2!=0?'mgr2 mgl2':''}`}>
                                        <div style={{height: 50}}
                                             className={`${currentPackage === x.code ? 'bg-color-blue' : 'bg-color-blue3'} border-top-radius dpl-flex align-items-center justify-content-center cursor-pointer`}>
                                <span
                                    className={`${currentPackage === x.code ? 'txt-color-white' : 'txt-color-black'} robotobold txt-size-h6`}>{x.name}</span>
                                        </div>
                                        {x.benefits.map((xx: any, index: number) => {
                                            return <Row key={index} className={'justify-content-center'}
                                                        style={{minHeight: 100}}><span
                                                className={'txt-size-h7 pd5 mgt20'}>{xx.value}</span></Row>
                                        })}

                                    </Col>
                                </Col>
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    }
    const renderFeeElectric=()=>{
        return <div>
            <Row>
                <Col span={6}>
                    <Row><span>Ngày hiệu lực</span></Row>
                    <DatePicker defaultValue={moment(new Date(),STANDARD_DATE_FORMAT)} suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                                format={STANDARD_DATE_FORMAT} onChange={handleChange}/>
                </Col>
                <Col span={6} className={'mgl10'}>
                    <Row><span>Chu kỳ thanh toán</span></Row>
                    <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                        <Select.Option value="1">1 năm</Select.Option>
                    </Select>
                </Col>
            </Row>
        </div>
    }
    const renderFeeCar=()=>{
        return <div>
            <Row className={'justify-content-between'}>
                <Col span={6}>
                    <Row><span>Ngày hiệu lực</span></Row>
                    <DatePicker defaultValue={moment(new Date(),STANDARD_DATE_FORMAT)} suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                                format={STANDARD_DATE_FORMAT} onChange={handleChange}/>
                </Col>
                <Col span={6} className={'mgl10'}>
                    <Row><span>Chu kỳ thanh toán</span></Row>
                    <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                        <Select.Option value="1">1 năm</Select.Option>
                    </Select>
                </Col>
                <Col span={6} className={'mgl10'}>
                    <Row><span>Mục đích sử dụng</span></Row>
                    <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                        <Select.Option value="1">1 năm</Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row className={'mgt20 justify-content-between'}>
                <Col span={6} className={''}>
                    <Row><span>Số chỗ ngồi</span></Row>
                   <Input></Input>
                </Col>
                <Col span={6} className={'mgl10'}>
                    <Row><span>Phân loại</span></Row>
                    <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                        <Select.Option value="1">1 năm</Select.Option>
                    </Select>
                </Col>
                <Col span={6} className={'mgl10'}>
                    <Row><span>Loại xe</span></Row>
                    <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                        <Select.Option value="1">1 năm</Select.Option>
                    </Select>
                </Col>
            </Row>
        </div>
    }
    const renderFee=()=>{
        switch (productId){
            case 'tndsoto':
                return renderFeeCar();
            case 'tainansudungdien':
            case 'nhaotoandien':
                return renderFeeElectric();
        }
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Chi Tiết Sản Phẩm'}>
        <div className={'mgbt20 mgt1'}>
            <img className={'width100'} src={lodash.get(detail, 'banner', '')}></img>
        </div>
        <div className={'main-content'}>
            <span className={'txt-size-h5'}>{lodash.get(detail, 'description', '')}</span>
            {renderBenefit()}
            <div className={'bg-color-gray mgt20 pd20'}>
                {renderFee()}
                <Row className={'mgt10 justify-content-between align-items-center'}>
                    <Button onClick={() => navigate(`/products/${productId}/register`)} size={'large'} className={''}
                            type={'primary'} danger shape={'round'}>
                        <span className={'robotobold txt-size-h4'}>Đăng ký <i
                            className="mgl5 fas fa-angle-right"></i></span>
                    </Button>
                    <div>
                        <Row><span>Thành tiền:</span></Row>
                        <span className={'robotobold txt-size-h4 txt-color-red'}>1000 đ</span>
                    </div>
                </Row>
            </div>
            <Row><span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Mô tả chi tiết</span></Row>
            <div className={'dpl-flex justify-content-center'}>
                <img className={'width100'}
                    src={lodash.get(detail, 'detail', '')}></img>

            </div>
        </div>
    </MainLayout>
};
export default ProductDetail;

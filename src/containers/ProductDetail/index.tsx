import React, {useEffect, useState} from 'react';
import MainLayout from "../../components/Layout";
import {Button, Carousel, Checkbox, Col, DatePicker, Image, Input, Radio, Row, Select, Spin} from "antd";
import {UserAddOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";
import lodash from "lodash";
import moment from "moment";
import {formatDate, formatTime} from "../../core/helpers/date-time";
import {
    CPID,
    ENSURE_CAR,
    ENSURE_ELECTRIC,
    ENSURE_HOUSE,
    FEE,
    FEE_REQUEST,
    STANDARD_DATE_FORMAT
} from "../../core/config";
import {productRepository} from "../../repositories/ProductRepository";
import {sign} from "../../utils/StringUtils";
import {formatMoneyByUnit} from "../../core/helpers/string";
import {categoryRepository} from "../../repositories/CategoryRepository";
import M24ErrorUtils from "../../utils/M24ErrorUtils";
import {localStorageSave} from "../../utils/LocalStorageUtils";
import {useMediaQuery} from "react-responsive";

const data = [
    {
        id: 'tainansudungdien',
        banner: require('../../resources/images/banner-electric.jpg'),
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
                    code: '01',
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
                    code: '02',
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
                    code: '03',
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
        banner: require('../../resources/images/banner-car.png'),
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
                    code: '01',
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
                    code: '02',
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
                    code: '03',
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
        banner: require('../../resources/images/banner-house.jpg'),
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
                    code: '01',
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
                    code: '02',
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
                    code: '03',
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
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPackage, setCurrentPackage] = useState<string>('');
    let {productId} = useParams();
    const [detail, setDetail] = useState<any>();
    const [fee, setFee] = useState<any>();
    const navigate = useNavigate();
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 })
    const keyCars=['MayKeo','XeChuyenDung','XeChoTien','XePickUp','XeTaiVan','XeTapLai','XeBus','XeCuuThuong','Xetaxi','XeDauKeo'];
    const [bodyOto, setBodyOto] = useState({
        "ma_trongtai": "",
        "so_cho": "",
        "ma_mdsd": "1",
        "MayKeo": false,
        "XeChuyenDung": false,
        "XeChoTien": false,
        "XePickUp": false,
        "XeTaiVan":  false,
        "XeTapLai":  false,
        "XeBus":  false,
        "XeCuuThuong":  false,
        "Xetaxi":  false,
        "XeDauKeo":  false,
        "giodau": '',
        "giocuoi": '',
        "ngaydau": formatDate(moment()),
        "ngaycuoi": formatDate(moment().set('year', moment().get('year')+1)),
        "mtn_laiphu": 0,
        "so_nguoi": "0",
        "tyle_gp_laiphu": "0",
        "philpx_nhap": "0",
        "thamgia_laiphu": false,
        "CpId": CPID,
        "Sign": ''
    });
    const categoriesCar=[
        {
            name:'Xe chở người không KDVT',
            code:'1',
            items:[
                {name:'Xe chở tiền',code:'XeChoTien'},
                {name:'Xe bán tải (pickup)',code:'XePickUp', dependencies:['XeTapLai']},
                {name:'Xe tải VAN',code:'XeTaiVan', dependencies:['XeTapLai']},
                {name:'Xe tập lái',code:'XeTapLai', dependencies:['XePickUp','XeTaiVan']},
            ],
        },
        {
            name:'Xe chở người KDVT',
            code:'2',
            items:[
                {name:'Xe bán tải (pickup)',code:'XePickUp', dependencies:['Xetaxi']},
                {name:'Xe tải VAN',code:'XeTaiVan', dependencies:['Xetaxi']},
                {name:'Xe bus',code:'XeBus'},
                {name:'Xe cứu thương',code:'XeCuuThuong'},
                {name:'Xe taxi',code:'Xetaxi', dependencies:['XePickUp','XeTaiVan']},
            ]
        },
        {
            name:'Xe chở hàng',
            code:'3',
            items:[
                {name:'Xe tập lái',code:'XeTapLai', dependencies:['XeDauKeo']},
                {name:'Xe chuyên dụng khác',code:'XeChuyenDung'},
                {name:'Xe đầu kéo rơ mooc',code:'XeDauKeo', dependencies:['XeTapLai']},
                {name:'Máy kéo, xe máy chuyên dùng',code:'MayKeo'},
            ]
        }
    ]
    const [purpose, setPurpose] = useState<any>(categoriesCar[0]);
    useEffect(() => {
        if (productId) {
            let item = data.find((x: any) => x.id === productId);
            if (item) {
                setDetail(item);
                setCurrentPackage(item.benefit.packages[0].code);
            }
        }
    }, []);
    useEffect(()=>{
        if(currentPackage)
            getFee();
    },[currentPackage]);
    useEffect(()=>{
        if(productId===ENSURE_CAR){
            setTimeout(()=>{
                getFeeTNDSOTO();
            },1000);
        }
    },[bodyOto]);
    useEffect(()=>{
        localStorageSave(FEE, fee);
    },[fee]);
    const getFee=()=>{
        setLoading(true);
        switch (productId){
            case ENSURE_ELECTRIC:
                getFeeHSDD();
                break;
            case ENSURE_CAR:
                getFeeTNDSOTO();
                break;
            case ENSURE_HOUSE:
                getFeeHouse();
                break;
        }
    }
    const getFeeHSDD=()=>{

        let body = {
            "cpid":CPID,
            "sign":sign(currentPackage),
            "package":currentPackage
        };
        productRepository.getFeeHSDD(body).then(res=>{
            console.log(res);
            setFee(res);
        }).catch(err=>{
            M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(()=> setLoading(false));
    }
    const getFeeHouse=()=>{
        let body = {
            "cpid":CPID,
            "sign":sign(currentPackage),
            "package":currentPackage
        };
        productRepository.getFeeHouse(body).then(res=>{
            setFee(res);
        }).catch(err=>{
            M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(()=> setLoading(false));
    }
    const getFeeTNDSOTO=()=>{
        let body = lodash.cloneDeep(bodyOto);
        if(currentPackage!='01'){
            body.thamgia_laiphu=true;
            if(currentPackage==='02')
                body.mtn_laiphu=10000000;
            else  body.mtn_laiphu=100000000;
        }else {
            body.thamgia_laiphu=false;
            body.mtn_laiphu=0;
        }
        body.giodau=formatTime(moment());
        body.giocuoi=formatTime(moment());
        body.Sign = sign(`${body.ma_trongtai}${body.so_cho}`);
        if(checkDisableRegister()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        localStorageSave(FEE_REQUEST,body);
        productRepository.getFeeTNDSOTO(body).then(res=>{
            setFee(res);
        }).catch(err=>{
            M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(()=> setLoading(false));
    }

    const handleChange=(value: any)=> {
        let item = categoriesCar.find((x: any)=> x.code===value);
        setPurpose(item);
        let body = lodash.cloneDeep(bodyOto);
        body.ma_mdsd=value;
        keyCars.map((x: string)=>{
            // @ts-ignore
            body[x]=false;
        });
        setBodyOto(body);
        setFee(null);
    }
    const getProductName=()=>{
        switch (productId){
            case ENSURE_ELECTRIC:
                return 'Bảo hiểm tại nạn hộ sử dụng điện';
            case ENSURE_CAR:
                return 'Bảo hiểm ô tô PVI';
            case ENSURE_HOUSE:
                return 'Bảo hiểm nhà ở toàn diện';
        }
    }
    const changeTypeCar=(checked: boolean, code: string)=>{
        let body = lodash.cloneDeep(bodyOto);
        // @ts-ignore
        body[code]=checked;
        let item = purpose.items.find((x: any)=> x.code===code);
        if(!item.dependencies){
            keyCars.map((x: string)=>{
                if(x!==code)
                {
                    // @ts-ignore
                    body[x]=false;
                }
            });
        }else{
            keyCars.map((x: string)=>{
                if(!item.dependencies.includes(x)&&x!==code)
                {
                    // @ts-ignore
                    body[x]=false;
                }
            });
        }
        setBodyOto(body);
    }
    const changeValueCar=(key: string, value: any)=>{
        let body = lodash.cloneDeep(bodyOto);
        value=value.replace(/[^\d]/g,'');
        // @ts-ignore
        body[key] = value;
        setBodyOto(body);
    }
    const checkDisableRegister=()=>{
        if(productId===ENSURE_CAR){
            if(!bodyOto.so_cho)
                return true;
            else if(purpose.code==='3'&&!bodyOto.ma_trongtai)
                return true;
        }
        return false;
    }
    const renderBenefit = () => {
        if(!detail) return;
        if(isDesktopOrLaptop){
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
        }else{

            let packageData = detail.benefit.packages.find((x: any)=> x.code===currentPackage);
            let categories = detail.benefit.categories;
            return <div>
                <Row>
                    <span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Thông tin quyền lợi</span>
                </Row>
                <Row className={'justify-content-center align-items-center'}>
                    <Radio.Group buttonStyle="solid" size={'large'} className={'width100'} value={currentPackage} onChange={(e)=> setCurrentPackage(e.target.value)}>
                        {detail.benefit.packages.map((x: any)=>{
                            return  <Radio.Button className={''} value={x.code}>{x.name}</Radio.Button>;
                        })}
                    </Radio.Group>
                </Row>
                <div>
                    {
                        categories.map((category: any,index: number)=>{
                            let temp = packageData.benefits.find((x: any)=> x.category===category.code);
                            return <Row gutter={8} key={index} className={'align-items-center'}
                                        style={{minHeight: 70}}>
                                <Col span={14}>
                                    <span className={'txt-size-h7'}>{category?.name}</span>
                                </Col>
                                <Col span={10} className={'txt-right'}>
                                    <span  className={'txt-size-h7 robotobold'}>{temp?.value}</span>
                                </Col>
                            </Row>
                        })
                    }
                </div>
            </div>
        }
    }
    const renderFeeElectric=()=>{
        return <div>
            <Row gutter={8}>
                <Col span={isDesktopOrLaptop?6:12}>
                    <Row><span>Ngày hiệu lực</span></Row>
                    <DatePicker defaultValue={moment(new Date(),STANDARD_DATE_FORMAT)} suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                                format={STANDARD_DATE_FORMAT} onChange={handleChange}/>
                </Col>
                <Col  span={isDesktopOrLaptop?6:12} className={''}>
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

            <Row gutter={8} className={'justify-content-start'}>
                <Col  span={isDesktopOrLaptop?8:12} className={''}>
                    <Row><span>Ngày hiệu lực</span></Row>
                    <DatePicker defaultValue={moment(new Date(),STANDARD_DATE_FORMAT)} suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                                format={STANDARD_DATE_FORMAT} onChange={handleChange}/>
                </Col>
                <Col span={isDesktopOrLaptop?8:12} className={''}>
                    <Row><span>Chu kỳ thanh toán</span></Row>
                    <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                        <Select.Option value="1">1 năm</Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row gutter={8} className={'mgt20 justify-content-start'}>
                <Col span={isDesktopOrLaptop?8:12} className={'mgbt10'}>
                    <Row><span>Mục đích sử dụng</span></Row>
                    <Select value={lodash.get(purpose,'code',undefined)} onChange={handleChange} className={'width100'}>
                        {categoriesCar.map((x: any, index: number)=>{
                            return  <Select.Option value={x.code}>{x.name}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col span={isDesktopOrLaptop?8:12} className={''}>
                    <Row><span><span className={'txt-color-red'}>* </span>Số chỗ ngồi</span></Row>
                   <Input onChange={(e)=> changeValueCar('so_cho',e.target.value)} value={bodyOto.so_cho}></Input>
                </Col>
                {purpose &&purpose.code === '3' &&
                <Col span={isDesktopOrLaptop?8:12} className={''}>
                    <Row><span><span className={'txt-color-red'}>* </span>Trọng tải (kg)</span></Row>
                    <Input onChange={(e)=> changeValueCar('ma_trongtai',e.target.value)} value={bodyOto.ma_trongtai}></Input>
                </Col>
                }
            </Row>
            <Row gutter={8} className={'mgt20 justify-content-start'}>
                {
                    purpose&&purpose.items.map((x: any, index: number)=>{
                        // let disable=false;
                        // if(bodyOto.XeTapLai&&x.code!=='XePickUp'&&x.code!=='XeTaiVan')
                        //     disable=true;
                        return <Col span={isDesktopOrLaptop?8:12} className={''}>
                            <Checkbox checked={lodash.get(bodyOto, x.code, false)} onChange={(e)=> changeTypeCar(e.target.checked, x.code)}>{x.name}</Checkbox>
                        </Col>
                    })
                }
            </Row>
        </div>
    }
    const renderFee=()=>{
        switch (productId){
            case ENSURE_CAR:
                return renderFeeCar();
            case ENSURE_ELECTRIC:
            case ENSURE_HOUSE:
                return renderFeeElectric();
        }
    }

    return <MainLayout showProgressBar={showProgressBar} title={'Chi Tiết Sản Phẩm'}>
        <div className={'mgbt20 mgt1'}>
            {isDesktopOrLaptop?<Image preview={false} width={'100%'} src={lodash.get(detail, 'banner', '')}></Image>:
                <Image preview={false} height={200} width={'100%'} src={lodash.get(detail, 'banner', '')}></Image>}
        </div>
        <div className={'main-content'}>
            <Row>
                <span className={`${isDesktopOrLaptop?'txt-size-h4':'txt-size-h1'} txt-color-black robotobold`}>{getProductName()}</span>
            </Row>
            <span className={'txt-size-h5'}>{lodash.get(detail, 'description', '')}</span>
            {renderBenefit()}
            <Spin size={'large'} spinning={loading}>
            <div className={'bg-color-gray mgt20 pd20'}>

                {renderFee()}
                <Row className={'mgt10 justify-content-between align-items-center'}>
                    <Button disabled={checkDisableRegister()} onClick={() => navigate(`/products/${productId}/register?packageCode=${currentPackage}${productId===ENSURE_CAR?`&purpose=${purpose.code}`:''}`)} size={'large'} className={''}
                            type={'primary'} danger shape={'round'}>
                        <span className={'robotobold txt-size-h4'}>Đăng ký <i
                            className="mgl5 fas fa-angle-right"></i></span>
                    </Button>
                    <div>
                        <Row><span>Thành tiền:</span></Row>
                        <span className={'robotobold txt-size-h4 txt-color-red'}>{formatMoneyByUnit(lodash.get(fee,'TotalFee',''))}</span>
                    </div>
                </Row>
            </div>
            </Spin>
            <Row><span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Mô tả chi tiết</span></Row>
            <div className={'dpl-flex justify-content-center'}>
                <img className={isDesktopOrLaptop?'width50':'width100'}
                    src={lodash.get(detail, 'detail', '')}></img>

            </div>
        </div>
    </MainLayout>
};
export default ProductDetail;

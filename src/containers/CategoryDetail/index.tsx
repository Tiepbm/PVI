import {Button, Carousel, Col, Image, Row} from "antd";
import MainLayout from "../../components/Layout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
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

function CategoryDetail(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const navigate = useNavigate();

    const [products, setProducts] = useState<any>([
        {
            code:'transport',
            name:'Bảo hiểm xe',
            products:[
                {
                    code:'xemay',
                    name:'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName:'TNDS xe máy',
                    description: <div><p>Bảo hiểm xe máy bắt buộc hay bảo hiểm trách nhiệm dân sự (TNDS) xe máy là loại bảo hiểm
                        mà chủ phương tiện phải mua theo quy định của pháp luật. Nếu không tuân thủ sẽ bị cảnh
                        sát giao thông phạt từ 100.000 - 200.000 đồng/lần. Trong trường hợp không may gây tai
                        nạn cho người thứ ba (nạn nhân), người điều khiển xe máy phải tự chi trả toàn bộ chi phí
                        để khắc phục hậu quả.</p>
                        <p>Tham gia bảo hiểm TNDS xe máy của PVI ngay để đảm bảo tuân thủ quy định của pháp luật.
                            Nếu không may gây tai nạn cho người thứ ba khi điều khiển xe máy thì bảo hiểm sẽ hỗ trợ
                            chi trả bồi thường cho nạn nhân số tiền lên đến 150 triệu đồng/người/vụ với tổn thất về
                            người và 50 triệu đồng/vụ với tổn thất về tài sản.</p>
                        <p>Để tự tin ra đường mà không bị phạt, bạn phải mua tối thiểu là “Gói bắt buộc”. Ngoài ra,
                            khách hàng có thể lựa chọn thêm Gói tiêu chuẩn/nâng cao để mở rộng quyền lợi cho lái xe
                            và người ngồi trên xe máy của mình với mức phí tăng thêm chỉ từ 20.000 đồng.</p></div>,
                    benefit:{
                        categories: [
                            {
                                name: '',
                                code: '1'
                            },
                            {
                                name: '',
                                code: '2'
                            },
                            {
                                name: '',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Đồng',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Vàng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    },
                    detail:'',
                    file:''

                }
            ]
        },
        {
            code:'healthy',
            name:'Sức khỏe',
            products:[
                {
                    code:'xemay',
                    name:'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName:'TNDS xe máy',
                    description: <div></div>,
                    benefit:{
                        categories: [
                            {
                                name: '',
                                code: '1'
                            },
                            {
                                name: '',
                                code: '2'
                            },
                            {
                                name: '',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Đồng',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Vàng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    },
                    detail:'',
                    file:''

                }
            ]
        },
        {
            code:'accident',
            name:'Tai nạn',
            products:[
                {
                    code:'xemay',
                    name:'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName:'TNDS xe máy',
                    description: <div></div>,
                    benefit:{
                        categories: [
                            {
                                name: '',
                                code: '1'
                            },
                            {
                                name: '',
                                code: '2'
                            },
                            {
                                name: '',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Đồng',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Vàng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    },
                    detail:'',
                    file:''

                }
            ]
        },
        {
            code:'asset',
            name:'Tài sản',
            products:[
                {
                    code:'xemay',
                    name:'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName:'TNDS xe máy',
                    description: <div></div>,
                    benefit:{
                        categories: [
                            {
                                name: '',
                                code: '1'
                            },
                            {
                                name: '',
                                code: '2'
                            },
                            {
                                name: '',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Đồng',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Vàng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    },
                    detail:'',
                    file:''

                }
            ]
        },
        {
            code:'tralve',
            name:'Du lịch',
            products:[
                {
                    code:'xemay',
                    name:'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName:'TNDS xe máy',
                    description: <div></div>,
                    benefit:{
                        categories: [
                            {
                                name: '',
                                code: '1'
                            },
                            {
                                name: '',
                                code: '2'
                            },
                            {
                                name: '',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Đồng',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Gói Vàng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: ''
                                    },
                                    {
                                        category: '2',
                                        value: ''
                                    },
                                    {
                                        category: '3',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    },
                    detail:'',
                    file:''

                }
            ]
        }
        ]);
    const renderItem=(item: any)=>{
        return <Row className={'mgbt20 align-items-center'}>
            <Col span={8}>
            <Image preview={false} style={{borderRadius:8}} src={item.img}></Image>
            </Col>
            <Col className={'pdl20'}>
                <Row>
                <span className={'txt-size-32 txt-color-blue robotobold'}>{item.name}</span>
                </Row>
                <span>{'Mô tả sản phẩm'}</span>
                <Row><Button onClick={()=> navigate(`/products/${item.id}`)} className={'mgt20'} type={'primary'}>Xem thêm</Button></Row>
            </Col>
        </Row>
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/Xe.jpg'}></img>
            <div className={'main-content'}>
            <span className={'txt-size-48 robotobold'}>Sản phẩm</span>
            {products.map((x:any)=> renderItem(x))}
            </div>
        </div>
    </MainLayout>
}
export default CategoryDetail;

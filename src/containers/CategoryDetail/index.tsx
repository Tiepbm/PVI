import {Button, Carousel, Col, Image, Row} from "antd";
import MainLayout from "../../components/Layout";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import iconScooter from '../../resources/images/scooter 1.svg';
import iconHome from '../../resources/images/icon_home.svg';
import iconCar from '../../resources/images/icon_car.svg';

import iconUp2 from '../../resources/images/icon-up2.svg';
import iconH21 from '../../resources/images/icon-h21.svg';
import iconH22 from '../../resources/images/icon-h22.svg';
import iconH23 from '../../resources/images/icon-h23.svg';
import lodash from "lodash";

function CategoryDetail(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const navigate = useNavigate();
    let {categoryId} = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const [detail, setDetail] = useState<any>();
    const [currentProduct, setCurrentProduct] = useState<any>();
    const [currentPackage, setCurrentPackage] = useState<string>('01');
    const [products, setProducts] = useState<any>([
        {
            code:'transport',
            name:'Bảo hiểm xe',
            banner:require('../../resources/images/bannerxe.png'),
            tabClassName:'baohiemxe',
            products:[
                {
                    isReady: false,
                    code:'xemay',
                    name:'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName:'TNDS xe máy',
                    description: <div><h2><img src={iconScooter}/>Bảo hiểm xe máy</h2>
                        <p>Bảo hiểm xe máy bắt buộc hay bảo hiểm trách nhiệm dân sự (TNDS) xe máy là loại bảo hiểm mà chủ phương tiện phải mua theo quy định của pháp luật. Nếu không tuân thủ sẽ bị cảnh sát giao thông phạt từ 100.000 - 200.000 đồng/lần. Trong trường hợp không may gây tai nạn cho người thứ ba (nạn nhân), người điều khiển xe máy phải tự chi trả toàn bộ chi phí để khắc phục hậu quả.</p>
                        <p>Tham gia bảo hiểm TNDS xe máy của PVI ngay để đảm bảo tuân thủ quy định của pháp luật. Nếu không may gây tai nạn cho người thứ ba khi điều khiển xe máy thì bảo hiểm sẽ hỗ trợ chi trả bồi thường cho nạn nhân số tiền lên đến 150 triệu đồng/người/vụ với tổn thất về người và 50 triệu đồng/vụ với tổn thất về tài sản.</p>
                        <p>Để tự tin ra đường mà không bị phạt, bạn phải mua tối thiểu là “Gói bắt buộc”. Ngoài ra, khách hàng có thể lựa chọn thêm Gói tiêu chuẩn/nâng cao để mở rộng quyền lợi cho lái xe và người ngồi trên xe máy của mình với mức phí tăng thêm chỉ từ 20.000 đồng.</p>
                    </div>,
                    benefit:{
                        classNameValue:'baohiemxemay',
                        categories: [
                            {
                                name: 'Người điều khiển xe máy gây tai nạn dẫn đến thiệt hại về sức khỏe, tính mạng cho bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ thay người điều khiển xe bồi thường cho bên thứ 3.',
                                code: '1'
                            },
                            {
                                name: 'Người điều khiển xe máy gây tai nạn dẫn đến thiệt hại về tài sản của bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ thay người điều khiển xe bồi thường cho bên thứ 3.',
                                code: '2'
                            },
                            {
                                name: 'Lái xe, người ngồi trên xe máy gặp tai nạn khi đang tham gia giao thông dẫn đến tử vong, thương tật thân thể.',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Bắt Buộc',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: 'Tối đa 150 triệu đồng/người/vụ'
                                    },
                                    {
                                        category: '2',
                                        value: 'Tối đa 50 triệu đồng/người/vụ'
                                    },
                                    {
                                        category: '3',
                                        value: 'Không bao gồm'
                                    }
                                ]
                            },
                            {
                                name: 'Gói Tiêu Chuẩn',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: 'Tối đa 150 triệu đồng/người/vụ'
                                    },
                                    {
                                        category: '2',
                                        value: 'Tối đa 50 triệu đồng/người/vụ'
                                    },
                                    {
                                        category: '3',
                                        value: 'Tối đa 10 triệu đồng/người/vụ'
                                    }
                                ]
                            },
                            {
                                name: 'Gói Nâng Cao',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: 'Tối đa 150 triệu đồng/người/vụ'
                                    },
                                    {
                                        category: '2',
                                        value: 'Tối đa 50 triệu đồng/người/vụ'
                                    },
                                    {
                                        category: '3',
                                        value: 'Tối đa 50 triệu đồng/người/vụ'
                                    }
                                ]
                            }
                        ]
                    },
                    detail:require('../../resources/images/baohiemxemay.jpg'),
                    file:'./files/QTBH/Quy tac BH Moto-Xe may_21.2.2020.pdf'

                },
                {
                    isReady: true,
                    code:'oto',
                    name:'Bảo hiểm TNSD ô tô',
                    banner: require('../../resources/images/imagebaohiem2.png'),
                    tabName:'TNDS ô tô',
                    description: <div>
                        <h2><img src={iconCar}/>Bảo hiểm TNDS ô tô</h2>
                        <p>Bảo hiểm ô tô bắt buộc hay bảo hiểm trách nhiệm dân sự (TNDS) ô tô là loại bảo hiểm mà chủ phương tiện phải mua theo quy định của pháp luật. Nếu không tuân thủ, khi CSGT yêu cầu xuất trình bảo hiểm, chủ xe ô tô sẽ bị phạt từ 400.000 - 600.000 đồng/lần. Trong trường hợp không may gây tai nạn cho người thứ ba (nạn nhân), chủ xe phải tự chi trả toàn bộ chi phí để khắc phục hậu quả.</p>
                        <p>Tham gia bảo hiểm TNDS ô tô của PVI ngay để đảm bảo tuân thủ quy định của pháp luật. Trường hợp chủ xe ô tô gây tai nạn, bảo hiểm sẽ hỗ trợ chi trả cho nạn nhân số tiền lên đến 150 triệu đồng/người/vụ với tổn thất về người và 100 triệu đồng/vụ với tổn thất về tài sản.</p>
                        <p>Ngoài ra, Bảo hiểm PVI cung cấp thêm các gói bảo hiểm bảo vệ cho lái xe, phụ xe và người ngồi trên chính xe ô tô của mình với quyền lợi là 10 triệu đồng/người/vụ (gói tiêu chuẩn) hoặc 100 triệu đồng/người/vụ (gói nâng cao), mức phí tăng thêm tương ứng chỉ từ 10.000 - 100.000 đồng.</p>

                    </div>,
                    benefit:{
                        classNameValue:'baohiemoto',
                        categories: [
                            {
                                name: 'Người điều khiển xe ô tô gây tai nạn dẫn đến thiệt hại về sức khỏe, tính mạng cho bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ hỗ trợ bồi thường cho bên thứ 3.',
                                code: '1'
                            },
                            {
                                name: 'Người điều khiển xe ô tô gây tai nạn dẫn đến thiệt hại về tài sản của bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ hỗ trợ bồi thường cho bên thứ 3.',
                                code: '2'
                            },
                            {
                                name: 'Lái xe, phụ xe, người ngồi trên xe ô tô gặp tai nạn khi đang tham gia giao thông dẫn đến tử vong, thương tật thân thể.',
                                code: '3'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Bắt Buộc',
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
                                name: 'Gói Tiêu Chuẩn',
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
                                        value: 'Tối đa 10 triệu đồng/người/vụ'
                                    }
                                ]
                            },
                            {
                                name: 'Gói Nâng Cao',
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
                                        value: 'Tối đa 100 triệu đồng/người/vụ'
                                    }
                                ]
                            }
                        ]
                    },
                    detail:require('../../resources/images/baohiemoto.jpg'),
                    file:'./files/QTBH/Tom tat TNDS BB oto & Tai nan LPX.pdf'

                },
                {
                    isReady: false,
                    code: 'thanvo',
                    name: 'Bảo hiểm thân vỏ ô tô',
                    banner: '',
                    tabName: 'Thân vỏ ô tô',
                }
            ]
        },
        {
            code:'healthy',
            name:'Sức khỏe',
            banner:require('../../resources/images/bannersk.png'),
            tabClassName:'baohiemsuckhoe',
            products:[
                {
                    isReady: false,
                    code:'nguphucuuviet',
                    name:'Ngũ phúc ưu việt',
                    banner: '',
                    tabName:'Ngũ phúc ưu việt',
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

                },
                {
                    isReady: false,
                    code:'hotronamvien',
                    name:'Hỗ trợ nằm viện',
                    banner: '',
                    tabName:'Hỗ trợ nằm viện',
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

                },
                {
                    isReady: false,
                    code:'anphucuuviet',
                    name:'An phúc ưu việt',
                    banner: '',
                    tabName:'An phúc ưu việt',
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
            banner:require('../../resources/images/banner-sp.png'),
            tabClassName:'baohiemtainan',
            products:[
                {
                    isReady: true,
                    code:'tainanhosudungdien',
                    name:'Bảo hiểm tai nạn hộ sử dụng điện',
                    banner: require('../../resources/images/imagebaohiem1.png'),
                    tabName:'Tai nạn hộ sử dụng điện',
                    description: <div>
                        <h2><img src={iconH21}/>Bảo hiểm tại nạn hộ sử dụng điện</h2>
                        <p>Tai nạn về điện luôn tiềm ẩn xung quanh cuộc sống sinh hoạt, làm việc của con người. Nguyên nhân gây tai nạn điện có thể đến từ những bất cẩn trong quá trình sử dụng điện hoặc do thiết bị điện chập cháy, dò điện. Tại Việt Nam, mỗi năm có hơn 7.000 vụ tai nạn điện và hơn 250 người thiệt mạng vì tai nạn điện.</p>
                        <p>Bảo hiểm tai nạn hộ sử dụng điện của PVI sẽ mang đến giải pháp cho toàn bộ gia đình của bạn. Chỉ cần 1 người mua, các thành viên gia đình còn lại đều được bảo vệ. Phí chỉ từ 28.000đ/năm, quyền lợi lên tới 40 triệu đồng/người. </p>

                    </div>,
                    benefit:{
                        classNameValue:'tainandien',
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
                                name: 'Tử vong do dòng điện gây ra. Chi trả một lần toàn bộ số tiền bảo hiểm cho từng thành viên trong hộ.',
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
                                        value: 'Không quá 10 triệu đồng/ người. Không giới hạn số người'
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
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: 'Không quá 10 triệu đồng/ người. Không giới hạn số người'
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
                                name: 'Gói Vàng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: 'Không quá 10 triệu đồng/ người. Không giới hạn số người'
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

                        ]
                    },
                    detail:require('../../resources/images/product-detail.png'),
                    file:'./files/QTBH/Quy tac BH Tai nan Ho su dung dien.pdf'

                },
                {
                    isReady: false,
                    code:'tainancanhan',
                    name:'Tai nạn cá nhân',
                    banner: '',
                    tabName:'Tai nạn cá nhân',
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
            banner:require('../../resources/images/bannernha.png'),
            tabClassName: 'baohiemtaisan',
            products:[
                {
                    isReady: true,
                    code:'nhaotoandien',
                    name:'Bảo hiểm nhà ở toàn diện',
                    banner: require('../../resources/images/imagebaohiem3.png'),
                    tabName:'Nhà ở toàn diện',
                    description: <div>
                        <h2><img src={iconHome}/>Bảo hiểm nhà ở toàn diện</h2>
                        <p>Để sở hữu một căn nhà, chúng ta đã phải bỏ ra hàng trăm triệu đến hàng tỷ đồng, vậy đừng chần chừ khi mua thêm bảo hiểm để bảo vệ khối tài sản đó trước các rủi ro. Chỉ từ 165.000đ/năm, Bảo hiểm nhà ở toàn diện PVI đem đến giải pháp tài chính để bạn luôn yên tâm bảo vệ tổ ấm của mình. Bất cứ khi nào có tổn thất sảy ra với phần khung nhà hay tài sản bên trong ngôi nhà, PVI sẽ đồng hành và chi trả cho bạn với mức quyền lợi lên đến 600 triệu đồng/năm.</p>

                    </div>,
                    benefit:{
                        classNameValue: 'baohiemnhao',
                        categories: [
                            {
                                name: 'Thiệt hại phần khung nhà',
                                code: '1'
                            },
                            {
                                name: 'Thiệt hại tài sản bên trong ngôi nhà',
                                code: '2'
                            }
                        ],
                        packages: [
                            {
                                name: 'Gói Vàng',
                                code: '01',
                                benefits: [
                                    {
                                        category: '1',
                                        value: '450 triệu đồng/năm'
                                    },
                                    {
                                        category: '2',
                                        value: '150 triệu đồng/năm'
                                    },
                                ]
                            },
                            {
                                name: 'Gói Bạc',
                                code: '02',
                                benefits: [
                                    {
                                        category: '1',
                                        value: '300 triệu đồng/năm'
                                    },
                                    {
                                        category: '2',
                                        value: '150 triệu đồng/năm'
                                    },
                                ]
                            },
                            {
                                name: 'Gói Đồng',
                                code: '03',
                                benefits: [
                                    {
                                        category: '1',
                                        value: '150 triệu đồng/năm'
                                    },
                                    {
                                        category: '2',
                                        value: '150 triệu đồng/năm'
                                    },
                                ]
                            }
                        ]
                    },
                    detail:'',
                    file:''

                },
                {
                    isReady: false,
                    code:'manhinhdienthoai',
                    name:'Màn hình điện thoại',
                    banner: '',
                    tabName:'Màn hình điện thoại',
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
            banner:require('../../resources/images/bannerdl.png'),
            tabClassName: 'baohiemdulich',
            products:[
                {
                    isReady: false,
                    code:'dulichtrongnuoc',
                    name:'Du lịch trong nước',
                    banner: '',
                    tabName:'Du lịch trong nước',
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

                },{
                    isReady: false,
                    code:'dulichquocte',
                    name:'Du lịch quốc tế',
                    banner: '',
                    tabName:'Du lịch quốc tế',
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

                },
            ]
        }
        ]);
    useEffect(()=>{
        let category = products.find((x: any)=> x.code===categoryId);
        if(category){
            setDetail(category);
            let productId = searchParams.get('productId');
            let product: any;
            if(productId){
                 product = category.products.find((x: any)=> x.code===productId);
            }
            if(!product) product = category.products[0];
            setCurrentProduct(product);

        }

    },[categoryId]);
    const tabClick=(data: any)=>{
        setCurrentProduct(data);
        setSearchParams({productId: data.code});
    }
    return <MainLayout isDetail={true} showProgressBar={showProgressBar} title={lodash.get(currentProduct,'name','Chi tiết sản phẩm')}>
        <div className="banner">
            <img src={detail?.banner} style={{width: '100%'}} />
            <h1>{detail?.name}</h1>
        </div>
        <div>
            <div className="content">
                <div className={`menu-tab ${detail?.tabClassName}`}>
                    <ul>
                        {detail?.products?.map((x: any)=>{
                            return <li onClick={()=> tabClick(x)} key={x.code}><a className={x.code===currentProduct?.code?'active':''}>{x.tabName}</a></li>
                        })}
                    </ul>
                </div>
                <div className="tab-content">
                    {currentProduct?.isReady? <div className="tab-content1">
                        <div className="container">
                            <div className="type-insurrance">
                                <div className="row">
                                    <div className="col-md-7">
                                        {currentProduct?.description}
                                    </div>
                                    <button className="btn-tx extra-tx">...Xem chi tiết</button>
                                    <button className="btn-tx short-tx">Rút gọn</button>
                                    <div className="col-md-5">
                                        <img src={currentProduct?.banner} className="pc-show" />
                                        <img src={currentProduct?.banner} className="mb-show" />
                                    </div>
                                </div>
                            </div>
                            <div className="benefit-insurrance">
                                <h2><img src={iconH22} />Quyền lợi</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div>
                                            {
                                                currentProduct?.benefit.categories?.map((x: any)=>{
                                                    return <p key={x.code}>{x.name}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            {
                                                currentProduct?.benefit?.packages?.map((x: any, index: number)=> {
                                                   return <div className="col-md-4" key={index}>
                                                        <div className={`package-insurrance ${currentProduct?.benefit?.classNameValue} ${index===0?'dong':index===1?'bac':'vang'}`}>
                                                            <h3>{x.name}</h3>
                                                            <div>
                                                                {
                                                                    x.benefits.map((xx: any, pos:number)=>{
                                                                        return <p><img
                                                                            src={index===0?require('../../resources/images/d-check.png'):index===1?require('../../resources/images/b-check.png'):require('../../resources/images/v-check.png')}/><span>{xx.value}</span>
                                                                        </p>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>})

                                                }
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className={`benefit-insurrance-mb ${currentProduct?.benefit.classNameValue}mb`}>
                                <h2><img src={iconH22} />Quyền lợi</h2>
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    {currentProduct?.benefit.packages.map((x: any)=>{
                                        return  <li onClick={()=> setCurrentPackage(x.code)} className="nav-item" role="presentation">
                                            <button className={`nav-link ${x.code===currentPackage?'active':''}`} id={x.code} data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected={x.code===currentPackage?"true":"false"}>{x.name}</button>
                                        </li>
                                    })}
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                             <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    {
                                            currentProduct?.benefit.categories.map((x: any)=> {
                                                let itemPkg = currentProduct?.benefit.packages.find((xx: any) => xx.code === currentPackage);
                                                let benefit = itemPkg.benefits.find((xx: any)=>xx.category===x.code);
                                                return <div className="row">
                                                    <div className="col-6">
                                                        <p>{x.name}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p><span>{benefit?.value}</span></p>
                                                    </div>
                                                </div>
                                            })
                                    }
                                            </div>

                                </div>
                            </div>
                            <div className="cost-info">
                                {/*<div className="row">*/}
                                {/*    <div className="col-md-8">*/}
                                {/*        <h2>Thông tin tính phí</h2>*/}
                                {/*        <label>Gói bảo hiểm</label>*/}
                                {/*        <select id="choose-insurrance">*/}
                                {/*            /!* <option value="hide">Chọn gói bảo hiểm</option> *!/*/}
                                {/*            <option value="Đồng">Đồng</option>*/}
                                {/*            <option value="Bạc">Bạc</option>*/}
                                {/*            <option value="Vàng">Vàng</option>*/}
                                {/*        </select>*/}
                                {/*        <label>Ngày hiệu lực</label>*/}
                                {/*        <input type="text" name id="effective-date" className="datepicker" defaultValue />*/}
                                {/*        <label>Thời hạn bảo hiểm</label>*/}
                                {/*        <select id="choose-insurrance">*/}
                                {/*            <option value="1 năm">1 năm</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md-4">*/}
                                {/*        <h3 className="pc-show">Phí bảo hiểm</h3>*/}
                                {/*        <p className="pc-show" style={{fontWeight: 700, fontSize: '24px', color: '#B12121', margin: '24px 0'}}>165.000 vnđ</p>*/}
                                {/*        <h3 className="mb-show">Phí bảo hiểm <span>165.000 đồng/năm </span></h3>*/}
                                {/*        <a href="dangkynha.html"><img src="images/Checkmark.svg" alt="" />Đăng ký</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="description-detail">
                                <h2><img src={iconH23} />Mô tả chi tiết<a href={currentProduct?.file} target="_blank">Quy tắc bảo hiểm <img className="icon-up2" src={iconUp2} alt="" /></a></h2>
                            </div>
                        </div>
                    </div>: <div className="tab-content3"><div className="contanier">
                        <img src={require('../../resources/images/calendar-big.png')} alt="" className="img_srm"/>
                            <p>Sản phẩm sắp ra mắt</p>
                            <br/>
                    </div></div>}
                </div>
            </div>
            {currentProduct?.isReady&&<div className="img_content"><img src={currentProduct?.detail} /></div>}
        </div>
    </MainLayout>
}
export default CategoryDetail;

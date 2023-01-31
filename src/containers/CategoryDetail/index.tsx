import {Button, Carousel, Checkbox, Col, DatePicker, Image, Input, Row, Select, Modal} from "antd";
import MainLayout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import iconScooter from '../../resources/images/scooter 1.svg';
import iconScooter2 from '../../resources/images/icon_scooter.svg';
import iconHome from '../../resources/images/icon_home.svg';
import iconCar from '../../resources/images/icon_car.svg';

import iconUp2 from '../../resources/images/icon-up2.svg';
import iconH21 from '../../resources/images/icon-h21.svg';
import iconH22 from '../../resources/images/icon-h22.svg';
import iconH23 from '../../resources/images/icon-h23.svg';
import iconCheckmark from '../../resources/images/Checkmark.png';
import lodash from "lodash";
import CarFee from "../../components/CategoryDetail/CarFee";
import {useMediaQuery} from "react-responsive";
import {formatDate, formatTime} from "../../core/helpers/date-time";
import moment from "moment";
import {
    CPID, DATA_REGISTER,
    ENSURE_CAR,
    ENSURE_ELECTRIC,
    ENSURE_EXTEND,
    ENSURE_HOUSE, ENSURE_MOTOR,
    FEE, FEE_REQUEST,
    STANDARD_DATE_FORMAT, WEBCODE_VIETTEL_STORE
} from "../../core/config";
import {localStorageSave} from "../../utils/LocalStorageUtils";
import {handleChangeDate, sign} from "../../utils/StringUtils";
import {productRepository} from "../../repositories/ProductRepository";
import M24ErrorUtils from "../../utils/M24ErrorUtils";
import {convertStringToNumber, formatMoneyByUnit, formatNumber} from "../../core/helpers/string";
import {categoryRepository} from "../../repositories/CategoryRepository";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import M24Notification from "../../utils/M24Notification";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
function CategoryDetail() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const [isDuplicateImei, setDuplicateImei] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>();
    const navigate = useNavigate();
    let {categoryId} = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const [detail, setDetail] = useState<any>();
    const [fromDate, setFromDate] = useState<string>(formatDate(moment(), STANDARD_DATE_FORMAT));
    const [currentProduct, setCurrentProduct] = useState<any>();
    const [currentPackage, setCurrentPackage] = useState<string>('');
    const [products, setProducts] = useState<any>([
        {
            code: 'transport',
            name: 'Bảo hiểm xe',
            banner: require('../../resources/images/bannerxe.png'),
            tabClassName: 'baohiemxe',
            products: [
                {
                    isReady: true,
                    code: ENSURE_MOTOR,
                    name: 'Bảo hiểm xe máy',
                    banner: require('../../resources/images/imagebaohiem4.png'),
                    tabName: 'TNDS xe máy',
                    description: <div><h2><img src={iconScooter2}/>Bảo hiểm xe máy</h2>
                        <p>Bảo hiểm xe máy bắt buộc hay bảo hiểm trách nhiệm dân sự (TNDS) xe máy là loại bảo hiểm mà
                            chủ phương tiện phải mua theo quy định của pháp luật. Nếu không tuân thủ sẽ bị cảnh sát giao
                            thông phạt từ 100.000 - 200.000 đồng/lần. Trong trường hợp không may gây tai nạn cho người
                            thứ ba (nạn nhân), người điều khiển xe máy phải tự chi trả toàn bộ chi phí để khắc phục hậu
                            quả.</p>
                        <p>Tham gia bảo hiểm TNDS xe máy của PVI ngay để đảm bảo tuân thủ quy định của pháp luật. Nếu
                            không may gây tai nạn cho người thứ ba khi điều khiển xe máy thì bảo hiểm sẽ hỗ trợ chi trả
                            bồi thường cho nạn nhân số tiền lên đến 150 triệu đồng/người/vụ với tổn thất về người và 50
                            triệu đồng/vụ với tổn thất về tài sản.</p>
                        <p>Để tự tin ra đường mà không bị phạt, bạn phải mua tối thiểu là “Gói bắt buộc”. Ngoài ra,
                            khách hàng có thể lựa chọn thêm Gói tiêu chuẩn/nâng cao để mở rộng quyền lợi cho lái xe và
                            người ngồi trên xe máy của mình với mức phí tăng thêm chỉ từ 20.000 đồng.</p>
                    </div>,
                    benefit: {
                        classNameValue: 'baohiemxemay',
                        categories: [
                            {
                                name: 'Người điều khiển xe máy gây tai nạn dẫn đến thiệt hại về sức khỏe, tính mạng cho bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ thay người điều khiển xe bồi thường cho bên thứ ba.',
                                code: '1'
                            },
                            {
                                name: 'Người điều khiển xe máy gây tai nạn dẫn đến thiệt hại về tài sản của bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ thay người điều khiển xe bồi thường cho bên thứ ba.',
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
                                        value: 'Tối đa 50 triệu đồng/vụ'
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
                                        value: 'Tối đa 50 triệu đồng/vụ'
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
                                        value: 'Tối đa 50 triệu đồng/vụ'
                                    },
                                    {
                                        category: '3',
                                        value: 'Tối đa 50 triệu đồng/người/vụ'
                                    }
                                ]
                            }
                        ]
                    },
                    detail: require('../../resources/images/baohiemxemay.jpg'),
                    file: require(`../../resources/files/QTBH/tndxemay.pdf`)

                },
                {
                    isReady: true,
                    code: ENSURE_CAR,
                    name: 'Bảo hiểm TNSD ô tô',
                    banner: require('../../resources/images/imagebaohiem2.png'),
                    tabName: 'TNDS ô tô',
                    description: <div>
                        <h2><img src={iconCar}/>Bảo hiểm TNDS ô tô</h2>
                        <p>Bảo hiểm ô tô bắt buộc hay bảo hiểm trách nhiệm dân sự (TNDS) ô tô là loại bảo hiểm mà chủ
                            phương tiện phải mua theo quy định của pháp luật. Nếu không tuân thủ, khi CSGT yêu cầu xuất
                            trình bảo hiểm, chủ xe ô tô sẽ bị phạt từ 400.000 - 600.000 đồng/lần. Trong trường hợp không
                            may gây tai nạn cho người thứ ba (nạn nhân), chủ xe phải tự chi trả toàn bộ chi phí để khắc
                            phục hậu quả.</p>
                        <p>Tham gia bảo hiểm TNDS ô tô của PVI ngay để đảm bảo tuân thủ quy định của pháp luật. Trường
                            hợp chủ xe ô tô gây tai nạn, bảo hiểm sẽ hỗ trợ chi trả cho nạn nhân số tiền lên đến 150
                            triệu đồng/người/vụ với tổn thất về người và 100 triệu đồng/vụ với tổn thất về tài sản.</p>
                        <p>Ngoài ra, Bảo hiểm PVI cung cấp thêm các gói bảo hiểm bảo vệ cho lái xe, phụ xe và người ngồi
                            trên chính xe ô tô của mình với quyền lợi là 10 triệu đồng/người/vụ (gói tiêu chuẩn) hoặc
                            100 triệu đồng/người/vụ (gói nâng cao), mức phí tăng thêm tương ứng chỉ từ 10.000 - 100.000
                            đồng.</p>

                    </div>,
                    benefit: {
                        classNameValue: 'baohiemoto',
                        categories: [
                            {
                                name: 'Người điều khiển xe ô tô gây tai nạn dẫn đến thiệt hại về sức khỏe, tính mạng cho bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ hỗ trợ bồi thường cho bên thứ ba.',
                                code: '1'
                            },
                            {
                                name: 'Người điều khiển xe ô tô gây tai nạn dẫn đến thiệt hại về tài sản của bên thứ ba (nạn nhân). Công ty bảo hiểm sẽ hỗ trợ bồi thường cho bên thứ ba.',
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
                                        value: 'Tối đa 100 triệu đồng/vụ'
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
                                        value: 'Tối đa 100 triệu đồng/vụ'
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
                                        value: 'Tối đa 100 triệu đồng/vụ'
                                    },
                                    {
                                        category: '3',
                                        value: 'Tối đa 100 triệu đồng/người/vụ'
                                    }
                                ]
                            }
                        ]
                    },
                    detail: require('../../resources/images/baohiemoto.jpg'),
                    file: require(`../../resources/files/QTBH/tndsoto.pdf`)

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
            code: 'healthy',
            name: 'Sức khỏe',
            banner: require('../../resources/images/bannersk.png'),
            tabClassName: 'baohiemsuckhoe',
            products: [
                {
                    isReady: false,
                    code: 'nguphucuuviet',
                    name: 'Ngũ phúc ưu việt',
                    banner: '',
                    tabName: 'Ngũ phúc ưu việt',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                },
                {
                    isReady: false,
                    code: 'hotronamvien',
                    name: 'Hỗ trợ nằm viện',
                    banner: '',
                    tabName: 'Hỗ trợ nằm viện',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                },
                {
                    isReady: false,
                    code: 'anphucuuviet',
                    name: 'An phúc ưu việt',
                    banner: '',
                    tabName: 'An phúc ưu việt',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                }
            ]
        },
        {
            code: 'accident',
            name: 'Tai nạn',
            banner: require('../../resources/images/banner-sp.png'),
            tabClassName: 'baohiemtainan',
            products: [
                {
                    isReady: true,
                    code: ENSURE_ELECTRIC,
                    name: 'Bảo hiểm tai nạn hộ sử dụng điện',
                    banner: require('../../resources/images/imagebaohiem1.png'),
                    tabName: 'Tai nạn hộ sử dụng điện',
                    description: <div>
                        <h2><img src={iconH21}/>Bảo hiểm tại nạn hộ sử dụng điện</h2>
                        <p>Tai nạn về điện luôn tiềm ẩn xung quanh cuộc sống sinh hoạt, làm việc của con người. Nguyên
                            nhân gây tai nạn điện có thể đến từ những bất cẩn trong quá trình sử dụng điện hoặc do thiết
                            bị điện chập cháy, dò điện. Tại Việt Nam, mỗi năm có hơn 7.000 vụ tai nạn điện và hơn 250
                            người thiệt mạng vì tai nạn điện.</p>
                        <p>Bảo hiểm tai nạn hộ sử dụng điện của PVI sẽ mang đến giải pháp cho toàn bộ gia đình của bạn.
                            Chỉ cần 1 người mua, các thành viên gia đình còn lại đều được bảo vệ. Phí chỉ từ
                            28.000đ/năm, quyền lợi lên tới 40 triệu đồng/người. </p>

                    </div>,
                    benefit: {
                        classNameValue: 'tainandien',
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
                    detail: require('../../resources/images/product-detail.png'),
                    file: require(`../../resources/files/QTBH/tainansudungdien.pdf`)

                },
                {
                    isReady: false,
                    code: 'tainancanhan',
                    name: 'Tai nạn cá nhân',
                    banner: '',
                    tabName: 'Tai nạn cá nhân',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                }
            ]
        },
        {
            code: 'asset',
            name: 'Tài sản',
            banner: require('../../resources/images/bannernha.png'),
            tabClassName: 'baohiemsuckhoe',
            products: [
                {
                    isReady: true,
                    code: ENSURE_HOUSE,
                    name: 'Bảo hiểm nhà ở toàn diện',
                    banner: require('../../resources/images/imagebaohiem3.png'),
                    tabName: 'Nhà ở toàn diện',
                    description: <div>
                        <h2><img src={iconHome}/>Bảo hiểm nhà ở toàn diện</h2>
                        <p>Để sở hữu một căn nhà, chúng ta đã phải bỏ ra hàng trăm triệu đến hàng tỷ đồng, vậy đừng chần
                            chừ khi mua thêm bảo hiểm để bảo vệ khối tài sản đó trước các rủi ro. Chỉ từ 165.000đ/năm,
                            Bảo hiểm nhà ở toàn diện PVI đem đến giải pháp tài chính để bạn luôn yên tâm bảo vệ tổ ấm
                            của mình. Bất cứ khi nào có tổn thất sảy ra với phần khung nhà hay tài sản bên trong ngôi
                            nhà, PVI sẽ đồng hành và chi trả cho bạn với mức quyền lợi lên đến 600 triệu đồng/năm.</p>

                    </div>,
                    benefit: {
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
                                name: 'Gói Đồng',
                                code: '01',
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
                                name: 'Gói Vàng',
                                code: '03',
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
                        ]
                    },
                    detail: require('../../resources/images/baohiemnhao.jpg'),
                    file: require(`../../resources/files/QTBH/nhaotoandien.pdf`)

                },
                {
                    isReady: false,
                    code: 'manhinhdienthoai',
                    name: 'Màn hình điện thoại',
                    banner: '',
                    tabName: 'Màn hình điện thoại',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                },
                {
                    isReady: true,
                    code: ENSURE_EXTEND,
                    name: 'Bảo hành mở rộng',
                    banner: require('../../resources/images/baohiemmorong.png'),
                    tabName: 'Bảo hành mở rộng',
                    description: <div>
                        <h2><img src={iconHome}/>Bảo hiểm bảo hành mở rộng</h2>
                        <p>Bảo hiểm bảo hành mở rộng (BHMR) là gói bảo hiểm gia hạn bảo hành cho các thiết bị di động,
                            thiết bị bếp, đồ gia dụng. Tham gia bảo hiểm BHMR, trong trường hợp thiết bị được bảo hiểm
                            xảy ra lỗi do Nhà sản xuất (lỗi kỹ thuật của thiết bị) gây ảnh hưởng đến việc sử dụng của
                            thiết bị, đòi hỏi phải được sửa chữa hoặc thay thế để có thể hoạt động một cách bình thường,
                            PVI sẽ chi trả chi phí sửa chữa, thay thế mới thiết bị với điều kiện thiết bị được gửi đến
                            Trung tâm bảo hành/sửa chữa được ủy quyền.</p>
                    </div>,
                    benefit: {
                        classNameValue: 'baohiemnhao',
                        content: <div>
                            <p>Bảo hiểm PVI chịu trách nhiệm bồi thường cho Chủ thiết bị được bảo hiểm các chi phí sửa
                                chữa, thay thế mới thiết bị với điều kiện thiết bị được gửi đến Trung tâm bảo hành/sửa
                                chữa được ủy quyền. Tổng chi phí sửa chữa không vượt quá giá trị thiết bị tại thời điểm
                                Khách hàng tham gia bảo hiểm.</p>
                            <p><strong>Lưu ý:</strong></p>
                            <p>- Bảo hiểm áp dụng cho thiết bị mua mới 100% có giá bán lẻ từ 1 triệu đồng trở lên tại
                                siêu thị Viettel Store.</p>
                            <p>- Thiết bị tham gia bảo hiểm phải có ít nhất 1 năm bảo hành chính hãng từ nhà sản xuất và
                                có hiệu lực bảo hành trong lãnh thổ Việt Nam.</p>
                            <p>- Tổng thời hạn bảo hiểm chính hãng và bảo hành mở rộng không quá 5 năm.</p>
                            {/*<div className="form-check text-left">*/}
                            {/*    <input className="form-check-input" type="checkbox" value={""}*/}
                            {/*           onChange={e => setKhuyenMai(e.target.checked ? 1 : 0)}/>*/}
                            {/*    <label className="form-check-label" htmlFor="flexCheckDefault">*/}
                            {/*        Chương trình mua kèm bảo hiểm rơi vỡ*/}
                            {/*        <br/><i>(Chỉ áp dụng cho Điện thoại và thời hạn bảo hiểm bảo hành mở rộng 6*/}
                            {/*        tháng)</i>*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                        </div>
                    },
                    detail: '',
                    file: require(`../../resources/files/QTBH/baohanhmorong.pdf`)

                }
            ]
        },
        {
            code: 'tralve',
            name: 'Du lịch',
            banner: require('../../resources/images/bannerdl.png'),
            tabClassName: 'baohiemdulich',
            products: [
                {
                    isReady: false,
                    code: 'dulichtrongnuoc',
                    name: 'Du lịch trong nước',
                    banner: '',
                    tabName: 'Du lịch trong nước',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                }, {
                    isReady: false,
                    code: 'dulichquocte',
                    name: 'Du lịch quốc tế',
                    banner: '',
                    tabName: 'Du lịch quốc tế',
                    description: <div></div>,
                    benefit: {
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
                    detail: '',
                    file: ''

                },
            ]
        }
    ]);
    const [fee, setFee] = useState<any>();
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
    const [devicesCategory, setDevicesCategory] = useState<any>([]);
    const [motoCategories, setMotoCategories] = useState<any>([]);
    const [formValues, setFormValues] = useState<any>(
        {loai_thietbi:'DTDD',
            thoihan_batdau_baohanh_nsx: formatDate(moment(), STANDARD_DATE_FORMAT),
            thoihan_ketthuc_baohanh_nsx: formatDate(moment().add(1,'y')),
            ngay_batdau:formatDate(moment().add(1,'y').add(1,'d'))
        }
    );
    const [khuyenMai, setKhuyenMai] = useState<number>(0);
    const keyCars = ['MayKeo', 'XeChuyenDung', 'XeChoTien', 'XePickUp', 'XeTaiVan', 'XeTapLai', 'XeBus', 'XeCuuThuong', 'Xetaxi', 'XeDauKeo'];
    const [bodyOto, setBodyOto] = useState({
        "ma_trongtai": "",
        "so_cho": "",
        "ma_mdsd": "1",
        "MayKeo": false,
        "XeChuyenDung": false,
        "XeChoTien": false,
        "XePickUp": false,
        "XeTaiVan": false,
        "XeTapLai": false,
        "XeBus": false,
        "XeCuuThuong": false,
        "Xetaxi": false,
        "XeDauKeo": false,
        "giodau": '',
        "giocuoi": '',
        "ngaydau": formatDate(moment()),
        "ngaycuoi": formatDate(moment().set('year', moment().get('year') + 1)),
        "mtn_laiphu": 0,
        "so_nguoi": "0",
        "tyle_gp_laiphu": "0",
        "philpx_nhap": "0",
        "thamgia_laiphu": false,
        "CpId": CPID,
        "Sign": ''
    });
    const categoriesCar = [
        {
            name: 'Xe chở người không KDVT',
            code: '1',
            items: [
                {name: 'Xe chở tiền', code: 'XeChoTien'},
                {name: 'Xe bán tải (pickup)', code: 'XePickUp', dependencies: ['XeTapLai']},
                {name: 'Xe tải VAN', code: 'XeTaiVan', dependencies: ['XeTapLai']},
                {name: 'Xe tập lái', code: 'XeTapLai', dependencies: ['XePickUp', 'XeTaiVan']},
            ],
        },
        {
            name: 'Xe chở người KDVT',
            code: '2',
            items: [
                {name: 'Xe bán tải (pickup)', code: 'XePickUp', dependencies: ['Xetaxi']},
                {name: 'Xe tải VAN', code: 'XeTaiVan', dependencies: ['Xetaxi']},
                {name: 'Xe bus', code: 'XeBus'},
                {name: 'Xe cứu thương', code: 'XeCuuThuong'},
                {name: 'Xe taxi', code: 'Xetaxi', dependencies: ['XePickUp', 'XeTaiVan']},
            ]
        },
        {
            name: 'Xe chở hàng',
            code: '3',
            items: [
                {name: 'Xe tập lái', code: 'XeTapLai', dependencies: ['XeDauKeo']},
                {name: 'Xe chuyên dụng khác', code: 'XeChuyenDung'},
                {name: 'Xe đầu kéo rơ mooc', code: 'XeDauKeo', dependencies: ['XeTapLai']},
                {name: 'Máy kéo, xe máy chuyên dùng', code: 'MayKeo'},
            ]
        }
    ]
    const [purpose, setPurpose] = useState<any>(categoriesCar[0]);
    useEffect(() => {
        localStorageSave('DATE', '');
        getMotoCategories();
    }, []);
    const getMotoCategories = () => {
        categoryRepository.getCategories('LOAIXEMOTOR').then(res => {
            setMotoCategories(res.Data);
        }).catch(err => {

        });
    }
    useEffect(() => {
        if (currentPackage)
            getFee();
    }, [currentPackage]);
    useEffect(() => {
        if(formValues){
            if (currentProduct?.code === ENSURE_EXTEND) {
                if (formValues?.chuong_trinh && formValues?.loai_thietbi && formValues?.giatri_thietbi)
                    getFeeExtend();
            } else if (currentProduct?.code === ENSURE_MOTOR && formValues.loai_xe) {
                getFeeMotor();
            }
            localStorageSave(DATA_REGISTER, {...formValues, giatri_thietbi: convertStringToNumber(formValues.giatri_thietbi)});
        }
    }, [formValues]);
    useEffect(() => {
        handleChangeFormValues('khuyen_mai', khuyenMai);
    }, [khuyenMai]);
    useEffect(() => {
        if (currentProduct)
            getFee();
    }, [currentProduct]);
    useEffect(() => {
        if (currentProduct?.code === ENSURE_CAR) {
            setTimeout(() => {
                getFeeTNDSOTO();
            }, 1000);
        }
    }, [bodyOto]);
    useEffect(() => {
        localStorageSave(FEE, fee);
    }, [fee]);
    const getFee = () => {
        setLoading(true);
        switch (currentProduct?.code) {
            case ENSURE_ELECTRIC:
                getFeeHSDD();
                break;
            case ENSURE_CAR:
                getFeeTNDSOTO();
                break;
            case ENSURE_HOUSE:
                getFeeHouse();
                break;
            case ENSURE_MOTOR:
                getFeeMotor();
                break;
        }
    }
    const getFeeHSDD = () => {

        let body = {
            "cpid": CPID,
            web_code: webCode,
            "sign": sign(currentPackage),
            "package": currentPackage
        };
        productRepository.getFeeHSDD(body).then(res => {
            // console.log(res);
            setFee(res);
        }).catch(err => {
            M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(() => setLoading(false));
    }
    const getFeeExtend = () => {
        let body = {
            "cpid": CPID,
            web_code: webCode,
            "sign": sign(`${formValues.chuong_trinh}${convertStringToNumber(formValues.giatri_thietbi)}${lodash.get(formValues, 'khuyen_mai', 0)}${formValues.loai_thietbi}`),
            "loai_thietbi": lodash.get(formValues, 'loai_thietbi', ''),
            "chuong_trinh": lodash.get(formValues, 'chuong_trinh', ''),
            "khuyen_mai": lodash.get(formValues, 'khuyen_mai', 0),
            "giatri_thietbi": convertStringToNumber(lodash.get(formValues, 'giatri_thietbi', '')),
        };
        productRepository.getFeeExtend(body).then(res => {
            setFee(res);
        }).catch(err => {
            // M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(() => setLoading(false));
    }
    const getFeeMotor = () => {
        if(!formValues.loai_xe) return;
        let dateStart = formatDate(moment(fromDate, 'DD/MM/YYYY').add(1, 'd'));
        let duration = formatDate(moment(fromDate, 'DD/MM/YYYY').add(1, 'd').add(1,'y'));

        let body = {
            "cpid": CPID,
            "sign": sign(`${dateStart}${duration}${lodash.get(formValues, 'loai_xe', '')}`),
            "ngay_dau": dateStart,
            "ngay_cuoi": duration,
            "loai_xe": lodash.get(formValues, 'loai_xe', ''),
            "thamgia_laiphu": currentPackage==='01'?false:true,
            muc_trachnhiem_laiphu: currentPackage==='01'?0: currentPackage==='02'?10000000:50000000,
            so_nguoi_tgia_laiphu: currentPackage==='01'?0:2,
            tyle_phi_laiphu: 0,
        };
        productRepository.getFeeMotor(body).then(res => {
            setFee({TotalFee: lodash.get(res,'phi_moto',0)+lodash.get(res,'phi_laiphu',0)});
        }).catch(err => {
            // M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(() => setLoading(false));
    }
    const canRegister = () => {
        if (loading || checkDisableRegister() || !fee|| isDuplicateImei) return false;
        return true;
    }
    const getFeeHouse = () => {
        let body = {
            "cpid": CPID,
            web_code: webCode,
            "sign": sign(currentPackage),
            "package": currentPackage
        };
        productRepository.getFeeHouse(body).then(res => {
            setFee(res);
        }).catch(err => {
            // M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(() => setLoading(false));
    }
    const checkDisableRegister = () => {
        if (currentProduct?.code === ENSURE_CAR) {
            if (!bodyOto.so_cho)
                return true;
            else if (purpose.code === '3' && !bodyOto.ma_trongtai)
                return true;
        } else if (currentProduct?.code === ENSURE_EXTEND) {
            if (!formValues?.so_serial || !formValues?.thoihan_batdau_baohanh_nsx || !formValues?.thoihan_ketthuc_baohanh_nsx||
                (khuyenMai&&(formValues.loai_thietbi!='DTDD'||formValues.chuong_trinh!=='0101')))
                return true;
            else if(moment(formValues.thoihan_ketthuc_baohanh_nsx, STANDARD_DATE_FORMAT).diff(moment(formValues.thoihan_batdau_baohanh_nsx, STANDARD_DATE_FORMAT),'years')<1)
                return true;
            return false;
        }else if(currentProduct?.code === ENSURE_MOTOR){
            if(!formValues?.loai_xe)
                return true;
        }
        return false;
    }
    const getFeeTNDSOTO = () => {
        let body: any = lodash.cloneDeep(bodyOto);
        if (currentPackage != '01') {
            body.thamgia_laiphu = true;
            if (currentPackage === '02')
                body.mtn_laiphu = 10000000;
            else body.mtn_laiphu = 100000000;
        } else {
            body.thamgia_laiphu = false;
            body.mtn_laiphu = 0;
        }
        body.web_code = webCode;
        body.so_nguoi = body.so_cho;
        body.giodau = formatTime(moment());
        body.giocuoi = formatTime(moment());
        body.Sign = sign(`${body.ma_trongtai}${body.so_cho}`);
        if (checkDisableRegister()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        localStorageSave(FEE_REQUEST, body);
        productRepository.getFeeTNDSOTO(body).then(res => {
            body.ma_loaixe = res.ma_loaixe;
            localStorageSave(FEE_REQUEST, body);
            setFee(res);
        }).catch(err => {
            // M24ErrorUtils.showError('Xảy ra lỗi. Vui lòng thử lại');
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        // let category = products.find((x: any) => x.code === categoryId);
        let category = products.find((x: any) => x.code === 'asset');
        if (category) {
            // console.log('category: ',category);
            if (webCode===WEBCODE_VIETTEL_STORE){
                category.products = category.products.filter((x: any)=> x.code==='baohanhmorong');
            }else
                category.products = category.products.filter((x: any)=> x.code!=='baohanhmorong');
            setDetail(category);
            // let productId = searchParams.get('productId');
            let productId = 'baohanhmorong';
            let product: any;
            if (productId) {
                product = category.products.find((x: any) => x.code === productId);
            }
            if (!product) product = category.products[0];
            setCurrentProduct(product);
            if (product.code !== ENSURE_EXTEND)
                setCurrentPackage(product?.benefit?.packages[0]?.code);
            else getDevicesCategory();
        }

    }, []);
    const getDevicesCategory = () => {
        categoryRepository.getCategories('THIETBI_DT').then(res => {
            setDevicesCategory(res.Data)
        }).catch(err => {

        });
    }
    const tabClick = (data: any) => {
        setFee(null);
        setCurrentProduct(data);
        if (data.code === ENSURE_EXTEND) getDevicesCategory();
        else {
            if (data.isReady)
                setCurrentPackage(data?.benefit?.packages[0]?.code);
        }
        setSearchParams({productId: data.code});
    }
    const handleChangePackage = (value: any) => {
        setCurrentPackage(value);
        setFee(null);
    }
    const handleChangeFormValues = (key: string, value: any) => {
        let temp = lodash.cloneDeep(formValues)||{};
        temp[key] = value;
        if(key==='thoihan_batdau_baohanh_nsx'){
            temp.thoihan_ketthuc_baohanh_nsx=formatDate(moment(temp.thoihan_batdau_baohanh_nsx,STANDARD_DATE_FORMAT).add(1,'y'));
            if(temp.chuong_trinh&&temp.thoihan_ketthuc_baohanh_nsx)
            {
                temp.ngay_batdau=formatDate(moment(temp.thoihan_ketthuc_baohanh_nsx,STANDARD_DATE_FORMAT).add(1,'d'));
                let duration = formatDate(moment(temp.ngay_batdau,STANDARD_DATE_FORMAT).add(temp.chuong_trinh === '0101' ? 6 :temp.chuong_trinh === '0102' ? 12: 24, 'months'));
                temp.thoihan_bh = duration;
            }
        }
        else if (key === 'thoihan_ketthuc_baohanh_nsx'||key === 'chuong_trinh') {
            if(temp.chuong_trinh&&temp.thoihan_ketthuc_baohanh_nsx)
            {
                temp.ngay_batdau=formatDate(moment(temp.thoihan_ketthuc_baohanh_nsx,STANDARD_DATE_FORMAT).add(1,'d'));
                let duration = formatDate(moment(temp.ngay_batdau,STANDARD_DATE_FORMAT).add(temp.chuong_trinh === '0101' ? 6 :temp.chuong_trinh === '0102' ? 12: 24, 'months'));
                temp.thoihan_bh = duration;
            }
        }
        // console.log(temp);
        setFormValues(temp);
    }
    const handleChange = (value: any) => {
        let item = categoriesCar.find((x: any) => x.code === value);
        setPurpose(item);
        let body = lodash.cloneDeep(bodyOto);
        body.ma_mdsd = value;
        keyCars.map((x: string) => {
            // @ts-ignore
            body[x] = false;
        });
        setBodyOto(body);
        setFee(null);
    }
    const getProductName = () => {
        switch (currentProduct?.code) {
            case ENSURE_ELECTRIC:
                return 'Bảo hiểm tại nạn hộ sử dụng điện';
            case ENSURE_CAR:
                return 'Bảo hiểm ô tô PVI';
            case ENSURE_HOUSE:
                return 'Bảo hiểm nhà ở toàn diện';
        }
    }
    const changeTypeCar = (checked: boolean, code: string) => {
        let body = lodash.cloneDeep(bodyOto);
        // @ts-ignore
        body[code] = checked;
        keyCars.map((x: string) => {
            if (x !== code) {
                // @ts-ignore
                body[x] = false;
            }
        });
        // let item = purpose.items.find((x: any) => x.code === code);
        // if (!item.dependencies) {
        //     keyCars.map((x: string) => {
        //         if (x !== code) {
        //             // @ts-ignore
        //             body[x] = false;
        //         }
        //     });
        // } else {
        //     keyCars.map((x: string) => {
        //         if (!item.dependencies.includes(x) && x !== code) {
        //             // @ts-ignore
        //             body[x] = false;
        //         }
        //     });
        // }
        setBodyOto(body);
    }
    const changeValueCar = (key: string, value: any) => {
        let body = lodash.cloneDeep(bodyOto);
        value = value.replace(/[^\d]/g, '');
        // @ts-ignore
        body[key] = value;
        setBodyOto(body);
    }
    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current <= moment().endOf('day');
    }
    const onChangeDate = (date: any, dateString: string) => {
        // console.log(date, dateString);
        setFromDate(dateString);
        localStorageSave('DATE', dateString);
    }
    const onSearchIMEI=()=>{
        if(!formValues?.so_serial) return;
        setDuplicateImei(false);
        productRepository.searchOrderByImei({imei: formValues?.so_serial}, webCode).then(res=>{
            if(Array.isArray(res)&&res.length>0){
                // M24Notification.notifyError('Thông báo', 'Trùng IMEI');
                confirm({
                    title: 'Thông báo',
                    icon: <ExclamationCircleOutlined />,
                    content: <span className={'txt-size-h1 txt-color-red'}>{`IMEI/Serial này đã được cấp bảo hiểm ngày ${res[0].ngay_ctu}`}</span>,
                   okText:'Đồng ý',
                    cancelText:'Đóng'
                });
                setDuplicateImei(true);
            }
        }).catch(err=>{

        })
    }
    const renderFeeCar = () => {
        return <div className={'txt-left'}>
            <label>Gói bảo hiểm</label>
            <Select value={currentPackage} onChange={handleChangePackage} className={'width100'}>
                {currentProduct?.benefit.packages.map((x: any) => <Select.Option
                    value={x.code}>{x.name}</Select.Option>)}
            </Select>
            <label>Ngày hiệu lực</label>
            <DatePicker  allowClear={false} disabledDate={disabledDate} defaultValue={moment(moment().add(1,'d'), STANDARD_DATE_FORMAT)}
                        suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                        format={STANDARD_DATE_FORMAT} onChange={onChangeDate}/>
            <label>Thời hạn bảo hiểm</label>
            <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                <Select.Option value="1">1 năm</Select.Option>
            </Select>
            <label>Mục đích sử dụng</label>
            <Select value={lodash.get(purpose, 'code', undefined)} onChange={handleChange} className={'width100'}>
                {categoriesCar.map((x: any, index: number) => {
                    return <Select.Option value={x.code}>{x.name}</Select.Option>
                })}
            </Select>

            <label><span className={'txt-color-red'}>* </span>Số chỗ ngồi</label>
            <Input onChange={(e) => changeValueCar('so_cho', e.target.value)} value={bodyOto.so_cho}></Input>

            {purpose && purpose.code === '3' &&
                <Col span={24} className={'mgt10'}>
                    <label><span className={'txt-color-red'}>* </span>Trọng tải (kg)</label>
                    <Input onChange={(e) => changeValueCar('ma_trongtai', e.target.value)}
                           value={bodyOto.ma_trongtai}></Input>
                </Col>
            }
            <Row gutter={8} className={'mgt20 justify-content-start'}>
                {
                    purpose && purpose.items.map((x: any, index: number) => {
                        // let disable=false;
                        // if(bodyOto.XeTapLai&&x.code!=='XePickUp'&&x.code!=='XeTaiVan')
                        //     disable=true;
                        return <Col span={12} className={''}>
                            <Checkbox checked={lodash.get(bodyOto, x.code, false)}
                                      onChange={(e) => changeTypeCar(e.target.checked, x.code)}>{x.name}</Checkbox>
                        </Col>
                    })
                }
            </Row>
        </div>
    }
    const renderFeeElectric = () => {
        return <div className={'txt-left'}>
            <label>Gói bảo hiểm</label>
            <Select value={currentPackage} onChange={handleChangePackage} className={'width100'}>
                {currentProduct?.benefit.packages.map((x: any) => <Select.Option
                    value={x.code}>{x.name}</Select.Option>)}
            </Select>
            <label>Ngày hiệu lực</label>
            <DatePicker  allowClear={false} disabledDate={disabledDate} defaultValue={moment(moment().add(1,'d'), STANDARD_DATE_FORMAT)}
                        suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                        format={STANDARD_DATE_FORMAT} onChange={onChangeDate}/>
            <label>Chu kỳ thanh toán</label>
            <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                <Select.Option value="1">1 năm</Select.Option>
            </Select>

        </div>
    }
    const renderFeeMotor = () => {
        return <div className={'txt-left'}>
            <label>Gói bảo hiểm</label>
            <Select value={currentPackage} onChange={handleChangePackage} className={'width100'}>
                {currentProduct?.benefit.packages.map((x: any) => <Select.Option
                    value={x.code}>{x.name}</Select.Option>)}
            </Select>
            <label>Ngày hiệu lực</label>
            <DatePicker allowClear={false} disabledDate={disabledDate} defaultValue={moment(moment().add(1,'d'), STANDARD_DATE_FORMAT)}
                        suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                        format={STANDARD_DATE_FORMAT} onChange={onChangeDate}/>
            <label>Thời hạn bảo hiểm</label>
            <Select defaultValue="1" onChange={handleChange} className={'width100'}>
                <Select.Option value="1">1 năm</Select.Option>
            </Select>
            <label>Loại xe</label>
            <Select value={lodash.get(formValues, 'loai_xe', undefined)}
                    onChange={(value) => handleChangeFormValues('loai_xe', value)} className={'width100'}>
                {motoCategories.map((x: any, index: number) => {
                    return <Select.Option value={x.Value}>{x.Text}</Select.Option>
                })}
            </Select>
        </div>
    }
    const checkTIVI=()=>{
        let items = ['TIVI','MS',
            'MG',
            'TUD',
            'TUM',
            'MDH','TLANH'];
        return items.includes(formValues?.loai_thietbi);
    }
    const renderExtend = () => {
        return <div className={'txt-left'}>
            <label>Loại thiết bị</label>
            <Select className={'width100'} value={lodash.get(formValues, 'loai_thietbi', '')}
                    onChange={(value: string) => handleChangeFormValues('loai_thietbi', value)}>
                {
                    devicesCategory?.map((x: any) => <Select.Option value={x.Value}>{x.Text}</Select.Option>)
                }
            </Select>
            <label>Hãng</label>
            <Input placeholder="Ví dụ: Apple" onChange={e => handleChangeFormValues('hang', e.target.value)}/>
            <label>Model</label>
            <Input placeholder="Ví dụ: Iphone 13" onChange={e => handleChangeFormValues('model', e.target.value)}/>
            <label>Số Serial/IMEI</label>
            <Input onBlur={onSearchIMEI} onChange={e => handleChangeFormValues('so_serial', e.target.value)}/>
            {/*<label>Số IMEI</label>*/}
            {/*<Input onChange={e => handleChangeFormValues('so_IMEI', e.target.value)}/>*/}
            <label>Thời hạn bảo hành gốc của nhà sản xuất</label>
            <div className="row">
                <div className="col-md-6">
                    <label>Ngày bắt đầu</label>
                    <DatePicker
                        suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                        format={STANDARD_DATE_FORMAT}
                        disabled
                        value={formValues.thoihan_batdau_baohanh_nsx?moment(formValues.thoihan_batdau_baohanh_nsx, STANDARD_DATE_FORMAT):null}
                        onChange={(date: any, dateString: string) => handleChangeFormValues('thoihan_batdau_baohanh_nsx', dateString)}/>
                </div>
                <div className="col-md-6">
                    <label>Ngày hết hạn</label>
                    <DatePicker
                        suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'}
                        format={STANDARD_DATE_FORMAT}
                        value={formValues.thoihan_ketthuc_baohanh_nsx?moment(formValues.thoihan_ketthuc_baohanh_nsx, STANDARD_DATE_FORMAT):null}

                        onChange={(date: any, dateString: string) => handleChangeFormValues('thoihan_ketthuc_baohanh_nsx', dateString)}/>
                </div>
            </div>
            <label>Thời hạn bảo hiểm bảo hành mở rộng</label>
            <Select disabled={!formValues?.loai_thietbi} className={'width100'} value={lodash.get(formValues, 'chuong_trinh', '')}
                    onChange={value => handleChangeFormValues('chuong_trinh', value)}>
                {!checkTIVI()&&<Select.Option value={'0101'}>6 tháng</Select.Option>}
                <Select.Option value={'0102'}>12 tháng</Select.Option>
                {checkTIVI()&&<Select.Option value={'0103'}>2 năm</Select.Option>}
            </Select>
            <label>Giá trị thiết bị tại thời điểm tham gia bảo hiểm (VNĐ)</label>
            <Input value={formatNumber(formValues?.giatri_thietbi)} placeholder="Ví dụ: 2100000"
                   onChange={e => handleChangeFormValues('giatri_thietbi', e.target.value)}/>
            {/*<Checkbox checked={formValues?.khuyen_mai} onChange={e=> handleChangeFormValues('khuyen_mai', e.target.checked?1:0)}>Khuyến mại</Checkbox>*/}
        </div>
    }
    const renderFee = () => {
        switch (currentProduct.code) {
            case ENSURE_CAR:
                return renderFeeCar();
            case ENSURE_ELECTRIC:
            case ENSURE_HOUSE:
                return renderFeeElectric();
            case ENSURE_EXTEND:
                return renderExtend();
            case ENSURE_MOTOR:
                return renderFeeMotor();
        }
    }
    return <MainLayout showLogoViettel={currentProduct?.code === ENSURE_EXTEND ? true : false} isDetail={true}
                       showProgressBar={showProgressBar}
                       title={lodash.get(currentProduct, 'name', 'Chi tiết sản phẩm')}>
        <div className="banner">
            <img src={detail?.banner} style={{width: '100%'}}/>
            <h1>{detail?.name}</h1>
        </div>
        <div>
            <div className="content">
                <div className={`menu-tab ${detail?.tabClassName}`}>
                    <ul>
                        {detail?.products?.map((x: any) => {
                            return <li onClick={() => tabClick(x)} key={x.code}><a
                                className={x.code === currentProduct?.code ? 'active' : ''}>{x.tabName}</a></li>
                        })}
                    </ul>
                </div>
                <div className="tab-content">
                    {currentProduct?.isReady ? <div className="tab-content1">
                        <div className="container">
                            <div className="type-insurrance">
                                <div className="row">
                                    <div className="col-md-7">
                                        {currentProduct?.description}
                                    </div>
                                    <button className="btn-tx extra-tx">...Xem chi tiết</button>
                                    <button className="btn-tx short-tx">Rút gọn</button>
                                    <div className="col-md-5">
                                        <img src={currentProduct?.banner} className="pc-show"/>
                                        <img src={currentProduct?.banner} className="mb-show"/>
                                    </div>
                                </div>
                            </div>
                            <div className="benefit-insurrance">
                                <h2><img src={iconH22}/>Quyền lợi</h2>
                                {currentProduct && currentProduct.code !== 'baohanhmorong' ? <div className="row">
                                        <div className="col-md-4">
                                            <div>
                                                {
                                                    currentProduct?.benefit?.categories?.map((x: any) => {
                                                        return <p key={x.code}>{x.name}</p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                {
                                                    currentProduct?.benefit?.packages?.map((x: any, index: number) => {
                                                        return <div className="col-md-4" key={index}>
                                                            <div
                                                                className={`package-insurrance ${currentProduct?.benefit?.classNameValue} ${index === 0 ? 'dong' : index === 1 ? 'bac' : 'vang'}`}>
                                                                <h3>{x.name}</h3>
                                                                <div>
                                                                    {
                                                                        x?.benefits.map((xx: any, pos: number) => {
                                                                            return <p><img
                                                                                src={index === 0 ? require('../../resources/images/d-check.png') : index === 1 ? require('../../resources/images/b-check.png') : require('../../resources/images/v-check.png')}/><span>{xx.value}</span>
                                                                            </p>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })

                                                }
                                            </div>


                                        </div>
                                    </div> :
                                    <div className={'baohiembaohanhmorong'}>{currentProduct?.benefit?.content}</div>
                                }
                            </div>
                            {currentProduct && currentProduct.code !== 'baohanhmorong' &&
                                <div className={`benefit-insurrance-mb ${currentProduct?.benefit?.classNameValue}mb`}>
                                    <h2><img src={iconH22}/>Quyền lợi</h2>
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        {currentProduct?.benefit?.packages.map((x: any) => {
                                            return <li onClick={() => setCurrentPackage(x.code)} className="nav-item"
                                                       role="presentation">
                                                <button
                                                    className={`nav-link ${x.code === currentPackage ? 'active' : ''}`}
                                                    id={x.code} data-bs-toggle="pill" data-bs-target="#pills-home"
                                                    type="button" role="tab" aria-controls="pills-home"
                                                    aria-selected={x.code === currentPackage ? "true" : "false"}>{x.name}</button>
                                            </li>
                                        })}
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                             aria-labelledby="pills-home-tab">
                                            {
                                                currentProduct?.benefit?.categories?.map((x: any) => {
                                                    let itemPkg = currentProduct?.benefit?.packages?.find((xx: any) => xx.code === currentPackage);
                                                    let benefit = itemPkg?.benefits?.find((xx: any) => xx.category === x.code);
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
                                </div>}
                            <div className="cost-info">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h2>Thông tin tính phí</h2>
                                        {renderFee()}
                                    </div>
                                    <div className="col-md-4">
                                        <h3 className="pc-show">Phí bảo hiểm</h3>
                                        <p className="pc-show" style={{
                                            fontWeight: 700,
                                            fontSize: '24px',
                                            color: '#B12121',
                                            margin: '24px 0'
                                        }}>{formatMoneyByUnit(lodash.get(fee, 'TotalFee', ''))}</p>
                                        <h3 className="mb-show">Phí bảo
                                            hiểm <span>{formatMoneyByUnit(lodash.get(fee, 'TotalFee', ''))}</span></h3>
                                        <a onClick={() => {
                                            if (canRegister())
                                                navigate(currentProduct?.code === ENSURE_EXTEND ? `/products/${currentProduct?.code}/register` : `/products/${currentProduct?.code}/register?packageCode=${currentPackage}${currentProduct?.code === ENSURE_CAR ? `&purpose=${purpose.code}` : ''}`)
                                        }}>{canRegister() && <img src={iconCheckmark} alt=""/>}Đăng ký</a>
                                    </div>
                                </div>
                            </div>
                            <div className="description-detail">
                                <h2><img src={iconH23}/>Mô tả chi tiết{currentProduct?.file &&
                                    <a href={currentProduct?.file} target="_blank">Quy tắc bảo hiểm <img
                                        className="icon-up2" src={iconUp2} alt=""/></a>}</h2>
                            </div>
                        </div>
                    </div> : <div className="tab-content3">
                        <div className="contanier">
                            <img src={require('../../resources/images/calendar-big.png')} alt="" className="img_srm"/>
                            <p>Sản phẩm sắp ra mắt</p>
                            <br/>
                        </div>
                    </div>}
                </div>
            </div>
            {currentProduct?.isReady && <div className="img_content"><img className={'imgContent'} src={currentProduct?.detail}/></div>}
        </div>
    </MainLayout>
}

export default CategoryDetail;

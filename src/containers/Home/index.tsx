import {Avatar, Button, Card, Carousel, Col, Image, Row} from "antd";
import MainLayout from "../../components/Layout";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './styles.scss';
import {ENSURE_CAR, ENSURE_ELECTRIC, ENSURE_HOUSE} from "../../core/config";
import {useMediaQuery} from "react-responsive";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

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
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/3403ac1e-069d-49bd-859c-879789be7f48.png'
                },
                {
                    name: 'TNDS ô tô',
                    id:ENSURE_CAR,
                    logo: require(isDesktopOrLaptop?'../../resources/images/car.jpg':'../../resources/images/mobile-car.png')
                },
                {
                    name: 'Thân vỏ ô tô',
                    id:'than_oto',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/77614a36-c2a6-4393-8f18-eab81551204f.png'
                }
            ]
        },
        {
            name: 'Bảo hiểm sức khỏe',
            items: [
                {
                    name: 'Hỗ trợ nằm viện',
                    id:'hotronamvien',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/c9cb6614-2207-4a47-a02a-45b87e255f40.jpg'
                }, {
                    name: 'Ngũ phúc ưu việt',
                    id:'nguphucuuviet',
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/c9cb6614-2207-4a47-a02a-45b87e255f40.jpg'
                }, {
                    name: 'An phúc ưu việt',
                    id:'anphucuuviet',
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
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/fffb2a2a-f87c-4bf3-a62c-3da8f71b9eef.jpg'
                },
                {
                    name: 'Tai nạn hộ sử dụng điện',
                    id:ENSURE_ELECTRIC,
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
                    logo: require(isDesktopOrLaptop?'../../resources/images/house.jpg':'../../resources/images/mobile-house.png')
                },
                {
                    name: 'Màn hình điện thoại',
                    id:'manhinhdienthoai',
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
                    logo: 'https://baohiem.viettelpay.vn/client-assets/images/category/Du%20l%E1%BB%8Bch.Jpg'
                },
                {
                    name: 'Du lịch quốc tế',
                    id:'dulichquocte',
                    logo: 'https://baohiem.viettelpay.vn/client-assets/images/category/Du%20l%E1%BB%8Bch.Jpg'
                }
            ]
        }
    ]
    const banners=[
        {
            image:'https://baohiem.viettelpay.vn/client-assets/images/category/Xe.jpg',
            url:'http://www.pvi.com.vn/index.html'
        }, {
            image:'https://baohiem.viettelpay.vn/client-assets/images/category/S%E1%BB%A9c%20kh%E1%BB%8Fe.jpg',
            url:'http://www.pvi.com.vn/index.html'
        }, {
            image:'https://baohiem.viettelpay.vn/client-assets/images/category/Tai%20n%E1%BA%A1n.jpg',
            url:'http://www.pvi.com.vn/index.html'
        }, {
            image:'https://baohiem.viettelpay.vn/client-assets/images/category/T%C3%A0i%20s%E1%BA%A3n.jpg',
            url:'http://www.pvi.com.vn/index.html'
        }
    ]
    const renderItem = (item: any) => {
        if(isDesktopOrLaptop)
        return <Card className={'mgt20'}>
            <span className={'robotobold txt-size-h6'}>{item.name}</span>
            <Row gutter={8} className={'justify-content-center mgt20'}>
                {item.items.map((x: any) => {
                    // return <div className="hot-product__item">
                    //     <div className="article " data-type="data1">
                    //         <div className="article__tag">
                    //             <span>Hot</span>
                    //         </div>
                    //         <picture className="article__picture">
                    //             <a
                    //             href="/ProductClient?productId=18f08498-987c-4a60-a770-ac0b813b42c8"><img
                    //             className="article__picture--img lazy loaded"
                    //             data-src="\filepath\files\products\f1234db6-cbad-4743-9bde-0df271402a88.png"
                    //             alt="Bảo hiểm màn hình điện thoại Bảo Việt"
                    //             src={x.logo}
                    //             data-was-processed="true"/>
                    //             </a>
                    //             </picture>
                    //         <div className="article__content">
                    //             <h5 className="article__content--title"><a tabIndex={0}
                    //                                                        href="/ProductClient?productId=18f08498-987c-4a60-a770-ac0b813b42c8">Bảo
                    //                 hiểm màn hình điện thoại Bảo Việt</a></h5>
                    //             <div className="article__content--price-picture">
                    //                 <span className="article__content--price">Từ 8.000 đ</span>
                    //                 <div className="picture">
                    //                     <img className="lazy loaded"
                    //                                               data-src="\filepath\images\Provider\00036b4a-372a-4520-92d8-86731c6540d8.png"
                    //                                               alt="Bảo hiểm màn hình điện thoại Bảo Việt"
                    //                                               src="\filepath\images\Provider\00036b4a-372a-4520-92d8-86731c6540d8.png"
                    //                                               data-was-processed="true"/>
                    //                     </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>;
                    return <Col onClick={()=> navigate(`/products/${x.id}`)} className={'cursor-pointer article'} span={6}>

                                 <div className="article__tag">
                                     <span>Hot</span>
                                </div>
                        <div className={'article__picture'}>
                            <Image preview={false} src={x.logo} height={200} width={300}></Image>
                        </div>
                        <div className={'article__content'}>
                          <span className={'robotobold txt-color-red txt-size-h4'}>{x.name}</span>
                          <Row>
                              <span className={'robotobold txt-color-black txt-size-h6 mgt5'}>{'Từ 8.000đ'}</span>
                          </Row>
                        </div>
                    </Col>
                })}
            </Row>
        </Card>
       else return <Card className={'mgt20'}>
            <span className={'robotobold txt-size-h6'}>{item.name}</span>
            <Row className={'justify-content-center mgt20'}>
                {item.items.map((x: any) => {
                    return <Col onClick={()=> navigate(`/products/${x.id}`)} className={'cursor-pointer'} span={8}>
                        <Row className={'justify-content-center'}><Image src={x.logo} width={50}  preview={false}></Image></Row>
                        <Row className={'justify-content-center txt-size-h7'}>
                            <span className={'mgt10 txt-center'}>{x.name}</span>
                        </Row>
                    </Col>
                })}
            </Row>
        </Card>
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <Carousel autoplay arrows={true} prevArrow={<LeftOutlined size={isDesktopOrLaptop?70:50} />} nextArrow={<RightOutlined size={isDesktopOrLaptop?70:50} />}>
                {
                    banners.map((x: any, index: number)=>{
                        return  <div className={'cursor-pointer'} onClick={()=> window.open(x.url,'_blank')} key={index}>
                            <Image width={'100%'} preview={false} src={x.image}></Image>
                        </div>
                    })
                }
            </Carousel>
            <div className={'main-content'}>
                {
                    categories.map((category: any) => renderItem(category))
                }
            </div>

        </div>
    </MainLayout>
}

export default Home;

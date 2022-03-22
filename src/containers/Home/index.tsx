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
            <span className={'robotobold txt-size-h6'}>{item.name}</span>
            <Row gutter={16} className={'justify-content-center mgt20'}>
                {item.items.map((x: any) => {
                    return <Col onClick={()=> navigate(`/products/${x.id}`)} className={'cursor-pointer article'} span={8}>

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
            <Carousel autoplay arrows={true} prevArrow={<LeftOutlined size={isDesktopOrLaptop?70:50} />} nextArrow={<RightOutlined size={isDesktopOrLaptop?70:50} />}>
                {
                    banners.map((x: any, index: number)=>{
                        return  <div className={'cursor-pointer'}  onClick={()=> navigate(`/products/${x.id}`)} key={index}>
                            {isDesktopOrLaptop?<Image width={'100%'} preview={false} src={x.banner}></Image>:<Image width={'100%'} preview={false} src={x.bannerMobile}></Image>}
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

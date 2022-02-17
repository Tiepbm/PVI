import {Avatar, Button, Card, Carousel, Col, Row} from "antd";
import MainLayout from "../../components/Layout";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../../hooks";
import {ENSURE_CAR, ENSURE_ELECTRIC, ENSURE_HOUSE} from "../../core/config";

function Home() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const navigate = useNavigate();
    const {width, height} = useWindowDimensions();
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
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/77614a36-c2a6-4393-8f18-eab81551204f.png'
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
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/95568d8a-68df-4939-8519-08ac2ae55b1e.jpg'
                }
            ]
        },
        {
            name: 'Bảo hiểm tài sản',
            items: [
                {
                    name: 'Nhà ở toàn diện',
                    id:ENSURE_HOUSE,
                    logo: 'https://baohiem.viettelpay.vn/filepath/files/products/31a3a17d-21a0-4326-925d-4f63e3c82b99.png'
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
    const renderItem = (item: any) => {

        return <Card className={'mgt20'}>
            <span className={'robotobold txt-size-h6'}>{item.name}</span>
            <Row className={'justify-content-center mgt20'}>
                {item.items.map((x: any) => {
                    return <Col onClick={()=> navigate(`/products/${x.id}`)} className={'cursor-pointer'} span={6}>
                        <Row className={'justify-content-center'}><Avatar src={x.logo} size={150}></Avatar></Row>
                        <Row className={'justify-content-center txt-size-h6'}><span className={'mgt10'}>{x.name}</span></Row>
                    </Col>
                })}
            </Row>
        </Card>
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <Carousel autoplay>
                <div>
                    <img className={'width100'}  src={'https://baohiem.viettelpay.vn/client-assets/images/category/Xe.jpg'}></img>
                </div>
                <div>
                    <img className={'width100'} src={'https://baohiem.viettelpay.vn/client-assets/images/category/S%E1%BB%A9c%20kh%E1%BB%8Fe.jpg'}></img>
                </div>
                <div>
                    <img className={'width100'} src={'https://baohiem.viettelpay.vn/client-assets/images/category/Tai%20n%E1%BA%A1n.jpg'}></img>
                </div>
                <div>
                    <img className={'width100'}
                        src={'https://baohiem.viettelpay.vn/client-assets/images/category/T%C3%A0i%20s%E1%BA%A3n.jpg'}></img>
                </div>
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

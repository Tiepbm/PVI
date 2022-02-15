import {Button, Carousel, Col, Image, Row} from "antd";
import MainLayout from "../../components/Layout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CategoryDetail(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const navigate = useNavigate();

    const [products, setProducts] = useState<any>([
        {id: 1, name:'Bảo hiểm Xe máy', img:'https://baohiem.viettelpay.vn/filepath/files/products/fffb2a2a-f87c-4bf3-a62c-3da8f71b9eef.jpg'},
        {id: 2, name:'Bảo hiểm Oto', img:'https://baohiem.viettelpay.vn/filepath/files/products/95568d8a-68df-4939-8519-08ac2ae55b1e.jpg'},
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

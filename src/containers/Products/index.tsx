import {Button, Carousel} from "antd";
import MainLayout from "../../components/Layout";
import {useState} from "react";

function Products(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <Carousel autoplay>
                <div>
                    <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/Xe.jpg'}></img>
                </div>
                <div>
                    <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/S%E1%BB%A9c%20kh%E1%BB%8Fe.jpg'}></img>
                </div>
                <div>
                    <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/Tai%20n%E1%BA%A1n.jpg'}></img>
                </div>
                <div>
                    <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/T%C3%A0i%20s%E1%BA%A3n.jpg'}></img>
                </div>
            </Carousel>
        </div>
    </MainLayout>
}
export default Products;

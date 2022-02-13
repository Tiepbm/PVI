import React, {useState} from 'react';
import MainLayout from "../../components/Layout";
import {Carousel} from "antd";

function Healthy(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/Xe.jpg'}></img>
        </div>
    </MainLayout>
};
export default Healthy;

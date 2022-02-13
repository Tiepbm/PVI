import React, {useState} from 'react';
import MainLayout from "../../components/Layout";
import {Carousel} from "antd";

function Vehicle(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    return <MainLayout showProgressBar={showProgressBar} title={'Danh mục sản phẩm'}>
        <div>
            <img src={'https://baohiem.viettelpay.vn/client-assets/images/category/Tai%20n%E1%BA%A1n.jpg'}></img>
        </div>
    </MainLayout>
};
export default Vehicle;

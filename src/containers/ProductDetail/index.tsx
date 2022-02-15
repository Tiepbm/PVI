import React, {useState} from 'react';
import MainLayout from "../../components/Layout";
import {Button, Carousel, Col, Row} from "antd";
const MIN_HEIGHT=100;
function ProductDetail(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const [currentPackage, setCurrentPackage] = useState<string>('basic');
    return <MainLayout showProgressBar={showProgressBar} title={'Chi Tiết Sản Phẩm'}>
        <div className={'mgbt20 mgt1'}>
            <img src={'https://baohiem.viettelpay.vn/filepath/files/products/c61b2398-bac6-41f7-9547-537f81840bff.png'}></img>
        </div>
        <div className={'main-content'}>
                <span className={'txt-size-h5'}>Theo thống kê, trung bình mỗi năm ở nước ta có khoảng hơn 7.000 vụ tai nạn điện và hơn 250 người chết vì tai nạn điện. Con số này vẫn chưa dừng lại và còn tiếp tục gia tăng vì sự bất cẩn của người sử dụng điện. Với bảo hiểm tai nạn hộ sử dụng điện, chỉ cần 1 người mua, cả hộ gia đình cùng được bảo vệ. Bảo hiểm không chỉ giới hạn trong phạm vi nơi ở mà còn mở rộng ra bất cứ đâu </span>
            <Row><span className={'robotobold txt-size-h4 mgt20 mgbt20'}>Thông tin quyền lợi</span></Row>
            <Row>
                <Col span={6} className={'mgr2'}>
                </Col>
                <Col span={5} className={`${currentPackage==='basic'?'bd-color-blue bd1px':''} bg-color-gray border-top-radius`}>
                    <div onClick={()=> setCurrentPackage('basic')} style={{ height:50}} className={`${currentPackage==='basic'?'bg-color-blue':'bg-color-blue3'} border-top-radius width100 dpl-flex align-items-center justify-content-center cursor-pointer`}>
                        <span className={`${currentPackage==='basic'?'txt-color-white':'txt-color-black'} robotobold txt-size-h6`}>Gói cơ bản</span>
                    </div>
                </Col>
                <Col span={5} className={`${currentPackage==='standard'?'bd-color-blue bd1px':''} bg-color-gray border-top-radius mgr2 mgl2`}>
                    <div onClick={()=> setCurrentPackage('standard')} style={{ height:50}} className={`${currentPackage==='standard'?'bg-color-blue':'bg-color-blue3'} border-top-radius width100 dpl-flex align-items-center justify-content-center cursor-pointer`}>
                        <span className={`${currentPackage==='standard'?'txt-color-white':'txt-color-black'} robotobold txt-size-h6`}>Gói tiêu chuẩn</span>
                    </div>
                </Col>
                <Col span={5} className={`${currentPackage==='advance'?'bd-color-blue bd1px':''} bg-color-gray border-top-radius`}>
                    <div onClick={()=> setCurrentPackage('advance')} style={{ height:50}} className={`${currentPackage==='advance'?'bg-color-blue':'bg-color-blue3'} border-top-radius width100 dpl-flex align-items-center justify-content-center cursor-pointer`}>
                        <span className={`${currentPackage==='advance'?'txt-color-white':'txt-color-black'} robotobold txt-size-h6`}>Gói nâng cao</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={6} className={'bg-color-gray mgr2 pd10'}>
                     <span className={'txt-size-h6 '}>
                            Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.
                        </span>
                </Col>
                <Col span={5} className={`${currentPackage==='basic'?'bd-color-blue border-right-1x border-left-1x':''} bg-color-gray pd10 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
                <Col span={5} className={`${currentPackage==='standard'?'bd-color-blue border-right-1x border-left-1x':''} bg-color-gray pd10 mgr2 mgl2 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
                <Col span={5} className={`${currentPackage==='advance'?'bd-color-blue border-right-1x border-left-1x':''} bg-color-gray pd10 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
            </Row>
            <Row>
                <Col span={6} className={'bg-color-gray mgr2 pd10'}>
                     <span className={'txt-size-h6'}>
                            Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.
                        </span>
                </Col>
                <Col span={5} className={`${currentPackage==='basic'?'bd-color-blue border-right-1x border-left-1x':''} bg-color-gray pd10 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
                <Col span={5} className={`${currentPackage==='standard'?'bd-color-blue border-right-1x border-left-1x':''} bg-color-gray pd10 mgr2 mgl2 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
                <Col span={5} className={`${currentPackage==='advance'?'bd-color-blue border-right-1x border-left-1x':''} bg-color-gray pd10 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
            </Row>
            <Row>
                <Col span={6} className={'bg-color-gray mgr2 pd10'}>
                     <span className={'txt-size-h6'}>
                            Thương tật thân thể tạm thời do dòng điện gây ra. Chi trả theo chi phí điều trị thực tế của từng thành viên trong hộ.
                        </span>
                </Col>
                <Col span={5} className={`${currentPackage==='basic'?'bd-color-blue border-right-1x border-left-1x border-bottom-1x':''} bg-color-gray pd10 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
                <Col span={5} className={`${currentPackage==='standard'?'bd-color-blue border-right-1x border-left-1x border-bottom-1x':''} bg-color-gray pd10 mgr2 mgl2 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
                <Col span={5} className={`${currentPackage==='advance'?'bd-color-blue border-right-1x border-left-1x border-bottom-1x':''} bg-color-gray pd10 txt-center`}>
                    <span className={'txt-size-h6'}>Không quá 10 triệu đồng/ người</span>
                </Col>
            </Row>
        </div>
    </MainLayout>
};
export default ProductDetail;

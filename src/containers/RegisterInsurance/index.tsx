import React, {useEffect, useState} from 'react';
import MainLayout from "../../components/Layout";
import {Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Steps} from "antd";
import moment from "moment";
import {useParams, useSearchParams} from "react-router-dom";
import RowItem from '../../components/RowItem';
import {PlusCircleOutlined} from "@ant-design/icons";
import {ENSURE_CAR, ENSURE_ELECTRIC, ENSURE_HOUSE, STANDARD_DATE_FORMAT} from "../../core/config";
import {formatDate} from "../../core/helpers/date-time";
const { Step } = Steps;
function RegisterInsurance(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    let [searchParams, setSearchParams] = useSearchParams();
    let {productId} = useParams();
    const [packageCode, setPackageCode] = useState<string|null>(searchParams.get('packageCode'));
    const [currentStep, setStep] = useState<number>(0);
    const disabledDate=(current: any)=> {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    const getProductName=()=>{
        switch (productId){
            case ENSURE_ELECTRIC:
                return 'Bảo hiểm tại nạn hộ sử dụng điện';
            case ENSURE_CAR:
                return 'Bảo hiểm ô tô PVI';
            case ENSURE_HOUSE:
                return 'Bảo hiểm nhà ở toàn diện';
        }
    }
    const getPackageName=()=>{
        if(productId===ENSURE_ELECTRIC){
            switch (packageCode){
                case 'basic':
                    return 'Gói cơ bản';
                case 'standard':
                    return 'Gói tiêu chuẩn';
                case 'advance':
                    return 'Gói nâng cao';
            }
        }else if(productId===ENSURE_CAR){
            switch (packageCode){
                case 'basic':
                    return 'Gói bắt buộc';
                case 'standard':
                    return 'Gói tiêu chuẩn';
                case 'advance':
                    return 'Gói nâng cao';
            }
        }else if(productId===ENSURE_HOUSE){
            switch (packageCode){
                case 'basic':
                    return 'Gói cơ bản';
                case 'standard':
                    return 'Gói tiêu chuẩn';
                case 'advance':
                    return 'Gói nâng cao';
            }
        }
    }
    const renderStep1=()=>{
        return <div>
            <span className={'robotobold txt-size-h1'}>Người mua bảo hiểm</span>
            <Form
                name="basic"
                labelAlign={'left'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className={'mgt20'}
                initialValues={{ remember: false }}
                autoComplete="off"
            >
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Select placeholder="Chọn giới tính">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="CMND/CCCD"
                    name="id"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <DatePicker  disabledDate={disabledDate} suffixIcon={<i className="fas fa-calendar-alt"></i>} className={'width100'} format={'dd/MM/YYYY'}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' },{
                        type: 'email',
                        message: 'Email không đúng định dạng',
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="remember"  wrapperCol={{span: 24 }}>
                    <Checkbox>Tôi xác nhận thông tin là chính xác và đồng ý với quy tắc sản phẩm</Checkbox>
                </Form.Item>
                {renderFormByProductId()}
            </Form>
        </div>
    }
    const renderFormByProductId=()=>{
        if(productId===ENSURE_ELECTRIC){
            return <div>
                <span className={'robotobold txt-size-h1'}>Chủ hộ</span>
                <Form.Item
                    label="Họ và tên"
                    name="owner"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input placeholder={'Họ và tên'}/>
                </Form.Item>
                <Form.Item
                    label="CMND/CCCD/Hộ chiếu"
                    name="owner"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input placeholder={'CMND/CCCD/Hộ chiếu'}/>
                </Form.Item>
                <span className={'robotobold txt-size-h1'}>Thành viên bổ sung</span>
                <Row><span>* Thành viên trong gia đình sống cùng chủ hộ nhưng không có tên trong hộ khẩu</span></Row>
                <Button icon={<PlusCircleOutlined />} type={'link'}>Thêm thành viên</Button>
            </div>
        }else if(productId===ENSURE_CAR){
            return <div>
                <span className={'robotobold txt-size-h1'}>Thông tin đăng ký xe</span>
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Biển số xe"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Select placeholder="Tỉnh/Thành Phố">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
            </div>
        } else if(productId===ENSURE_HOUSE){
            return <div>
                <span className={'robotobold txt-size-h1'}>Thông tin căn nhà</span>
                <Form.Item
                    label="Năm xây dựng"
                    name="year"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Select placeholder="Năm xây dựng">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <span className={'robotobold txt-size-h1'}>Địa điểm căn nhà</span>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="province"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Select placeholder="Tỉnh/Thành Phố">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Quận/ Huyện"
                    name="district"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                    <Select placeholder="Quận/ Huyện">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Địa chỉ chi tiết"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                >
                   <Input.TextArea placeholder={'Số phòng, tầng, tòa nhà/số nhà, tên đường, phường/ xã'} rows={5}></Input.TextArea>
                </Form.Item>
            </div>
        }
    }
    const renderStep2=()=>{
        return <Card>
            <span className={'robotobold txt-size-h1'}>Thông tin người mua</span>
            <RowItem title={'Họ và tên'} value={''}></RowItem>
            <RowItem title={'Số điện thoại'} value={''}></RowItem>
            <RowItem title={'Địa chỉ email'} value={''}></RowItem>
            <RowItem title={'CMND/CCCD'} value={''}></RowItem>
            <RowItem title={'Giới tính'} value={''}></RowItem>
            <RowItem title={'Ngày sinh'} value={''}></RowItem>
            {
                productId===ENSURE_ELECTRIC?<div>
                    <span className={'robotobold txt-size-h1'}>Chủ hộ</span>
                    <RowItem title={'Họ và tên'} value={''}></RowItem>
                    <RowItem title={'CMND/CCCD/Hộ chiếu'} value={''}></RowItem>
                    <span className={'robotobold txt-size-h1'}>Thành viên bổ sung</span>
                    <RowItem title={'Họ và tên'} value={''}></RowItem>
                    <RowItem title={'Ngày sinh'} value={''}></RowItem>
                </div>:productId===ENSURE_CAR?<div>
                    <span className={'robotobold txt-size-h1'}>Thông tin đăng ký xe</span>
                    <RowItem title={'Họ và tên'} value={''}></RowItem>
                    <RowItem title={'Biển số xe'} value={''}></RowItem>
                    <RowItem title={'Tỉnh/Thành Phố'} value={''}></RowItem>
                    <RowItem title={'Mục đích sử dụng'} value={''}></RowItem>
                    <RowItem title={'Số chỗ ngồi'} value={''}></RowItem>
                    <RowItem title={'Loại xe'} value={''}></RowItem>
                    <RowItem title={'Phân loại'} value={''}></RowItem>
                </div>:productId===ENSURE_HOUSE?<div>
                    <span className={'robotobold txt-size-h1'}>Thông tin căn nhà</span>
                    <RowItem title={'Năm xây dựng'} value={''}></RowItem>
                    <span className={'robotobold txt-size-h1'}>Địa điểm căn nhà</span>
                    <RowItem title={'Tỉnh/Thành Phố'} value={''}></RowItem>
                    <RowItem title={'Quận/ Huyện'} value={''}></RowItem>
                    <RowItem title={'Địa chỉ chi tiết'} value={''}></RowItem>
                </div>:null
            }
        </Card>
    }
    const renderStep3=()=>{
        if(productId===ENSURE_ELECTRIC){

        }else if(productId===ENSURE_CAR){
        } else if(productId===ENSURE_HOUSE){

        }
    }
    const renderStep=()=>{
        switch (currentStep){
            case 0:
                return renderStep1();
            case 1:
                return renderStep2();
            case 2:
                return renderStep3();

        }
    }

    return <MainLayout showProgressBar={showProgressBar} title={'Đăng ký'}>
        <div className={'main-content mgt30'}>
            <Row className={'justify-content-center'}>
                <Col span={12}>
                    <Steps labelPlacement={'vertical'} current={currentStep}>
                        <Step title="Đăng ký"/>
                        <Step title="Xác nhận"/>
                        <Step title="Thanh toán"/>
                    </Steps>
                </Col>
            </Row>
            <Row className={'justify-content-center mgt20'}>
                <Col span={12} className={'pdr20'}>
                    {renderStep()}
                    <Row className={'justify-content-between mgt20'}>
                        <Button onClick={()=> setStep(currentStep-1)} disabled={currentStep===0} size={'large'} shape={'round'}>Quay lại</Button>
                        <Button onClick={()=> setStep(currentStep+1)} size={'large'} shape={'round'} type={'primary'}>Tiếp tục</Button>
                    </Row>
                </Col>
                <Col span={10}>
                    <Card title="Thông tin đơn hàng" >
                        <RowItem title={'Tên sản phẩm'} value={getProductName()}></RowItem>
                        <RowItem title={'Nhà cung cấp'} value={'Bảo hiểm PVI'}></RowItem>
                        <RowItem title={'Gói sản phẩm'} value={getPackageName()}></RowItem>
                        <RowItem title={'Ngày hiệu lực'} value={formatDate(moment())}></RowItem>
                        <RowItem title={'Chu kì thanh toán'} value={'1 năm'}></RowItem>
                        <RowItem title={'Tổng phí bảo hiểm'} value={''}></RowItem>
                    </Card>
                </Col>
            </Row>

        </div>
    </MainLayout>
}
export default RegisterInsurance;

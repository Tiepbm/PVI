import React, {useState} from 'react';
import MainLayout from "../../components/Layout";
import {Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Steps} from "antd";
import moment from "moment";
const { Step } = Steps;
function RegisterInsurance(){
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const [currentStep, setStep] = useState<number>(0);
    const disabledDate=(current: any)=> {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Đăng ký'}>
        <div className={'main-content mgt20'}>
            <Row className={'justify-content-center'}>
                <Col span={12}>
                    <Steps labelPlacement={'vertical'} current={currentStep}>
                        <Step title="Đăng ký"/>
                        <Step title="Xác nhận"/>
                        <Step title="Thanh toán"/>
                    </Steps>
                </Col>
            </Row>
            <Row className={'justify-content-between'}>
                <Col span={12} className={'pdr20'}>
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
                            <Checkbox>Tôi xác nhận thông tin là chính xác và đông ý với quy tắc sản phẩm</Checkbox>
                        </Form.Item>

                    </Form>
                </Col>
                <Col span={8}>
                    <Card title="Thông tin đơn hàng" >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>

        </div>
    </MainLayout>
}
export default RegisterInsurance;

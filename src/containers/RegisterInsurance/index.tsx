import React, {useEffect, useState} from 'react';
import MainLayout from "../../components/Layout";
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Result, Row, Select, Steps} from "antd";
import moment from "moment";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import RowItem from '../../components/RowItem';
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {CPID, ENSURE_CAR, ENSURE_ELECTRIC, ENSURE_HOUSE, FEE, STANDARD_DATE_FORMAT} from "../../core/config";
import {formatDate} from "../../core/helpers/date-time";
import lodash from "lodash";
import {localStorageRead} from "../../utils/LocalStorageUtils";
import {sign} from "../../utils/StringUtils";
import {productRepository} from "../../repositories/ProductRepository";
import {formatMoneyByUnit} from "../../core/helpers/string";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import M24ErrorUtils from "../../utils/M24ErrorUtils";

const {Step} = Steps;
const { confirm } = Modal;
function RegisterInsurance() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    let [searchParams, setSearchParams] = useSearchParams();
    let {productId} = useParams();
    const navigate = useNavigate();
    const [packageCode, setPackageCode] = useState<string | null>(searchParams.get('packageCode'));
    const [currentStep, setStep] = useState<number>(3);
    const [fee] = useState(localStorageRead(FEE));
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const [form] = Form.useForm();
    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    const [bodyRegister, setBodyRegister] = useState<any>();
    const getProductName = () => {
        switch (productId) {
            case ENSURE_ELECTRIC:
                return 'Bảo hiểm tại nạn hộ sử dụng điện';
            case ENSURE_CAR:
                return 'Bảo hiểm ô tô PVI';
            case ENSURE_HOUSE:
                return 'Bảo hiểm nhà ở toàn diện';
        }
    }
    const getPackageName = () => {
        if (productId === ENSURE_ELECTRIC) {
            switch (packageCode) {
                case '01':
                    return 'Gói cơ bản';
                case '02':
                    return 'Gói tiêu chuẩn';
                case '03':
                    return 'Gói nâng cao';
            }
        } else if (productId === ENSURE_CAR) {
            switch (packageCode) {
                case '01':
                    return 'Gói bắt buộc';
                case '02':
                    return 'Gói tiêu chuẩn';
                case '03':
                    return 'Gói nâng cao';
            }
        } else if (productId === ENSURE_HOUSE) {
            switch (packageCode) {
                case '01':
                    return 'Gói cơ bản';
                case '02':
                    return 'Gói tiêu chuẩn';
                case '03':
                    return 'Gói nâng cao';
            }
        }
    }
    const nextStep = () => {
        if (currentStep === 0) {
            form.validateFields().then(values => {
                // let fiels = form.getFieldsValue();
                // console.log(values);
                let body: any = {};
                if (productId === ENSURE_ELECTRIC) {
                    let listThamGia = [];
                    listThamGia.push({
                        ten_khach: values.ownerName,
                        so_cmnd: values.ownerCMND,
                        ngay_sinh: formatDate(values.ownerBirthday),
                        dien_thoai: values.ownerPhone
                    });
                    values.persons?.map((x: any) => {
                        listThamGia.push({
                            ten_khach: x.fullname,
                            ngay_sinh: formatDate(x.birthday),
                        });
                    });
                    let totalAmount = packageCode === '01' ? 10000000 : packageCode === '02' ? 20000000 : 40000000;
                    let dateStart = formatDate(moment().add(1, 'd'));
                    let datePaid = formatDate(moment());
                    let duration = formatDate(moment().set('year', moment().get('year') + 1));
                    body = {
                        'ma_giaodich': `${CPID}${moment().valueOf()}`,
                        'package': packageCode,
                        'khach_hang': values.customerName,
                        'dia_chi': values.customerAddress,
                        'email': values.customerEmail,
                        'list_nguoithamgia': listThamGia,
                        'tong_phi': lodash.get(fee, 'TotalFee', ''),
                        'CpId': CPID,
                        'ngaythanhtoan': datePaid,
                        'thoihan_bh': duration,
                        'ngay_batdau': dateStart,
                        'tong_tienbh': totalAmount,
                        'ngay_capd': datePaid,
                        'starttime': '00:00',
                        'endtime': '23:59',
                        'ma_tiente': 'VND',
                        'loai_dcap': true,
                        'tyle_bthuong': '0',
                        'ma_pkt': '',
                        'ma_kh': '',
                        'ma_kh_th': '',
                        'dia_chi_th': '',
                        'Sign': sign(`${values.customerEmail}${datePaid}${duration}${dateStart}${fee.TotalFee}${totalAmount}`)
                    }
                }
                setBodyRegister(body);
                setStep(currentStep + 1);
            }).catch(err => {
                console.log(err);
            });
        } else if(currentStep<2){
            setStep(currentStep + 1);
        }else{
            setShowConfirm(true);
        }

    }
    const onSubmit=()=>{
        setLoading(true);
        if(productId===ENSURE_ELECTRIC){
            productRepository.createOrderHSDD(bodyRegister).then(res=>{
               setResult(true);
            }).catch(err=>{
                setResult(false);
            }).finally(()=>{
                setShowConfirm(false);
                setLoading(false);
                setStep(3);
            });
        }
    }
    const renderStep1 = () => {
        return <div>
            <span className={'robotobold txt-size-h1'}>Người mua bảo hiểm</span>
            <Form
                form={form}
                name="basic"
                labelAlign={'left'}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                className={'mgt20'}
                autoComplete="off"
            >
                <Form.Item
                    label="Họ và tên"
                    name="customerName"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                {productId === ENSURE_ELECTRIC && <Form.Item
                    label="Địa chỉ"
                    name="customerAddress"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                }
                {productId === ENSURE_CAR || productId === ENSURE_HOUSE ? <Form.Item
                    label="Số điện thoại"
                    name="customerPhone"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                    normalize={(value, prevValue) => {
                        let raw = value.replace(/[^\d]/g, "");
                        return raw;
                    }}
                >
                    <Input/>
                </Form.Item> : null}
                <Form.Item
                    label="Email"
                    name="customerEmail"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}, {
                        type: 'email',
                        message: 'Email không đúng định dạng',
                    }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item valuePropName={'checked'} name="confirm" wrapperCol={{span: 24}}
                           rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}>
                    <Checkbox>Tôi xác nhận thông tin là chính xác và đồng ý với quy tắc sản phẩm</Checkbox>
                </Form.Item>
                {renderFormByProductId()}
            </Form>
        </div>
    }
    const renderFormByProductId = () => {
        if (productId === ENSURE_ELECTRIC) {
            return <div>
                <span className={'robotobold txt-size-h1'}>Chủ hộ</span>
                <Form.Item
                    label="Họ và tên"
                    name="ownerName"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input placeholder={'Họ và tên'}/>
                </Form.Item>
                <Form.Item
                    label="CMND/CCCD/Hộ chiếu"
                    name="ownerCMND"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                    normalize={(value, prevValue) => {
                        let raw = value.replace(/[^\d]/g, "");
                        return raw;
                    }}
                >
                    <Input placeholder={'CMND/CCCD/Hộ chiếu'}/>
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="ownerPhone"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                    normalize={(value, prevValue) => {
                        let raw = value.replace(/[^\d]/g, "");
                        return raw;
                    }}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="ownerBirthday"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <DatePicker placeholder={'Chọn ngày sinh'} disabledDate={disabledDate}
                                suffixIcon={<i className="fas fa-calendar-alt"></i>}
                                className={'width100'} format={'DD/MM/YYYY'}/>
                </Form.Item>

                <span className={'robotobold txt-size-h1'}>Thành viên bổ sung</span>
                <Row><span>* Thành viên trong gia đình sống cùng chủ hộ nhưng không có tên trong hộ khẩu</span></Row>
                <Form.List name={'persons'}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}: any) => (

                                <div key={key} className={'mgt20'}>
                                    <Row className={'justify-content-between align-items-center mgbt15'}>
                                        <span className={'robotobold txt-size-h4'}>Thành viên</span>
                                        <span onClick={() => {
                                            remove(name);
                                        }
                                        } className={'txt-size-h4 txt-color-red'}><i
                                            className="fas fa-trash-alt"></i></span>
                                    </Row>
                                    <Form.Item
                                        {...restField}
                                        label="Họ và tên"
                                        name={[name, 'fullname']}
                                        rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                                    >
                                        <Input onChange={(e) => {
                                        }
                                        } placeholder={'Họ và tên'}/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label="Ngày sinh"
                                        name={[name, 'birthday']}
                                        rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                                    >
                                        <DatePicker placeholder={'Chọn ngày sinh'} disabledDate={disabledDate}
                                                    suffixIcon={<i className="fas fa-calendar-alt"></i>}
                                                    className={'width100'} format={'DD/MM/YYYY'}/>
                                    </Form.Item>
                                </div>
                            ))}
                            <Form.Item>
                                <Button onClick={() => {
                                    add();
                                }} icon={<PlusCircleOutlined/>} type={'link'}>Thêm thành viên</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </div>
        } else if (productId === ENSURE_CAR) {
            return <div>
                <span className={'robotobold txt-size-h1'}>Thông tin đăng ký xe</span>
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Biển số xe"
                    name="name"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="name"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Tỉnh/Thành Phố">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
            </div>
        } else if (productId === ENSURE_HOUSE) {
            return <div>
                <span className={'robotobold txt-size-h1'}>Thông tin căn nhà</span>
                <Form.Item
                    label="Năm xây dựng"
                    name="year"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
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
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Tỉnh/Thành Phố">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Quận/ Huyện"
                    name="district"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Quận/ Huyện">
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Địa chỉ chi tiết"
                    name="address"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input.TextArea placeholder={'Số phòng, tầng, tòa nhà/số nhà, tên đường, phường/ xã'}
                                    rows={5}></Input.TextArea>
                </Form.Item>
            </div>
        }
    }
    const renderStep2 = () => {
        return <Card>
            <span className={'robotobold txt-size-h1'}>Thông tin người mua</span>
            <RowItem title={'Họ và tên'} value={bodyRegister.khach_hang}></RowItem>
            {productId === ENSURE_ELECTRIC && <RowItem title={'Địa chỉ'} value={bodyRegister.dia_chi}></RowItem>}
            {productId === ENSURE_CAR || productId === ENSURE_HOUSE ?
                <RowItem title={'Số điện thoại'} value={bodyRegister.dien_thoai}></RowItem> : null}
            <RowItem title={'Địa chỉ email'} value={bodyRegister.email}></RowItem>
            {
                productId === ENSURE_ELECTRIC ? <div>
                    <span className={'robotobold txt-size-h1'}>Chủ hộ</span>
                    <RowItem title={'Họ và tên'} value={bodyRegister.list_nguoithamgia[0].ten_khach}></RowItem>
                    <RowItem title={'CMND/CCCD/Hộ chiếu'} value={bodyRegister.list_nguoithamgia[0].so_cmnd}></RowItem>
                    <RowItem title={'Số điện thoại'} value={bodyRegister.list_nguoithamgia[0].dien_thoai}></RowItem>
                    <RowItem title={'Ngày sinh'} value={bodyRegister.list_nguoithamgia[0].ngay_sinh}></RowItem>
                    <span className={'robotobold txt-size-h1'}>Thành viên bổ sung</span>
                    {
                        bodyRegister.list_nguoithamgia.map((x: any, index: number) => {
                            if (index === 0)
                                return null
                            return <div className={'mgt15'}>
                                <RowItem title={'Họ và tên'} value={x.ten_khach}></RowItem>
                                <RowItem title={'Ngày sinh'} value={x.ngay_sinh}></RowItem>
                            </div>
                        })
                    }
                </div> : productId === ENSURE_CAR ? <div>
                    <span className={'robotobold txt-size-h1'}>Thông tin đăng ký xe</span>
                    <RowItem title={'Họ và tên'} value={''}></RowItem>
                    <RowItem title={'Biển số xe'} value={''}></RowItem>
                    <RowItem title={'Tỉnh/Thành Phố'} value={''}></RowItem>
                    <RowItem title={'Mục đích sử dụng'} value={''}></RowItem>
                    <RowItem title={'Số chỗ ngồi'} value={''}></RowItem>
                    <RowItem title={'Loại xe'} value={''}></RowItem>
                    <RowItem title={'Phân loại'} value={''}></RowItem>
                </div> : productId === ENSURE_HOUSE ? <div>
                    <span className={'robotobold txt-size-h1'}>Thông tin căn nhà</span>
                    <RowItem title={'Năm xây dựng'} value={''}></RowItem>
                    <span className={'robotobold txt-size-h1'}>Địa điểm căn nhà</span>
                    <RowItem title={'Tỉnh/Thành Phố'} value={''}></RowItem>
                    <RowItem title={'Quận/ Huyện'} value={''}></RowItem>
                    <RowItem title={'Địa chỉ chi tiết'} value={''}></RowItem>
                </div> : null
            }
        </Card>
    }
    const renderStep3 = () => {
        return <div className={''}>
            <Alert
                message={<span className={'robotobold'}>Thanh toán tiền mặt</span>}
                description="Nhân viên bán hàng thu tiền mặt của khách hàng."
                type="success"
                showIcon
            />
        </div>
        // return <Row>
        //     <Col>
        //         <CheckCircleOutlined style={{fontSize:40, color:'green'}} />
        //     </Col>
        //     <Col flex={'auto'}>
        //         <Row>
        //             <span className={'txt-size-h6 robotobold'}>Thanh toán tiền mặt</span>
        //         </Row>
        //         <span className={'txt-size-h7'}>Nhân viên bán hàng thu tiền mặt của khách hàng</span>
        //     </Col>
        // </Row>
    }
    const renderStep = () => {
        switch (currentStep) {
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
            {currentStep < 3 ? <div>
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
                            <Button onClick={() => setStep(currentStep - 1)} disabled={currentStep === 0} size={'large'}
                                    shape={'round'}>Quay lại</Button>
                            <Button onClick={nextStep} size={'large'} shape={'round'}
                                    type={'primary'}>{currentStep < 2 ? 'Tiếp tục' : 'Xác nhận thanh toán'}</Button>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Card title="Thông tin đơn hàng">
                            <RowItem title={'Tên sản phẩm'} value={getProductName()}></RowItem>
                            <RowItem title={'Nhà cung cấp'} value={'Bảo hiểm PVI'}></RowItem>
                            <RowItem title={'Gói sản phẩm'} value={getPackageName()}></RowItem>
                            <RowItem title={'Ngày hiệu lực'} value={formatDate(moment())}></RowItem>
                            <RowItem title={'Chu kì thanh toán'} value={'1 năm'}></RowItem>
                            <RowItem title={'Tổng phí bảo hiểm'}
                                     value={formatMoneyByUnit(lodash.get(fee, 'TotalFee', ''))}></RowItem>
                        </Card>
                    </Col>
                </Row>
            </div>:
                <div>
                    {result?<Result
                        status="success"
                        title="Đăng ký bảo hiểm thành công"
                        subTitle="Giấy chứng nhận bảo hiểm sẽ được gửi về email khách hàng đăng ký"
                        extra={[
                            <Button onClick={()=> window.location.reload()} type="primary" key="console">
                                Đăng ký tiếp
                            </Button>,
                            <Button onClick={()=>navigate('/')} key="buy">Trang chủ</Button>,
                        ]}
                    />:
                        <Result
                            status="error"
                            title="Tạo hợp đồng bảo hiểm thất bại"
                            subTitle="Vui lòng thực hiện đăng ký lại"
                            extra={[
                                <Button onClick={()=> window.location.reload()} type="primary" key="console">
                                    Đăng ký lại
                                </Button>,
                                <Button onClick={()=>navigate('/')} key="buy">Trang chủ</Button>,
                            ]}
                        >
                        </Result>}
                </div>
            }
            <ConfirmModal loading={loading} onSubmit={onSubmit} onCancel={()=> setShowConfirm(false)} visible={showConfirm} title={'Xác nhận thanh toán'} content={'Bạn xác nhận đã thu đủ tiền mặt của khách hàng. Hệ thống sẽ tạo hợp đồng bảo hiểm, Bạn không thể thay đổi thông tin đăng ký này'}></ConfirmModal>
        </div>
    </MainLayout>
}

export default RegisterInsurance;

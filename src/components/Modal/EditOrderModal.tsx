import {Button, Modal, Form, Input, DatePicker, Row, Col} from 'antd';
import React, {useState} from 'react';
import lodash from "lodash";
import {STANDARD_DATE_FORMAT} from "../../core/config";
import moment from "moment";
import {useMediaQuery} from 'react-responsive';
import {formatNumber} from "../../core/helpers/string";
import {formatDate} from "../../core/helpers/date-time";

interface Props {
    visible: boolean;
    loading: boolean;
    data: any;
    onCancel: () => void;
    onSubmit: (body: any) => void;
}

const EditOrderModal: React.FC<Props> = (props: Props) => {
    const {visible, loading, data, onCancel, onSubmit} = props;
    const [form] = Form.useForm();
    const isTabletOrMobile = useMediaQuery({maxWidth: 767});
    const handleSubmit=()=>{
        form.validateFields().then(values=>{
                let body = {
                    ...values,
                    pr_key: data.pr_key,
                    giatri_thietbi: lodash.get(data,'giatri_thietbi',''),
                    phi_baohiem_thietbi: lodash.get(data,'phi_baohiem_thietbi',''),
                    thoihan_batdau_baohanh_nsx: lodash.get(data,'thoihan_batdau_baohanh_nsx',''),
                    ngay_batdau: lodash.get(data,'ngay_batdau',''),
                    thoihan_ketthuc_baohanh_nsx: formatDate(moment(lodash.get(values,'thoihan_ketthuc_baohanh_nsx','')), STANDARD_DATE_FORMAT),
                    thoihan_bh: formatDate(moment(lodash.get(values,'thoihan_bh','')), STANDARD_DATE_FORMAT),
                }
                onSubmit(body);
        }).catch(err=>{
            console.log(err);
        });
    }
    return (
        <Modal
            visible={visible}
            title="Sửa đơn bảo hiểm"
            onOk={onSubmit}
            width={800}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Xác nhận
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    khach_hang: lodash.get(data, 'khach_hang', ''),
                    dia_chi: lodash.get(data, 'dia_chi', ''),
                    dien_thoai: lodash.get(data, 'dien_thoai', ''),
                    Email: lodash.get(data, 'Email', ''),
                    loai_thietbi: lodash.get(data, 'loai_thietbi', ''),
                    hang: lodash.get(data, 'hang', ''),
                    model: lodash.get(data, 'model', ''),
                    so_serial: lodash.get(data, 'so_serial', ''),
                    thoihan_ketthuc_baohanh_nsx: moment(lodash.get(data, 'thoihan_ketthuc_baohanh_nsx', ''), STANDARD_DATE_FORMAT),
                    thoihan_bh: moment(lodash.get(data, 'thoihan_bh', ''), STANDARD_DATE_FORMAT),
                    giatri_thietbi: formatNumber(lodash.get(data, 'giatri_thietbi', '')),
                }}
            > <Row gutter={16} className={isTabletOrMobile ? 'dpl-block' : 'dpl-flex'}>
                <Col md={24} lg={8}>
                    <Form.Item
                        name="khach_hang"
                        label="Họ và tên"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col md={24} lg={8}>
                    <Form.Item
                        name="dia_chi"
                        label="Địa chỉ"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col md={24} lg={8}>
                    <Form.Item
                        label="Giá trị thiết bị"
                        name="giatri_thietbi"
                        rules={[{required: true}]}
                    >
                        <Input disabled/>
                    </Form.Item>
                </Col>
            </Row>
                <Row gutter={16} className={isTabletOrMobile ? 'dpl-block' : 'dpl-flex'}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="dien_thoai"
                            label="Số điện thoại"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={8}><Form.Item
                        name="Email"
                        label="Email"
                    >
                        <Input/>
                    </Form.Item>
                    </Col>

                    <Col md={24} lg={8}>
                        <Form.Item
                            name="loai_thietbi"
                            label="Loại thiết bị"
                            rules={[{required: true}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className={isTabletOrMobile ? 'dpl-block' : 'dpl-flex'}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="hang"
                            label="Hãng"
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="model"
                            label="Model"
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label="Số Serial/IMEI"
                            name="so_serial"
                            rules={[{required: true}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className={isTabletOrMobile ? 'dpl-block' : 'dpl-flex align-items-end'}>
                    <Col md={24} lg={12}>
                        <Form.Item
                            label="Thời hạn bảo hành gốc của NSX"
                            name="thoihan_ketthuc_baohanh_nsx"
                            rules={[{required: true}]}
                        >
                            <DatePicker className={'width100'} format={STANDARD_DATE_FORMAT}/>
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={12}>
                        <Form.Item
                            label="Thời hạn BH bảo hành mở rộng"
                            name="thoihan_bh"
                            rules={[{required: true}]}
                        >
                            <DatePicker className={'width100'} format={STANDARD_DATE_FORMAT}/>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    );
};

export default EditOrderModal;

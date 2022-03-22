import React, {useEffect, useState} from 'react';
import MainLayout from "../../components/Layout";
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Result, Row, Select, Steps} from "antd";
import moment from "moment";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import RowItem from '../../components/RowItem';
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {
    CPID,
    ENSURE_CAR,
    ENSURE_ELECTRIC,
    ENSURE_HOUSE,
    FEE,
    FEE_REQUEST,
    STANDARD_DATE_FORMAT
} from "../../core/config";
import {formatDate} from "../../core/helpers/date-time";
import lodash from "lodash";
import {localStorageRead} from "../../utils/LocalStorageUtils";
import {sign} from "../../utils/StringUtils";
import {productRepository} from "../../repositories/ProductRepository";
import {formatMoneyByUnit} from "../../core/helpers/string";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import M24ErrorUtils from "../../utils/M24ErrorUtils";
import {categoryRepository} from "../../repositories/CategoryRepository";
import { Link } from 'react-router-dom';
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {useMediaQuery} from "react-responsive";

const {Step} = Steps;
const { confirm } = Modal;
function RegisterInsurance() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    let [searchParams, setSearchParams] = useSearchParams();
    let {productId} = useParams();
    const navigate = useNavigate();
    const [packageCode, setPackageCode] = useState<string | null>(searchParams.get('packageCode'));
    const [currentStep, setStep] = useState<number>(0);
    const [fee] = useState(localStorageRead(FEE));
    const [feeRequest] = useState(localStorageRead(FEE_REQUEST));
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [provinceSelected, setProvinceSelected] = useState<any>();
    const [districtSelected, setDistrictSelected] = useState<any>();
    const [originalDistricts, setOriginalDistricts] = useState<any>([]);
    const [years, setYears] = useState<any>([]);
    const [form] = Form.useForm();
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    console.log(feeRequest);
    const [bodyRegister, setBodyRegister] = useState<any>();
    useEffect(()=>{
       if(productId===ENSURE_CAR||productId===ENSURE_HOUSE)
           getProvinces();
       if(productId===ENSURE_HOUSE) {
           let items: any=[];
           for(let i=0; i<=50;i++)
               items.push(moment().add('year',-i).get('year'));
           setYears(items);
           getDistricts();
       }

    },[]);
    const getPurpose=()=>{
        let purposeCode = searchParams.get('purpose');
        switch (purposeCode){
            case '1':
                return 'Xe chở người không KDVT';
            case '2':
                return 'Xe chở người KDVT';
            case '3':
                return 'Xe chở hàng';
            default:
                return '';
        }
    }
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
    const getProvinces=()=>{
        categoryRepository.getCategories('DMTINH').then(res=>{
            setProvinces(res.Data);
        }).catch(err=>{

        });
    }
    const getDistricts=()=>{
        categoryRepository.getCategories('DIADIEM_BH').then(res=>{
            setOriginalDistricts(res.Data);
        }).catch(err=>{

        });
    }
    const nextStep = () => {
        if (currentStep === 0) {
            form.validateFields().then(values => {
                // let fiels = form.getFieldsValue();
                // console.log(values);
                let body: any = {};
                let dateStart = formatDate(moment().add(1, 'd'));
                let datePaid = formatDate(moment());
                let duration = formatDate(moment().set('year', moment().get('year') + 1));
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

                    body = {
                        'ma_giaodich': `${CPID}${moment().valueOf()}`,
                        'package': packageCode,
                        'khach_hang': values.customerName,
                        'dia_chi': values.customerAddress,
                        'email': values.customerEmail,
                        'list_nguoithamgia': listThamGia,
                        'tong_phi': lodash.get(fee, 'TotalFee', ''),
                        'CpId': CPID,
                        'sotien_bh':packageCode==='01'?10000000:packageCode==='02'?20000000:40000000,
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
                        "DienThoai": values.customerPhone,
                        'ma_pkt': '',
                        'ma_kh': '',
                        'ma_kh_th': '',
                        'dia_chi_th': '',
                        'Sign': sign(`${values.customerEmail}${datePaid}${duration}${dateStart}${fee.TotalFee}${totalAmount}`)
                    }
                }
                else if(productId===ENSURE_HOUSE){
                    let totalAmount = packageCode === '01' ? 100000000 : packageCode === '02' ? 200000000 : 400000000;
                    body={
                        'ma_giaodich': `${CPID}${moment().valueOf()}`,
                        'package': packageCode,
                        'goi_dichvu': '',
                        'ma_tinh': values.province,
                        'ma_user':'',
                        'ma_pkt':'',
                        'ma_donvi':'',
                        'file_GYC':'',
                        'MaKhach':'',
                        'ma_phuongthuc_thanhtoan':'0',
                        'ma_daiLy':'',
                        'ma_diadiem': values.district,
                        'select_mahieu_ruiro':'0',
                        'select_danhsach_cautruc_xd':'',
                        'ngaythanhtoan':datePaid,
                        'nguoimua_bh':'',
                        'ma_canbo_kt':'',
                        'so_donbh':'',
                        'khach_hang':values.customerName,
                        'thoihan_bh':duration,
                        'endtime':'23:59',
                        'phi_giamphi':'0',
                        'pr_key':'0',
                        'Email':values.customerEmail,
                        'ngay_batdau':dateStart,
                        'starttime':'00:00',
                        'dia_chi':'',
                        'ma_nhomkenh':'',
                        'ma_kenhbh':'',
                        'loai_dcap':false,
                        'ma_moigioi':'',
                        'phi_moi_gioi':'',
                        'ma_phuongthuc_kt':'',
                        'tyle_bt':'0',
                        'giatri_taisan':'0',
                        'ma_danhsach_msudung':'',
                        'pvbh_dkbs_01':false,
                        'pvbh_dkbs_02':false,
                        'link_filehd':'',
                        'ma_tt':'',
                        'makhach_th':'',
                        'diachi_th':'',
                        'so_ctu':'',
                        'select_loai_dichvu':'',
                        'ttin_bosung':'',
                        'muc_khautru':'',
                        'nam_xaydung':values.year,
                        'so_tangnoi':'0',
                        'so_tangham':'0',
                        'dk_bs_bh_khac':false,
                        'diengiai_dk_bs_bh_khac':'',
                        'ma_sp_dichvu':'',
                        'ma_sovat':'',
                        'is_hdon_dt':false,
                        'ttin_hd_dientu':'',
                        'so_dienthoai':values.customerPhone,
                        'so_cmt_hochieu':'',
                        'nmua_hang':'',
                        'dchi_xhoadon':'',
                        'nnghe_kd':'',
                        'dk_thanhtoan':'',
                        'tyle_cnbb':'0',
                        'diachi_nguoibh':'',
                        'sotien_bh_bentrong':'',
                        'tong_phi': lodash.get(fee, 'TotalFee', ''),
                        'CpId': CPID,
                        'tong_tienbh': totalAmount,
                        'Sign': sign(`${values.customerEmail}${datePaid}${duration}${dateStart}${fee.TotalFee}${totalAmount}`)
                    }
                    setProvinceSelected(provinces.find((x: any)=>x.Value===values.province));
                    setDistrictSelected(districts.find((x: any)=>x.Value===values.district));
                }else if(productId===ENSURE_CAR){
                    body = {
                        'ma_giaodich': `${CPID}${moment().valueOf()}`,
                        "TenKH": values.customerName,
                        "DiaChiKH": "",
                        "TenChuXe": values.carName,
                        "DiaChiChuXe": values.carAddress,
                        "KhuyenMai": "",
                        "Ma_Phong": "",
                        "MaKH": "",
                        "MaKhachTH": "",
                        "TenTH": "",
                        "DiaChiTH": "",
                        "MaKT": "",
                        "MaDL": "",
                        "NgayThanhToan": datePaid,
                        "MaCBKT": "",
                        "LoaiBK": "",
                        "NhomKenh": "",
                        "Kenh": "",
                        "MoiGioi": false,
                        "CongTyMG": "",
                        "MoiGioiPhi": "0",
                        "SoHD": false,
                        "MucDichSD": "",
                        "TrangThaiTT": "1",
                        "HDDT": false,
                        "MaSoVAT": "",
                        "TTinHDDT": "",
                        "DiaChiVAT": "",
                        "TenKHVAT": "",
                        "NgayDau": dateStart,
                        "NgayCuoi": duration,
                        "LoaiSP": "AUTO3PAR",
                        "ThamGiaTNDSBB": true,
                        "ThamGiaTNDSTN": false,
                        "ThamGiaVCX": false,
                        "ThamGiaLaiPhu": lodash.get(feeRequest,'thamgia_laiphu',false),
                        "ThamGiaHang": false,
                        "Zalo": false,
                        "Viber": false,
                        "SMS": false,
                        "LoaiDon": "",
                        "SoACNT": "",
                        "SoDonBHNT": "",
                        "TyLeBT": "0",
                        "SoVuBT": "0",
                        "NgayCap": datePaid,
                        "MaDonViNT": "",
                        "SoDonBH": "",
                        "MaDonVi": "",
                        "NgayCtu": datePaid,
                        "MaUser": "",
                        "EmailKH": values.customerEmail,
                        "SoCtu": "",
                        "LoaiXe": "",
                        "ChoNgoi": lodash.get(feeRequest,'so_cho','0'),
                        "TrongTai": lodash.get(feeRequest,'ma_trongtai',''),
                        "MTNHangHoa": "0",
                        "SoTan": "0",
                        "TyLeGPHang": "0",
                        "MTNLaiPhu": "0",
                        "SoNguoiToiDa": "0",
                        "TyLeGPLaiPhu": "0",
                        "GioiHanMTN": "0",
                        "MTNTNDSNguoi": "0",
                        "MTNTNDSTaiSan": "0",
                        "TyLeGPTNDS": "0",
                        "GiaTriBH": "0",
                        "GiaTriPK": "0",
                        "TyLePhiVCX": "0",
                        "PhiBHVatChat": "0",
                        "PhiBHTNDSBB": "0",
                        "MucKT": "",
                        "PhiBHHangHoa": "0",
                        "PhiBHLaiPhu": "0",
                        "PhiBHTNDS": "0",
                        "ThamGiaVatChat": false,
                        "MaMucDichSD": "1",
                        "MayKeo": lodash.get(feeRequest,'MayKeo',false),
                        "XeChuyenDung":  lodash.get(feeRequest,'XeChuyenDung',false),
                        "XeChoTien":  lodash.get(feeRequest,'XeChoTien',false),
                        "XePickUp":  lodash.get(feeRequest,'XePickUp',false),
                        "XeTaiVan":  lodash.get(feeRequest,'XeTaiVan',false),
                        "XeTapLai":  lodash.get(feeRequest,'XeTapLai',false),
                        "XeBus":  lodash.get(feeRequest,'XeBus',false),
                        "XeCuuThuong":  lodash.get(feeRequest,'XeCuuThuong',false),
                        "Xetaxi":  lodash.get(feeRequest,'Xetaxi',false),
                        "XeDauKeo":  lodash.get(feeRequest,'XeDauKeo',false),
                        "NamSD": moment().get('year'),
                        "DongBH": "0",
                        "PhanBoDT": false,
                        "KhachVip": false,
                        "AnBKS": false,
                        "NgayTaiTuc": "",
                        "TinhTrangXe": "",
                        "TinhTrangTHBH": "",
                        "BienKiemSoat": values.carNumber,
                        "HieuXe": "",
                        "DongXe": "",
                        "NamSX": "",
                        "DienThoai": values.customerPhone,
                        "ToChuc": "",
                        "MaTinh": values.carProvince,
                        "SoKhung": "",
                        "SoMay": "",
                        "chkKDVT": true,
                        "AnPhi": false,
                        "SoTienTH": "0",
                        "strMaDKBS": "",
                        "ThamGiaDKBS": false,
                        "NgayDangKy": "",
                        "GiaTriXe": "0",
                        "GhiChuPK": "",
                        "PhuongThucCD": "",
                        "ListDKBSKhac": [],
                        "GioDau": "00:00",
                        "GioCuoi": "23:59",
                        "khach_hang": "false",
                        "pr_key": "0",
                        "GiaTriPin": "0",
                        "CpId": CPID,
                        "Sign": sign(`${dateStart}${duration}${values.carNumber}${values.customerEmail}${1}${datePaid}${values.customerPhone}`)
                    }
                    setProvinceSelected(provinces.find((x: any)=>x.Value===values.carProvince));
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
        if(webCode)
            bodyRegister.web_code=webCode;
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
        }else if(productId===ENSURE_HOUSE){
            productRepository.createOrderHouse(bodyRegister).then(res=>{
                setResult(true);
            }).catch(err=>{
                setResult(false);
            }).finally(()=>{
                setShowConfirm(false);
                setLoading(false);
                setStep(3);
            });
        }else if(productId===ENSURE_CAR){
            productRepository.createOrderCar(bodyRegister).then(res=>{
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
                onFieldsChange={(changedFields, allFields)=>{
                    let province: any = changedFields.find((x: any)=> x.name.includes('province'));
                    if(province){
                        form.setFieldsValue({district:undefined});
                        setDistricts(originalDistricts.filter((x: any)=>x.Value.indexOf(province.value)===0))
                    }
                }
                }
            >
                <Form.Item
                    label="Họ và tên"
                    name="customerName"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                {/*{productId === ENSURE_ELECTRIC && <Form.Item*/}
                {/*    label="Địa chỉ"*/}
                {/*    name="customerAddress"*/}
                {/*    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}*/}
                {/*>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                {/*}*/}
                 <Form.Item
                    label="Số điện thoại"
                    name="customerPhone"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                    normalize={(value, prevValue) => {
                        let raw = value.replace(/[^\d]/g, "");
                        return raw;
                    }}
                >
                    <Input/>
                </Form.Item>
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
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng nhập đầy đủ thông tin')),
                        },
                    ]}
                >
                    <Checkbox>
                        Tôi xác nhận thông tin là chính xác và đồng ý với <a href={`./pdf/${productId}.pdf`} target={'_blank'}>quy tắc sản phẩm</a>
                    </Checkbox>
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
                    name="carName"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Biển số xe"
                    name="carNumber"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="carProvince"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Tỉnh/Thành Phố">
                        {
                            provinces.map((x: any,index: number)=>{
                                return  <Select.Option key={index} value={x.Value}>{x.Text}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                {/*<Form.Item*/}
                {/*    label="Địa chỉ"*/}
                {/*    name="carAddress"*/}
                {/*    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}*/}
                {/*>*/}
                {/*    <Input.TextArea placeholder={''}*/}
                {/*                    rows={5}></Input.TextArea>*/}
                {/*</Form.Item>*/}
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
                        {
                            years.map((x: any,index: number)=>{
                                return  <Select.Option key={index} value={x}>{x}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <span className={'robotobold txt-size-h1'}>Địa điểm căn nhà</span>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="province"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Tỉnh/Thành Phố" >
                        {
                            provinces.map((x: any,index: number)=>{
                                return  <Select.Option key={index} value={x.Value}>{x.Text}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Quận/ Huyện"
                    name="district"
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Quận/ Huyện">
                        {
                            districts.map((x: any,index: number)=>{
                                return  <Select.Option key={index} value={x.Value}>{x.Text}</Select.Option>
                            })
                        }
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
            <RowItem title={'Họ và tên'} value={productId === ENSURE_CAR?bodyRegister.TenKH:bodyRegister.khach_hang}></RowItem>
            {productId === ENSURE_ELECTRIC && <RowItem title={'Địa chỉ'} value={bodyRegister.dia_chi}></RowItem>}
            {productId === ENSURE_CAR || productId === ENSURE_HOUSE ?
                <RowItem title={'Số điện thoại'} value={productId === ENSURE_CAR?bodyRegister.DienThoai:bodyRegister.so_dienthoai}></RowItem> : null}
            <RowItem title={'Địa chỉ email'} value={productId === ENSURE_CAR?bodyRegister.EmailKH:bodyRegister.Email}></RowItem>
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
                    <RowItem title={'Họ và tên'} value={bodyRegister.TenChuXe}></RowItem>
                    <RowItem title={'Biển số xe'} value={bodyRegister.BienKiemSoat}></RowItem>
                    <RowItem title={'Tỉnh/Thành Phố'} value={provinceSelected.Text}></RowItem>
                    <RowItem title={'Mục đích sử dụng'} value={getPurpose()}></RowItem>
                    <RowItem title={'Số chỗ ngồi'} value={bodyRegister.ChoNgoi}></RowItem>
                </div> : productId === ENSURE_HOUSE ? <div>
                    <span className={'robotobold txt-size-h1'}>Thông tin căn nhà</span>
                    <RowItem title={'Năm xây dựng'} value={bodyRegister.nam_xaydung}></RowItem>
                    <span className={'robotobold txt-size-h1'}>Địa điểm căn nhà</span>
                    <RowItem title={'Tỉnh/Thành Phố'} value={provinceSelected.Text}></RowItem>
                    <RowItem title={'Quận/ Huyện'} value={districtSelected.Text}></RowItem>
                    <RowItem title={'Địa chỉ chi tiết'} value={bodyRegister.dia_chi}></RowItem>
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
                    <Col span={isDesktopOrLaptop?12:24}>
                        <Steps responsive={false} labelPlacement={'vertical'} current={currentStep}>
                            <Step title="Đăng ký"/>
                            <Step title="Xác nhận"/>
                            <Step title="Thanh toán"/>
                        </Steps>
                    </Col>
                </Row>
                <Row className={'justify-content-center mgt20'}>
                    <Col span={isDesktopOrLaptop?12:24} className={'pdr20'}>
                        {renderStep()}
                        <Row className={'justify-content-between mgt20'}>
                            <Button onClick={() => {
                                if(currentStep>0) setStep(currentStep - 1);
                                else navigate(`/products/${productId}`);
                            }} size={'large'}
                                    shape={'round'}>Quay lại</Button>
                            <Button onClick={nextStep} size={'large'} shape={'round'}
                                    type={'primary'}>{currentStep < 2 ? 'Tiếp tục' : 'Xác nhận thanh toán'}</Button>
                        </Row>
                    </Col>
                    {isDesktopOrLaptop&&<Col span={10}>
                        <Card title="Thông tin đơn hàng">
                            <RowItem title={'Tên sản phẩm'} value={getProductName()}></RowItem>
                            <RowItem title={'Nhà cung cấp'} value={'Bảo hiểm PVI'}></RowItem>
                            <RowItem title={'Gói sản phẩm'} value={getPackageName()}></RowItem>
                            <RowItem title={'Ngày hiệu lực'} value={formatDate(moment())}></RowItem>
                            <RowItem title={'Chu kì thanh toán'} value={'1 năm'}></RowItem>
                            <RowItem title={'Tổng phí bảo hiểm'}
                                     value={formatMoneyByUnit(lodash.get(fee, 'TotalFee', ''))}></RowItem>
                        </Card>
                    </Col>}
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

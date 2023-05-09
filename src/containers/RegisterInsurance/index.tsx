import React, {useEffect, useState} from 'react';
import MainLayout from "../../components/Layout";
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Result, Row, Select, Steps} from "antd";
import moment from "moment";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import RowItem from '../../components/RowItem';
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {
    CPID, DATA_REGISTER,
    ENSURE_CAR,
    ENSURE_ELECTRIC, ENSURE_EXTEND,
    ENSURE_HOUSE, ENSURE_MOTOR,
    FEE,
    FEE_REQUEST,
    STANDARD_DATE_FORMAT, WEBCODE_VIETTEL_STORE
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
import {Link} from 'react-router-dom';
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {useMediaQuery} from "react-responsive";
import iconStep1 from "../../resources/images/li-cancuoc.svg";
import iconStep2 from "../../resources/images/li-list.svg";
import iconStep3 from "../../resources/images/icon-payment.svg";
import iconTien from "../../resources/images/tt-tien.svg";
import iconPayment from "../../resources/images/payment.svg";
import iconSuccess from "../../resources/images/tt-thanhcong.svg";
import SuccessModal from "../../components/Modal/SuccessModal";

const {Step} = Steps;
const {confirm} = Modal;

function RegisterInsurance() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    let [searchParams, setSearchParams] = useSearchParams();
    let {productId} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useSessionStorage('profile', false);
    const [packageCode, setPackageCode] = useState<string | null>(searchParams.get('packageCode'));
    const [currentStep, setStep] = useState<number>(0);
    const [fee] = useState<any>(localStorageRead(FEE));
    const [currentDateString, setCurrentDateString] = useState(localStorageRead('DATE'));
    const [feeRequest] = useState(localStorageRead(FEE_REQUEST));
    const [dataExtendRegister] = useState(localStorageRead(DATA_REGISTER));
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [provinceSelected, setProvinceSelected] = useState<any>();
    const [districtSelected, setDistrictSelected] = useState<any>();
    const [originalDistricts, setOriginalDistricts] = useState<any>([]);
    const [years, setYears] = useState<any>([]);
    const [agree, setAgree] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
    const [cardId, setCardId] = useSessionStorage('cardid', '');
    const [motoCategories, setMotoCategories] = useState<any>([]);
    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    const [bodyRegister, setBodyRegister] = useState<any>();
    const getMotoCategories = () => {
        categoryRepository.getCategories('LOAIXEMOTOR').then(res => {
            setMotoCategories(res.Data);
        }).catch(err => {

        });
    }
    useEffect(() => {
        if (productId === ENSURE_CAR || productId === ENSURE_HOUSE|| productId === ENSURE_MOTOR)
            getProvinces();
        getMotoCategories();
        if (productId === ENSURE_HOUSE) {
            let items: any = [];
            for (let i = 0; i <= 50; i++)
                items.push(moment().add('year', -i).get('year'));
            setYears(items);
            getDistricts();
        }
        if (!currentDateString) {
            setCurrentDateString(formatDate(moment().add(1,'d')));
        }
    }, []);
    const getPurpose = () => {
        let purposeCode = searchParams.get('purpose');
        switch (purposeCode) {
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
            case ENSURE_EXTEND:
                return 'Bảo hiểm bảo hành mở rộng';
            case ENSURE_MOTOR:
                return 'Bảo hiểm xe máy PVI';
        }
    }
    const getPackageName = () => {
        if (productId === ENSURE_ELECTRIC) {
            switch (packageCode) {
                case '01':
                    return 'Gói Đồng';
                case '02':
                    return 'Gói Bạc';
                case '03':
                    return 'Gói Vàng';
            }
        } else if (productId === ENSURE_CAR||productId === ENSURE_MOTOR) {
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
                    return 'Gói Đồng';
                case '02':
                    return 'Gói Bạc';
                case '03':
                    return 'Gói Vàng';
            }
        }
    }
    const getProvinces = () => {
        categoryRepository.getCategories('DMTINH').then(res => {
            setProvinces(res.Data);
        }).catch(err => {

        });
    }
    const onContinue=()=>{
      navigate(-1)
    }
    const getDistricts = () => {
        categoryRepository.getCategories('DIADIEM_BH').then(res => {
            setOriginalDistricts(res.Data);
        }).catch(err => {

        });
    }
    const nextStep = () => {
        if (currentStep === 0) {
            if(!agree) return;
            form.validateFields().then(values => {
                // let fiels = form.getFieldsValue();
                // console.log(values);
                let body: any = {};
                let dateStart = formatDate(moment(currentDateString, 'DD/MM/YYYY'));
                let datePaid = formatDate(moment());
                let duration = formatDate(moment(currentDateString, 'DD/MM/YYYY').add(1, 'y'));
                if (productId === ENSURE_ELECTRIC) {
                    let listThamGia = [];
                    listThamGia.push({
                        ten_khach: values.ownerName,
                        so_cmnd: values.ownerCMND,
                        ngay_sinh: '',
                        dien_thoai: values.ownerPhone
                    });
                    values.persons?.map((x: any) => {
                        if(x.fullname&&x.so_cmnd)
                        listThamGia.push({
                            ten_khach: x.fullname,
                            so_cmnd: x.so_cmnd
                        });
                    });
                    let totalAmount = packageCode === '01' ? 10000000 : packageCode === '02' ? 20000000 : 40000000;

                    body = {
                        'ma_giaodich': `${CPID}${moment().valueOf()}`,
                        'package': packageCode,
                        'khach_hang': values.customerName,
                        'dia_chi': values.customerAddress,
                        'email': values.customerEmail,
                        'so_dienthoai': values.customerPhone,
                        'list_nguoithamgia': listThamGia,
                        'tong_phi': lodash.get(fee, 'TotalFee', ''),
                        'CpId': CPID,
                        'sotien_bh': packageCode === '01' ? 10000000 : packageCode === '02' ? 20000000 : 40000000,
                        'ngaythanhtoan': datePaid,
                        'thoihan_bh': duration,
                        'ngay_batdau': dateStart,
                        'tong_tienbh': totalAmount,
                        'ngay_capd': datePaid,
                        'starttime': '00:00',
                        'endtime': '00:00',
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
                } else if (productId === ENSURE_HOUSE) {
                    let totalAmount = packageCode === '01' ? 100000000 : packageCode === '02' ? 200000000 : 400000000;
                    body = {
                        'ma_giaodich': `${CPID}${moment().valueOf()}`,
                        'package': packageCode,
                        'goi_dichvu': '',
                        'ma_tinh': values.province,
                        'ma_user': '',
                        'ma_pkt': '',
                        'ma_donvi': '',
                        'file_GYC': '',
                        'MaKhach': '',
                        'ma_phuongthuc_thanhtoan': '0',
                        'ma_daiLy': '',
                        'ma_diadiem': values.district,
                        'select_mahieu_ruiro': '0',
                        'select_danhsach_cautruc_xd': '',
                        'ngaythanhtoan': datePaid,
                        'nguoimua_bh': '',
                        'ma_canbo_kt': '',
                        'so_donbh': '',
                        'khach_hang': values.customerName,
                        'thoihan_bh': duration,
                        'endtime': '00:00',
                        'phi_giamphi': '0',
                        'pr_key': '0',
                        'Email': values.customerEmail,
                        'ngay_batdau': dateStart,
                        'starttime': '00:00',
                        'dia_chi': values.address,
                        'ma_nhomkenh': '',
                        'ma_kenhbh': '',
                        'loai_dcap': false,
                        'ma_moigioi': '',
                        'phi_moi_gioi': '',
                        'ma_phuongthuc_kt': '',
                        'tyle_bt': '0',
                        'giatri_taisan': '0',
                        'ma_danhsach_msudung': '',
                        'pvbh_dkbs_01': false,
                        'pvbh_dkbs_02': false,
                        'link_filehd': '',
                        'ma_tt': '',
                        'makhach_th': '',
                        'diachi_th': '',
                        'so_ctu': '',
                        'select_loai_dichvu': '',
                        'ttin_bosung': '',
                        'muc_khautru': '',
                        'nam_xaydung': values.year,
                        'so_tangnoi': '0',
                        'so_tangham': '0',
                        'dk_bs_bh_khac': false,
                        'diengiai_dk_bs_bh_khac': '',
                        'ma_sp_dichvu': '',
                        'ma_sovat': '',
                        'is_hdon_dt': false,
                        'ttin_hd_dientu': '',
                        'so_dienthoai': values.customerPhone,
                        'so_cmt_hochieu': '',
                        'nmua_hang': '',
                        'dchi_xhoadon': '',
                        'nnghe_kd': '',
                        'dk_thanhtoan': '',
                        'tyle_cnbb': '0',
                        'diachi_nguoibh': '',
                        'sotien_bh_bentrong': '',
                        'tong_phi': lodash.get(fee, 'TotalFee', ''),
                        'CpId': CPID,
                        'tong_tienbh': totalAmount,
                        'Sign': sign(`${values.customerEmail}${datePaid}${duration}${dateStart}${fee.TotalFee}${totalAmount}`)
                    }
                    setProvinceSelected(provinces.find((x: any) => x.Value === values.province));
                    setDistrictSelected(districts.find((x: any) => x.Value === values.district));
                } else if (productId === ENSURE_CAR) {
                    let ma_giaodich = `${CPID}${moment().valueOf()}`;
                    body = {
                        'ma_giaodich': ma_giaodich,
                        "TenKH": values.customerName,
                        "CardId": lodash.get(values,'customerCardId',''),
                        "DiaChiKH": "",
                        "TenChuXe": values.carName,
                        "DiaChiChuXe": '',
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
                        "ThamGiaLaiPhu": lodash.get(feeRequest, 'thamgia_laiphu', false),
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
                        "LoaiXe": lodash.get(feeRequest,'ma_loaixe',''),
                        "ChoNgoi": lodash.get(feeRequest, 'so_cho', '0'),
                        "TrongTai": lodash.get(feeRequest, 'ma_trongtai', ''),
                        "MTNHangHoa": "0",
                        "SoTan": "0",
                        "TyLeGPHang": "0",
                        "MTNLaiPhu": lodash.get(feeRequest, 'mtn_laiphu', '0'),
                        "SoNguoiToiDa": lodash.get(feeRequest, 'so_cho', '0'),
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
                        "MayKeo": lodash.get(feeRequest, 'MayKeo', false),
                        "XeChuyenDung": lodash.get(feeRequest, 'XeChuyenDung', false),
                        "XeChoTien": lodash.get(feeRequest, 'XeChoTien', false),
                        "XePickUp": lodash.get(feeRequest, 'XePickUp', false),
                        "XeTaiVan": lodash.get(feeRequest, 'XeTaiVan', false),
                        "XeTapLai": lodash.get(feeRequest, 'XeTapLai', false),
                        "XeBus": lodash.get(feeRequest, 'XeBus', false),
                        "XeCuuThuong": lodash.get(feeRequest, 'XeCuuThuong', false),
                        "Xetaxi": lodash.get(feeRequest, 'Xetaxi', false),
                        "XeDauKeo": lodash.get(feeRequest, 'XeDauKeo', false),
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
                        "GioCuoi": "00:00",
                        "khach_hang": "false",
                        "pr_key": "0",
                        "GiaTriPin": "0",
                        "CpId": CPID,
                        "Sign": sign(ma_giaodich)
                    }
                    setProvinceSelected(provinces.find((x: any) => x.Value === values.carProvince));
                }else if(productId===ENSURE_EXTEND){
                    let ma_giaodich = `${CPID}${moment().valueOf()}`;
                    let chuong_trinh = lodash.get(dataExtendRegister,'chuong_trinh','');
                     body={
                        "CpId": CPID,
                        "Sign": sign(`${dataExtendRegister.ngay_batdau}${dataExtendRegister.thoihan_bh}${ma_giaodich}${lodash.get(values,'customerEmail','')}`),
                        ma_chuongtrinh:chuong_trinh,
                        ng_gdich_th:values.customerName,
                        dia_chi_th:values.customerAddress,
                        ma_gdich_doitac:ma_giaodich,
                        ma_user:lodash.get(profile,'ma_user',''),
                        EndTime:'00:00',
                        StartTime:'00:00',
                        dien_thoai:values.customerPhone,
                        khach_hang:values.customerName,
                        thoihan_bh:dataExtendRegister.thoihan_bh,
                        pr_key:0,
                        Email: lodash.get(values,'customerEmail',''),
                        ngay_batdau:dataExtendRegister.ngay_batdau,
                        dia_chi:values.customerAddress,
                        ThietBiDinhKem:[
                            {
                                loai_thietbi:lodash.get(dataExtendRegister,'loai_thietbi',''),
                                hang:lodash.get(dataExtendRegister,'hang',''),
                                model:lodash.get(dataExtendRegister,'model',''),
                                so_serial:lodash.get(dataExtendRegister,'so_serial',''),
                                so_IMEI:lodash.get(dataExtendRegister,'so_IMEI',''),
                                thoihan_batdau_baohanh_nsx:lodash.get(dataExtendRegister,'thoihan_batdau_baohanh_nsx',''),
                                thoihan_ketthuc_baohanh_nsx:lodash.get(dataExtendRegister,'thoihan_ketthuc_baohanh_nsx',''),
                                giatri_thietbi:lodash.get(dataExtendRegister,'giatri_thietbi',''),
                                phi_baohiem_thietbi:lodash.get(fee,'TotalFee',''),
                                sotien_baohiem:lodash.get(dataExtendRegister,'giatri_thietbi',''),
                                goi_khuyenmai:lodash.get(dataExtendRegister,'khuyen_mai',0),

                            }
                        ]

                }
                }else if(productId===ENSURE_MOTOR){
                    setProvinceSelected(provinces.find((x: any) => x.Value === values.carProvince));
                    let dateStart = formatDate(moment(currentDateString, 'DD/MM/YYYY'));
                    let duration = formatDate(moment(currentDateString, 'DD/MM/YYYY').add(1, 'y'));
                    body={
                        ma_giaodich:`${CPID}${moment().valueOf()}`,
                        "CpId": CPID,
                        diachi_nguoimua_bh: '',
                        so_donbh: '',
                        ngay_cap: formatDate(moment()),
                        ngay_dau: dateStart,
                        ngay_cuoi: duration,
                        bien_kiemsoat: values.carNumber,
                        so_may: '',
                        so_khung: '',
                        loai_xe: dataExtendRegister.loai_xe,
                        nhan_hieu: '',
                        nam_sanxuat: '',
                        ten_chuxe: values.carName,
                        email: values.customerEmail,
                        so_dienthoai: values.customerPhone,
                        dia_chi: provinceSelected?.Text,
                        nhom_kenhbh: '',
                        kenh_banhang: '',
                        canbo_khaithac: '',
                        ngay_thanhtoan: '',
                        ma_daily: '',
                        ma_donvi: '',
                        ma_pkt: '',
                        ma_canbo_kt: '',
                        ma_user: '',
                        ma_tinh: values.carProvince,
                        ngay_ctu: formatDate(moment()), //dd/MM/yyyy
                        thamgia_laiphu: packageCode==='01'?false:true,
                        muc_trachnhiem_laiphu: packageCode==='01'?0: packageCode==='02'?10000000:50000000,
                        so_nguoi_tgia_laiphu: packageCode==='01'?0:2,
                        an_bien_ks: false,
                        pr_key: 0,
                    };
                    body.Sign=sign(`${body.bien_kiemsoat}${body.email}${body.so_dienthoai}${body.loai_xe}`);
                }
                body.web_code=webCode?webCode:'';
                setBodyRegister(body);
                setStep(currentStep + 1);
            }).catch(err => {
                console.log(err);
            });
        } else if (currentStep < 2) {
            setStep(currentStep + 1);
        } else {
            // console.log('vao day');
            setShowConfirm(true);
        }

    }
    const onSubmit = () => {
        setLoading(true);
        if (webCode)
            bodyRegister.web_code = webCode;
        if (productId === ENSURE_ELECTRIC) {
            productRepository.createOrderHSDD(bodyRegister).then(res => {
                if(res.URL_Payment){
                    window.location.href=res.URL_Payment;
                    // window.open(res.URL_Payment);
                }
                else {
                    setResult(true);
                    setShowResult(true);
                }
            }).catch(err => {
                setResult(false);
                setShowResult(true);
            }).finally(() => {
                setShowConfirm(false);
                setLoading(false);
                // setShowResult(true);
            });
        } else if (productId === ENSURE_HOUSE) {
            productRepository.createOrderHouse(bodyRegister).then(res => {
                if(res.URL_Payment){
                    // window.open(res.URL_Payment);ắc
                    window.location.href=res.URL_Payment;
                }
                else {
                    setResult(true);
                    setShowResult(true);
                }
            }).catch(err => {
                setResult(false);
                setShowResult(true);
            }).finally(() => {
                setShowConfirm(false);
                setLoading(false);
                // setShowResult(true);
            });
        } else if (productId === ENSURE_CAR) {
            productRepository.createOrderCar(bodyRegister).then(res => {
                if(res.URL_Payment){
                    // window.open(res.URL_Payment);
                    window.location.href=res.URL_Payment;
                }
                else {
                    setResult(true);
                    setShowResult(true);
                }
            }).catch(err => {
                setResult(false);
                setShowResult(true);
            }).finally(() => {
                setShowConfirm(false);
                setLoading(false);
                // setShowResult(true);
            });
        }else if(productId===ENSURE_EXTEND){
            productRepository.createOrderExtend(bodyRegister).then(res => {
                if(res.URL_Payment){
                    // window.open(res.URL_Payment);
                    window.location.href=res.URL_Payment;
                }
                setResult(true);
            }).catch(err => {
                setResult(false);
            }).finally(() => {
                setShowConfirm(false);
                setLoading(false);
                setShowResult(true);
            });
        }else if (productId === ENSURE_MOTOR) {
            productRepository.createOrderMotor(bodyRegister).then(res => {
                if(res.URL_Payment){
                    // window.open(res.URL_Payment);
                    window.location.href=res.URL_Payment;
                }
                else setResult(true);
            }).catch(err => {
                setResult(false);
            }).finally(() => {
                setShowConfirm(false);
                setLoading(false);
                // setShowResult(true);
            });
        }
    }
    const renderOrderInfo=()=>{
        return <div className="col-md-5">
            <div className="info-order">
                <h3>Thông tin đơn hàng</h3>
                <p>Tên sản phẩm</p>
                <p>{getProductName()}</p>
                <div className="text-small">
                    <p>Nhà cung cấp: Bảo hiểm PVI</p>
                    {packageCode&&<p>{`Gói sản phẩm: ${getPackageName()}`}</p>}
                    {productId===ENSURE_EXTEND?
                        <div>
                            <RowItem title={'Loại thiết bị'} value={dataExtendRegister?.loai_thietbi}></RowItem>
                            <RowItem title={'Hãng'} value={dataExtendRegister?.hang}></RowItem>
                            <RowItem title={'Model'} value={dataExtendRegister?.model}></RowItem>
                            <RowItem title={'Số Serial/IMEI'} value={dataExtendRegister?.so_serial}></RowItem>
                            {/*<RowItem title={'Số IMEI'} value={dataExtendRegister?.so_IMEI}></RowItem>*/}
                            <RowItem title={'Thời hạn bảo hành gốc của nhà sản xuất'} value={`Từ ${dataExtendRegister?.thoihan_batdau_baohanh_nsx} đến ${dataExtendRegister?.thoihan_ketthuc_baohanh_nsx}`}></RowItem>
                            <RowItem title={'Thời hạn bảo hiểm bảo hành mở rộng'} value={`Từ ${dataExtendRegister.ngay_batdau} đến ${dataExtendRegister.thoihan_bh}`}></RowItem>
                            <RowItem title={'Giá trị thiết bị tại thời điểm tham gia bảo hiểm'} value={formatMoneyByUnit(dataExtendRegister?.giatri_thietbi)}></RowItem>
                            <p><strong>{`PHÍ BẢO HIỂM (bao gồm VAT): ${formatMoneyByUnit(fee.TotalFee)}`}</strong></p>
                        </div>:
                        <div>
                            <p>Ngày hiệu lực: {formatDate(moment(currentDateString, 'DD/MM/YYYY'))}</p>
                            <p>Ngày hết hạn: {formatDate(moment(currentDateString, 'DD/MM/YYYY').add(1, 'y'))}</p>
                            <p>{`Tổng phí bảo hiểm: ${formatMoneyByUnit(fee?.TotalFee)}/năm`}</p>
                        </div>}
                </div>
            </div>
        </div>
    }
    const renderStep1 = () => {
        return <div className="confirm-info">
            <div className="row">
                <div className="col-md-7">
                    <div className="info-customer">
                        <h3>Người mua bảo hiểm</h3>
                        <Form
                            form={form}
                            name="basic"
                            layout="vertical"
                            className={'form-register mg120'}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Họ và tên"
                                name="customerName"
                                className={'mgbt5'}
                                rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                            >
                                <Input placeholder={'Nhập họ tên'}/>
                            </Form.Item>
                            {productId===ENSURE_EXTEND&& <Form.Item
                                label="Địa chỉ"
                                name="customerAddress"
                                rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                            >
                                <Input placeholder={'Nhập địa chỉ'}></Input>
                            </Form.Item>}
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="customerPhone"
                                        className={'mgbt5'}
                                        rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                                        normalize={(value, prevValue) => {
                                            let raw = value.replace(/[^\d]/g, "");
                                            return raw;
                                        }}
                                    >
                                        <Input placeholder={'Nhập số điện thoại'}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email"
                                        name="customerEmail"
                                        className={'mgbt5'}
                                        rules={[{required: productId===ENSURE_EXTEND?false:true, message: 'Vui lòng nhập đầy đủ thông tin'}, {
                                            type: 'email',
                                            message: 'Email không đúng định dạng',
                                        }]}
                                    >
                                        <Input placeholder={'Nhập email'}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {productId===ENSURE_CAR&& <Form.Item
                                label="Mã giới thiệu"
                                name="customerCardId"
                            >
                                <Input placeholder={'Nhập mã giới thiệu'}></Input>
                            </Form.Item>}
                            {renderFormByProductId()}
                        </Form>
                    </div>
                </div>
                {renderOrderInfo()}
            </div>
        </div>
    }
    const renderFormByProductId = () => {
        if (productId === ENSURE_ELECTRIC) {
            return <div>
                <h3>Chủ hộ</h3>
                <p className={'info-italic'}>*Người đứng tên làm chủ hộ trong sổ hộ khẩu. Chỉ cần chủ hộ đăng ký, các thành viên còn lại trong sổ hộ khẩu đều được bảo hiểm</p>
                <Form.Item
                    label="Họ và tên"
                    name="ownerName"
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input placeholder={'Họ và tên'}/>
                </Form.Item>
                <Form.Item
                    label="CMND/CCCD/Hộ chiếu"
                    name="ownerCMND"
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                    normalize={(value, prevValue) => {
                        let raw = value.replace(/[^\d]/g, "");
                        return raw;
                    }}
                >
                    <Input placeholder={'CMND/CCCD/Hộ chiếu'}/>
                </Form.Item>
                <h3>Thành viên bổ sung</h3>
                <Row className={'mgt5 mgbt5'}><p className={'info-italic'}>* Thành viên trong gia đình sống cùng chủ hộ nhưng không có tên trong hộ khẩu</p></Row>
                <Form.List name={'persons'}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}: any) => (

                                <div className="new-member">
                                   <span onClick={() => {
                                       remove(name);
                                   }
                                   } className={'txt-size-h4 txt-color-red delete-member'}><i
                                       className="fas fa-trash-alt"></i></span>
                                    <Form.Item
                                        {...restField}
                                        label="Họ và tên"
                                        className={'mgbt5'}
                                        name={[name, 'fullname']}
                                    >
                                        <Input placeholder={'Nhập họ và tên'}/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label="Số CMND/CCCD/Hộ chiếu"
                                        className={'mgbt5'}
                                        name={[name, 'so_cmnd']}
                                    >
                                        <Input placeholder={'Nhập CMND/CCCD/Hộ chiếu'}/>
                                    </Form.Item>
                                </div>
                            ))}
                            <Form.Item>
                                <button className="add-member" onClick={() => {
                                    add();
                                }}><img className={'mgr15'} src={require('../../resources/images/icon-add.png')} alt=""/>Thêm thành viên</button>

                            </Form.Item>
                             </>
                    )}
                </Form.List>

            </div>
        } else if (productId === ENSURE_CAR||productId === ENSURE_MOTOR) {
            return <div>
                <span className={'robotobold txt-size-h1'}>Thông tin đăng ký xe</span>
                <Form.Item
                    label="Họ và tên"
                    name="carName"
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Biển số xe"
                    name="carNumber"
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="carProvince"
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Tỉnh/Thành Phố">
                        {
                            provinces.map((x: any, index: number) => {
                                return <Select.Option key={index} value={x.Value}>{x.Text}</Select.Option>
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
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select placeholder="Năm xây dựng">
                        {
                            years.map((x: any, index: number) => {
                                if (x < 1993) return;
                                return <Select.Option key={index} value={x}>{x}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <span className={'robotobold txt-size-h1'}>Địa điểm căn nhà</span>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="province"
                    className={'mgbt5'}
                    rules={[{required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
                >
                    <Select onChange={(value) => {
                        {
                            form.setFieldsValue({district: undefined});
                            setDistricts(originalDistricts.filter((x: any) => x.Value.indexOf(value) === 0))
                        }
                    }} placeholder="Tỉnh/Thành Phố">
                        {
                            provinces.map((x: any, index: number) => {
                                return <Select.Option key={index} value={x.Value}>{x.Text}</Select.Option>
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
                            districts.map((x: any, index: number) => {
                                return <Select.Option key={index} value={x.Value}>{x.Text}</Select.Option>
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
        return <div className="confirm-info">
            <div className="row">
                <div className="col-md-7">
                    <div className="info-customer">
            <h3>Người mua bảo hiểm</h3>
            <RowItem title={'Họ và tên'} value={form.getFieldValue('customerName')}></RowItem>
            {productId === ENSURE_EXTEND && <RowItem title={'Địa chỉ'} value={bodyRegister.dia_chi}></RowItem>}
            <RowItem title={'Số điện thoại'} value={form.getFieldValue('customerPhone')}></RowItem>
            <RowItem title={'Địa chỉ email'} value={form.getFieldValue('customerEmail')}></RowItem>
            {productId === ENSURE_CAR && <RowItem title={'Mã giới thiệu'} value={bodyRegister.CardId}></RowItem>}
            {
                productId === ENSURE_ELECTRIC ? <div>
                    <h3>Chủ hộ</h3>
                    <RowItem title={'Họ và tên'} value={bodyRegister.list_nguoithamgia[0].ten_khach}></RowItem>
                    <RowItem title={'CMND/CCCD/Hộ chiếu'} value={bodyRegister.list_nguoithamgia[0].so_cmnd}></RowItem>
                    {/*<RowItem title={'Số điện thoại'} value={bodyRegister.list_nguoithamgia[0].dien_thoai}></RowItem>*/}
                    {/*<RowItem title={'Ngày sinh'} value={bodyRegister.list_nguoithamgia[0].ngay_sinh}></RowItem>*/}
                    {bodyRegister.list_nguoithamgia?.length>1&&<h3>Thành viên bổ sung</h3>}
                    {
                        bodyRegister.list_nguoithamgia.map((x: any, index: number) => {
                            if (index === 0)
                                return null
                            return <div className={'row-person'}>
                                <p>{index}</p>
                                <p>
                                    <span>{`Họ và tên: ${x.ten_khach}`}</span>
                                    <span>{`Số CMT/CCCD/Hộ chiếu: ${x.so_cmnd}`}</span>
                                </p>
                            </div>
                        })
                    }
                </div> : productId === ENSURE_CAR ? <div>
                    <h3>Thông tin đăng ký xe</h3>
                    <RowItem title={'Họ và tên'} value={bodyRegister.TenChuXe}></RowItem>
                    <RowItem title={'Biển số xe'} value={bodyRegister.BienKiemSoat}></RowItem>
                    <RowItem title={'Tỉnh/Thành Phố'} value={provinceSelected.Text}></RowItem>
                    <RowItem title={'Mục đích sử dụng'} value={getPurpose()}></RowItem>
                    <RowItem title={'Số chỗ ngồi'} value={bodyRegister.ChoNgoi}></RowItem>
                </div>:productId === ENSURE_MOTOR ? <div>
                    <h3>Thông tin đăng ký xe</h3>
                    <RowItem title={'Họ và tên'} value={bodyRegister.ten_chuxe}></RowItem>
                    <RowItem title={'Biển số xe'} value={bodyRegister.bien_kiemsoat}></RowItem>
                    <RowItem title={'Tỉnh/Thành Phố'} value={provinceSelected?.Text}></RowItem>
                    <RowItem title={'Loại xe'} value={motoCategories?.find((x: any)=> x.Value===bodyRegister.loai_xe)?.Text}></RowItem>
                </div> : productId === ENSURE_HOUSE ? <div>
                    <h3>Thông tin căn nhà</h3>
                    <RowItem title={'Năm xây dựng'} value={bodyRegister.nam_xaydung}></RowItem>
                    <h3>Địa điểm căn nhà</h3>
                    <RowItem title={'Tỉnh/Thành Phố'} value={provinceSelected.Text}></RowItem>
                    <RowItem title={'Quận/ Huyện'} value={districtSelected.Text}></RowItem>
                    <RowItem title={'Địa chỉ chi tiết'} value={bodyRegister.dia_chi}></RowItem>
                </div> :  productId === ENSURE_EXTEND ? <div>
                    <h3>Thông tin thiết bị được bảo hiểm</h3>
                    <RowItem title={'Loại thiết bị'} value={dataExtendRegister?.loai_thietbi}></RowItem>
                    <RowItem title={'Hãng'} value={dataExtendRegister?.hang}></RowItem>
                    <RowItem title={'Model'} value={dataExtendRegister?.model}></RowItem>
                    <RowItem title={'Số Serial/IMEI'} value={dataExtendRegister?.so_serial}></RowItem>
                    {/*<RowItem title={'Số IMEI'} value={dataExtendRegister?.so_IMEI}></RowItem>*/}
                    <RowItem title={'Thời hạn bảo hành gốc của nhà sản xuất'} value={`Từ ${dataExtendRegister?.thoihan_batdau_baohanh_nsx} đến ${dataExtendRegister?.thoihan_ketthuc_baohanh_nsx}`}></RowItem>
                    <RowItem title={'Thời hạn bảo hiểm bảo hành mở rộng'} value={`Từ ${dataExtendRegister.ngay_batdau} đến ${dataExtendRegister.thoihan_bh}`}></RowItem>
                    <RowItem title={'Giá trị thiết bị tại thời điểm tham gia bảo hiểm'} value={formatMoneyByUnit(dataExtendRegister?.giatri_thietbi)}></RowItem>
                    <p><strong>{`PHÍ BẢO HIỂM (bao gồm VAT): ${formatMoneyByUnit(fee.TotalFee)}`}</strong></p>
                </div> : null
            }
                </div>
                </div>
                {renderOrderInfo()}
            </div>
        </div>
    }
    const renderStep3 = () => {
        return <div className="confirm-info">
            <div className="row">
                <div className="col-md-7">
                    <div className="info-customer">
                        <img src={iconTien} alt=""/>
                            <p>Thanh toán tiền mặt</p>
                            <p>Nhân viên bán hàng thu tiền mặt <br/>của khách hàng</p>
                    </div>
                </div>
                {renderOrderInfo()}
            </div>
        </div>
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
        <div className={`confirm-page content ${currentStep<2?'register':'confirm-payment'}`}>
            <div className="container">
                <div className="head-title">
                    <h1>Đăng ký mua</h1>
                    <p>Vui lòng thực hiện theo các bước</p>
                    <ul>
                        <li className={currentStep===0?'active':currentStep>0?'visited':''}><a><img src={iconStep1} alt=""/>Đăng ký</a></li>
                        <li className={currentStep===1?'active':currentStep>1?'visited':''}><a><img src={iconStep2} alt=""/>Xác nhận</a></li>
                        <li className={currentStep===2?'active':''}><a><img src={iconStep3} alt=""/>Thanh toán</a></li>
                    </ul>
                </div>
                {renderStep()}
                {currentStep === 0 && <Row className={'justify-content-center'}>
                    <p className="agree-info">
                        <label className="checkbox-container">Tôi xác nhận thông tin là chính xác và đồng ý với <a
                            href={require(`../../resources/files/QTBH/${productId}.pdf`)} target="_blank">quy tắc sản phẩm</a>
                            <input onChange={e => setAgree(e.target.checked)} type="checkbox" autoComplete="off"
                                   checked={agree}/>
                            <span className="checkbox-checkmark"></span>
                        </label>
                    </p>
                </Row>
                }

                <div className="button-group">
                    <button onClick={()=>{
                        if(currentStep>0) setStep(currentStep - 1);
                        else navigate(-1);
                    }
                    } type="button" className="cancel">Quay lại</button>
                    <button onClick={nextStep} type="button" className="continue">{currentStep < 2 ? 'Tiếp tục' : 'Xác nhận'}</button>
                </div>
            </div>
        </div>
        {showConfirm&&<ConfirmModal loading={loading} onSubmit={onSubmit} onCancel={()=> setShowConfirm(false)} visible={showConfirm}></ConfirmModal>}
        {showResult&&<SuccessModal onCancel={()=> {
            if(!result) setShowResult(false);
            else{
                if(webCode!==WEBCODE_VIETTEL_STORE)
                    navigate('/')
                else  navigate(-1)
            }
        }} visible={showResult} isSuccess={result} gotoHome={()=> {
            if(webCode!==WEBCODE_VIETTEL_STORE)
                navigate('/')
            else  navigate(-1)
        }
        } onContinue={onContinue} />}
    </MainLayout>
}

export default RegisterInsurance;

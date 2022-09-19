import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {productRepository} from "../../repositories/ProductRepository";
import lodash from "lodash";
import {formatNumber} from "../../core/helpers/string";


function CustomerSearch(){
    const [loading, setLoading] = useState<boolean>(false);
    let [searchParams, setSearchParams] = useSearchParams();
    const [detail, setDetail] = useState();

    useEffect(()=>{
        let serialIMEI = searchParams.get('serial_IMEI');
        if(serialIMEI){
            setLoading(true);
            productRepository.searchOrderByImei({imei: serialIMEI}, 'KHNA').then(res=>{
                if(Array.isArray(res)&&res.length>0)
                    setDetail(res[0]);
            }).catch(err=>{

            }).finally(()=> setLoading(false));
        }

    },[]);
    const getPackage=(code: string)=>{
        switch (code){
            case '0101':
                return '6 tháng';
            case '0102':
                return '12 tháng';
            case '0103':
                return '2 năm';
        }
    }
    return <div className="container-customer">
        <h1>Giấy chứng nhận bảo hiểm</h1>
        <p>Certificate of Insurance</p>
        <div className="table">
            <div className="tb-box">
                <div className="divide-col">
                    <p><strong>Loại hình bảo hiểm </strong><span>Class of Insurance</span></p>
                    <p>:</p>
                    <p><strong>Bảo hiểm bảo hành mở rộng </strong><span>Extended Wrarranty</span></p>
                </div>
                <div className="divide-col">
                    <p><strong>Số hợp đồng bảo hiểm </strong><span>Policy number</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'so_donbh','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Ngày mua</strong><span>Purchase date</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'ngay_ctu','')}</p>
                </div>
            </div>
            <p className="cl-red"><strong>Thông tin Người mua bảo hiểm</strong><span>Policyholder information</span></p>
            <div className="tb-box">
                <div className="divide-col">
                    <p><strong>Chủ Hợp đồng bảo hiểm</strong><span>Policyholder</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'khach_hang','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Địa chỉ</strong><span>Address</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'dia_chi','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Số điện thoại</strong><span>Phone number</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'dien_thoai','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Email</strong><span>Email</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'Email','')}</p>
                </div>
            </div>
            <p className="cl-red"><strong>Thông tin Thiết bị được bảo hiểm</strong><span>Insured device</span></p>
            <div className="tb-box">
                <div className="divide-col">
                    <p><strong>Loại thiết bị</strong><span>Device type</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'loai_thietbi','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Hãng</strong><span>Brand</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'hang','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Model</strong><span>Model</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'model','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Số Serial/IMEI</strong><span>Serial/IMEI number</span></p>
                    <p>:</p>
                    <p>{lodash.get(detail,'so_serial','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Thời hạn bảo hành gốc của NSX</strong><span>Manufacturer’s warranty period</span></p>
                    <p>:</p>
                    <p>Từ {lodash.get(detail,'thoihan_batdau_baohanh_nsx','')} đến {lodash.get(detail,'thoihan_ketthuc_baohanh_nsx','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Thời hạn Bảo hiểm Bảo hành mở rộng</strong><span>Extended warranty period</span></p>
                    <p>:</p>
                    <p>{getPackage(lodash.get(detail,'ma_chtrinh',''))} từ {lodash.get(detail,'ngay_batdau','')} đến {lodash.get(detail,'thoihan_bh','')}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Số tiền bảo hiểm</strong><span>Sum insured</span></p>
                    <p>:</p>
                    <p>{formatNumber(lodash.get(detail,'so_tienbh',''))}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Phí bảo hiểm</strong><span>Premium</span></p>
                    <p>:</p>
                    <p>{formatNumber(lodash.get(detail,'phi_baohiem_thietbi',''))}</p>
                </div>
                <div className="divide-col">
                    <p><strong>Thời hạn thông báo hủy hợp đồng</strong><span>Time limit for contract cancellation</span></p>
                    <p>:</p>
                    <p>30 ngày kể từ ngày mua hàng (cung cấp hóa đơn mua hàng và GCNBH này để được hoàn phí) <span>30 days from the purchase date (purchase invoice and certificate of insurance must be provided for the refund)</span></p>
                </div>
            </div>
            <p>*Vui lòng gửi kèm Giấy chứng nhận bảo hiểm này cùng hồ sơ bồi thường* <br />
                <span style={{fontWeight: 'normal !important'}}>*Please attach this Certificate of Insurance with your claim documents* <br /></span>
                <strong>Lưu ý:</strong> Khách hàng nên thông báo yêu cầu bồi thường càng sớm càng tốt, nhưng không trễ hơn 30 ngày kể từ ngày thiết bị bị hư hỏng để thiết bị bảo hiểm có thể được kiểm tra và sửa chữa. <br />
                <span style={{fontWeight: 'normal !important'}}><strong>Note:</strong> Customer should send the claim request as soon as possible, no later than 30 days from the date of loss so as for the insured device to be examined and repaired.</span>
            </p>
            <p><span className="cl-red">Hotline hỗ trợ 24/7</span> (24/7 customer support): <strong>1900 545458</strong>        Email: <span className="cl-blue">hotro@digiin.vn</span></p>
        </div>
    </div>
}

export default CustomerSearch;

import React from 'react';

function CarFee(){
    return (
        <div className="row">
            <div className="col-md-8">
                <h2>Thông tin tính phí</h2>
                <label>Gói bảo hiểm</label>
                <select id="choose-insurrance">
                    {/* <option value="hide">Chọn gói bảo hiểm</option> */}
                    <option value="Đồng">Bắt buộc</option>
                    <option value="Bạc">Tiêu chuẩn</option>
                    <option value="Vàng">Nâng cao</option>
                </select>
                <label>Ngày hiệu lực</label>
                <input type="text" id="effective-date2" className="datepicker" />
                <label>Thời hạn bảo hiểm</label>
                <select id="choose-insurrance">
                    <option value="1 năm">1 năm</option>
                    <option value="2 năm">2 năm</option>
                    <option value="3 năm">3 năm</option>
                </select>
                <label>Mục đích sử dụng</label>
                <select id="selection" name="sub_sel">
                    <option value="option_1">Xe chở người không KDVT</option>
                    <option value="option_2">Xe chở người KDVT</option>
                    <option value="option_3">Xe chở hàng</option>
                </select>
                <label>Số chỗ ngồi</label>
                <input type="text" id="effective-seats" />
                <div className="special-none">
                    <label>Loại xe</label>
                    <select id="choose-insurrance">
                        <option value="Xe mới">Xe mới</option>
                        <option value="Xe cũ">Xe cũ</option>
                    </select>
                </div>
                <div id="buttons" style={{}}>
                    <form id="form-id">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">Xe chở tiền</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">Xe tập lái</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">Xe bán tải (pickup)</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                            <label className="form-check-label" htmlFor="flexRadioDefault4">Xe tải VAN</label>
                        </div>
                    </form>
                </div>
                <div id="buttons2" style={{display: 'none'}}>
                    <form id="form-id2">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">Xe bán tải (pickup)</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">Xe cứu thương</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">Xe tải VAN</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                            <label className="form-check-label" htmlFor="flexRadioDefault4">Xe taxi</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                            <label className="form-check-label" htmlFor="flexRadioDefault5">Xe bus</label>
                        </div>
                    </form>
                </div>
                <div id="buttons3" style={{display: 'none'}}>
                    <form id="form-id3">
                        <label>Trọng tải</label>
                        <input type="text" id="effective-seats" />
                        <label>Loại xe</label>
                        <select id="choose-insurrance">
                            <option value="Xe mới">Xe mới</option>
                            <option value="Xe cũ">Xe cũ</option>
                        </select>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">Xe tập lái</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">Máy kéo, xe máy chuyên dùng</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">Xe chuyên dụng khác</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                            <label className="form-check-label" htmlFor="flexRadioDefault4">Xe đầu kéo rơ mooc</label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="pc-show">Phí bảo hiểm</h3>
                <p className="pc-show" style={{fontWeight: 700, fontSize: '24px', color: '#B12121', margin: '24px 0'}}>100.000 vnđ</p>
                <h3 className="mb-show">Phí bảo hiểm <span>100.000 đồng/năm </span></h3>
                <a href="dangkyxeoto.html"><img src="images/Checkmark.svg" alt="" />Đăng ký</a>
            </div>
        </div>
    );
}
export default CarFee;

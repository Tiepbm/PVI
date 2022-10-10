import * as React from "react";
import iconSuccess from "../../resources/images/tt-thanhcong.svg";
import iconFailed from "../../resources/images/tt-thatbai.svg";

export interface SuccessModalProps {
    isSuccess:boolean;
    visible: boolean;
    onCancel: () => void;
    onContinue: () => void;
    gotoHome: () => void;
}

const SuccessModal = (props: SuccessModalProps) => {
    const {isSuccess, visible, onCancel, gotoHome, onContinue} = props;
    if(!visible) return null;
    return (
        <React.Fragment>
            <div className="modal-container">
                {/* Modal */}
                <div className="modal fade show" id="PaymentSuccess" tabIndex={-1} aria-labelledby="PaymentSuccessLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <img src={require('../../resources/images/modal-cancel.png')} alt="" onClick={onCancel} />
                            <img src={isSuccess?iconSuccess: iconFailed} alt="" />
                            <p className="text-cl" style={{color:isSuccess?'':'#B82019'}}>Đăng ký bảo hiểm <br />{isSuccess?'thành công':'thất bại'}</p>
                            <p>{isSuccess?'Khách hàng sẽ nhận được thông báo mua bảo hiểm thành công theo số điện thoại đã đăng ký':'Vui lòng thực hiện đăng ký lại'}</p>
                            <div className="modal-button">
                                <button onClick={onContinue} className="modal-cancel"><a style={{color: '#1363B9', display: 'block'}}>{isSuccess?'Đăng ký tiếp':'Đăng ký lại'}</a></button>
                                <button onClick={gotoHome} className="modal-continue"><a style={{color: '#fff', display: 'block'}}>Trang chủ</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default SuccessModal;

import * as React from "react";
import {Button, Modal, Spin} from "antd";
import iconPayment from "../../resources/images/payment.svg";
import iconSuccess from "../../resources/images/tt-thanhcong.svg";
import { LoadingOutlined } from "@ant-design/icons";

export interface ConfirmModalProps {
    visible: boolean;
    loading: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
    const {visible, onCancel, onSubmit, loading} = props;
    if(!visible) return null;
    return (
        <React.Fragment>
            <div className="modal-container">
                <div className="modal fade show" id="confirmPaymentModal" tabIndex={-1}
                     aria-labelledby="confirmPaymentModalLabel">
                    <div className="modal-dialog  modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <img src={require('../../resources/images/modal-cancel.png')} alt="" onClick={onCancel}/>
                            <img src={iconPayment} alt=""/>
                            <p>Bằng việc bấm “Tiếp tục”, bạn xác nhận đã thu đủ tiền mặt của khách hàng.</p>
                            <div className="modal-button">
                                <button onClick={onCancel} className="modal-cancel">Quay lại</button>
                                <button className="modal-continue" onClick={onSubmit}><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 20, color:'#fff' }} spin />} /> Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ConfirmModal;

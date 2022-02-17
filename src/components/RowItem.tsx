import {Col, Row} from "antd";
import React from "react";
interface RowItemProps{
    title:string;
    value: any;
    className?: string
}
function RowItem (props: RowItemProps){
    const{title, value, className} = props;
    return <Row className={`${className} mgbt5`}>
        <Col span={12}>
            <span>{title}</span>
        </Col>
        <Col span={12}>
            <span className={'robotobold'}>{value}</span>
        </Col>
    </Row>
}
export default RowItem;

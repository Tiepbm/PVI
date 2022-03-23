import {Avatar, Button, Card, Carousel, Col, Divider, Row, Skeleton, Table, Tooltip} from "antd";
import MainLayout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";

import M24ErrorUtils from "../../utils/M24ErrorUtils";
import {CPID} from "../../core/config";
import {sign} from "../../utils/StringUtils";
import M24Notification from "../../utils/M24Notification";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import Filter from "../../components/Orders/Filter";
import lodash from "lodash";
import {productRepository} from "../../repositories/ProductRepository";

function Orders() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>();
    const [dataSource, setDatasource] = useState<any[]>([]);
    const [filter, setFilter] = useState<any>({});
    const getData=(filter: any)=>{
        setShowProgressBar(true);
        productRepository.getOrders(filter).then(res=>{
            setDatasource(res.Data);
        }).catch(err=>{
            M24ErrorUtils.showError(err);
        }).finally(()=> setShowProgressBar(false));
    }
    const onSearch=(filter?: any)=>{
       getData(filter);
    }
    const columns = [
        {
            title: 'Tên đơn vị',
            dataIndex: 'ten_donvi',
            key: 'ma_user',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'ten_sp',
            key: 'ma_user',
        },
        {
            title: 'Số đơn bảo hiểm',
            dataIndex: 'so_donbh',
            key: 'so_donbh',
        },
        {
            title: 'Ngày đầu',
            dataIndex: 'ngay_dau',
            key: 'ngay_dau',
        },
        {
            title: 'Ngày cuối',
            dataIndex: 'ngay_cuoi',
            key: 'ngay_cuoi',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
        },

        ]
    return <MainLayout showProgressBar={showProgressBar} title={'Đối tác'}>
        <div className={'pd20'}>
            <Filter filter={filter} setFilter={setFilter} onSearch={onSearch}/>
            <Card className={'border-card-header mgt20'}>
                <Row className={'dpl-flex align-items-center justify-content-between'}>
                    <span className={'txt-size-h5 txt-color-black bold'}>{`Danh sách đơn ${dataSource&&dataSource.length>0?`(${dataSource.length})`:''}`}</span>
                </Row>
            </Card>
            <div>
                <Card headStyle={{alignItems: 'center', paddingTop: 0}}  className={'border-card-header mgt20'}>
                    <Skeleton active={true} loading={showProgressBar}><Table rowKey={(record) => record.id}
                                                                             dataSource={dataSource}
                                                                             pagination={{hideOnSinglePage:true}}
                                                                             columns={columns}/>
                    </Skeleton>
                </Card>
            </div>
           </div>
    </MainLayout>
}

export default Orders;

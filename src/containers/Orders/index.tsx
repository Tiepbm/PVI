import {Avatar, Button, Card, Carousel, Col, Divider, Empty, Row, Skeleton, Table, Tooltip} from "antd";
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
import {formatDate} from "../../core/helpers/date-time";
import moment from "moment";
import {formatMoneyByUnit} from "../../core/helpers/string";
const SERVICES=[
    {
        value:'',
        name:'Tất cả'
    },
    {
        value:'AUTO',
        name:'Xe cơ giới'
    },
    {
        value:'TNDT',
        name:'Hộ SD điện'
    },
    {
        value:'020115',
        name:'Toàn diện nhà tư nhân'
    },
]
function Orders() {
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [dataSource, setDatasource] = useState<any[]>([]);
    const [filter, setFilter] = useState<any>({});
    useEffect(()=>{
        getData({});
    },[])
    const getData=(filter: any)=>{
        setDatasource([]);
        setShowProgressBar(true);
        productRepository.getOrders({
            ...filter,
            CpId: CPID,
            dsach_donvi:-1,
            tu_ngay:lodash.get(filter,'tu_ngay',''),
            den_ngay:lodash.get(filter,'den_ngay',''),
            loai_dv:lodash.get(filter,'loai_dv',''),
            Sign: sign(`${lodash.get(filter,'tu_ngay','')}-1${lodash.get(filter,'den_ngay','')}${lodash.get(filter,'keyword','')}`)
        }).then(res=>{
            setDatasource(res.ListData);
        }).catch(err=>{
            M24ErrorUtils.showError(err);
        }).finally(()=> setShowProgressBar(false));
    }
    const onSearch=(filter?: any)=>{
       getData(filter);
    }
    const columns = [
        {
            title: 'Dịch vụ',
            dataIndex: 'ng_gdich',
            key: 'ng_gdich',
        },
        {
            title: 'Số đơn ĐT',
            dataIndex: 'so_donbh',
            key: 'so_donbh',
        },
        {
            title: 'Số đơn BH',
            dataIndex: 'so_don_pias',
            key: 'so_don_pias',
        },
        {
            title: 'Nghiệp vụ',
            dataIndex: 'doituong_bh_tcd',
            key: 'doituong_bh_tcd',
            render: (text: string)=> {
                let temp: any = SERVICES.find((x: any)=> x.value===text);
                return <span>{temp?.name}</span>;
            }
        },
        {
            title: 'Phí',
            dataIndex: 'nguyen_tep',
            key: 'nguyen_tep',
            render:(text: string)=> <span>{formatMoneyByUnit(text)}</span>
        },
        {
            title: 'Ngày chứng từ',
            dataIndex: 'ngay_ctu',
            key: 'ngay_ctu',
            render:(text: string)=> <span>{text}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
            render:(text: string, record: any)=>{
                if (record.RequestId > 0)
                {
                    if (record.so_donbh_tt != "")
                    {
                        return "Xóa đơn Pias";
                    }
                    else
                    {
                        return "Tạo đơn";
                    }
                }
                else
                {
                    if (record.trang_thai == "01")
                    {
                    return "Chờ";
                    }
                    else if (record.trang_thai == "02")
                    {
                        return "Chuyển";
                    }
                    else if (record.trang_thai == "00")
                    {
                       return "Duyệt đơn"
                    }
                    else if (record.trang_thai == "-01")
                    {
                       return "Hủy";
                    }
                    else
                    {
                        return "Duyệt đơn";
                    }
                }
            }
        },
        {
            title: 'Loại SĐBS',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
            render:(text: string, record: any)=> {
            if (record.tthai_sdbs != "")
                {
                    if (record.tthai_sdbs.Substring(0, 2) == "01")
                    {
                        return "Tăng phí";
                    }
                    else if (record.tthai_sdbs.Substring(0, 2) == "02")
                    {
                        return "Giảm phí";
                    }
                    else if (record.tthai_sdbs.Substring(0, 2) == "03")
                    {
                        return "Hoàn phí";
                    }
                    else if (record.tthai_sdbs.Substring(0, 2) == "04")
                    {
                        return "Hủy đơn";
                    }
                    else if (record.tthai_sdbs.Substring(0, 2) == "05")
                    {
                        return "Thay đổi khác";
                    }
                    else
                    {
                        return "Không có";
                    }
                }
            else
                {
                    return "Không có";
                }
            }
        },
        {
            title: 'Đơn vị',
            dataIndex: 'ten_donvi',
            key: 'ten_donvi',
        },
        {
            title: 'Cán bộ tạo',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Đại lý',
            dataIndex: 'ten_daily',
            key: 'ten_daily',
        },

        ]
    return <MainLayout showProgressBar={showProgressBar} title={'Đơn hàng'}>
        <div className={'pd20'}>
            <Filter services={SERVICES} filter={filter} setFilter={setFilter} onSearch={onSearch}/>
            <Card className={'border-card-header mgt20'}>
                <Row className={'dpl-flex align-items-center justify-content-between'}>
                    <span className={'txt-size-h5 txt-color-black bold'}>{`Danh sách đơn ${dataSource&&dataSource.length>0?`(${dataSource.length})`:''}`}</span>
                </Row>
            </Card>
            <div>
                <Card headStyle={{alignItems: 'center', paddingTop: 0}}  className={'border-card-header mgt20'}>
                    <Skeleton active={true} loading={showProgressBar}>
                        {dataSource && dataSource.length > 0 ? <Table rowKey={(record) => record.id}
                                                                      dataSource={dataSource}
                                                                      pagination={{hideOnSinglePage: true}}
                                                                      scroll={{x: 1500}}
                                                                      columns={columns}/>
                            : <Empty description={'Chưa có dữ liệu'}/>
                        }
                    </Skeleton>
                </Card>
            </div>
           </div>
    </MainLayout>
}

export default Orders;

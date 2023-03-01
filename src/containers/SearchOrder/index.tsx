import React, {useState} from "react";
import MainLayout from "../../components/Layout";
import {Badge, Button, Card, Col, Input, Row, Space, Table, Tooltip} from "antd";
import lodash from "lodash";
import {productRepository} from "../../repositories/ProductRepository";
import {ReloadOutlined} from "@ant-design/icons";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {formatNumber} from "../../core/helpers/string";
import EditOrderModal from "../../components/Modal/EditOrderModal";
import M24Notification from "../../utils/M24Notification";
import M24ErrorUtils from "../../utils/M24ErrorUtils";

function SearchOrder(){
    const [filter, setFilter] = useState<any>({});
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [isUpdating, setUpdating] = useState<boolean>(false);
    const [datasource, setDatasource] = useState<any>([]);
    const [selected, setSelected] = useState<any>();
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
    const [profile, setProfile] = useSessionStorage('profile', false);
    const handleChange=(key: string, value: any)=>{
        let temp = lodash.cloneDeep(filter);
        temp[key] = value;
        setFilter(temp);
    }
    const onReset=()=>{
        setFilter({});
    }
    const handleSearch=()=>{
        setLoading(true);
        productRepository.searchOrderByImei(filter, webCode, profile.ma_user).then(res=>{
            setDatasource(res)
        }).catch(err=>{

        }).finally(()=> setLoading(false));
    }
    const onCancel=()=>{
        setShowEdit(false);
        setSelected(null);
    }
    const onSubmit=(body: any)=>{
        setLoading(true);
        productRepository.draftOrder(body).then(res=>{
            M24Notification.messageSuccess('Sửa đổi bổ sung thành công');
            onCancel();
        }).catch(err=>{
            console.log(err);
            M24ErrorUtils.showError(err.data.Message);
        }).finally(()=> setLoading(false));
    }
    const columns: any = [
        {
            title: 'Khách hàng',
            dataIndex: 'khach_hang',
            key: 'khach_hang',
            width: 150,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'dia_chi',
            key: 'dia_chi',
            width: 200,
        },
        {
            title: 'Điện thoại',
            dataIndex: 'dien_thoai',
            key: 'dien_thoai',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            width: 200,
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'loai_thietbi',
            key: 'loai_thietbi',
            width: 150,
        },
        {
            title: 'Hãng',
            dataIndex: 'hang',
            key: 'hang',
            width: 150,
        },{
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            width: 150,
        },{
            title: 'Số Serial',
            dataIndex: 'so_serial',
            key: 'so_serial',
            width: 200,
        },{
            title: 'Thời hạn bắt đầu bảo hành NSX',
            dataIndex: 'thoihan_batdau_baohanh_nsx',
            key: 'thoihan_batdau_baohanh_nsx',
            width: 200,
        },{
            title: 'Thời hạn kết thúc bảo hành NSX',
            dataIndex: 'thoihan_ketthuc_baohanh_nsx',
            key: 'thoihan_ketthuc_baohanh_nsx',
            width: 200,
        },{
            title: 'Ngày bắt đầu',
            dataIndex: 'ngay_batdau',
            key: 'ngay_batdau',
            width: 200,
        },{
            title: 'Thời hạn bảo hiểm',
            dataIndex: 'thoihan_bh',
            key: 'thoihan_bh',
            width: 200,
        },{
            title: 'Giá trị thiết bị',
            dataIndex: 'giatri_thietbi',
            key: 'giatri_thietbi',
            width: 150,
            render: (text:string) => formatNumber(text)
        },{
            title: 'Phí bảo hiểm',
            dataIndex: 'phi_baohiem_thietbi',
            key: 'phi_baohiem_thietbi',
            width: 150,
            render: (text:string) => formatNumber(text)
        },{
            title: '',
            dataIndex: 'action',
            key: 'action',
            width: 70,
            fixed:'right',
            render: (text: string, record: any, index: number) => {

                return <Row className={'justify-content-center'}>
                    <Space>
                        <Tooltip title={'Sửa'}><span onClick={() => {
                            setSelected(record);
                            setShowEdit(true);
                        }
                        }><i className="cursor-pointer far fa-edit"></i></span></Tooltip>
                    </Space>
                </Row>
            }
        },
    ];
    return <MainLayout showProgressBar={showProgressBar} showReport={true} title={'Tra cứu đơn bảo hiểm'} showSearch={false}>
       <div>
           <div className="content">
              <div className={'pd20'}>
                  <Card className={'mgt20'}>
                      <span className={'txt-size-h6 robotomedium'}>Tìm kiếm</span>
                      <Row gutter={16} className={'align-items-center'}>
                          <Col md={24} lg={6}>
                              <span>Số IMEI/Serial</span>
                              <Input value={lodash.get(filter,'imei','')} onChange={e=> handleChange('imei', e.target.value)} className={'width100'} placeholder={'Nhập số IMEI/Serial'}></Input>
                          </Col>
                          <Col md={24} lg={6}>
                              <span>Số điện thoại</span>
                              <Input value={lodash.get(filter,'phone','')} onChange={e=> handleChange('phone', e.target.value)} className={'width100'} placeholder={'Nhập số điện thoại'}></Input>
                          </Col>

                          </Row>
                      <Row className={'justify-content-end'}>
                          <Col>
                              {!lodash.isEmpty(filter) &&
                                  <span onClick={onReset} className={'mgr20 cursor-pointer txt-size-h8 robotoregular txt-color-gray refresh-filter-btn'}>
                        <ReloadOutlined className={''}/> &nbsp;
                                      {'Refresh'}</span>}
                              <Button
                                  className={'border-radius6 _btn-search'}
                                  type={"primary"}
                                  ghost
                                  loading={isLoading}
                                  onClick={handleSearch}
                              >
                                  <i className="fal fa-search txt-size-h7 mgr5"/>
                                  <span className={'txt-size-h7 robotoregular'}>{'Tìm kiếm'}</span>

                              </Button>
                          </Col>
                      </Row>
                  </Card>
                  <Row className={' mgt20 mgbt20'}>
                      <Space>
                          <h3 className='robotomedium mg-0 fsz-16 line-h-24 txt-color-black'>
                              Danh sách đơn bảo hiểm
                          </h3>
                          <Badge
                              overflowCount={99999999999}
                              showZero={false}
                              count={datasource.length ? datasource.length : 0}
                              style={{backgroundColor: 'gray'}}
                          />
                      </Space>
                  </Row>
                  <Table className={''} dataSource={datasource} columns={columns} pagination={{hideOnSinglePage:true}} scroll={{x:1500}}/>
                  {showEdit&&<EditOrderModal loading={isUpdating} visible={showEdit} data={selected} onCancel={onCancel} onSubmit={onSubmit} />}
              </div>
           </div>
       </div>
    </MainLayout>
}
export default SearchOrder;

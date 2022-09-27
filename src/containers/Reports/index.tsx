import React, {useState} from "react";
import MainLayout from "../../components/Layout";
import {Badge, Button, Card, Col, DatePicker, Input, Row, Space, Table, Tooltip} from "antd";
import lodash from "lodash";
import {productRepository} from "../../repositories/ProductRepository";
import {ReloadOutlined} from "@ant-design/icons";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import {formatNumber} from "../../core/helpers/string";
import EditOrderModal from "../../components/Modal/EditOrderModal";
import M24Notification from "../../utils/M24Notification";
import M24ErrorUtils from "../../utils/M24ErrorUtils";
import {handleChangeDate, handleChangeRangeDate} from "../../utils/StringUtils";
import {STANDARD_DATE_FORMAT} from "../../core/config";
import moment from "moment";
import * as XLSX from "xlsx";
function SearchOrder(){
    const [filter, setFilter] = useState<any>({});
    const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [isUpdating, setUpdating] = useState<boolean>(false);
    const [datasource, setDatasource] = useState<any>([]);
    const [selected, setSelected] = useState<any>();
    const [profile, setProfile] = useSessionStorage('profile', false);
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
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
        productRepository.getReports(webCode, filter.tu_ngay, filter.den_ngay, profile.ma_user).then(res=>{
            setDatasource(res)
        }).catch(err=>{

        }).finally(()=> setLoading(false));
    }
    const onCancel=()=>{
        setShowEdit(false);
        setSelected(null);
    }
    const onChangeRangeDate = (date: any) => {
        let temp = handleChangeRangeDate(date, 'tu_ngay', 'den_ngay', filter);
        setFilter(temp);
    }
    const columns: any = [
        {
            title: 'Nhân viên',
            dataIndex: 'nhan_vien',
            key: 'nhan_vien',
            width: 150,
        },
        {
            title: 'Điện thoại',
            dataIndex: 'so_dienthoai',
            key: 'so_dienthoai',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
            title: 'Phí bảo hiểm có VAT',
            dataIndex: 'phi_bh',
            key: 'phi_bh',
            width: 150,
            render: (text:string) => formatNumber(text)
        }, {
            title: 'Phí bảo hiểm không VAT',
            dataIndex: 'phi_bh_KVAT',
            key: 'phi_bh_KVAT',
            width: 150,
            render: (text:string) => formatNumber(text)
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'ten_khach_hang',
            key: 'ten_khach_hang',
            width: 150,
        },
        {
            title: 'Ngày cấp',
            dataIndex: 'ngay_cap',
            key: 'ngay_cap',
            width: 150,
        }
        ,
        {
            title: 'Số đơn bảo hiểm',
            dataIndex: 'so_donbh',
            key: 'so_donbh',
            width: 150,
        }
        ,
        {
            title: 'Mã chương trình',
            dataIndex: 'ma_chtrinh',
            key: 'ma_chtrinh',
            width: 150,
        }
    ];
    const onExport=()=>{
        let headers: any = [];
        columns.map((x: any)=>{
            headers.push(x.title);
            return x;
        });
        let items: any=[];
        datasource.map((row: any)=>{
            items.push({
                nhan_vien: row.nhan_vien,
                so_dienthoai: row.so_dienthoai,
                email: row.email,
                loai_thietbi: row.loai_thietbi,
                phi_bh: row.phi_bh,
                ma_chtrinh: row.ma_chtrinh,
            });
            return row;
        });
        const worksheet = XLSX.utils.json_to_sheet(items);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách ");
        XLSX.utils.sheet_add_aoa(worksheet, [headers]);
        XLSX.writeFile(workbook, "pvi-webview.xlsx");
    }
    return <MainLayout showProgressBar={showProgressBar} title={'Báo cáo'} showSearch={true}>
       <div>
           <div className="content">
              <div className={'pd20'}>
                  <Card className={'mgt20'}>
                      <span className={'txt-size-h6 robotomedium'}>Tìm kiếm</span>
                      <Row gutter={16} className={'align-items-center'}>

                          <Col md={24} lg={6}>
                              <span>Ngày đăng ký</span>
                              <DatePicker.RangePicker
                                  className={'width100'}
                                  onChange={(date: any, dateString: any) => {
                                      onChangeRangeDate(date);
                                  }}
                                  value={[filter?.tu_ngay?moment(filter.tu_ngay, STANDARD_DATE_FORMAT):null, filter?.den_ngay?moment(filter.den_ngay, STANDARD_DATE_FORMAT):null]}

                                  format={STANDARD_DATE_FORMAT} />
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
                  <Row className={' mgt20 mgbt20 justify-content-between'}>
                      <Space>
                          <h3 className='robotomedium mg-0 fsz-16 line-h-24 txt-color-black'>
                              Danh sách dữ liệu
                          </h3>
                          <Badge
                              overflowCount={99999999999}
                              showZero={false}
                              count={datasource.length ? datasource.length : 0}
                              style={{backgroundColor: 'gray'}}
                          />
                      </Space>
                      <Button onClick={onExport} type={'primary'} icon={<i
                          className="far fa-download mgr5"></i>}>Xuất excel</Button>
                  </Row>
                  <Table className={''} dataSource={datasource} columns={columns} pagination={{hideOnSinglePage:true}}/>
              </div>
           </div>
       </div>
    </MainLayout>
}
export default SearchOrder;

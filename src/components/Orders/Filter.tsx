import React, {Dispatch, SetStateAction} from "react";
import {Button, Card, Col, Input, Row, DatePicker, Select} from "antd";
import lodash from "lodash";
import {ReloadOutlined} from "@ant-design/icons";
import {handleChangeRangeDate, handleInputChange} from "../../utils/StringUtils";
import moment from "moment";
const { RangePicker } = DatePicker;
interface FilterProps{
    filter: any;
    setFilter: Dispatch<SetStateAction<any>>;
    onSearch:(filter?: any)=> void;
    services: any;
};
const dateFormat = 'DD/MM/YYYY';

function Filter(props: FilterProps){
    const {filter, setFilter, onSearch, services} = props;
    const resetFilter = () => {
        setFilter({});
        onSearch({});
    }
    const onChange = (key: string, value: any) => {
        let temp = handleInputChange(key, value, filter);
        setFilter(temp);
    }
    const onChangeRangeDate = (date: any) => {
        let temp = handleChangeRangeDate(date, 'tu_ngay', 'den_ngay', filter);
        console.log(temp);
        setFilter(temp);
    }
    return <Card className={'border-card-header mgt20'}>
        <Row gutter={16}>
            <Col xs={24} lg={6}>
                <Row>
                    <span>Từ khóa</span>
                </Row>
                <Input value={lodash.get(filter,'keyword','')} onChange={(e)=> onChange('keyword', e.target.value)} className={''}></Input>
            </Col>
            <Col xs={24} lg={6}>
                <Row>
                    <span>Dịch vụ</span>
                </Row>
                <Select className={'width80'} value={lodash.get(filter,'loai_dv',undefined)} onChange={(value)=>onChange('loai_dv', value)}>
                    {
                        services.map((x: any)=>{
                            return <Select.Option value={x.value}>{x.name}</Select.Option>
                        })
                    }
                </Select>
            </Col>
            <Col xs={24} lg={10}>
                <Row>
                    <span>Thời gian</span>
                </Row>
                <RangePicker
                    className={'width100'}
                    onChange={(value: any, dateString: any) => {
                        onChangeRangeDate(value);
                    }}
                    value={[filter.tu_ngay?moment(filter.tu_ngay, dateFormat):null, filter.den_ngay?moment(filter.den_ngay, dateFormat):null]}
                    format={dateFormat}
                />
            </Col>
        </Row>
        <Row className={'justify-content-end align-items-center mgt10'}>
            {!lodash.isEmpty(filter) &&
            <span onClick={resetFilter} className={'mgr20 cursor-pointer txt-size-h8 robotoregular txt-color-gray refresh-filter-btn'}>
                        <ReloadOutlined className={''}/> &nbsp;
                {'Làm mới'}</span>}
            <Button
                className={'border-radius6 _btn-search'}
                type={"primary"}
                ghost
                onClick={() => onSearch({...filter})}
            >
                <i className="fal fa-search txt-size-h7 mgr5"/>
                <span className={'txt-size-h7 robotoregular'}>{'Tìm kiếm'}</span>

            </Button>
        </Row>
    </Card>
}
export default Filter;

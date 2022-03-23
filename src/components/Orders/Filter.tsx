import React, {Dispatch, SetStateAction} from "react";
import {Button, Card, Col, Input, Row, DatePicker} from "antd";
import lodash from "lodash";
import {ReloadOutlined} from "@ant-design/icons";
import {handleInputChange} from "../../utils/StringUtils";
import moment from "moment";
const { RangePicker } = DatePicker;
interface FilterProps{
    filter: any;
    setFilter: Dispatch<SetStateAction<any>>;
    onSearch:(filter?: any)=> void;
};
const dateFormat = 'DD/MM/YYYY';
function Filter(props: FilterProps){
    const {filter, setFilter, onSearch} = props;
    const resetFilter = () => {
        setFilter({});
        onSearch();
    }
    const onChange = (key: string, value: any) => {
        let temp = handleInputChange(key, value, filter);
        setFilter(temp);
    }
    return <Card className={'border-card-header mgt20'}>
        <Row gutter={16}>
            <Col xs={24} lg={6}>
                <Row>
                    <span>Từ khóa</span>
                </Row>
                <Input value={lodash.get(filter,'ma_nhom','')} onChange={(e)=> onChange('ma_nhom', e.target.value)} className={''}></Input>
            </Col>
            <Col xs={24} lg={10}>
                <Row>
                    <span>Thời gian</span>
                </Row>
                <RangePicker
                    className={'width100'}
                    value={[filter.tu_ngay?moment(lodash.get(filter,'tu_ngay',null), dateFormat):null, filter.den_ngay?moment(lodash.get(filter,'den_ngay',null), dateFormat):null]}
                    format={dateFormat}
                />
            </Col>
        </Row>
        <Row className={'justify-content-end align-items-center mgt5'}>
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

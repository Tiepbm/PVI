/**
 *
 * @param text
 * @returns {string}
 */
import lodash from "lodash";
import md5 from 'md5';
import {API_KEY} from "../core/config";
import {formatDate} from "../core/helpers/date-time";
import moment from "moment";

export const linkOrder = (text: any, config: any) => {
    if (!text) return '';
    let orderRegex = /#[A-Z0-9_]{4,15}/g;
    let orderCode = text.match(orderRegex);
    if (orderCode) {
        orderCode = orderCode[0];
        orderCode = orderCode.replace('#', '');
        let url = '';
        if (text.indexOf('đơn ký gửi') > 0) url = lodash.get(config,'shipment','');
        else if (text.indexOf('đơn hàng') > 0 || text.indexOf('đơn #') > 0) url = lodash.get(config,'order','');
        else if (text.indexOf('YCTT') > 0||text.indexOf('YCCT') > 0) url = lodash.get(config,'peer_payment','');
        url = url.replace('{code}',orderCode);
        return text.replace(orderCode, function () {
            return '<a target="_blank" href="' + url + '">' +`${orderCode}` + '</a>';
        });
    }
    return text;
};
/**
 * format đơn giá
 * @param value
 * @param unit đơn vị tiền
 * @returns {*}
 */
export const formatPriceByUnit=(value?: any, unit?:any)=> {
    return value;
    // if (value === undefined || value === null) return '---';
    // return `${preCharacter}${currentcy && currentcy.prefix ? currentcy.prefix : ''}${numeral(value).format('0,0.[0000]')}${currentcy && currentcy.suffix ? currentcy.suffix : ''}`;

}

/**
 * Supported search many item
 * @param key
 * @param value
 */
export function handleInputChangeMany(key: string, value: any, filter: any) {
    let temp = lodash.merge({}, filter);
    let realValues = lodash.get(temp, key, []);

    if (realValues.length) {
        realValues = realValues.split(',');
    }
    if (realValues.indexOf(value) >= 0) {
        realValues = lodash.filter(realValues, n => n !== value);
    } else {
        if (realValues === '') {
            realValues = [];
        }
        realValues.push(value);
    }
    temp[key] = realValues.join();
    if (realValues.length === 0) {
        delete temp[key];
    }
    return temp;
}
/**
 * Input change
 * @param key
 * @param value
 * @returns {{}}
 */
export function handleInputChange(key: string, value: any, filter: any){
    let temp = lodash.merge({}, filter);
    temp[key] = value;
    if (value===null||value===""||value ==undefined) {
        delete temp[key];
    }
    return temp;
};
/**
 * Select range of date
 * @param e
 * @param from
 * @param to
 */
export function handleChangeRangeDate(e: any, from:string, to:string, filter: any) {
    let temp = lodash.merge({}, filter);
    if (e && e.length) {
        // temp[from] = e[0].startOf('day').toISOString();
        // temp[to] = e[1].endOf('day').toISOString();
        temp[from] = formatDate(moment(e[0]));
        temp[to] = formatDate(moment(e[1]));
    } else {
        delete temp[from];
        delete temp[to];
    }
    return temp;
};
/**
 * Select range of date
 * @param e
 * @param from
 * @param to
 */
export function handleChangeDate(key:string,e: any,  filter: any){
    let temp = lodash.merge({}, filter);
    if (e) {
        temp[key] = e.toISOString();
    } else {
        delete temp[key];
    }
    return temp;
};
export function sign(value: string){
    return md5(`${API_KEY}${value}`);
}

import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {url} from '../core/helpers/string';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL, CPID} from "../core/config";
import {sign} from "../utils/StringUtils";
import lodash from "lodash";

export class ProductRepository extends Repository {
    constructor() {
        super(httpConfig, false);
        this.setBaseURL(API_BASE_URL);
    }

    public getFeeHSDD = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/Get_Phi_HSDD`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeExtend = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/Get_Phi_BaoHanh_MoRong`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeMotor = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/Get_Phi_XeMay`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeTNDSOTO = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/Get_TongPhi_Auto_TNDS`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeHouse = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/Get_Phi_Nha`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderHSDD = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/TaoDon_HSDD`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderHouse = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/TaoDon_TaiSan`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderCar = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/TaoDon_Auto`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderMotor = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/TaoDon_XeMay`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderExtend = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/TaoDon_BaoHanh_MoRong`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getOrders = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/Get_ListService`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public searchOrderByImei = (filter: any, webCode: any): Promise<any> => {
        let body={
            CpId: CPID,
            serial_IMEI: lodash.get(filter,'imei',''),
            dien_thoai: lodash.get(filter,'phone',''),
            web_code: webCode,
            Sign: sign(`${lodash.get(filter,'imei','')}${lodash.get(filter,'phone','')}${webCode}`)
        }
        return this.http
            .post(`ManagerCP/SearchSerial_IMEI`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data.Data;
            });
    };
    public draftOrder=(data: any)=>{
        let body={
            CpId: CPID,
            pr_key: lodash.get(data,'pr_key',''),
            khach_hang: lodash.get(data,'khach_hang',''),
            dia_chi: lodash.get(data,'dia_chi',''),
            dien_thoai: lodash.get(data,'dien_thoai',''),
            Email: lodash.get(data,'Email',''),
            hang: lodash.get(data,'hang',''),
            model: lodash.get(data,'model',''),
            so_serial: lodash.get(data,'so_serial',''),
            thoihan_batdau_baohanh_nsx: lodash.get(data,'thoihan_batdau_baohanh_nsx',''),
            thoihan_ketthuc_baohanh_nsx: lodash.get(data,'thoihan_ketthuc_baohanh_nsx',''),
            ngay_batdau: lodash.get(data,'ngay_batdau',''),
            thoihan_bh: lodash.get(data,'thoihan_bh',''),
            giatri_thietbi: lodash.get(data,'giatri_thietbi',''),
            phi_baohiem_thietbi: lodash.get(data,'phi_baohiem_thietbi',''),
            Sign: sign(`${lodash.get(data,'dien_thoai','')}${lodash.get(data,'so_serial','')}${lodash.get(data,'thoihan_batdau_baohanh_nsx','')}${lodash.get(data,'thoihan_ketthuc_baohanh_nsx','')}${lodash.get(data,'ngay_batdau','')}${lodash.get(data,'thoihan_bh','')}${lodash.get(data,'giatri_thietbi','')}${lodash.get(data,'phi_baohiem_thietbi','')}${lodash.get(data,'pr_key','')}`)
        }
        return this.http
            .post(`ManagerCP/sdbs_bhmr`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data.Data;
            });
    }
    public getReports = (webCode: any, fromDate: string, toDate: string, maUser: any): Promise<any> => {
        let body = {
            CpId: CPID,
            ma_user: maUser,
            tu_ngay: fromDate,
            den_ngay: toDate,
            web_code: webCode,
            Sign:sign(`${maUser}${fromDate}${webCode}${toDate}`)
        }
        return this.http
            .post(`ManagerCP/Report_BHMR`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data.Data;
            });
    };
}

export const productRepository: ProductRepository = new ProductRepository();

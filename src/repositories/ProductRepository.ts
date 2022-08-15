import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {url} from '../core/helpers/string';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class ProductRepository extends Repository {
    constructor() {
        super(httpConfig, false);
        this.setBaseURL(API_BASE_URL);
    }

    public getFeeHSDD = (body: any): Promise<any> => {
        return this.http
            .post(`Get_Phi_HSDD`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeExtend = (body: any): Promise<any> => {
        return this.http
            .post(`Get_Phi_BaoHanh_MoRong`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeMotor = (body: any): Promise<any> => {
        return this.http
            .post(`Get_Phi_XeMay`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeTNDSOTO = (body: any): Promise<any> => {
        return this.http
            .post(`Get_TongPhi_Auto_TNDS`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getFeeHouse = (body: any): Promise<any> => {
        return this.http
            .post(`Get_Phi_Nha`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderHSDD = (body: any): Promise<any> => {
        return this.http
            .post(`TaoDon_HSDD`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderHouse = (body: any): Promise<any> => {
        return this.http
            .post(`TaoDon_TaiSan`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderCar = (body: any): Promise<any> => {
        return this.http
            .post(`TaoDon_Auto`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderMotor = (body: any): Promise<any> => {
        return this.http
            .post(`TaoDon_XeMay`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public createOrderExtend = (body: any): Promise<any> => {
        return this.http
            .post(`TaoDon_BaoHanh_MoRong`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getOrders = (body: any): Promise<any> => {
        return this.http
            .post(`Get_ListService`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}

export const productRepository: ProductRepository = new ProductRepository();

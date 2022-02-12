import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {url} from '../core/helpers/string';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL} from "../core/config";

export class CategoryRepository extends Repository {
    constructor() {
        super(httpConfig, false);
        this.setBaseURL(url(API_BASE_URL, 'categories'));
    }

    public getConnectionsStatus = (): Promise<any> => {
        return this.http
            .get(`connection-statuses`, {})
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public getStatuses = () : Promise<any> => {
        return this.http
            .get(`order-statuses`, {params: {size: 1000}}).then((response: AxiosResponse<any>) => {
                return response.data;
            });
    }
    public getMarketPlaces = () : Promise<any> => {
        return this.http
            .get(`marketplaces`, {params: {size: 1000}}).then((response: AxiosResponse<any>) => {
                return response.data;
            });
    }
    public getProvider = ():Promise <any> => {
        return this.http.get('providers',{params: {size:1000}})
            .then((response:AxiosResponse<any>) => {
                return response.data;
            });
    }

}

export const categoryRepository: CategoryRepository = new CategoryRepository();

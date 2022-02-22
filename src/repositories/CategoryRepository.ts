import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {url} from '../core/helpers/string';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL, CPID} from "../core/config";
import {sign} from "../utils/StringUtils";

export class CategoryRepository extends Repository {
    constructor() {
        super(httpConfig, false);
        this.setBaseURL(API_BASE_URL);
    }

    public getCategories = (categoryName: string): Promise<any> => {
        let body = {
            ten_dmuc: categoryName,
            CpId: CPID,
            Sign: sign(categoryName)
        };
        return this.http
            .post(`Get_DanhMuc`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };

}

export const categoryRepository: CategoryRepository = new CategoryRepository();

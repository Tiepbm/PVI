import {Repository} from '../core/repositories/Repository';
import {AxiosResponse} from 'axios';
import {httpConfig} from "../core/config/http";
import {API_BASE_URL, CPID} from "../core/config";
import {sign} from "../utils/StringUtils";

export class UserRepository extends Repository {
    constructor() {
        super(httpConfig, false);
        this.setBaseURL(API_BASE_URL);
    }

    public getProfile = (body: any): Promise<any> => {
        return this.http
            .post(`ManagerApplication/LoginSSO`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
    public login = (username: string, password: string): Promise<any> => {
        let body = {
            CpId: CPID,
            UserName:username,
            Password: password,
            Type:'QLCD',
            Sign: sign(`${username}${password}QLCD`)
        };
        return this.http
            .post(`ManagerApplication/LoginWebView`, body)
            .then((response: AxiosResponse<any>) => {
                return response.data;
            });
    };
}
export const userRepository: UserRepository = new UserRepository();

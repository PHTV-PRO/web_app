/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    login = (loginInfo) => {
        return this.postNotBearer(`/api/login`, loginInfo);
    }

    register = (registerInfo) => {
        return this.postNotBearer(`/api/auth/register`, registerInfo);
    }

    forgetPassword = (email) => {
        return this.post(`/api/Auth/ForgetPassword?Email=${email}`);
    };

    getCurrentUser = (token) => {
        if (token != null) {
            return this.postNotBearer(`/api/getinfo`, token);
        }
    }



}

export const userService = new UserService();
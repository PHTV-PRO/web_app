/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class AccountService extends baseService {
    constructor() {
        super();
    }
    getListAccount = () => {
        return this.get(`/api/admin/account`);
    };
    getAccountById = (id) => {
        return this.get(`/api/admin/account/${id}`);
    }
    getEmployerOfCompanyById = (id) => {
        return this.get(`/api/employer/company/${id}`);
    }
    createAccount = (ac) => {
        return this.post(`/api/admin/account`, ac);
    };
    deleteAccount = (id) => {
        return this.delete(`/api/admin/account/${id}`);
    };
    updateAccount = (id, ac) => {
        return this.put(`/api/admin/account/${id}`, ac);
    };
    getCompanyandJob = (token) => {
        return this.get(`/api/employer/account`);
    }

}

export const accountService = new AccountService();



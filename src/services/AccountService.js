/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class AccountService extends baseService {
    constructor() {
        super();
    }
    getListAccount = () => {
        return this.get(`/api/account`);
    };
    getAccountById = (id) => {
        return this.get(`/api/account/${id}`);
    }
    createAccount = (ac) => {
        return this.post(`/api/account`, ac);
    };
    deleteAccount = (id) => {
        return this.delete(`/api/account/${id}`);
    };
    updateAccount = (id, ac) => {
        return this.put(`/api/account/${id}`, ac);
    };

}

export const accountService = new AccountService();



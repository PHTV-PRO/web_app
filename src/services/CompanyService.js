/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CompanyService extends baseService {
    constructor() {
        super();
    }
    getListCompany = () => {
        return this.get(`/api/company`);
    };
    getCompanyById = (id) => {
        return this.get(`/api/company/${id}`);
    };
    createCompany = (Company) => {
        return this.post(`/api/company`, Company);
    };
    deleteCompany = (id) => {
        return this.delete(`/api/company/${id}`);
    };
    updateCompany = (id, company) => {
        return this.put(`/api/company/${id}`, company);
    };
}

export const companyService = new CompanyService();

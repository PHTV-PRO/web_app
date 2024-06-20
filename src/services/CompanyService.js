/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CompanyService extends baseService {
    constructor() {
        super();
    }
    getListCompany = () => {
        return this.get(`/api/general/company`);
    };
    getCompanyById = (id) => {
        return this.get(`/api/general/company/${id}`);
    };
    createCompany = (Company) => {
        return this.post(`/api/admin/company`, Company);
    };
    deleteCompany = (id) => {
        return this.delete(`/api/admin/company/${id}`);
    };
    updateCompany = (id, company) => {
        return this.put(`/api/admin/company/${id}`, company);
    };
}

export const companyService = new CompanyService();

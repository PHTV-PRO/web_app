/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class SubcriptionPlanService extends baseService {
    constructor() {
        super();
    }

    getSubcriptionPlanList = () => {
        return this.get(`/api/general/subcription_plan`);
    }

    getSubcriptionPlanById = (id) => {
        return this.get(`/api/general/subcription_plan/${id}`);
    }

    getSubcriptionPlanByAccount = (token) => {
        return this.get(`/api/employer/subcription_plan`, token);
    }

    addNewSubcriptionPlan = (formData) => {
        return this.post(`/api/admin/subcription_plan`, formData);
    }

    updateSubcriptionPlan = (id, formData) => {
        return this.put(`/api/admin/subcription_plan/${id}`, formData);
    }

    deleteSubcriptionPlan = (id) => {
        return this.delete(`/api/admin/subcription_plan/${id}`);
    }
}

export const subcriptionPlanService = new SubcriptionPlanService();
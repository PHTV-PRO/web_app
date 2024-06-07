/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class SubcriptionPlanService extends baseService {
    constructor() {
        super();
    }

    getSubcriptionPlanList = () => {
        return this.get(`/api/subcriptionPlan`);
    }

    getSubcriptionPlanById = (id) => {
        return this.get(`/api/subcriptionPlan/${id}`);
    }

    addNewSubcriptionPlan = (formData) => {
        return this.post(`/api/subcriptionPlan`, formData);
    }

    updateSubcriptionPlan = (id, formData) => {
        return this.put(`/api/subcriptionPlan/${id}`, formData);
    }

    deleteSubcriptionPlan = (id) => {
        return this.delete(`/api/subcriptionPlan/${id}`);
    }
}

export const subcriptionPlanService = new SubcriptionPlanService();
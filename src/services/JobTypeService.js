/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class JobTypeService extends baseService {
    constructor() {
        super();
    }

    getJobTypeList = () => {
        return this.get(`/api/jobType`);
    }

    getJobTypeById = (id) => {
        return this.get(`/api/jobType/${id}`);
    }

    addNewJobType = (formData) => {
        return this.post(`/api/jobType`, formData);
    }

    updateJobType = (id, formData) => {
        return this.put(`/api/jobType/${id}`, formData);
    }

    deleteJobType = (JobTypeId) => {
        return this.delete(`/api/jobType/${JobTypeId}`);
    }
}

export const jobTypeService = new JobTypeService();
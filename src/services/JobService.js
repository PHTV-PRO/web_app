/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class JobService extends baseService {
    constructor() {
        super();
    }
    getListJob = () => {
        return this.get(`/api/job`);
    };
    getJobById = (id) => {
        return this.get(`/api/job/${id}`);
    };
    createJob = (job) => {
        return this.post(`/api/job`, job);
    };
    deleteJob = (id) => {
        return this.delete(`/api/job/${id}`);
    };
    updateJob = (id, job) => {
        return this.put(`/api/job/${id}`, job);
    };
}

export const jobService = new JobService();

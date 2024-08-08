/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class JobService extends baseService {
    constructor() {
        super();
    }
    getListJob = () => {
        return this.get(`/api/general/job`);
    };
    getJobById = (id) => {
        return this.get(`/api/general/job/${id}`);
    };
    createJob = (job) => {
        return this.post(`/api/admin/job`, job);
    };
    deleteJob = (id) => {
        return this.delete(`/api/admin/job/${id}`);
    };
    updateJob = (id, job) => {
        return this.put(`/api/admin/job/${id}`, job);
    };

    createJobEmployer = (job) => {
        return this.post(`/api/employer/job`, job);
    };
    deleteJobforEmployer = (id) => {
        return this.delete(`/api/employer/job/${id}`);
    };
    updateJobForEmployer = (id, job) => {
        return this.put(`/api/employer/company/${id}`, job);
    };
    getChartOfAdmin = () => {
        return this.get(`/api/admin/chart`);
    };
    getChartOfEmployerById = (id) => {
        return this.get(`/api/employer/chart/${id}`);
    };
    getChartOfEmployerFromAdminById = (id) => {
        return this.get(`/api/admin/employer_chart/${id}`);
    };
    getApplicationByJob = (id) => {
        return this.get(`/api/employer/application_by_job?job_id=${id}&size=5&page=1`);
    };

}

export const jobService = new JobService();

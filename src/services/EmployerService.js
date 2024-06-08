/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class EmployerService extends baseService {
  constructor() {
    super();
  }
  getListEmployer = () => {
    return this.get(`/api/employer`);
  };
  getEmployerById = (id) => {
    return this.get(`/api/employer/${id}`);
  };
  createEmployer = (employer) => {
    return this.post(`/api/employer`, employer);
  };
  deleteEmployer = (id) => {
    return this.delete(`/api/employer/${id}`);
  };
  updateEmployer = (id, employer) => {
    return this.put(`/api/employer/${id}`, employer);
  };
}

export const employerService = new EmployerService();

/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class IndustryService extends baseService {
    constructor() {
        super();
    }

    getIndustryList = () => {
        return this.get(`/api/industry`);
    }

    getEnableBusList = () => {
        return this.get(`/api/Bus/enablebus`);
    }

    addNewIndustry = (formData) => {
        return this.post(`/api/industry`, formData);
    }

    getBusById = (id) => {
        return this.get(`/api/Bus/${id}`);
    }

    updateBus = (id,formData) => {
        return this.put(`/api/Bus?Id=${id}`, formData);
    }

    deleteBus = (busId) => {
        return this.delete(`/api/Bus/${busId}`);
    }

    enableBus = (id) => {
        return this.put(`/api/Bus/enable?Id=${id}`);
    }




    //Bus Type
    getBusTypeList = () => {
        return this.get(`/api/BusType`);
    }

    getBusTypeById = (id) => {
        return this.get(`/api/BusType/${id}`);
    }
    
    addNewBusType = (formData) => {
        return this.post(`/api/BusType`, formData);
    }

    updateBusType = (id,formData) => {
        return this.put(`/api/BusType?Id=${id}`, formData);
    }

    deleteBusType = (busTypeId) => {
        return this.delete(`/api/BusType/${busTypeId}`);
    }
}

export const industryService = new IndustryService();
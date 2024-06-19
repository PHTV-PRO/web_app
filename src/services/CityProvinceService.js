/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CityProvinceService extends baseService {
    constructor() {
        super();
    }

    getCityProvinceList = () => {
        return this.get(`/api/cityProvince`);
    }

    getCityProvinceById = (id) => {
        return this.get(`/api/cityProvince/${id}`);
    }

    // getCityProvinceById = (id) => {
    //     return this.get(`/api/cityProvince/${id}`);
    // }

    addNewCityProvince = (formData) => {
        return this.post(`/api/cityProvince`, formData);
    }

    updateCityProvince = (id, formData) => {
        return this.put(`/api/cityProvince/${id}`, formData);
    }

    deleteCityProvince = (cityProvinceId) => {
        return this.delete(`/api/cityProvince/${cityProvinceId}`);
    }
}

export const cityProvinceService = new CityProvinceService();
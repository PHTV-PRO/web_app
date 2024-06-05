/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class LevelService extends baseService {
    constructor() {
        super();
    }

    getLevelList = () => {
        return this.get(`/api/level`);
    }

    getLevelById = (id) => {
        return this.get(`/api/level/${id}`);
    }

    addNewLevel = (formData) => {
        return this.post(`/api/level`, formData);
    }

    updateLevel = (id, formData) => {
        return this.put(`/api/level/${id}`, formData);
    }

    deleteLevel = (levelId) => {
        return this.delete(`/api/level/${levelId}`);
    }
}

export const levelService = new LevelService();
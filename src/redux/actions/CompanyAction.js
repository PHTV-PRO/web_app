import { GET_COMPANY_LIST, GET_COMPANY_DETAIL, GET_DATA_CHART_BY_COMPANYID_OF_EMPLOYER } from "../constants";
import { history } from "../../App";
import { companyService } from "../../services/CompanyService";
import { notification } from "antd";

import axios from "axios";


export const getCompanyListAction = () => {
    return async (dispatch) => {
        try {
            const result = await companyService.getListCompany();
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_COMPANY_LIST,
                    arrCompany: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getCompanyIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await companyService.getCompanyById(id);
            console.log(result);
            console.log(result.data.data);
            dispatch({
                type: GET_COMPANY_DETAIL,
                companyDetail: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}




export const addCompanyAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await companyService.createCompany(formData)
            console.log(result);
            if (result.data.statusCode === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Add new Company successfully.</>
                    ),
                });
                history.push('/admin/companymng');
            } else {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Add new Company fail.</>
                    ),
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateCompanyByIdAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await companyService.updateCompany(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update Company successfully</>
                ),
            });
            history.goBack();
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateCompanyForEmployerAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await companyService.updateCompanyForEmployer(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update Company successfully</>
                ),
            });
            history.goBack();
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteCompanyAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await companyService.deleteCompany(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete Company successfully</>
                ),
            });
            dispatch(getCompanyListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getDataChartByCompanyIdOfEmployerAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await companyService.getDataChartByCompanyIdOfEmployer(id);
            console.log(result);
            console.log(result.data.data);
            dispatch({
                type: GET_DATA_CHART_BY_COMPANYID_OF_EMPLOYER,
                dataChartByCompanyIdForEmployer: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    console.log(images);
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/delgfr7a0/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})



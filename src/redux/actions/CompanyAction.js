import { GET_COMPANY_LIST, GET_COMPANY_DETAIL } from "../constants";
import { history } from "../../App";
import { companyService } from "../../services/CompanyService";
import { notification } from "antd";


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
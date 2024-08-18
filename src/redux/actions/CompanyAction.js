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


export const updateEnableOfCompanyByAdmin = (id) => {
    return async (dispatch) => {
        try {
            const result = await companyService.updateEnableFromAdmin(id);
            console.log(result);
            console.log(result.data.data.enable);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>{result.data.data === 'Success!!' ? "Enable successfully" : "Disable successfully"}</>
                ),
            });
            dispatch(getCompanyListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}



export const registerCompanyAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await companyService.registerCompany(formData)
            console.log(result);
            console.log(result?.data?.statusCode);

            if (result.data.statusCode === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Register Company successfully.</>
                    ),
                });
                history.push('/');
            }
            else if (result.data.statusCode === 400) {
                notification.error({
                    closeIcon: false,
                    message: 'Fail !!!',
                    description: (
                        <>Email or Password incorrect!!</>
                    ),
                });
                history.push('/');
            }
            else {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Register Company fail.</>
                    ),
                });
            }
        } catch (error) {
            if (error.response.request.status === 400) {
                notification.error({
                    closeIcon: false,
                    message: 'Fail !!!',
                    description: (
                        <>Email or Password incorrect . Or No Employer Registered!!</>
                    ),
                });
                history.push('/registerCompany');
            } else if (error.response.request.status === 409) {
                notification.error({
                    closeIcon: false,
                    message: 'Fail !!!',
                    description: (
                        <>This Employer  Already Has Company !!</>
                    ),
                });
                history.push('/registerCompany');
            }
            else if (error.response.request.status === 500) {
                notification.error({
                    closeIcon: false,
                    message: 'Fail !!!',
                    description: (
                        <>Register Fail !!</>
                    ),
                });
                history.push('/registerCompany');
            }
        }
    }
}


